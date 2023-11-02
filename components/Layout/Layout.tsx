import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
	children?: JSX.Element | ReactNode,
	title?: string
}

const Layout = ({ children, title = "Home"}: Props): JSX.Element => (
	<div>
		<Head>
			<title>{`${title}`}</title>
			<meta charSet="utf-8"/>
			<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
			<link rel="apple-touch-icon" sizes="180x180" href="/images/logo/apple-touch-icon.png"/>
			<link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32x32.png"/>
			<link rel="icon" type="image/png" sizes="16x16" href="/images/logo/favicon-16x16.png"/>
			<link rel="manifest" href="/site.webmanifest"/>
  			<meta name="theme-color" content="#000000"/>
		</Head>
		{children}
		<footer>

		</footer>
	</div>
);

export default Layout;