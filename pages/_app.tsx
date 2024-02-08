import type { AppProps } from 'next/app';
import { Lato, Noto_Sans_JP, Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';
import '@/styles/globals.sass';
import Header from '@/components/Header';

const fontKR = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: ['cyrillic'],
});

const fontEN = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
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
  return (
    <>
      <style jsx global>
        {`
          body,
          pre,
          input,
          button,
          textarea,
          select {
            font-family: ${NanumSquare.style.fontFamily}, monospace;
          }
          .preview {
            font-family: ${fontKR.style.fontFamily};
          }
          time {
            font-family: ${fontEN.style.fontFamily};
          }
        `}
      </style>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
