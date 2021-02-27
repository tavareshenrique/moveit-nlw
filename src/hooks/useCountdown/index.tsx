import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ChallengesContext } from '../useChallenges';

interface ICountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface ICountdowProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as ICountdownContextData);

export function CountdownProvider({ children }: ICountdowProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const countdownTimeoutRef = useRef(0);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = useMemo(() => {
    return Math.floor(time / 60);
  }, [time]);

  const seconds = useMemo(() => {
    return Math.floor(time % 60);
  }, [time]);

  function startCountdown() {
    if (!isActive) {
      setIsActive(true);
    }
  }

  function resetCountdown() {
    window.clearTimeout(countdownTimeoutRef.current);
    setIsActive(false);
    setHasFinished(false);
    setTime(25 * 60);
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
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,
        resetCountdown,
        startCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
