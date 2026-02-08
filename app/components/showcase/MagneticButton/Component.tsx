"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useReducedMotion } from "motion/react";

export default function MagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const x = useSpring(0, {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  });

  const y = useSpring(0, {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull — max 40% of button size
    const maxDistance = rect.width * 0.4;
    const clampedX = Math.max(
      -maxDistance,
      Math.min(maxDistance, distanceX * 0.3),
    );
    const clampedY = Math.max(
      -maxDistance,
      Math.min(maxDistance, distanceY * 0.3),
    );

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#F8F9FA] to-[#E9ECEF]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        ref={buttonRef}
        onMouseEnter={() => setIsHovered(true)}
        style={{
          x: shouldReduceMotion ? 0 : x,
          y: shouldReduceMotion ? 0 : y,
          touchAction: "manipulation",
        }}
        className="group relative overflow-hidden rounded-2xl bg-[#111111] px-8 py-4 font-sans text-base font-semibold text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-200 ease focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-4 active:scale-[0.97]"
        aria-label="Magnetic button demonstration"
      >
        {/* Background gradient on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 bg-linear-to-br from-[#2B2B2B] to-[#111111]"
          aria-hidden="true"
        />

        {/* Shine effect */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
          aria-hidden="true"
        />

        <span className="relative z-10">Pull Me</span>
      </motion.button>

      {/* Instructions */}
      <p className="absolute bottom-8 font-mono text-xs text-[#6C757D]">
        Hover to attract
      </p>
    </div>
  );
}
