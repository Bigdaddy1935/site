import * as React from "react";

function IconTvOutline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M64.14 96 H447.86 A32.14 32.14 0 0 1 480 128.14 V335.86 A32.14 32.14 0 0 1 447.86 368 H64.14 A32.14 32.14 0 0 1 32 335.86 V128.14 A32.14 32.14 0 0 1 64.14 96 z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M128 416h256"
      />
    </svg>
  );
}

export default IconTvOutline;
