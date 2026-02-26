import { useEffect, useRef, useState } from "react";

export function useLanternPhysics(sensitivity = 1) {
  const [angles, setAngles] = useState({ main: 0, secondary: 0 });

  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const secondaryAngleRef = useRef(0);
  const secondaryVelRef = useRef(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const dt = Math.max(now - lastTime.current, 1);
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY.current;
      const scrollSpeed = scrollDelta / dt;

      velocityRef.current += scrollSpeed * 1.2 * sensitivity;
      secondaryVelRef.current += scrollSpeed * 0.4 * sensitivity;

      lastScrollY.current = scrollY;
      lastTime.current = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sensitivity]);

  useEffect(() => {
    let rafId: number;

    const loop = () => {
      velocityRef.current -= 0.04 * angleRef.current;
      velocityRef.current *= 0.97;
      angleRef.current += velocityRef.current;
      angleRef.current = Math.max(-35, Math.min(35, angleRef.current));

      secondaryVelRef.current -= 0.08 * secondaryAngleRef.current;
      secondaryVelRef.current *= 0.94;
      secondaryAngleRef.current += secondaryVelRef.current;
      secondaryAngleRef.current = Math.max(-8, Math.min(8, secondaryAngleRef.current));

      setAngles({
        main: angleRef.current + secondaryAngleRef.current * 0.3,
        secondary: secondaryAngleRef.current, // angle de courbure pour la chaîne
      });

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return angles;
}