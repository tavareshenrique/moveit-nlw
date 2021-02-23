import { useState, useMemo, useEffect } from 'react';
import styles from '../../styles/components/Countdown.module.css';

export function Countdown() {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

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
    if (!active) {
      setActive(true);
    }
  }

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [active, time]);

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

      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
}
