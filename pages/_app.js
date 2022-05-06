import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>Header</header>
      <Component {...pageProps} />
      <footer>Footer</footer>
    </>
  );
}

export default MyApp;
