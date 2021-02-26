import '../styles/global.css';

import { ChallengeProvider } from '../hooks/useChallenges';
import { CountdownProvider } from '../hooks/useCountdown';

function App({ Component, pageProps }) {
  return (
    <ChallengeProvider>
      <CountdownProvider>
        <Component {...pageProps} />
      </CountdownProvider>
    </ChallengeProvider>
  );
}

export default App;
