import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  GolfHole,
  LatLngLiteral,
  TeeOption,
  Hazard,
  StrategyType,
  PracticeShotResult,
} from '../types/golf';
import { calculateDistanceYards, calculateBearing, createGeoJSONCircle } from '../utils/geo';
import { Language, UnitSystem, formatDistance } from '../utils/i18n';
import {
  Layers,
  Mountain,
  Compass,
  Crosshair,
  Flag,
  Target,
  Shield,
  Zap,
  RotateCcw,
  Sparkles,
  MapPin,
  Check,
} from 'lucide-react';

export type FreeMapLayerType = 'satellite' | 'osm' | 'topo';

interface GolfFreeMapProps {
  hole: GolfHole;
  selectedTee: TeeOption;
  targetPosition: LatLngLiteral;
  onSetTarget: (pos: LatLngLiteral) => void;
  showRings: boolean;
  onToggleRings: () => void;
  showFlightArc: boolean;
  onToggleFlightArc: () => void;
  showHazards: boolean;
  onToggleHazards: () => void;
  is3DMode: boolean;
  onToggle3DMode: () => void;
  onSelectHazard?: (hazard: Hazard) => void;
  strategy?: StrategyType;
  layupPosition?: LatLngLiteral;
  onSetLayupPosition?: (pos: LatLngLiteral) => void;
  activeEditingShot?: 1 | 2;
  practiceShotResult?: PracticeShotResult | null;
  isHittingPracticeShot?: boolean;
  onPracticeHitComplete?: () => void;
  isPracticeMode?: boolean;
  onTogglePracticeMode?: () => void;
  practiceBallPos?: LatLngLiteral;
  practiceAimPos?: LatLngLiteral;
  onSetPracticeAimPos?: (pos: LatLngLiteral) => void;
  practiceShotNumber?: number;
  practiceShotHistory?: PracticeShotResult[];
  activeMobilePanel?: 'planner' | 'caddie' | 'camera' | 'overlays' | null;
  onSetActiveMobilePanel?: (panel: 'planner' | 'caddie' | 'camera' | 'overlays' | null) => void;
  isSinglePanelMode?: boolean;
  lang?: Language;
  unitSystem?: UnitSystem;
}

// Free Tile Sources (100% free, no API key required)
const TILE_SOURCES: Record<FreeMapLayerType, { nameFr: string; nameEn: string; tiles: string[]; maxzoom: number; attribution: string }> = {
  satellite: {
    nameFr: 'Satellite Esri HD',
    nameEn: 'Esri Satellite HD',
    tiles: [
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    ],
    maxzoom: 19,
    attribution: '© Esri, Maxar, Earthstar Geographics',
  },
  osm: {
    nameFr: 'OpenStreetMap',
    nameEn: 'OpenStreetMap',
    tiles: [
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    ],
    maxzoom: 19,
    attribution: '© OpenStreetMap contributors',
  },
  topo: {
    nameFr: 'Topographie Relief',
    nameEn: 'Topographic Relief',
    tiles: [
      'https://tile.opentopomap.org/{z}/{x}/{y}.png',
    ],
    maxzoom: 17,
    attribution: '© OpenTopoMap contributors',
  },
};

export const GolfFreeMap: React.FC<GolfFreeMapProps> = ({
  hole,
  selectedTee,
  targetPosition,
  onSetTarget,
  showRings,
  onToggleRings,
  showFlightArc,
  onToggleFlightArc,
  showHazards,
  onToggleHazards,
  is3DMode,
  onToggle3DMode,
  onSelectHazard,
  strategy = '2-shot',
  layupPosition,
  onSetLayupPosition,
  activeEditingShot = 1,
  practiceShotResult,
  isHittingPracticeShot = false,
  onPracticeHitComplete,
  isPracticeMode = false,
  onTogglePracticeMode,
  practiceBallPos,
  practiceAimPos,
  onSetPracticeAimPos,
  practiceShotNumber = 1,
  practiceShotHistory = [],
  activeMobilePanel = null,
  onSetActiveMobilePanel,
  isSinglePanelMode = false,
  lang = 'fr',
  unitSystem = 'metric',
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  // Active Map Layer type
  const [mapLayer, setMapLayer] = useState<FreeMapLayerType>('satellite');
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

  // Markers refs
  const teeMarkerRef = useRef<maplibregl.Marker | null>(null);
  const targetMarkerRef = useRef<maplibregl.Marker | null>(null);
  const pinMarkerRef = useRef<maplibregl.Marker | null>(null);
  const layupMarkerRef = useRef<maplibregl.Marker | null>(null);
  const hazardMarkersRef = useRef<maplibregl.Marker[]>([]);
  const practiceBallMarkerRef = useRef<maplibregl.Marker | null>(null);
  const practiceAimMarkerRef = useRef<maplibregl.Marker | null>(null);

  // Animation state for Practice Shot
  const animFrameIdRef = useRef<number | null>(null);

  // Distances calculations
  const teeToTargetDist = calculateDistanceYards(selectedTee.position, targetPosition);
  const targetToPinDist = calculateDistanceYards(targetPosition, hole.pinPosition);
  const teeToPinDist = calculateDistanceYards(selectedTee.position, hole.pinPosition);
  const teeToLayupDist = layupPosition ? calculateDistanceYards(selectedTee.position, layupPosition) : 0;
  const layupToTargetDist = layupPosition ? calculateDistanceYards(layupPosition, targetPosition) : 0;
  const isTargetAtPin = Math.abs(targetPosition.lat - hole.pinPosition.lat) < 0.00004 && Math.abs(targetPosition.lng - hole.pinPosition.lng) < 0.00004;

  // Build style object for MapLibre
  const getMapStyle = (layerType: FreeMapLayerType): maplibregl.StyleSpecification => {
    const config = TILE_SOURCES[layerType];
    return {
      version: 8,
      sources: {
        'raster-tiles': {
          type: 'raster',
          tiles: config.tiles,
          tileSize: 256,
          maxzoom: config.maxzoom,
          attribution: config.attribution,
        },
      },
      layers: [
        {
          id: 'raster-layer',
          type: 'raster',
          source: 'raster-tiles',
          minzoom: 0,
          maxzoom: 22,
        },
      ],
    };
  };

  // Initialize MapLibre GL instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialPitch = is3DMode ? 65 : 0;
    const initialBearing = is3DMode ? hole.defaultHeading : 0;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: getMapStyle('satellite'),
      center: [hole.defaultCenter.lng, hole.defaultCenter.lat],
      zoom: 17.6,
      pitch: initialPitch,
      bearing: initialBearing,
      maxPitch: 85,
      attributionControl: false,
    });

    // Add navigation controls (zoom, compass)
    map.addControl(
      new maplibregl.NavigationControl({
        visualizePitch: true,
        showCompass: true,
      }),
      'bottom-right'
    );

    // Click handler on map
    map.on('click', (e) => {
      const clickedPos = { lat: e.lngLat.lat, lng: e.lngLat.lng };

      if (isPracticeMode && onSetPracticeAimPos) {
        onSetPracticeAimPos(clickedPos);
        return;
      }

      if (strategy === '3-shot') {
        if (activeEditingShot === 1 && onSetLayupPosition) {
          onSetLayupPosition(clickedPos);
        } else {
          onSetTarget(clickedPos);
        }
      } else {
        onSetTarget(clickedPos);
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Sync hole changes (fly to new hole center, heading and zoom)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.flyTo({
      center: [hole.defaultCenter.lng, hole.defaultCenter.lat],
      zoom: 17.6,
      pitch: is3DMode ? 65 : 0,
      bearing: is3DMode ? hole.defaultHeading : 0,
      duration: 1200,
      essential: true,
    });
  }, [hole.id]);

  // Sync 2D / 3D mode pitch & bearing
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.easeTo({
      pitch: is3DMode ? 65 : 0,
      bearing: is3DMode ? hole.defaultHeading : 0,
      duration: 900,
    });
  }, [is3DMode, hole.defaultHeading]);

  // Switch map tile layer
  const handleSelectLayer = (type: FreeMapLayerType) => {
    setMapLayer(type);
    setIsLayerMenuOpen(false);
    const map = mapRef.current;
    if (!map) return;
    map.setStyle(getMapStyle(type));
  };

  // Update Trajectory and Distance Rings GeoJSON layers
  const updateVectorLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    // 1. Trajectory Shot 1 line
    let shot1Coords: [number, number][] = [];
    if (showFlightArc && !isPracticeMode) {
      if (strategy === '3-shot' && layupPosition) {
        shot1Coords = [
          [selectedTee.position.lng, selectedTee.position.lat],
          [layupPosition.lng, layupPosition.lat],
        ];
      } else {
        shot1Coords = [
          [selectedTee.position.lng, selectedTee.position.lat],
          [targetPosition.lng, targetPosition.lat],
        ];
      }
    }

    // 2. Trajectory Shot 2 line
    let shot2Coords: [number, number][] = [];
    if (showFlightArc && !isPracticeMode) {
      if (strategy === '3-shot' && layupPosition) {
        shot2Coords = [
          [layupPosition.lng, layupPosition.lat],
          [targetPosition.lng, targetPosition.lat],
        ];
      } else {
        shot2Coords = [
          [targetPosition.lng, targetPosition.lat],
          [hole.pinPosition.lng, hole.pinPosition.lat],
        ];
      }
    }

    // 3. Distance rings around Pin
    const ringsFeatures: GeoJSON.Feature[] = [];
    if (showRings) {
      const ringDistances = [50, 100, 150, 200];
      ringDistances.forEach((dist) => {
        const ringCoords = createGeoJSONCircle(hole.pinPosition, dist);
        ringsFeatures.push({
          type: 'Feature',
          properties: { distance: dist, label: `${dist}y` },
          geometry: {
            type: 'LineString',
            coordinates: ringCoords,
          },
        });
      });
    }

    // 4. Update Sources in MapLibre
    const trajectorySource = map.getSource('trajectory-source') as maplibregl.GeoJSONSource;
    if (trajectorySource) {
      trajectorySource.setData({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { shot: 'shot1' },
            geometry: { type: 'LineString', coordinates: shot1Coords },
          },
          {
            type: 'Feature',
            properties: { shot: 'shot2' },
            geometry: { type: 'LineString', coordinates: shot2Coords },
          },
        ],
      });
    } else {
      map.addSource('trajectory-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { shot: 'shot1' },
              geometry: { type: 'LineString', coordinates: shot1Coords },
            },
            {
              type: 'Feature',
              properties: { shot: 'shot2' },
              geometry: { type: 'LineString', coordinates: shot2Coords },
            },
          ],
        },
      });

      // Layer for Shot 1 (Primary Arc)
      map.addLayer({
        id: 'trajectory-shot1-glow',
        type: 'line',
        source: 'trajectory-source',
        filter: ['==', ['get', 'shot'], 'shot1'],
        paint: {
          'line-color': '#8FB062',
          'line-width': 6,
          'line-opacity': 0.4,
        },
      });

      map.addLayer({
        id: 'trajectory-shot1-line',
        type: 'line',
        source: 'trajectory-source',
        filter: ['==', ['get', 'shot'], 'shot1'],
        paint: {
          'line-color': '#FFFFFF',
          'line-width': 3.5,
          'line-dasharray': [2, 2],
        },
      });

      // Layer for Shot 2
      map.addLayer({
        id: 'trajectory-shot2-glow',
        type: 'line',
        source: 'trajectory-source',
        filter: ['==', ['get', 'shot'], 'shot2'],
        paint: {
          'line-color': '#C2921D',
          'line-width': 5,
          'line-opacity': 0.4,
        },
      });

      map.addLayer({
        id: 'trajectory-shot2-line',
        type: 'line',
        source: 'trajectory-source',
        filter: ['==', ['get', 'shot'], 'shot2'],
        paint: {
          'line-color': '#FFD700',
          'line-width': 3,
          'line-dasharray': [1.5, 2],
        },
      });
    }

    // Rings Source & Layer
    const ringsSource = map.getSource('rings-source') as maplibregl.GeoJSONSource;
    if (ringsSource) {
      ringsSource.setData({
        type: 'FeatureCollection',
        features: ringsFeatures,
      });
    } else {
      map.addSource('rings-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: ringsFeatures,
        },
      });

      map.addLayer({
        id: 'rings-layer',
        type: 'line',
        source: 'rings-source',
        paint: {
          'line-color': '#C2B280',
          'line-width': 1.8,
          'line-opacity': 0.65,
          'line-dasharray': [3, 2],
        },
      });
    }
  }, [
    showFlightArc,
    isPracticeMode,
    strategy,
    layupPosition,
    selectedTee.position,
    targetPosition,
    hole.pinPosition,
    showRings,
  ]);

  // Re-run vector layers update when map style finishes loading
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (map.isStyleLoaded()) {
      updateVectorLayers();
    } else {
      map.once('style.load', updateVectorLayers);
    }
  }, [mapLayer, updateVectorLayers]);

  // Render / Update HTML Markers (Tee, Pin, Target, Layup, Hazards)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // 1. Tee Marker
    if (!teeMarkerRef.current) {
      const el = document.createElement('div');
      el.className = 'cursor-pointer transform hover:scale-110 transition-transform';
      el.innerHTML = `
        <div style="background-color: #152014; color: #8FB062; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; border: 1.5px solid #8FB062; box-shadow: 0 4px 10px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 4px; white-space: nowrap;">
          <span style="width: 7px; height: 7px; border-radius: 50%; background-color: #8FB062; display: inline-block;"></span>
          <span>TEE (${formatDistance(hole.yardage, unitSystem)})</span>
        </div>
      `;
      teeMarkerRef.current = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([selectedTee.position.lng, selectedTee.position.lat])
        .addTo(map);
    } else {
      teeMarkerRef.current.setLngLat([selectedTee.position.lng, selectedTee.position.lat]);
    }

    // 2. Pin / Flag Marker
    if (!pinMarkerRef.current) {
      const el = document.createElement('div');
      el.className = 'cursor-pointer transform hover:scale-110 transition-transform';
      el.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="background-color: #A85832; color: #FFFFFF; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; border: 1.5px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.6); display: flex; align-items: center; gap: 4px; white-space: nowrap;">
            <span>🚩</span>
            <span>${strategy === '3-shot' ? 'PAR' : 'BIRDIE'}</span>
          </div>
          <div style="width: 2px; height: 18px; background-color: #FFFFFF; box-shadow: 0 0 4px rgba(0,0,0,0.8);"></div>
          <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #8FB062; border: 2px solid white; margin-top: -3px;"></div>
        </div>
      `;
      pinMarkerRef.current = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([hole.pinPosition.lng, hole.pinPosition.lat])
        .addTo(map);
    } else {
      pinMarkerRef.current.setLngLat([hole.pinPosition.lng, hole.pinPosition.lat]);
    }

    // 3. Target / Landing Point Marker
    if (!isPracticeMode) {
      const targetLabel = strategy === '3-shot' && activeEditingShot === 1
        ? `LAYUP (${formatDistance(teeToLayupDist, unitSystem)})`
        : `CIBLE (${formatDistance(teeToTargetDist, unitSystem)})`;

      if (!targetMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'cursor-pointer transform hover:scale-110 transition-transform';
        el.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="background-color: #1B291A; color: #FFD700; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; border: 1.5px solid #FFD700; box-shadow: 0 4px 12px rgba(0,0,0,0.6); display: flex; align-items: center; gap: 4px; white-space: nowrap;">
              <span>🎯</span>
              <span id="target-badge-label">${targetLabel}</span>
            </div>
            <div style="width: 14px; height: 14px; border-radius: 50%; background-color: #D4A31C; border: 2.5px solid white; box-shadow: 0 0 10px #FFD700; margin-top: 2px; animation: pulse 1.5s infinite;"></div>
          </div>
        `;
        targetMarkerRef.current = new maplibregl.Marker({ element: el, anchor: 'center', draggable: true })
          .setLngLat([targetPosition.lng, targetPosition.lat])
          .addTo(map);

        targetMarkerRef.current.on('dragend', () => {
          if (!targetMarkerRef.current) return;
          const pos = targetMarkerRef.current.getLngLat();
          onSetTarget({ lat: pos.lat, lng: pos.lng });
        });
      } else {
        targetMarkerRef.current.setLngLat([targetPosition.lng, targetPosition.lat]);
        const badgeLabel = document.getElementById('target-badge-label');
        if (badgeLabel) badgeLabel.textContent = targetLabel;
      }
    } else if (targetMarkerRef.current) {
      targetMarkerRef.current.remove();
      targetMarkerRef.current = null;
    }

    // 4. Layup Marker (for 3-shot strategy)
    if (strategy === '3-shot' && layupPosition && !isPracticeMode) {
      if (!layupMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'cursor-pointer transform hover:scale-110 transition-transform';
        el.innerHTML = `
          <div style="background-color: #1B291A; color: #8FB062; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 9999px; border: 1.5px solid #8FB062; box-shadow: 0 3px 8px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 4px;">
            <span>🛡️</span>
            <span>1. LAYUP (${formatDistance(teeToLayupDist, unitSystem)})</span>
          </div>
        `;
        layupMarkerRef.current = new maplibregl.Marker({ element: el, anchor: 'center', draggable: true })
          .setLngLat([layupPosition.lng, layupPosition.lat])
          .addTo(map);

        layupMarkerRef.current.on('dragend', () => {
          if (!layupMarkerRef.current || !onSetLayupPosition) return;
          const pos = layupMarkerRef.current.getLngLat();
          onSetLayupPosition({ lat: pos.lat, lng: pos.lng });
        });
      } else {
        layupMarkerRef.current.setLngLat([layupPosition.lng, layupPosition.lat]);
      }
    } else if (layupMarkerRef.current) {
      layupMarkerRef.current.remove();
      layupMarkerRef.current = null;
    }

    // 5. Hazard Markers
    hazardMarkersRef.current.forEach((m) => m.remove());
    hazardMarkersRef.current = [];

    if (showHazards) {
      hole.hazards.forEach((h) => {
        const isWater = h.type === 'water' || h.type === 'ocean';
        const isBunker = h.type === 'bunker';
        const el = document.createElement('div');
        el.className = 'cursor-pointer group transform hover:scale-115 transition-transform';

        const iconSymbol = isWater ? '🌊' : isBunker ? '🏖️' : '⚠️';
        const badgeBg = isWater ? '#1E3A8A' : isBunker ? '#B45309' : '#991B1B';

        el.innerHTML = `
          <div style="background-color: ${badgeBg}; color: white; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.7); box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; gap: 3px; white-space: nowrap;">
            <span>${iconSymbol}</span>
            <span>${lang === 'fr' && h.nameFr ? h.nameFr : h.name}</span>
          </div>
        `;

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          onSelectHazard?.(h);
        });

        const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat([h.position.lng, h.position.lat])
          .addTo(map);

        hazardMarkersRef.current.push(marker);
      });
    }
  }, [
    hole.id,
    selectedTee.position,
    targetPosition,
    hole.pinPosition,
    layupPosition,
    strategy,
    showHazards,
    isPracticeMode,
    activeEditingShot,
    lang,
    unitSystem,
  ]);

  // Practice Shot Simulation Animation
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isPracticeMode || !isHittingPracticeShot || !practiceShotResult) return;

    const traj = practiceShotResult.trajectory;
    if (!traj || traj.length < 2) {
      onPracticeHitComplete?.();
      return;
    }

    let currentIndex = 0;
    const totalFrames = traj.length;

    // Create or update animated ball marker
    if (!practiceBallMarkerRef.current) {
      const el = document.createElement('div');
      el.innerHTML = `
        <div style="width: 14px; height: 14px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #ffffff, #d4d4d8 60%, #71717a 100%); border: 1px solid #27272a; box-shadow: 0 4px 12px rgba(0,0,0,0.7);"></div>
      `;
      practiceBallMarkerRef.current = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([traj[0].lng, traj[0].lat])
        .addTo(map);
    }

    const animateFlight = () => {
      currentIndex += 1;
      if (currentIndex >= totalFrames) {
        if (practiceBallMarkerRef.current) {
          practiceBallMarkerRef.current.setLngLat([traj[totalFrames - 1].lng, traj[totalFrames - 1].lat]);
        }
        onPracticeHitComplete?.();
        return;
      }

      const point = traj[currentIndex];
      if (practiceBallMarkerRef.current) {
        practiceBallMarkerRef.current.setLngLat([point.lng, point.lat]);
      }

      animFrameIdRef.current = requestAnimationFrame(animateFlight);
    };

    animFrameIdRef.current = requestAnimationFrame(animateFlight);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isHittingPracticeShot, practiceShotResult, isPracticeMode]);

  // Clean up practice ball marker on mode exit
  useEffect(() => {
    if (!isPracticeMode && practiceBallMarkerRef.current) {
      practiceBallMarkerRef.current.remove();
      practiceBallMarkerRef.current = null;
    }
  }, [isPracticeMode]);

  // Camera preset actions
  const handleCameraPreset = (preset: 'tee' | 'green' | 'pin' | 'full') => {
    const map = mapRef.current;
    if (!map) return;

    if (preset === 'full') {
      map.flyTo({
        center: [hole.defaultCenter.lng, hole.defaultCenter.lat],
        zoom: 17.6,
        pitch: is3DMode ? 65 : 0,
        bearing: is3DMode ? hole.defaultHeading : 0,
        duration: 1000,
      });
    } else if (preset === 'tee') {
      map.flyTo({
        center: [selectedTee.position.lng, selectedTee.position.lat],
        zoom: 19.2,
        pitch: 50,
        bearing: calculateBearing(selectedTee.position, hole.pinPosition),
        duration: 1000,
      });
    } else if (preset === 'green' || preset === 'pin') {
      map.flyTo({
        center: [hole.pinPosition.lng, hole.pinPosition.lat],
        zoom: 19.4,
        pitch: 60,
        bearing: hole.defaultHeading,
        duration: 1000,
      });
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#131E12]">
      {/* MapLibre WebGL Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Left: Free Map Provider Badge & Layer Switcher */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-[#152014]/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#364D34] text-xs text-[#F1EDE2] shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#8FB062] inline-block animate-pulse" />
          <span className="font-bold text-[#8FB062]">
            {lang === 'fr' ? 'Service Gratuit' : 'Free Open Service'} :
          </span>
          <span className="text-[#A8B89F] truncate max-w-[170px] sm:max-w-none">
            {lang === 'fr' ? TILE_SOURCES[mapLayer].nameFr : TILE_SOURCES[mapLayer].nameEn}
          </span>
        </div>

        {/* Layer Selector Pill */}
        <div className="relative">
          <button
            onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
            className="flex items-center gap-1.5 bg-[#1B291A]/95 hover:bg-[#253A23] backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#364D34] text-xs font-bold text-[#F1EDE2] cursor-pointer transition shadow-md"
            title="Changer le fond de carte gratuit"
          >
            <Layers className="w-3.5 h-3.5 text-[#8FB062]" />
            <span>{lang === 'fr' ? 'Fond de Carte' : 'Map Tiles'}</span>
          </button>

          {isLayerMenuOpen && (
            <div className="absolute top-full left-0 mt-1.5 bg-[#152014] border border-[#364D34] rounded-2xl p-1.5 shadow-2xl flex flex-col gap-1 w-44 z-30 animate-in fade-in zoom-in-95 duration-150">
              {(['satellite', 'osm', 'topo'] as FreeMapLayerType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleSelectLayer(type)}
                  className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between text-left transition cursor-pointer ${
                    mapLayer === type
                      ? 'bg-[#8FB062] text-[#142314] font-bold'
                      : 'text-[#F1EDE2]/80 hover:bg-white/10'
                  }`}
                >
                  <span>{lang === 'fr' ? TILE_SOURCES[type].nameFr : TILE_SOURCES[type].nameEn}</span>
                  {mapLayer === type && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Right: Overlays & Camera Presets */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2 pointer-events-auto">
        {/* 2D / 3D Mode Toggle Pill */}
        <button
          onClick={onToggle3DMode}
          className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-bold transition shadow-xl cursor-pointer border ${
            is3DMode
              ? 'bg-[#8FB062] text-[#152014] border-[#8FB062] ring-2 ring-[#8FB062]/50'
              : 'bg-[#152014]/90 backdrop-blur-md text-[#F1EDE2] hover:bg-[#253A23] border-[#364D34]'
          }`}
          title={is3DMode ? 'Passer en vue 2D' : 'Passer en vue 3D inclinée'}
        >
          {is3DMode ? <Layers className="w-4 h-4 text-[#152014]" /> : <Mountain className="w-4 h-4 text-[#8FB062]" />}
          <span>{is3DMode ? 'Vue 3D Perspective' : 'Vue 2D Aérienne'}</span>
        </button>

        {/* Quick Camera Presets */}
        <div className="flex items-center gap-1 bg-[#152014]/90 backdrop-blur-md p-1 rounded-2xl border border-[#364D34] shadow-xl text-xs">
          <button
            onClick={() => handleCameraPreset('full')}
            className="p-1.5 px-2 rounded-xl text-[#F1EDE2]/80 hover:text-white hover:bg-white/10 transition cursor-pointer font-bold"
            title="Vue d'ensemble du trou"
          >
            Hole
          </button>
          <button
            onClick={() => handleCameraPreset('tee')}
            className="p-1.5 px-2 rounded-xl text-[#F1EDE2]/80 hover:text-white hover:bg-white/10 transition cursor-pointer font-bold"
            title="Vue du départ"
          >
            Tee
          </button>
          <button
            onClick={() => handleCameraPreset('green')}
            className="p-1.5 px-2 rounded-xl text-[#F1EDE2]/80 hover:text-white hover:bg-white/10 transition cursor-pointer font-bold"
            title="Vue du green"
          >
            Green
          </button>
        </div>

        {/* Layer Toggles Pills */}
        <div className="flex items-center gap-1.5 bg-[#152014]/90 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-[#364D34] shadow-xl text-xs font-semibold text-[#F1EDE2]">
          <button
            onClick={onToggleFlightArc}
            className={`px-2 py-1 rounded-xl text-[11px] transition cursor-pointer ${
              showFlightArc ? 'bg-[#8FB062]/30 text-[#8FB062] font-bold' : 'text-[#A8B89F] hover:text-white'
            }`}
          >
            Arc
          </button>
          <button
            onClick={onToggleRings}
            className={`px-2 py-1 rounded-xl text-[11px] transition cursor-pointer ${
              showRings ? 'bg-[#8FB062]/30 text-[#8FB062] font-bold' : 'text-[#A8B89F] hover:text-white'
            }`}
          >
            Rings
          </button>
          <button
            onClick={onToggleHazards}
            className={`px-2 py-1 rounded-xl text-[11px] transition cursor-pointer ${
              showHazards ? 'bg-[#8FB062]/30 text-[#8FB062] font-bold' : 'text-[#A8B89F] hover:text-white'
            }`}
          >
            Hazards
          </button>
        </div>
      </div>
    </div>
  );
};
