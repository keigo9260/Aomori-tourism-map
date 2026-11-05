import { useId } from "react";
import type { Artwork } from "./data/spots";

export function HeroArt() {
  return (
    <svg
      className="hero-art"
      viewBox="0 0 740 380"
      role="img"
      aria-label="青森の山々、湖、森を描いたイラスト"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="hero-sky" x2="0" y2="1">
          <stop stopColor="#e4ebdd" />
          <stop offset="1" stopColor="#f2edd8" />
        </linearGradient>
        <linearGradient id="hero-water" x2="0.7" y2="1">
          <stop stopColor="#9abfc0" />
          <stop offset="1" stopColor="#477f83" />
        </linearGradient>
        <pattern
          id="hero-grain"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r=".6" fill="#fff" opacity=".16" />
          <circle cx="5" cy="5" r=".5" fill="#1b4c3a" opacity=".07" />
        </pattern>
      </defs>
      <path fill="url(#hero-sky)" d="M0 0h740v380H0z" />
      <circle cx="525" cy="94" r="43" fill="#e6a67b" />
      <path
        d="M355 83h65m-38 9h61m122 22h70"
        stroke="#fffdf0"
        strokeWidth="5"
        strokeLinecap="round"
        opacity=".65"
      />
      <path
        d="M0 213 91 139 152 170 266 61 365 153 425 123 532 192 627 127 740 203V380H0Z"
        fill="#a7b7a3"
      />
      <path
        d="m204 115 62-54 66 61-40-13-24 12-22-18Z"
        fill="#e6e8d9"
        opacity=".9"
      />
      <path
        d="m0 230 98-42 79 32 105-67 116 69 125-52 101 61 116-34v183H0Z"
        fill="#668e7d"
      />
      <path
        d="M0 267c117-41 207-27 312-9s177 6 249-17 127-1 179 28v111H0Z"
        fill="url(#hero-water)"
      />
      <path
        d="M0 269c87-29 124-29 210-20l-51 8 79 15-74 1-28 12-136 7Zm740-12c-89-29-143-18-199 2l35 11-87 23 68-3 40-11 143 9Z"
        fill="#385f4c"
      />
      <path
        d="M231 284h95m19 18h98m-173 13h68m85 20h103m-158 15h71m91-43h47"
        stroke="#d2e1d6"
        strokeWidth="1.5"
        opacity=".55"
        strokeLinecap="round"
      />
      <path
        d="M0 350c98-51 176-48 257 7s208-33 295-21 122 14 188-19v63H0Z"
        fill="#294c3c"
      />
      <path d="M0 355c83-36 132-37 187-8 28 15 44 22 70 33H0Z" fill="#81966a" />
      <path
        d="M0 341c60-12 119-4 171 17"
        fill="none"
        stroke="#b8bb84"
        strokeWidth="4"
      />
      {[
        { x: 51, y: 252, s: 1.2 },
        { x: 101, y: 248, s: 0.9 },
        { x: 151, y: 251, s: 0.7 },
        { x: 652, y: 250, s: 1 },
        { x: 704, y: 257, s: 1.5 },
        { x: 578, y: 260, s: 0.65 },
      ].map(({ x, y, s }, i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path
            d="M0-68-21-26h9L-28-4h56L12-26h9Z"
            fill={i % 2 ? "#284e3c" : "#365f47"}
          />
          <path d="M0-9V5" stroke="#3f5136" strokeWidth="4" />
        </g>
      ))}
      <g fill="none" stroke="#4d5b42" strokeWidth="1.6" opacity=".75">
        <path d="m409 108 7-3 7 3m10-7 7-3 7 3" />
      </g>
      <g transform="translate(593 296)">
        <path d="m-18 0 37 1-8 6h-20Z" fill="#e9bc7a" />
        <path d="m3-20 1 19" stroke="#304a43" strokeWidth="2" />
        <path d="M1-18-10-3H1Z" fill="#f6f0d7" />
      </g>
      <path d="M0 0h740v380H0z" fill="url(#hero-grain)" />
    </svg>
  );
}

export function SpotArt({
  type,
  className = "",
}: {
  type: Artwork;
  className?: string;
}) {
  const id = useId().replaceAll(":", "");
  const food = ["bowl", "seafood", "tuna"].includes(type);
  const bath = ["bath", "forest-bath", "sunset-bath"].includes(type);
  const sky =
    type === "sunset-bath"
      ? "#efd3b3"
      : type === "castle"
        ? "#dce8e5"
        : "#dee9de";
  return (
    <svg
      viewBox="0 0 480 286"
      className={`spot-art ${className}`}
      role="img"
      aria-label="スポットのイメージイラスト"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x2="0" y2="1">
          <stop stopColor={sky} />
          <stop offset="1" stopColor="#f5efd9" />
        </linearGradient>
        <linearGradient id={`${id}-water`} x2=".5" y2="1">
          <stop stopColor={type === "sunset-bath" ? "#ddaf86" : "#8ab7b3"} />
          <stop
            offset="1"
            stopColor={type === "sunset-bath" ? "#8b9f96" : "#477d7c"}
          />
        </linearGradient>
        <pattern
          id={`${id}-grain`}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="2" r=".6" fill="#fff" opacity=".15" />
          <circle cx="4" cy="6" r=".5" fill="#1c3c32" opacity=".1" />
        </pattern>
      </defs>
      <path d="M0 0h480v286H0z" fill={`url(#${id}-sky)`} />
      {food ? (
        <>
          <path
            d="M0 0h480v286H0z"
            fill={type === "tuna" ? "#d8c6ac" : "#dfcfb9"}
          />
          {[25, 84, 143, 202, 261].map((y) => (
            <path key={y} d={`M0 ${y}h480`} stroke="#c7b497" strokeWidth="1" />
          ))}
          <path d="M363 8 432 86 415 103 346 25Z" fill="#e8e3ce" />
          <path d="M378 18 424 70" stroke="#a0aa8a" strokeWidth="2" />
          <ellipse
            cx="231"
            cy="222"
            rx="137"
            ry="37"
            fill="#746e57"
            opacity=".15"
          />
          <path
            d="M96 132c7 82 43 116 140 116 91 0 129-38 141-116Z"
            fill="#293f47"
          />
          <path
            d="M111 157c32 49 79 64 124 64s91-18 125-65"
            stroke="#486069"
            strokeWidth="2"
            fill="none"
          />
          <ellipse cx="237" cy="131" rx="142" ry="70" fill="#faf3da" />
          <ellipse cx="237" cy="130" rx="131" ry="60" fill="#efe5c9" />
          <g fill="#fcf5df">
            {Array.from({ length: 36 }, (_, i) => (
              <ellipse
                key={i}
                cx={135 + ((i * 31) % 208)}
                cy={97 + ((i * 17) % 73)}
                rx="5"
                ry="2"
                transform={`rotate(${i * 13} ${135 + ((i * 31) % 208)} ${97 + ((i * 17) % 73)})`}
              />
            ))}
          </g>
          {type === "seafood" ? (
            <g fill="#efdbb7" stroke="#bfae84" strokeWidth="1.1">
              {Array.from({ length: 10 }, (_, i) => (
                <path
                  key={i}
                  d="M-39-16c22-16 61-13 79 4L30 19c-20-5-45-4-68 0Z"
                  transform={`translate(${182 + (i % 4) * 37} ${100 + Math.floor(i / 4) * 21}) rotate(${(i % 3) * 12 - 10})`}
                />
              ))}
            </g>
          ) : (
            <>
              {Array.from({ length: type === "tuna" ? 13 : 6 }, (_, i) => (
                <g
                  key={i}
                  transform={`translate(${157 + (i % 4) * 45} ${type === "tuna" ? 78 + Math.floor(i / 4) * 24 : 112 + Math.floor(i / 4) * 30}) rotate(${i % 2 ? 9 : -8})`}
                >
                  <path
                    d="M-24-18c16-5 34-5 51 3l-4 33c-22-6-30-7-52-4Z"
                    fill={i % 3 === 0 ? "#d97967" : "#c86358"}
                  />
                  <path
                    d="m-18-12 35 21m-27-24 33 20m-9-24 13 10"
                    stroke="#f1a392"
                    strokeWidth="1.5"
                    opacity=".8"
                  />
                </g>
              ))}
              {type === "bowl" && (
                <>
                  <path
                    d="M227 82q48-16 84 9l-17 29q-37-18-77-6Z"
                    fill="#ebaa72"
                  />
                  <path
                    d="m236 84 3 30m12-32 4 33m13-31 6 35m11-32 5 31"
                    stroke="#f5d6ab"
                    strokeWidth="2"
                  />
                  <g fill="#e7a95d">
                    {Array.from({ length: 19 }, (_, i) => (
                      <circle
                        key={i}
                        cx={305 + ((i * 13) % 30)}
                        cy={128 + ((i * 9) % 30)}
                        r="5"
                      />
                    ))}
                  </g>
                  <path d="M132 116q6-33 42-33l12 29Z" fill="#f1e2bd" />
                </>
              )}
            </>
          )}
          <path
            d="m238 145-21-8 16-11-2-17 19 10 20-5-7 20 11 14-21-3-11 17Z"
            fill="#6f8945"
          />
          {type === "seafood" && (
            <circle cx="241" cy="132" r="16" fill="#ddae50" />
          )}
          <path
            d="m353 213 96-42m-99 49 101-41"
            stroke="#826547"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="55" cy="71" r="28" fill="#425c4b" />
          <circle cx="55" cy="71" r="23" fill="#a0ac78" />
          <path d="M42 67q12-5 25 0M43 75h22" stroke="#b7c08c" fill="none" />
        </>
      ) : bath ? (
        <>
          {type === "sunset-bath" ? (
            <>
              <circle cx="314" cy="90" r="34" fill="#d79668" />
              <path d="M0 121h480v165H0z" fill={`url(#${id}-water)`} />
              <path
                d="M285 139h59m-73 13h84m-100 18h104m-90 21h81"
                stroke="#f7d5a4"
                strokeWidth="2"
                opacity=".6"
              />
            </>
          ) : (
            <>
              <path
                d="m0 171 81-83 66 44 92-91 116 109 59-45 66 38v143H0Z"
                fill="#759480"
              />
              <path
                d="m0 201 99-58 83 33 88-61 81 55 129-23v139H0Z"
                fill="#3e6c50"
              />
              {Array.from({ length: 8 }, (_, i) => (
                <g key={i} transform={`translate(${i * 73 - 12} 164)`}>
                  <path
                    d="M0-141v159"
                    stroke="#807353"
                    strokeWidth={type === "forest-bath" ? 8 : 5}
                  />
                  <path
                    d="m0-106-28-23m28 58 23-25"
                    stroke="#807353"
                    strokeWidth="4"
                  />
                  <ellipse
                    cx="0"
                    cy="-112"
                    rx="38"
                    ry="31"
                    fill={i % 2 ? "#9da879" : "#738d64"}
                  />
                </g>
              ))}
            </>
          )}
          {type === "bath" ? (
            <>
              <path
                d="M0 0h480v31H0zM0 0h23v286H0zm457 0h23v286h-23Z"
                fill="#765d43"
              />
              <path
                d="M18 34h445v13H18zm88-3h13v160h-13zm253 0h13v160h-13Z"
                fill="#907556"
              />
              <path d="M44 193h392l44 93H0Z" fill="#9f8966" />
              <path d="M84 201h311l18 64H62Z" fill="#687e70" />
              <path d="M99 212h282l10 42H83Z" fill="#afbc9b" />
              <path
                d="M25 190h430M45 199h392M14 276h452"
                stroke="#bfa37d"
                strokeWidth="5"
              />
              <path
                d="M183 129q-14-20 1-38t0-36m47 87q-12-19 2-37t-1-37m43 64q-13-17 1-36t-1-36"
                stroke="#f3f2d8"
                strokeWidth="7"
                opacity=".5"
                fill="none"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <path d="M0 234q99-52 200-35t280 12v75H0Z" fill="#6d7160" />
              <ellipse cx="240" cy="247" rx="186" ry="68" fill="#9c9279" />
              <ellipse cx="240" cy="234" rx="179" ry="57" fill="#c2b89c" />
              <ellipse
                cx="240"
                cy="237"
                rx="157"
                ry="44"
                fill={type === "sunset-bath" ? "#a4855e" : "#9cae95"}
              />
              <path
                d="M131 245q73-19 145-8m-17 18h72"
                stroke="#d1ccb0"
                strokeWidth="2"
                fill="none"
                opacity=".6"
              />
              <path
                d="M198 187q-18-20 1-38t0-34m54 76q-15-16 1-32t-1-32m46 54q-12-15 2-29"
                stroke="#f5f1db"
                strokeWidth="6"
                opacity=".5"
                fill="none"
                strokeLinecap="round"
              />
              {type === "forest-bath" && (
                <>
                  <path d="M0 139h77v94H0Z" fill="#856b47" />
                  <path d="m-8 139 47-40 53 40Z" fill="#3b5142" />
                  <path d="M16 160h41v44H16z" fill="#b7b58c" />
                  <path d="M36 158v47" stroke="#856b47" strokeWidth="4" />
                </>
              )}
            </>
          )}
        </>
      ) : type === "castle" ? (
        <>
          <path d="M0 165q94-37 217-11t263-8v140H0Z" fill="#98ad7f" />
          <path d="M0 235q115-21 238-1t242-16v68H0Z" fill="#7d9c94" />
          <path d="m165 207 13-50h116l16 50Z" fill="#7f8170" />
          <path d="M181 146h109v24H181z" fill="#f0e9ce" />
          <path d="m163 149 72-30 74 30q-35 9-72 2-38 9-74-2" fill="#43574a" />
          <path d="M198 110h76v27h-76Z" fill="#f9f0d9" />
          <path d="m181 114 56-28 55 28q-28 7-55 1-29 7-56-1" fill="#40544a" />
          <path d="M218 80h38v20h-38Z" fill="#f6eed6" />
          <path d="m204 82 33-26 33 26q-15 5-33 1-19 5-33-1" fill="#40544a" />
          <path
            d="M205 157v9m19-10v10m23-10v10m22-10v10m-45-45v9m23-9v9m-12-42v7"
            stroke="#685f46"
            strokeWidth="5"
          />
          <path
            d="M0 252q67-42 136-29"
            stroke="#c17e69"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="m34 237 1 16m26-26 1 17m28-21 2 17m28-17 2 16"
            stroke="#bb7865"
            strokeWidth="4"
          />
          {[
            { x: 15, y: 113, s: 1.2 },
            { x: 101, y: 74, s: 0.95 },
            { x: 414, y: 85, s: 1.4 },
            { x: 346, y: 121, s: 0.7 },
          ].map(({ x, y, s }, i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
              <path
                d="M0 95V-5m0 48-29-30m29 13L25 1"
                stroke="#79674f"
                strokeWidth="6"
              />
              {[-31, 0, 30].map((n, j) => (
                <ellipse
                  key={j}
                  cx={n}
                  cy={j % 2 ? -13 : 2}
                  rx="34"
                  ry="25"
                  fill={j % 2 ? "#e7b4b5" : "#efd0c8"}
                />
              ))}
            </g>
          ))}
          <path
            d="m140 257 25 3m146-1h35m31 18h20"
            stroke="#e9c9c4"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : type === "shrine" ? (
        <>
          <path d="M0 110q120-54 227-9t253-22v207H0Z" fill="#81966a" />
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i} transform={`translate(${i * 47 - 17} 110)`}>
              <path d="M0 135V-42" stroke="#807452" strokeWidth="5" />
              <ellipse
                cx="0"
                cy="-18"
                rx="40"
                ry="60"
                fill={i % 2 ? "#6c8356" : "#4e6f4e"}
              />
            </g>
          ))}
          <path
            d="M131 286q24-89 159-104t76-51"
            fill="none"
            stroke="#d5c5a1"
            strokeWidth="47"
          />
          {[...Array(7)].reverse().map((_, j) => {
            const s = 0.38 + j * 0.11;
            return (
              <g
                key={j}
                transform={`translate(${335 - j * 24} ${123 + j * 13}) scale(${s})`}
              >
                <path
                  d="M-56 130V-4m112 134V-4"
                  stroke="#b9503b"
                  strokeWidth="12"
                />
                <path
                  d="M-76-12q77 18 152 0M-65 17H65"
                  stroke="#c26041"
                  strokeWidth="11"
                />
                <path
                  d="M-77-18q77 16 154 0"
                  stroke="#384e3f"
                  strokeWidth="6"
                />
                <path d="M0-1v19" stroke="#b9503b" strokeWidth="6" />
              </g>
            );
          })}
          <path
            d="M0 265q81-39 114 21H0Zm349 21q59-46 131-21v21Z"
            fill="#506c46"
          />
        </>
      ) : type === "nebuta" ? (
        <>
          <path d="M0 0h480v286H0z" fill="#343e43" />
          <path d="M0 234h480v52H0z" fill="#29363b" />
          {[36, 76, 117, 158, 199, 240, 281, 322, 363, 404, 445].map((x) => (
            <path
              key={x}
              d={`M${x} 0v240`}
              stroke="#724c43"
              strokeWidth="9"
              opacity=".6"
            />
          ))}
          <g transform="translate(238 145)">
            <path
              d="m-130 46-35-61 41-45 50 13 28-65 63-8 30 42 72-11 38 45-28 53 24 43-57 33-35-11-76 8-40-19Z"
              fill="#d98247"
              stroke="#302f34"
              strokeWidth="4"
            />
            <path
              d="m-71 5 20-60 49-24 57 25 23 63-30 51-71 6Z"
              fill="#eccb8a"
              stroke="#4a3735"
              strokeWidth="4"
            />
            <path
              d="m-47-18 24-7 14 16m28 0 13-19 24 6"
              stroke="#31343b"
              strokeWidth="10"
              fill="none"
            />
            <path
              d="m-20 30 24-13 22 14-17 18-23-2Z"
              fill="#b84c3e"
              stroke="#493636"
              strokeWidth="3"
            />
            <path
              d="m-6-5-6 21 19 1"
              stroke="#9c5d45"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="m-59-51-27-26 27-14-2-28 33 5 30-17 23 30 41-1-7 32 34 20-46 9-32-23-30 9Z"
              fill="#374c51"
              stroke="#302f34"
              strokeWidth="4"
            />
            <path
              d="m-82 24-50-12m56 33-39 13m196-40 44-18m-48 40 53 15"
              stroke="#f4c27a"
              strokeWidth="9"
            />
          </g>
          <path d="M111 252h264v13H111z" fill="#967452" />
        </>
      ) : type === "coast" ? (
        <>
          <path d="M0 138h480v148H0Z" fill={`url(#${id}-water)`} />
          <path
            d="m14 286 32-74 12-77 23-31 21 21 4 51 28 26 32-51 6-49 20-16 24 35 1 51 34 61 30-15 21-105 22-37 25 28 13 81 32 49 31-52 28-11 22 43v67Z"
            fill="#e1dfc1"
          />
          <path
            d="m81 110 5 73 22 59m84-146-9 64 33 78m106-145-9 86 28 64m-38-23-11 47"
            fill="none"
            stroke="#b9bba5"
            strokeWidth="6"
          />
          <path
            d="M0 272q37-24 70-16m52 14q34-6 52 4m147-7q62-12 102-2"
            stroke="#e8eee1"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="m15 286 25-39 34-3 16 42Zm345 0 43-38 32-10 45 48Z"
            fill="#4b6c52"
          />
        </>
      ) : (
        <>
          <path
            d="m0 145 82-72 50 24 95-60 105 81 66-38 82 58v148H0Z"
            fill="#9eaf97"
          />
          <path
            d="m0 177 90-64 84 32 96-65 123 90 87-41v157H0Z"
            fill="#668a70"
          />
          <path
            d="M0 188q106-22 250 8t230-13v103H0Z"
            fill={`url(#${id}-water)`}
          />
          {type === "stream" ? (
            <>
              <path
                d="M0 286V154q73-6 140 35l66 22-62 21 31 16-26 38Z"
                fill="#446b4a"
              />
              <path
                d="M480 286V138q-111 10-187 54l-40 17 74 14-60 14 76 18-25 31Z"
                fill="#53714b"
              />
              <path
                d="m174 210 78 9-51 17 58 15-55 35"
                fill="none"
                stroke="#d5e3d3"
                strokeWidth="4"
                opacity=".8"
              />
              <path
                d="m168 232-28-7-32 14 15 15 35-2Zm97 14 26-11 28 10-14 21-35-5Z"
                fill="#78846a"
              />
              {Array.from({ length: 10 }, (_, i) => (
                <g
                  key={i}
                  transform={`translate(${i < 5 ? i * 41 - 5 : 300 + (i - 5) * 49} ${i % 2 ? 122 : 93})`}
                >
                  <path
                    d="M0 136V-66m0 59-28-31m28 61 31-37"
                    stroke="#5e6448"
                    strokeWidth={i % 2 ? 8 : 5}
                  />
                  <ellipse
                    cx="0"
                    cy="-35"
                    rx="47"
                    ry="33"
                    fill={i % 2 ? "#76945b" : "#96aa6c"}
                  />
                  <ellipse
                    cx="-21"
                    cy="-6"
                    rx="33"
                    ry="22"
                    fill={i % 2 ? "#88a266" : "#6f8c57"}
                  />
                </g>
              ))}
              <path
                d="M0 286h135l-21-19-36-5-25-26-53 9Zm480 0H340l17-27 35 2 32-27 56 7Z"
                fill="#344e39"
              />
            </>
          ) : (
            <>
              <path
                d="M0 204q62-27 130-16l-50 16 84 10-164 25Zm480-15q-54-17-127 12l41 10-78 12 164 9Z"
                fill="#3f644c"
              />
              <path
                d="M155 230h80m-27 18h87m19 17h68"
                stroke="#c5d8cf"
                strokeWidth="2"
                opacity=".6"
              />
              <path
                d="M0 286v-35q112-32 214 35Zm480 0V247q-74-16-144 39Z"
                fill="#3c5c43"
              />
              <g transform="translate(69 195)">
                <path d="M0-96-27-42h12L-35-9h70L15-42h12Z" fill="#34563e" />
                <path d="M0-9V7" stroke="#4d5a3a" strokeWidth="6" />
              </g>
            </>
          )}
        </>
      )}
      <path d="M0 0h480v286H0z" fill={`url(#${id}-grain)`} />
    </svg>
  );
}
