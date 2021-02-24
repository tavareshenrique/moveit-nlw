import '../styles/global.css';

import { ChallengeProvider } from '../hooks/useChallenges';

function App({ Component, pageProps }) {
  return (
    <ChallengeProvider>
      <Component {...pageProps} />
    </ChallengeProvider>
  );
}

export default App;
