export function Logo({ className = "w-32 h-8" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="29 193 411 81"
      className={className}
      style={{ filter: "contrast(1.1)" }}
    >
      <g transform="matrix(0.31999998,0,0,0.31999998,0,9.434666e-6)">
        <g transform="matrix(3.125,0,0,3.125,110.88121,639.65308)">
          <text
            style={{
              fontFamily: "Prata",
              fontSize: "66.34px",
              fill: "#ff00ff",
            }}
            transform="translate(0,58)"
          >
            NIAFUSION
          </text>
        </g>
        <g transform="matrix(3.125,0,0,3.125,103.10626,639.65308)">
          <text
            style={{
              fontFamily: "Prata",
              fontSize: "66.34px",
              fill: "#00ffff",
            }}
            transform="translate(0,58)"
          >
            NIAFUSION
          </text>
        </g>
        <g transform="matrix(3.125,0,0,3.125,106.99374,639.65308)">
          <text
            style={{
              fontFamily: "Prata",
              fontSize: "66.34px",
              fill: "#000000",
            }}
            transform="translate(0,58)"
          >
            NIAFUSION
          </text>
        </g>
      </g>
    </svg>
  )
}

