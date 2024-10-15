"use client";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  height: number;
};

export default function ScrollHidden({ children, height }: Props) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setHidden(prev=>true);
      } else {
        if (hidden && window.scrollY < 50) {
          setHidden((prev) => false);
        }
      }
    };

    window?.addEventListener("scroll", handleScroll);

    return () => window?.removeEventListener("scroll", handleScroll);
  }, [height, children, hidden]);
  return (
    <div
      className="transition-all"
      style={
        hidden ? { height: 0, overflowY: "hidden" } : { height: `${height}px` }
      }
    >
      {children}
    </div>
  );
}
