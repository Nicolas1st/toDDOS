import '@/styles/normalize.css';
import '@/styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <Component
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...pageProps}
    />
  );
}
