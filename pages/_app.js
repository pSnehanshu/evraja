import NextNprogress from 'nextjs-progressbar';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />

      <NextNprogress
        color="#f00"
        startPosition={0.3}
        stopDelayMs={200}
        height="3"
        options={{ showSpinner: false }}
      />
    </>
  );
}

export default MyApp;
