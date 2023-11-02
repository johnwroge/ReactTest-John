import type { AppProps } from "next/app";

import "@styles/styles.sass";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
		<Component {...pageProps}/>
);

export default App;