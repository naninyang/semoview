import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';
import { JejeupPamalinkData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import YouTubeController from '@/components/YouTubeController';
import Anchor from '@/components/Anchor';
import { vectors } from '@/components/vectors';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingNumber } from '@/components/RatingNumber';
import { FormatDate } from '@/components/FormatDate';
import { formatJaLang } from '@/components/formatJaLang';
import styles from '@/styles/Jejeup.module.sass';

const BackButton = styled.i({
  display: 'block',
  background: `url(${vectors.backward}) no-repeat 50% 50%/contain`,
});

export default function JejeupDetail({ jejeupData }: { jejeupData: JejeupPamalinkData | null; musicData: any }) {
  const router = useRouter();
  let savedScrollPosition;

  const handleBackClick = () => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition_' + router.asPath);
    if (savedScrollPosition) {
      router.back();
    }
  };

  const [timeoutReached, setTimeoutReached] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!jejeupData) {
    if (timeoutReached) {
      return (
        <main className={styles.jejeup}>
          <p className={styles.error}>
            영상을 불러오지 못했습니다. 삭제된 영상이거나 인터넷 속도가 느립니다.{' '}
            <Anchor href="/jejeups">뒤로가기</Anchor>
          </p>
        </main>
      );
    } else {
      return (
        <main className={styles.jejeup}>
          <p className={styles.loading}>영상 불러오는 중...</p>
        </main>
      );
    }
  }

  return (
    <main className={styles.jejeup}>
      <Seo
        pageTitles={`${jejeupData.attributes.subject} - ${originTitle}`}
        pageTitle={`${jejeupData.attributes.subject}`}
        pageDescription={jejeupData.attributes.description}
        pageImg={`https://i.ytimg.com/vi_webp/${jejeupData.attributes.video}/maxresdefault.webp`}
        pageOgType={'video.other'}
      />
      <div className="top-link">
        {savedScrollPosition ? (
          <button onClick={handleBackClick}>
            <BackButton />
            <span>뒤로가기</span>
          </button>
        ) : (
          <Anchor href="/">
            <BackButton />
            <span>뒤로가기</span>
          </Anchor>
        )}
      </div>
      <article className={styles['article-jejeup']}>
        {jejeupData.jejeupMetaData && !jejeupData.jejeupMetaData.error && (
          <div className={`${styles.preview} preview`}>
            <YouTubeController videoId={jejeupData.attributes.video} vi={jejeupData.attributes.vi} />
            <div className={styles.youtube}>
              <h1>{jejeupData.jejeupMetaData.ogTitle}</h1>
              <div className={styles.detail}>
                <Image src={`${jejeupData.jejeupMetaData.ownerAvatar}`} width="36" height="36" alt="" unoptimized />
                <div className={styles.user}>
                  <cite>{jejeupData.jejeupMetaData.ownerName}</cite>
                  <time dateTime={jejeupData.jejeupMetaData.datePublished}>
                    {FormatDate(`${jejeupData.jejeupMetaData.datePublished}`)}
                  </time>
                </div>
              </div>
              <p>{jejeupData.jejeupMetaData.ogDescription}</p>
            </div>
          </div>
        )}
        <div className={styles.figcaption}>
          <dl className={styles.summary}>
            <dt>
              <em>{CategoryName(jejeupData.attributes.category)}</em>
              {jejeupData.attributes.category === 'animation' && <em>{AnimeName(jejeupData.attributes.anime)}</em>}
              {(jejeupData.attributes.category === 'drama' ||
                jejeupData.attributes.anime === 'tva' ||
                jejeupData.attributes.anime === 'ova') &&
                jejeupData.attributes.rating !== 'd19' && (
                  <i className={styles.drama}>{RatingNumber(jejeupData.attributes.rating)}</i>
                )}
              {(jejeupData.attributes.category === 'drama' ||
                jejeupData.attributes.anime === 'tva' ||
                jejeupData.attributes.anime === 'ova') &&
                jejeupData.attributes.rating === 'd19' && (
                  <i className={`${styles.drama} ${styles.d19}`}>{RatingNumber(jejeupData.attributes.rating)}</i>
                )}
              {(jejeupData.attributes.category === 'movie' || jejeupData.attributes.anime === 'movie') &&
                jejeupData.attributes.rating === 'all' && (
                  <i className={`${styles.movie} ${styles.all}`}>{RatingNumber(jejeupData.attributes.rating)}</i>
                )}
              {(jejeupData.attributes.category === 'movie' || jejeupData.attributes.anime === 'movie') &&
                jejeupData.attributes.rating === 'b12' && (
                  <i className={`${styles.movie} ${styles.b12}`}>{RatingNumber(jejeupData.attributes.rating)}</i>
                )}
              {(jejeupData.attributes.category === 'movie' || jejeupData.attributes.anime === 'movie') &&
                jejeupData.attributes.rating === 'c15' && (
                  <i className={`${styles.movie} ${styles.c15}`}>{RatingNumber(jejeupData.attributes.rating)}</i>
                )}
              {(jejeupData.attributes.category === 'movie' || jejeupData.attributes.anime === 'movie') &&
                jejeupData.attributes.rating === 'd19' && (
                  <i className={`${styles.movie} ${styles.d19}`}>{RatingNumber(jejeupData.attributes.rating)}</i>
                )}
              {jejeupData.attributes.category === 'game' && jejeupData.attributes.rating === 'all' && (
                <i className={`${styles.game} ${styles.all}`}>{RatingNumber(jejeupData.attributes.rating)}</i>
              )}
              {jejeupData.attributes.category === 'game' && jejeupData.attributes.rating === 'b12' && (
                <i className={`${styles.game} ${styles.b12}`}>{RatingNumber(jejeupData.attributes.rating)}</i>
              )}
              {jejeupData.attributes.category === 'game' && jejeupData.attributes.rating === 'c15' && (
                <i className={`${styles.game} ${styles.c15}`}>{RatingNumber(jejeupData.attributes.rating)}</i>
              )}
              {jejeupData.attributes.category === 'game' && jejeupData.attributes.rating === 'd19' && (
                <i className={`${styles.game} ${styles.d19}`}>{RatingNumber(jejeupData.attributes.rating)}</i>
              )}
            </dt>
            <dd>
              <strong
                dangerouslySetInnerHTML={{
                  __html: `${formatJaLang(jejeupData.attributes.description)} (${jejeupData.attributes.release})`,
                }}
              />
            </dd>
          </dl>
          <dl className={styles.info}>
            <div>
              <dt>제작국가</dt>
              <dd>{jejeupData.attributes.country}</dd>
            </div>
            <div>
              <dt>장르</dt>
              <dd>{jejeupData.attributes.genre}</dd>
            </div>
            <div>
              <dt>퍼블리셔</dt>
              <dd>{jejeupData.attributes.publisher}</dd>
            </div>
            <div>
              <dt>주요 제작자</dt>
              <dd>{jejeupData.attributes.creator}</dd>
            </div>
            {jejeupData.attributes.category !== 'game' && (
              <div>
                <dt>주요 출연자</dt>
                <dd>{jejeupData.attributes.cast}</dd>
              </div>
            )}
          </dl>
        </div>
      </article>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const jejeupId = context.params?.jejeupId;
  let jejeupData = null;

  if (jejeupId && typeof jejeupId === 'string') {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jejeups?id=${jejeupId.substring(14)}`);
    const jejeupResponse = (await response.json()) as { data: JejeupPamalinkData };
    jejeupData = jejeupResponse;
  }

  if (!jejeupData) {
    return {
      props: {
        jejeupData: null,
      },
    };
  }

  return {
    props: {
      jejeupData,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
