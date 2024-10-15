import * as React from "react";

function IconGalleryImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 30.3 24.35"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <defs>
        <style>
          {
            ".cls-1{fill:#7c7c7c}.cls-2{fill:none;stroke:#7c7c7c;stroke-linecap:round;stroke-linejoin:round}"
          }
        </style>
      </defs>
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          d="M30.3 18.57v3.96c0 1-.82 1.82-1.82 1.82H7.56c-1 0-1.82-.82-1.82-1.82v-5.41l7.68-6.49 7.57 7.94 4.98-3.43 4.33 3.43Z"
          className="cls-1"
        />
        <path
          d="M28.48 6.39c.45 0 .82.37.82.82v9.29l-2.71-2.15a.988.988 0 0 0-1.19-.04l-4.28 2.95-6.98-7.32a.986.986 0 0 0-.72-.31c-.23 0-.46.08-.65.24l-6.04 5.1V7.21c0-.45.37-.82.82-.82h20.92m0-1H7.56c-1 0-1.82.82-1.82 1.82v9.91l7.68-6.49 7.57 7.94 4.98-3.43 4.33 3.43V7.21c0-1-.82-1.82-1.82-1.82Z"
          className="cls-1"
        />
        <path
          d="M26.88 5.39v-.77c0-1.02-.83-1.86-1.86-1.86H4.98c-1.02 0-1.86.83-1.86 1.86v14.63c0 1.02.83 1.86 1.86 1.86h.77"
          className="cls-2"
        />
        <path
          d="M24.26 2.77v-.42c0-1.02-.83-1.86-1.86-1.86H2.36C1.34.49.5 1.32.5 2.35v14.63c0 1.02.83 1.86 1.86 1.86h.77M22.16 19.89l-1.67-1.75"
          className="cls-2"
        />
        <circle cx={22.86} cy={10.81} r={1.92} className="cls-2" />
      </g>
    </svg>
  );
}

export default IconGalleryImage;
