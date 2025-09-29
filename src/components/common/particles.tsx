"use client";

import { useState, useEffect } from 'react';

export function Particles() {
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const numParticles = 25; // Keep it subtle
    const newParticles = Array.from({ length: numParticles }).map((_, i) => {
      const style: React.CSSProperties = {
        '--particle-d': `${Math.random() * 20 + 15}s`, // duration
        '--particle-x-start': `${Math.random() * 100}vw`,
        '--particle-y-start': `${Math.random() * 100}vh`,
        '--particle-x-end': `${Math.random() * 100}vw`,
        '--particle-y-end': `${Math.random() * 100}vh`,
      } as React.CSSProperties;

      return <div key={i} className="particle" style={style} />;
    });

    setParticles(newParticles);
  }, []);

  return <div className="fixed inset-0 -z-10">{particles}</div>;
}
