import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserAuthProvider } from "@/contexts/UserAuthContext";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps, router }: AppProps) {
  // Pages that should not show header/footer (like admin pages or auth pages)
  const noLayoutPages = ["/admin"];
  const isNoLayoutPage = noLayoutPages.some((page) =>
    router.pathname.startsWith(page)
  );

  // Auth pages that should not show header/footer
  const authPages = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/admin/login",
    "/verify-email",
  ];
  const isAuthPage = authPages.includes(router.pathname);

  return (
    <>
      <Head>
        <title>Ultimate Tours - Catch Your Smile</title>
        <meta
          name="description"
          content="Ultimate Tours - Your trusted travel partner since 2009. Explore amazing destinations with our carefully crafted tour packages."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthProvider>
        <UserAuthProvider>
          <div className={`${inter.className} min-h-screen flex flex-col`}>
            {/* Show header and footer for regular pages */}
            {!isNoLayoutPage && !isAuthPage && <Header />}

            <main className="flex-grow">
              <Component {...pageProps} />
            </main>

            {!isNoLayoutPage && !isAuthPage && <Footer />}
          </div>
        </UserAuthProvider>
      </AuthProvider>
    </>
  );
}
