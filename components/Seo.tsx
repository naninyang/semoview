import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
  pageTitles?: string;
  pageTitle: string;
  pageDescription: string;
  pageImg?: string;
  pageImgWidth?: number;
  pageImgHeight?: number;
  pageOgType?: string;
}

export const originTitle = '제목에 제목이 없어서 짜증나서 만든 사이트';

const Seo = ({ pageTitles, pageTitle, pageDescription, pageImg, pageImgWidth, pageImgHeight, pageOgType }: Props) => {
  const router = useRouter();
  const pagePath = router.asPath;
  const domain = 'https://jejeup.dev1stud.io';
  const defaultTitle = `${originTitle}`;
  const defaultDescription = '클릭하지 않아도 제목과 정보를 알 수 있게 도와드려요';
  const title = pageTitles || defaultTitle;
  const description = pageDescription || defaultDescription;
  const url = `${domain}${pagePath}`;
  const imgUrl = `${pageImg}`;
  const imgWidth = pageImgWidth || 1280;
  const imgHeight = pageImgHeight || 630;
  const ogType = pageOgType || 'website';

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="description" content={description} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:site" content={defaultTitle} />
      <meta name="twitter:image" content={imgUrl} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" href={url} hrefLang="ko-KR" />
    </Head>
  );
};

export default Seo;
