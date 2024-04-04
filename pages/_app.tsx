import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Lato, Noto_Sans_JP, Noto_Sans_KR, Noto_Sans_SC, Noto_Sans_TC, Noto_Sans_Thai } from 'next/font/google';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { GA_TRACKING_ID, pageview } from '@/lib/gtag';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.sass';

const fontKR = Noto_Sans_KR({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['cyrillic'],
});

const fontEN = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
});

const fontJP = Noto_Sans_JP({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['vietnamese'],
});

const fontSC = Noto_Sans_SC({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['vietnamese'],
});

const fontTC = Noto_Sans_TC({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['vietnamese'],
});

const fontTH = Noto_Sans_Thai({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['thai'],
});

const NanumSquare = localFont({
  src: [
    {
      path: '../fonts/NanumSquareL.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/NanumSquareR.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/NanumSquareB.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/NanumSquareEB.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const registInit = async () => {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        registration.waiting?.postMessage('SKIP_WAITING');
      };
      registInit();
    }
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <style jsx global>
        {`
          body,
          pre,
          input,
          button,
          textarea {
            font-family: ${NanumSquare.style.fontFamily}, sans-serif;
            font-weight: 400;
          }
          select,
          .lang {
            font-family: ${fontEN.style.fontFamily}, ${fontJP.style.fontFamily}, ${fontTH.style.fontFamily},
              ${fontSC.style.fontFamily}, ${fontTC.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
            font-weight: 400;
            white-space: break-spaces;
            word-wrap: break-word;
            word-break: normal;
          }
          [lang='ja'] {
            font-family: ${fontJP.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
            white-space: break-spaces;
            word-wrap: break-word;
            word-break: normal;
          }
          [lang='th'] {
            font-family: ${fontTH.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
          }
          [lang='zh-Hans'] {
            font-family: ${fontSC.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
          }
          [lang='zh-Hant'] {
            font-family: ${fontTC.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
          }
          .preview {
            font-family: ${fontEN.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
          }
          .number,
          time {
            font-family: ${fontEN.style.fontFamily}, sans-serif;
          }
        `}
      </style>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
