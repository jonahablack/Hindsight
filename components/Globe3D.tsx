"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import GlobeGL, { type GlobeMethods } from "react-globe.gl";
import * as THREE from "three";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, Geometry } from "geojson";
import type { Case } from "@/types/case";

const GEO_URL = "/data/land-110m.json";
const DEFAULT_ALTITUDE = 2.4;

interface RoutePoint {
  lat: number;
  lng: number;
  label: string;
  isPrimary: boolean;
  caseId: string;
  caseTitle: string;
}

interface RouteArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  caseId: string;
  selected: boolean;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function tooltipHtml(title: string, sub: string) {
  return `<div style="
    background: #1f1a13;
    border: 1px solid #4a4128;
    color: #ece3d0;
    padding: 6px 10px;
    border-radius: 2px;
    font-family: var(--font-sans, Inter, sans-serif);
    font-size: 12px;
    line-height: 1.4;
    max-width: 220px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.45);
  "><div style="font-weight: 500;">${escapeHtml(title)}</div><div style="margin-top:2px; color:#a1926e;">${escapeHtml(sub)}</div></div>`;
}

export default function Globe3D({
  cases,
  selectedId,
  onSelect,
  flyToNonce,
}: {
  cases: Case[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  flyToNonce: number;
}) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);
  const [size, setSize] = useState({ width: 800, height: 520 });
  const [landPolygons, setLandPolygons] = useState<Feature<Geometry>[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((topology: Topology) => {
        if (cancelled) return;
        const obj = topology.objects.land as GeometryCollection;
        const result = feature(topology, obj);
        const features = result.type === "FeatureCollection" ? result.features : [result];
        setLandPolygons(features as Feature<Geometry>[]);
      })
      .catch(() => {
        // Land outline is decorative; the globe still functions with just points and arcs.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 800;
      setSize({ width, height: Math.max(420, Math.min(600, width * 0.68)) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (flyToNonce === 0) return;
    const c = cases.find((x) => x.id === selectedId);
    if (!c || !globeRef.current) return;
    globeRef.current.pointOfView(
      { lat: c.primaryLocation.latitude, lng: c.primaryLocation.longitude, altitude: 1.4 },
      900
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyToNonce]);

  const points = useMemo<RoutePoint[]>(() => {
    const pts: RoutePoint[] = [];
    for (const c of cases) {
      pts.push({
        lat: c.primaryLocation.latitude,
        lng: c.primaryLocation.longitude,
        label: c.primaryLocation.label,
        isPrimary: true,
        caseId: c.id,
        caseTitle: c.title,
      });
      for (const loc of c.relatedLocations) {
        pts.push({
          lat: loc.latitude,
          lng: loc.longitude,
          label: loc.label,
          isPrimary: false,
          caseId: c.id,
          caseTitle: c.title,
        });
      }
    }
    return pts;
  }, [cases]);

  const arcs = useMemo<RouteArc[]>(() => {
    const list: RouteArc[] = [];
    for (const c of cases) {
      for (const loc of c.relatedLocations) {
        list.push({
          startLat: c.primaryLocation.latitude,
          startLng: c.primaryLocation.longitude,
          endLat: loc.latitude,
          endLng: loc.longitude,
          caseId: c.id,
          selected: c.id === selectedId,
        });
      }
    }
    return list;
  }, [cases, selectedId]);

  const globeMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color("#1f1a13"),
      shininess: 2,
    });
  }, []);

  function stopAutoRotate() {
    if (hasInteracted.current) return;
    hasInteracted.current = true;
    const controls = globeRef.current?.controls();
    if (controls) controls.autoRotate = false;
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-sm border border-border bg-paper-raised"
      onPointerDown={stopAutoRotate}
      onWheel={stopAutoRotate}
      role="img"
      aria-label="An interactive 3D globe. Each case has a marker at its approximate point of origin. A curved arc links a marker to any related place along its route of travel, adoption, or resistance. Drag to rotate, scroll to zoom, and select a case from the list to fly to it."
    >
      <GlobeGL
        ref={globeRef}
        width={size.width}
        height={size.height}
        backgroundColor="rgba(0,0,0,0)"
        globeMaterial={globeMaterial}
        showAtmosphere
        atmosphereColor="#c9a24c"
        atmosphereAltitude={0.12}
        showGraticules
        polygonsData={landPolygons}
        polygonCapColor={() => "#4a4128"}
        polygonSideColor={() => "#332c1f"}
        polygonStrokeColor={() => "#16130f"}
        polygonAltitude={0.006}
        polygonsTransitionDuration={0}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.012}
        pointRadius={(d: object) => ((d as RoutePoint).isPrimary ? ((d as RoutePoint).caseId === selectedId ? 0.55 : 0.4) : 0.22)}
        pointColor={(d: object) => {
          const p = d as RoutePoint;
          if (p.isPrimary) return p.caseId === selectedId ? "#e0b95c" : "#4d6e58";
          return "#a1926e";
        }}
        pointLabel={(d: object) => {
          const p = d as RoutePoint;
          return tooltipHtml(p.caseTitle, p.label);
        }}
        pointsTransitionDuration={300}
        onPointClick={(d: object) => onSelect((d as RoutePoint).caseId)}
        arcsData={arcs}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor={(d: object) => ((d as RouteArc).selected ? "#e0b95c" : "#4a4128")}
        arcAltitudeAutoScale={0.3}
        arcStroke={(d: object) => ((d as RouteArc).selected ? 0.4 : 0.25)}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={(d: object) => ((d as RouteArc).selected ? 2500 : 0)}
        arcsTransitionDuration={300}
        onArcClick={(d: object) => onSelect((d as RouteArc).caseId)}
        enablePointerInteraction
        onGlobeReady={() => {
          const controls = globeRef.current?.controls();
          if (controls) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.35;
          }
          globeRef.current?.pointOfView({ lat: 15, lng: 10, altitude: DEFAULT_ALTITUDE }, 0);
        }}
      />
    </div>
  );
}
