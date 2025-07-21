import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta tags */}
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Ultimate Tours" />

        {/* Theme colors */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ultimate Tours" />
        <meta property="og:title" content="Ultimate Tours - Catch Your Smile" />
        <meta
          property="og:description"
          content="Your trusted travel partner since 2009. Explore amazing destinations with our carefully crafted tour packages."
        />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Ultimate Tours - Catch Your Smile"
        />
        <meta
          property="twitter:description"
          content="Your trusted travel partner since 2009. Explore amazing destinations with our carefully crafted tour packages."
        />
        <meta property="twitter:image" content="/og-image.jpg" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
