import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useEffect,
  // useRef,
} from 'react';
import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';

import challenges from '../../../challenges.json';

interface IChallenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface IChallengeContextData {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
  experienceToNextLevel: number;
  // levelUpCompleted: boolean;
  activeChallenge: IChallenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface IChallengeProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export const ChallengesContext = createContext({} as IChallengeContextData);

export function ChallengeProvider({
  children,
  ...rest
}: IChallengeProviderProps) {
  // const levelUpCompletedRef = useRef(0);

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0,
  );
  const [challengeCompleted, setChallengeCompleted] = useState(
    rest.challengeCompleted ?? 0,
  );
  // const [levelUpCompleted, setLevelUpCompleted] = useState(false);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = useMemo(() => {
    return Math.pow((level + 1) * 4, 2);
  }, [level]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengeCompleted', String(challengeCompleted));
  }, [challengeCompleted, currentExperience, level]);

  // useEffect(() => {
  //   if (levelUpCompleted) {
  //     levelUpCompletedRef.current = window.setTimeout(() => {
  //       setLevelUpCompleted(false);
  //     }, 5000);

  //     return () => window.clearTimeout(levelUpCompletedRef.current);
  //   }
  // }, [levelUpCompleted]);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Você tem um novo desafio!! Bora?! 🎉', {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
      // setLevelUpCompleted(true);

      new Audio('/levelup.mp3').play();

      // toast.dark('🦄 Parabéns!!! Você subiu de level!!', {
      //   position: 'top-center',
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   pauseOnHover: true,
      // });
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengeCompleted(challengeCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengeCompleted,
        experienceToNextLevel,
        activeChallenge,
        // levelUpCompleted,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
