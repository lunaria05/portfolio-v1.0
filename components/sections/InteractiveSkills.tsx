"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiWeb3Dotjs,
  SiGithub,
  SiVercel,
  SiGoogleanalytics,
  SiGoogletagmanager,
} from "react-icons/si";
import { FaServer } from "react-icons/fa";
import { IconType } from "react-icons";

// --- Configuration ---
const CONNECTION_DISTANCE = 250;
const MOUSE_INTERACTION_RADIUS = 200;

// Balanced Pull: Stronger than the first version, but looser than the last version.
const CENTER_PULL_STRENGTH = 0.0008;

interface SkillData {
  name: string;
  icon?: IconType;
  isCenter?: boolean;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  element: HTMLDivElement | null;
  isCenter: boolean;
}

const skillsData: SkillData[] = [
  { name: "SKILLS", isCenter: true },
  { name: "React.js", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss3 },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "REST APIs", icon: FaServer },
  { name: "Web3", icon: SiWeb3Dotjs },
  { name: "GitHub", icon: SiGithub },
  { name: "Vercel", icon: SiVercel },
  { name: "GA4", icon: SiGoogleanalytics },
  { name: "GTM", icon: SiGoogletagmanager },
];

const InteractiveSkills = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const hoveredIndex = useRef<number>(-1);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    nodesRef.current = skillsData.map((skill, index) => {
      if (skill.isCenter) {
        return {
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          element: nodeRefs.current[index],
          isCenter: true,
        };
      }

      // Medium spread for initialization (0.3 factor)
      return {
        x: centerX + (Math.random() - 0.5) * (width * 0.3),
        y: centerY + (Math.random() - 0.5) * (height * 0.3),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        element: nodeRefs.current[index],
        isCenter: false,
      };
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (
      !canvasRef.current ||
      !containerRef.current ||
      nodesRef.current.length === 0
    )
      return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.isCenter) {
          const dx = centerX - node.x;
          const dy = centerY - node.y;
          node.vx += dx * 0.05;
          node.vy += dy * 0.05;
          node.vx *= 0.8;
          node.vy *= 0.8;

          const mDx = node.x - mousePos.current.x;
          const mDy = node.y - mousePos.current.y;
          const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
          if (mDist < 100) {
            const force = (100 - mDist) * 0.002;
            node.vx += (mDx / mDist) * force;
            node.vy += (mDy / mDist) * force;
          }
        } else {
          // Satellite Nodes
          const dx = centerX - node.x;
          const dy = centerY - node.y;

          // Balanced gravity
          node.vx += dx * CENTER_PULL_STRENGTH;
          node.vy += dy * CENTER_PULL_STRENGTH;

          for (let j = 0; j < nodes.length; j++) {
            if (i === j) continue;
            const other = nodes[j];
            const rDx = node.x - other.x;
            const rDy = node.y - other.y;
            const dist = Math.sqrt(rDx * rDx + rDy * rDy);

            // Repulsion distance set to 160 (Middle ground between 130 and 180)
            if (dist < 160 && dist > 0) {
              const force = (160 - dist) / dist;
              const strength = other.isCenter ? 0.05 : 0.015;
              node.vx += rDx * force * strength;
              node.vy += rDy * force * strength;
            }
          }

          const mDx = node.x - mousePos.current.x;
          const mDy = node.y - mousePos.current.y;
          const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
          if (mDist < MOUSE_INTERACTION_RADIUS) {
            const force =
              (MOUSE_INTERACTION_RADIUS - mDist) / MOUSE_INTERACTION_RADIUS;
            node.vx += (mDx / mDist) * force * 0.3;
            node.vy += (mDy / mDist) * force * 0.3;
          }

          node.vx *= 0.96;
          node.vy *= 0.96;

          if (node.x < 50) node.vx += 0.5;
          if (node.x > width - 50) node.vx -= 0.5;
          if (node.y < 50) node.vy += 0.5;
          if (node.y > height - 50) node.vy -= 0.5;
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.element) {
          node.element.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) translate(-50%, -50%)`;
        }
      }

      // Draw Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = 1 - dist / CONNECTION_DISTANCE;
            const isHovered =
              hoveredIndex.current === i || hoveredIndex.current === j;
            const isCenterConnection = nodeA.isCenter || nodeB.isCenter;

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);

            if (isHovered) {
              // Hovered: Cyan, thick
              ctx.strokeStyle = `rgba(26, 169, 218, ${opacity * 1})`;
              ctx.lineWidth = 2.5;
            } else if (isCenterConnection) {
              // Center connection: White, clearly visible
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
              ctx.lineWidth = 1.5;
            } else {
              // Mesh lines: White, visible
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
              ctx.lineWidth = 1;
            }
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 w-full h-full z-10 pointer-events-auto"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {skillsData.map((skill, index) => {
        const Icon = skill.icon;
        const isCenter = skill.isCenter;

        return (
          <div
            key={skill.name}
            ref={(el) => {
              nodeRefs.current[index] = el;
              if (nodesRef.current[index]) nodesRef.current[index].element = el;
            }}
            className="absolute top-0 left-0 will-change-transform z-20"
            onMouseEnter={() => {
              hoveredIndex.current = index;
            }}
            onMouseLeave={() => {
              hoveredIndex.current = -1;
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05, type: "spring" }}
            >
              <div
                className={`
                  relative flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-300
                  ${
                    isCenter
                      ? "w-24 h-24 bg-[#1aa9da]/10 border-2 border-[#1aa9da] shadow-[0_0_50px_rgba(26,169,218,0.3)]"
                      : "w-16 h-16 bg-black/40 border border-white/10 hover:border-[#1aa9da] hover:bg-black/60 hover:shadow-[0_0_20px_rgba(26,169,218,0.5)]"
                  }
                `}
              >
                {isCenter ? (
                  <span className="text-[#1aa9da] font-bold text-sm tracking-widest">
                    SKILLS
                  </span>
                ) : (
                  Icon && (
                    <Icon className="text-2xl text-white group-hover:text-[#1aa9da] transition-colors duration-300" />
                  )
                )}

                {!isCenter && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-xs font-mono font-bold text-[#1aa9da] bg-black/90 px-3! py-1! rounded border border-[#1aa9da]/30 whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default InteractiveSkills;
