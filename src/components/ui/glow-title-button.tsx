"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface GlowTitleButtonProps {
  label: string;
  fontSize?: number;
  paddingX?: number;
  paddingY?: number;
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0.55, scale: 1 },
  hover: {
    opacity: 1,
    scale: 1.6,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

const GlowTitleButton: React.FC<GlowTitleButtonProps> = ({
  label,
  fontSize = 28,
  paddingX = 24,
  paddingY = 10,
}) => {
  return (
    <motion.div
      className="relative inline-block"
      style={{ perspective: "600px", margin: "8px 0 22px 0" }}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="absolute -inset-3 pointer-events-none"
        variants={glowVariants}
        style={{
          background:
            "radial-gradient(circle, rgba(239,68,68,0.55) 0%, rgba(220,38,38,0.25) 45%, rgba(185,28,28,0) 75%)",
          borderRadius: "24px",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "linear-gradient(135deg, #ff5252 0%, #e53935 50%, #8b0000 100%)",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow:
            "0 0 28px rgba(229,57,53,0.55), 0 8px 20px rgba(229,57,53,0.3), inset 0 1px 0 rgba(255,255,255,0.25)",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            padding: `${paddingY}px ${paddingX}px`,
            color: "#ffffff",
            fontSize,
            fontWeight: 800,
            letterSpacing: "-0.5px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
          }}
          variants={itemVariants}
          transition={sharedTransition}
        >
          {label}
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            padding: `${paddingY}px ${paddingX}px`,
            color: "#fff",
            fontSize,
            fontWeight: 800,
            letterSpacing: "-0.5px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transformStyle: "preserve-3d",
            transformOrigin: "center top",
            rotateX: 90,
            textShadow: "0 0 18px rgba(255,255,255,0.6)",
          }}
          variants={backVariants}
          transition={sharedTransition}
        >
          {label}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GlowTitleButton;
