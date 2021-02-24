import { useContext, useMemo } from 'react';

import { ChallengesContext } from '../../hooks/useChallenges';

import styles from '../../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(
    ChallengesContext,
  );

  const percenToNextLevel = useMemo(() => {
    return Math.round(currentExperience * 100) / experienceToNextLevel;
  }, [currentExperience, experienceToNextLevel]);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percenToNextLevel}%` }} />

        {percenToNextLevel !== 0 && (
          <span
            className={styles.currentExperience}
            style={{ left: `${percenToNextLevel}%` }}
          >
            {currentExperience} xp
          </span>
        )}
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
