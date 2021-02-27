import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ChallengeProvider } from '../hooks/useChallenges';
import { CountdownProvider } from '../hooks/useCountdown';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css';

interface IHomeProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
  userName: string;
  userImage: string;
}

export default function Home({
  level,
  currentExperience,
  challengeCompleted,
  userName,
  userImage,
}: IHomeProps) {
  return (
    <ChallengeProvider
      level={level}
      currentExperience={currentExperience}
      challengeCompleted={challengeCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | Move It</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile name={userName} avatar_url={userImage} />
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
  const {
    level,
    currentExperience,
    challengeCompleted,
    userName,
    userImage,
  } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted),
      userName: userName ?? null,
      userImage: userImage ?? null,
    },
  };
};
