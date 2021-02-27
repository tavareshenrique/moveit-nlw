import { GetServerSideProps } from 'next';
import Head from 'next/head';

// import useWindowSize from 'react-use/lib/useWindowSize';

// import Confetti from 'react-confetti';

import { ChallengeProvider } from '../hooks/useChallenges';
import { CountdownProvider } from '../hooks/useCountdown';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css';
// import { useContext } from 'react';
// import { ChallengesContext } from '../hooks/useChallenges';

interface IHomeProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export default function Home({
  level,
  currentExperience,
  challengeCompleted,
}: IHomeProps) {
  // const { width, height } = useWindowSize();

  // const { levelUpCompleted } = useContext(ChallengesContext);

  return (
    <ChallengeProvider
      level={level}
      currentExperience={currentExperience}
      challengeCompleted={challengeCompleted}
    >
      {/* {levelUpCompleted && <Confetti width={width} height={height} />} */}

      <div className={styles.container}>
        <Head>
          <title>Inicio | Move It</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted),
    },
  };
};
