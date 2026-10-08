import { useState, useRef, useEffect, type PointerEvent } from 'react';
import {
  bonecoLaptop,
  bonecoGrabbed,
  bonecoParachute1,
  bonecoParachute2,
  bonecoParachute3,
  bonecoChairFall,
  bonecoLanding,
  bonecoWave,
} from '../assets/images';
import { onExplanation } from '../utils/explanationStore';
import styles from './InteractiveBoneco.module.css';

type BonecoState = 'idle' | 'dragging' | 'falling' | 'landing' | 'explaining';

export function InteractiveBoneco() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [state, setState] = useState<BonecoState>('idle');
  const [fallStage, setFallStage] = useState<1 | 2 | 3 | 4>(1);
  const [speechText, setSpeechText] = useState<string | null>(null);

  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number; moved: boolean }>({
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
    moved: false,
  });
  const bubbleTimerRef = useRef<number | undefined>(undefined);
  const fallAnimRef = useRef<number | undefined>(undefined);

  const getFloorY = () => Math.max(20, window.innerHeight - 130);

  useEffect(() => {
    const initX = window.innerWidth - 135;
    const initY = getFloorY();
    setPos({ x: Math.max(20, initX), y: initY });

    const handleResize = () => {
      setPos((prev) => {
        if (!prev) return null;
        return {
          x: Math.min(window.innerWidth - 110, Math.max(10, prev.x)),
          y: Math.min(getFloorY(), Math.max(10, prev.y)),
        };
      });
    };
    window.addEventListener('resize', handleResize);

    const unsubscribe = onExplanation((_term, text) => {
      setSpeechText(text);
      setState('explaining');
      window.clearTimeout(bubbleTimerRef.current);
      bubbleTimerRef.current = window.setTimeout(() => {
        setSpeechText(null);
        setState('idle');
      }, 7000);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(bubbleTimerRef.current);
      if (fallAnimRef.current) cancelAnimationFrame(fallAnimRef.current);
      unsubscribe();
    };
  }, []);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (fallAnimRef.current) {
      cancelAnimationFrame(fallAnimRef.current);
      fallAnimRef.current = undefined;
    }

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setState('dragging');
    setSpeechText(null);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pos ? pos.x : window.innerWidth - 135,
      origY: pos ? pos.y : getFloorY(),
      moved: false,
    };
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (state !== 'dragging') return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragRef.current.moved = true;
    }
    const newX = Math.min(window.innerWidth - 110, Math.max(10, dragRef.current.origX + dx));
    const newY = Math.min(getFloorY(), Math.max(10, dragRef.current.origY + dy));
    setPos({ x: newX, y: newY });
  };

  const getFallStageFromY = (y: number): 1 | 2 | 3 | 4 => {
    const vhRatio = y / window.innerHeight;
    if (vhRatio < 0.27) return 1;
    if (vhRatio < 0.54) return 2;
    if (vhRatio < 0.81) return 3;
    return 4; // 81% - 100% (últimos 19% da tela: cadeira sentado)
  };

  const startParachuteFall = (startY: number) => {
    const floorY = getFloorY();
    const totalDistance = floorY - startY;

    if (totalDistance < 25) {
      setPos((prev) => (prev ? { ...prev, y: floorY } : null));
      setState('idle');
      return;
    }

    setFallStage(getFallStageFromY(startY));
    setState('falling');
    let currentY = startY;
    let lastTime = performance.now();
    const speedPxPerSec = 190;

    const step = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      currentY += speedPxPerSec * dt;
      setFallStage(getFallStageFromY(currentY));

      if (currentY >= floorY) {
        setPos((prev) => (prev ? { ...prev, y: floorY } : null));
        setState('landing');
        window.setTimeout(() => {
          setState('idle');
        }, 360);
      } else {
        setPos((prev) => (prev ? { ...prev, y: currentY } : null));
        fallAnimRef.current = requestAnimationFrame(step);
      }
    };

    fallAnimRef.current = requestAnimationFrame(step);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (state !== 'dragging') return;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    if (!dragRef.current.moved) {
      setSpeechText('Clique nas palavras sublinhadas nos projetos para ver explicações!');
      setState('explaining');
      window.clearTimeout(bubbleTimerRef.current);
      bubbleTimerRef.current = window.setTimeout(() => {
        setSpeechText(null);
        setState('idle');
      }, 4500);
    } else {
      if (pos) {
        startParachuteFall(pos.y);
      } else {
        setState('idle');
      }
    }
  };

  if (!pos) return null;

  // Determine active sprite image
  let currentImage = bonecoLaptop;
  if (state === 'dragging') {
    currentImage = bonecoGrabbed;
  } else if (state === 'falling') {
    if (fallStage === 1) currentImage = bonecoParachute1;
    else if (fallStage === 2) currentImage = bonecoParachute2;
    else if (fallStage === 3) currentImage = bonecoParachute3;
    else currentImage = bonecoChairFall; // 19% final chair descent
  } else if (state === 'landing') {
    currentImage = bonecoLanding;
  } else if (state === 'explaining') {
    currentImage = bonecoWave;
  }

  return (
    <div
      className={styles.bonecoWrapper}
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      data-state={state}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="button"
      tabIndex={0}
      aria-label="Mascote interativo: arraste e solte para abrir o paraquedas"
    >
      {speechText && (
        <div className={styles.speechBubble} role="status">
          <p className={styles.bubbleContent}>{speechText}</p>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={(e) => {
              e.stopPropagation();
              setSpeechText(null);
              setState('idle');
            }}
            aria-label="Fechar balão"
          >
            ×
          </button>
        </div>
      )}

      <div className={styles.characterContainer}>
        <img
          src={currentImage}
          alt=""
          className={styles.characterImg}
          draggable={false}
          data-state={state}
        />
        {(state === 'idle' || state === 'explaining') && <div className={styles.floorShadow} />}
      </div>
      {(state === 'idle' && !speechText) && <div className={styles.hint}>Arraste-me</div>}
    </div>
  );
}
