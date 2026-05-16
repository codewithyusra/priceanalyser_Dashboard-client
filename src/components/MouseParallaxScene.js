'use client';

import { useEffect, useRef } from 'react';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function applySceneVars(element, x, y) {
  const intensity = Math.min(1, Math.hypot(x, y));

  element.style.setProperty('--scene-rotate-x', `${(-y * 7).toFixed(2)}deg`);
  element.style.setProperty('--scene-rotate-y', `${(x * 9).toFixed(2)}deg`);
  element.style.setProperty('--scene-shift-x', `${(x * 24).toFixed(2)}px`);
  element.style.setProperty('--scene-shift-y', `${(y * 18).toFixed(2)}px`);
  element.style.setProperty('--scene-glow-x', `${(50 + x * 10).toFixed(2)}%`);
  element.style.setProperty('--scene-glow-y', `${(42 + y * 8).toFixed(2)}%`);
  element.style.setProperty('--scene-shadow-alpha', (0.08 + intensity * 0.05).toFixed(3));
  element.style.setProperty('--scene-highlight-opacity', (0.72 + intensity * 0.18).toFixed(3));
}

export default function MouseParallaxScene({ children }) {
  const rootRef = useRef(null);
  const stateRef = useRef({
    frameId: null,
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    disabled: false,
  });

  useEffect(() => {
    const root = rootRef.current;

    if (!root || typeof window === 'undefined') {
      return undefined;
    }

    const state = stateRef.current;
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');

    const stopFrame = () => {
      if (state.frameId) {
        window.cancelAnimationFrame(state.frameId);
        state.frameId = null;
      }
    };

    const syncEnvironment = () => {
      state.disabled = reduceMotionQuery.matches || coarsePointerQuery.matches;

      if (state.disabled) {
        state.targetX = 0;
        state.targetY = 0;
        state.currentX = 0;
        state.currentY = 0;
        stopFrame();
        applySceneVars(root, 0, 0);
      }
    };

    const animate = () => {
      state.currentX += (state.targetX - state.currentX) * 0.12;
      state.currentY += (state.targetY - state.currentY) * 0.12;

      applySceneVars(root, state.currentX, state.currentY);

      const settled =
        Math.abs(state.targetX - state.currentX) < 0.002 &&
        Math.abs(state.targetY - state.currentY) < 0.002 &&
        Math.abs(state.currentX) < 0.002 &&
        Math.abs(state.currentY) < 0.002;

      if (settled) {
        state.currentX = 0;
        state.currentY = 0;
        applySceneVars(root, 0, 0);
        state.frameId = null;
        return;
      }

      state.frameId = window.requestAnimationFrame(animate);
    };

    const queueFrame = () => {
      if (!state.disabled && !state.frameId) {
        state.frameId = window.requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event) => {
      if (state.disabled || event.pointerType === 'touch') {
        return;
      }

      const rect = root.getBoundingClientRect();
      const normalizedX = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      const normalizedY = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);

      state.targetX = normalizedX;
      state.targetY = normalizedY;
      queueFrame();
    };

    const handlePointerLeave = () => {
      state.targetX = 0;
      state.targetY = 0;
      queueFrame();
    };

    syncEnvironment();
    applySceneVars(root, 0, 0);

    root.addEventListener('pointermove', handlePointerMove);
    root.addEventListener('pointerleave', handlePointerLeave);
    root.addEventListener('pointercancel', handlePointerLeave);
    reduceMotionQuery.addEventListener('change', syncEnvironment);
    coarsePointerQuery.addEventListener('change', syncEnvironment);

    return () => {
      stopFrame();
      root.removeEventListener('pointermove', handlePointerMove);
      root.removeEventListener('pointerleave', handlePointerLeave);
      root.removeEventListener('pointercancel', handlePointerLeave);
      reduceMotionQuery.removeEventListener('change', syncEnvironment);
      coarsePointerQuery.removeEventListener('change', syncEnvironment);
    };
  }, []);

  return (
    <div ref={rootRef} className="scene-motion-root">
      {children}
    </div>
  );
}
