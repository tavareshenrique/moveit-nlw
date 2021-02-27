import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import swal from 'sweetalert';

import api from '../../services/api';

import { ChallengesContext } from '../../hooks/useChallenges';

import styles from '../../styles/components/Profile.module.css';

interface IGithubAPI {
  name: string;
  avatar_url: string;
}

interface IProfileProps {
  name: string;
  avatar_url: string;
}

export function Profile({ name, avatar_url }: IProfileProps) {
  const { level } = useContext(ChallengesContext);

  const [profileName, setProfileName] = useState(name ?? null);
  const [profileImage, setProfileImage] = useState(avatar_url ?? null);

  useEffect(() => {
    if (!name && !avatar_url) {
      swal({
        text: 'Informe o seu nome de usuário do Github.',
        content: {
          element: 'input',
        },
      })
        .then(async name => {
          if (!name) return swal('Nennhum usuário informado!');

          const githubData = await api.get<IGithubAPI>(`users/${name}`);

          setProfileName(githubData.data.name);
          setProfileImage(githubData.data.avatar_url);

          Cookies.set('userName', githubData.data.name);
          Cookies.set('userImage', githubData.data.avatar_url);
        })
        .catch(err => {
          if (err) {
            swal(
              'Ops',
              'Houve algum problema ao localizar os seus dados',
              'error',
            );
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    }
  }, [avatar_url, name]);

  return (
    <div className={styles.profileContainer}>
      <img
        src={profileImage ?? 'logo-full.svg'}
        alt={profileName}
        title={profileName}
      />
      <div>
        <strong>{profileName ?? 'Você'}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" title="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
