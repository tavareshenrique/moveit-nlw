import Head from 'next/head';

import '../styles/global.css';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Move It</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default App
