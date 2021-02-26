import { useContext } from 'react';
import { ChallengesContext } from '../../hooks/useChallenges';

import styles from '../../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img
        src="https://github.com/tavareshenrique.png"
        alt="Henrique Tavares"
        title="Henrique Tavares"
      />
      <div>
        <strong>Henrique Tavares</strong>
        <p>
          <img src="icons/level.svg" alt="Level" title="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
