import * as React from "react";

function IconGridOutline(props: React.SVGProps<SVGSVGElement>) {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M68 48 H204 A20 20 0 0 1 224 68 V204 A20 20 0 0 1 204 224 H68 A20 20 0 0 1 48 204 V68 A20 20 0 0 1 68 48 z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M308 48 H444 A20 20 0 0 1 464 68 V204 A20 20 0 0 1 444 224 H308 A20 20 0 0 1 288 204 V68 A20 20 0 0 1 308 48 z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M68 288 H204 A20 20 0 0 1 224 308 V444 A20 20 0 0 1 204 464 H68 A20 20 0 0 1 48 444 V308 A20 20 0 0 1 68 288 z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M308 288 H444 A20 20 0 0 1 464 308 V444 A20 20 0 0 1 444 464 H308 A20 20 0 0 1 288 444 V308 A20 20 0 0 1 308 288 z"
      />
    </svg>
  );
}

export default IconGridOutline;
