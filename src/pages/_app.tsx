import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import '../styles/global.css';

import { ChallengeProvider } from '../hooks/useChallenges';
import { CountdownProvider } from '../hooks/useCountdown';

function App({ Component, pageProps }) {
  return (
    <ChallengeProvider>
      <CountdownProvider>
        <ToastContainer position="top-center" autoClose={5000} pauseOnHover />

        <Component {...pageProps} />
      </CountdownProvider>
    </ChallengeProvider>
  );
}

export default App;
