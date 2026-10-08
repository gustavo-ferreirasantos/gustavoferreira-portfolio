import { useEffect, useState, useRef } from 'react';
import { walkerSpritesheet } from '../assets/images';
import styles from './ScrollWalker.module.css';

export function ScrollWalker() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isWalking, setIsWalking] = useState(false);

  const tickingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const stopTimerRef = useRef<number | undefined>(undefined);
  const accDistanceRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const deltaY = currentY - lastScrollYRef.current;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (currentY / docHeight) * 100 : 0;
          const clampedProgress = Math.min(100, Math.max(0, progress));

          setScrollProgress(clampedProgress);

          if (deltaY > 0.5) {
            setDirection('right');
          } else if (deltaY < -0.5) {
            setDirection('left');
          }

          if (currentY <= 2) {
            setDirection('right');
          }

          // Advance sprite frames with scroll distance
          accDistanceRef.current += Math.abs(deltaY);
          if (accDistanceRef.current >= 12) {
            const steps = Math.floor(accDistanceRef.current / 12);
            setCurrentFrame((prev) => (prev + steps) % 10);
            accDistanceRef.current %= 12;
          }

          setIsWalking(true);
          lastScrollYRef.current = currentY;
          tickingRef.current = false;

          window.clearTimeout(stopTimerRef.current);
          stopTimerRef.current = window.setTimeout(() => {
            setIsWalking(false);
            setCurrentFrame(0); // Return to resting pose
          }, 150);
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(stopTimerRef.current);
    };
  }, []);

  return (
    <aside className={styles.container} aria-label="Progresso de leitura com mascote" aria-hidden="true">
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${scrollProgress}%` }} />
        <div
          className={styles.walkerAnchor}
          style={{
            left: `calc(10px + (${scrollProgress} * (100% - 94px) / 100))`,
          }}
          data-direction={direction}
        >
          <div
            className={styles.spriteCharacter}
            style={{
              backgroundImage: `url(${walkerSpritesheet})`,
              backgroundPosition: `${(currentFrame / 9) * 100}% 0%`,
            }}
            data-walking={isWalking}
          />
          <div className={styles.shadow} />
        </div>
      </div>
    </aside>
  );
}
