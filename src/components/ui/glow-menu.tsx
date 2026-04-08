"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface GlowMenuItem {
  icon: LucideIcon | React.FC<{ className?: string }>;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
}

interface MenuBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  items: GlowMenuItem[];
  activeItem?: string;
  onItemClick?: (label: string) => void;
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
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ className, items, activeItem, onItemClick, ...props }, ref) => {
    return (
      <motion.nav
        ref={ref}
        className={cn(
          "p-2 rounded-2xl relative overflow-hidden",
          className
        )}
        style={{
          background: 'linear-gradient(180deg, rgba(20,8,10,0.92) 0%, rgba(8,2,4,0.92) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(239,68,68,0.22)',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.5), 0 0 40px rgba(239,68,68,0.12)',
        }}
        initial="initial"
        whileHover="hover"
        {...props}
      >
        <motion.div
          className="absolute -inset-2 rounded-3xl z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 100%, rgba(239,68,68,0.35) 0%, rgba(220,38,38,0.18) 35%, rgba(185,28,28,0.08) 60%, transparent 80%)',
          }}
          variants={navGlowVariants}
        />
        <ul className="flex items-center justify-around gap-1 relative z-10 list-none m-0 p-0">
          {items.map((item) => {
            const Icon = item.icon as LucideIcon;
            const isActive = item.label === activeItem;
            return (
              <motion.li key={item.label} className="relative list-none flex-1">
                <button
                  onClick={() => onItemClick?.(item.label)}
                  className="block w-full bg-transparent border-none cursor-pointer p-0"
                  style={{ background: 'transparent', border: 'none' }}
                >
                  <motion.div
                    className="block rounded-xl overflow-visible group relative"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none"
                      variants={glowVariants}
                      animate={isActive ? "hover" : "initial"}
                      style={{
                        background: item.gradient,
                        opacity: isActive ? 1 : 0,
                        borderRadius: "16px",
                      }}
                    />
                    <motion.div
                      className={cn(
                        "flex flex-col items-center gap-1 px-2 py-2 relative z-10 rounded-xl transition-colors"
                      )}
                      style={{
                        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                      variants={itemVariants}
                      transition={sharedTransition}
                    >
                      <span style={{ color: isActive ? item.iconColor : 'rgba(255,255,255,0.55)', display: 'flex' }}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span style={{ fontSize: 10.5, fontWeight: isActive ? 700 : 500, letterSpacing: 0.2 }}>
                        {item.label}
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex flex-col items-center gap-1 px-2 py-2 absolute inset-0 z-10 rounded-xl"
                      style={{
                        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.85)',
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                      variants={backVariants}
                      transition={sharedTransition}
                    >
                      <span style={{ color: item.iconColor, display: 'flex' }}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.2 }}>
                        {item.label}
                      </span>
                    </motion.div>
                  </motion.div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>
    );
  }
);
MenuBar.displayName = "MenuBar";
