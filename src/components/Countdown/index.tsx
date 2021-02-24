import { useState, useMemo, useEffect, useRef, useContext } from 'react';

import { ChallengesContext } from '../../hooks/useChallenges';

import styles from '../../styles/components/Countdown.module.css';

export function Countdown() {
  const countdownTimeoutRef = useRef(0);

  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = useMemo(() => {
    return Math.floor(time / 60);
  }, [time]);

  const seconds = useMemo(() => {
    return Math.floor(time % 60);
  }, [time]);

  const [minuteLeft, minuteRight] = useMemo(() => {
    return String(minutes).padStart(2, '0').split('');
  }, [minutes]);

  const [secondsLeft, secondsRight] = useMemo(() => {
    return String(seconds).padStart(2, '0').split('');
  }, [seconds]);

  function startCountdown() {
    if (!isActive) {
      setIsActive(true);
    }
  }

  function resetCountdown() {
    window.clearTimeout(countdownTimeoutRef.current);
    setIsActive(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeoutRef.current = window.setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, startNewChallenge, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar Ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
