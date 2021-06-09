// Styles
import '../styles/globals.scss';

// Third Party Styles
import '../styles/tailwind.css';

// Component Level Types
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container mx-auto my-10 max-w-xl">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
