import { useState } from "react";
import {
  ArrowUpRight,
  Compass,
  LocateFixed,
  MapPin,
  Minus,
  Plus,
  Utensils,
  Waves,
} from "lucide-react";
import boundaries from "./data/boundaries.json";
import type { Spot } from "./data/spots";
import { categoryLabel } from "./data/spots";
import { SpotArt } from "./Art";

const project = ([lon, lat]: number[]) => [
  (lon - 139.55) * 240 + 5,
  (41.72 - lat) * 310 + 10,
];
const paths = boundaries.map((feature) => ({
  name: feature.name,
  path: feature.polygons
    .map((polygon) =>
      polygon
        .map(
          (ring) =>
            ring
              .map(
                (point, i) =>
                  `${i ? "L" : "M"}${project(point)
                    .map((n) => n.toFixed(1))
                    .join(",")}`,
              )
              .join("") + "Z",
        )
        .join(""),
    )
    .join(""),
}));
const mapLabels = [
  { name: "青森", coordinates: [140.74, 40.82], dx: -39, dy: 4 },
  { name: "弘前", coordinates: [140.47, 40.6], dx: -35, dy: 7 },
  { name: "八戸", coordinates: [141.49, 40.51], dx: 17, dy: 7 },
  { name: "むつ", coordinates: [141.21, 41.29], dx: 0, dy: 17 },
  { name: "五所川原", coordinates: [140.44, 40.8], dx: -37, dy: 0 },
];

export default function AreaMap({
  spots,
  selected,
  onSelect,
  onOpen,
}: {
  spots: Spot[];
  selected?: Spot;
  onSelect: (spot: Spot) => void;
  onOpen: (spot: Spot) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const center = selected ? project(selected.coordinates) : [280, 280];
  const offsetX = zoom === 1 ? 0 : 280 - center[0] * zoom;
  const offsetY = zoom === 1 ? 0 : 280 - center[1] * zoom;
  return (
    <aside className="map-panel" aria-label="青森県のスポット地図">
      <div className="map-heading">
        <div>
          <span className="eyebrow">AOMORI AREA MAP</span>
          <h3>地図から、よりみち。</h3>
        </div>
        <span className="map-heading-icon">
          <Compass size={23} strokeWidth={1.4} />
        </span>
      </div>
      <div className="map-canvas">
        <div className="map-region">
          <span className="status-dot" /> 青森県{" "}
          <span className="map-spot-count">{spots.length} SPOTS</span>
        </div>
        <svg
          viewBox="0 0 560 560"
          className="area-map"
          aria-label="青森県の県境とスポットの位置"
          role="group"
        >
          <defs>
            <pattern
              id="map-dots"
              width="15"
              height="15"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r=".7" fill="#acbcb4" opacity=".4" />
            </pattern>
          </defs>
          <path d="M0 0h560v560H0Z" fill="#e6eeea" />
          <path d="M0 0h560v560H0Z" fill="url(#map-dots)" />
          <g
            transform={`translate(${offsetX} ${offsetY}) scale(${zoom})`}
            className="map-geography"
          >
            {paths.map((feature) => (
              <path
                key={feature.name}
                d={feature.path}
                fill={feature.name === "青森県" ? "#f9faf2" : "#e0e5d8"}
                stroke="#b8c8b7"
                strokeWidth={1.1 / zoom}
                strokeLinejoin="round"
              />
            ))}
            <ellipse
              cx="329"
              cy="403"
              rx="10"
              ry="8"
              transform="rotate(-22 329 403)"
              fill="#b8d3cc"
            />
            <text x="68" y="228" className="sea-label">
              日本海
            </text>
            <text x="467" y="259" className="sea-label">
              太平洋
            </text>
            <text x="287" y="240" className="sea-label small-label">
              陸奥湾
            </text>
            <text x="244" y="84" className="sea-label small-label">
              津軽海峡
            </text>
            <text x="108" y="18" className="neighbor-label">
              北海道
            </text>
            <text x="202" y="539" className="neighbor-label">
              秋田県
            </text>
            <text x="442" y="533" className="neighbor-label">
              岩手県
            </text>
            <text x="186" y="307" className="region-label">
              津軽
            </text>
            <text x="383" y="166" className="region-label">
              下北
            </text>
            <text x="366" y="407" className="region-label">
              南部
            </text>
            {mapLabels.map((label) => {
              const [x, y] = project(label.coordinates);
              return (
                <g key={label.name}>
                  <circle cx={x} cy={y} r="2" fill="#9aab91" />
                  <text
                    x={x + label.dx}
                    y={y + label.dy}
                    className="city-label"
                  >
                    {label.name}
                  </text>
                </g>
              );
            })}
            {spots.map((spot, i) => {
              const point = project(spot.coordinates);
              // Spread the two adjacent Aomori-city markers so each remains selectable.
              const x =
                point[0] +
                (spot.id === "nokke" ? -10 : spot.id === "warasse" ? 10 : 0);
              const y =
                point[1] +
                (spot.id === "nokke" ? 12 : spot.id === "warasse" ? -12 : 0);
              const active = selected?.id === spot.id;
              const Icon =
                spot.category === "food"
                  ? Utensils
                  : spot.category === "onsen"
                    ? Waves
                    : MapPin;
              return (
                <g key={spot.id} transform={`translate(${x} ${y})`}>
                  <g
                    className={`map-marker ${spot.category} ${active ? "is-selected" : ""}`}
                    transform={`scale(${1 / zoom})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${spot.name}を地図で選択`}
                    aria-pressed={active}
                    onClick={() => onSelect(spot)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onSelect(spot);
                      }
                    }}
                  >
                    {active && <circle className="marker-halo" r="25" />}
                    <path
                      className="marker-shape"
                      d="M0 23 7 12a18 18 0 1 0-14 0Z"
                    />
                    <Icon
                      x={-7}
                      y={-13}
                      width={14}
                      height={14}
                      strokeWidth={2}
                    />
                    <title>
                      {i + 1}. {spot.name}
                    </title>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
        <div className="north-mark">
          <span>N</span>
          <svg viewBox="0 0 16 22" width="13" height="19" aria-hidden="true">
            <path d="m8 1 6 19-6-5-6 5Z" fill="#53715f" />
            <path d="M8 1v14l6 5Z" fill="#abc1ad" />
          </svg>
        </div>
        <div className="map-controls">
          <button
            type="button"
            aria-label="地図を拡大"
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.5))}
            disabled={zoom >= 2.5}
          >
            <Plus size={18} />
          </button>
          <button
            type="button"
            aria-label="地図を縮小"
            onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
            disabled={zoom <= 1}
          >
            <Minus size={18} />
          </button>
          <button
            type="button"
            aria-label="地図を全体表示"
            onClick={() => setZoom(1)}
          >
            <LocateFixed size={17} />
          </button>
        </div>
        <span className="map-scale">エリアの位置は目安です</span>
      </div>
      <div className="map-preview" aria-live="polite">
        {selected ? (
          <button
            className="map-preview-button"
            type="button"
            onClick={() => onOpen(selected)}
          >
            <SpotArt type={selected.artwork} />
            <span className="map-preview-copy">
              <span className={`mini-category ${selected.category}`}>
                {categoryLabel(selected.category)}
              </span>
              <strong>{selected.name}</strong>
              <span>
                <MapPin size={11} />
                {selected.municipality}
              </span>
            </span>
            <span className="preview-arrow">
              <ArrowUpRight size={21} />
            </span>
          </button>
        ) : (
          <div className="map-empty">
            <MapPin size={20} />
            <span>条件に合うスポットがここに表示されます</span>
          </div>
        )}
      </div>
      <div className="map-legend">
        <span>
          <i className="legend-dot sightseeing" /> 観光
        </span>
        <span>
          <i className="legend-dot food" /> 食事
        </span>
        <span>
          <i className="legend-dot onsen" /> 温泉
        </span>
        <span className="map-credit">地球地図日本 / dataofjapan</span>
      </div>
    </aside>
  );
}
