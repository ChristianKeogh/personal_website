"use client";

import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const scroll = () => {
      document.getElementById(id)?.scrollIntoView();
    };

    scroll();
    const frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
}
