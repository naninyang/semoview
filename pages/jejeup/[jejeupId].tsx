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
import { RatingsDrama } from '@/components/RatingsDrama';
import { FormatDate } from '@/components/FormatDate';
import { FormatLang } from '@/components/FormatLang';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Jejeup.module.sass';

const BackButton = styled.i({
  display: 'block',
  background: `url(${vectors.backward}) no-repeat 50% 50%/contain`,
});

const AmazonOriginal = styled.i({
  width: rem(52),
  background: `url(${vectors.ott.amazon}) no-repeat 50% 50%/contain`,
});

const AppleOriginal = styled.i({
  width: rem(42),
  background: `url(${vectors.ott.apple}) no-repeat 50% 50%/contain`,
});

const DisneyOriginal = styled.i({
  width: rem(29),
  background: `url(${vectors.ott.disney}) no-repeat 50% 50%/contain`,
});

const NetflixOriginal = styled.i({
  width: rem(59),
  background: `url(${vectors.ott.netflix}) no-repeat 50% 50%/contain`,
});

const TvingOriginal = styled.i({
  width: rem(63),
  background: `url(${vectors.ott.tving}) no-repeat 50% 50%/contain`,
});

const WatchaOriginal = styled.i({
  width: rem(55),
  background: `url(${vectors.ott.watcha}) no-repeat 50% 50%/contain`,
});

const WavveOriginal = styled.i({
  width: rem(72),
  background: `url(${vectors.ott.wavve}) no-repeat 50% 50%/contain`,
});

const RatingFilmAll = styled.i({
  background: `url(${vectors.ratings.film.all}) no-repeat 50% 50%/contain`,
});

const RatingFilmB12 = styled.i({
  background: `url(${vectors.ratings.film.b12}) no-repeat 50% 50%/contain`,
});

const RatingFilmC15 = styled.i({
  background: `url(${vectors.ratings.film.c15}) no-repeat 50% 50%/contain`,
});

const RatingFilmD18 = styled.i({
  background: `url(${vectors.ratings.film.d18}) no-repeat 50% 50%/contain`,
});

const RatingGameAll = styled.i({
  background: `url(${vectors.ratings.game.all}) no-repeat 50% 50%/contain`,
});

const RatingGameB12 = styled.i({
  background: `url(${vectors.ratings.game.b12}) no-repeat 50% 50%/contain`,
});

const RatingGameC15 = styled.i({
  background: `url(${vectors.ratings.game.c15}) no-repeat 50% 50%/contain`,
});

const RatingGameD19 = styled.i({
  background: `url(${vectors.ratings.game.d19}) no-repeat 50% 50%/contain`,
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
        pageDescription={`${jejeupData.attributes.description} (${jejeupData.attributes.release})`}
        pageImg={jejeupData.jejeupMetaData.ogImage}
        pageOgType={'video.other'}
        pageImgWidth={1920}
        pageImgHeight={1080}
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
            <YouTubeController videoId={jejeupData.attributes.video} videoImage={jejeupData.jejeupMetaData.ogImage} />
            <div className={styles.youtube}>
              <h1>{jejeupData.jejeupMetaData.ogTitle}</h1>
              <div className={styles.detail}>
                <Image
                  src={`${jejeupData.jejeupMetaData.ownerAvatar === null ? jejeupData.attributes.ownerAvatar : jejeupData.jejeupMetaData.ownerAvatar}`}
                  width="36"
                  height="36"
                  alt=""
                  unoptimized
                />
                <div className={styles.user}>
                  <cite>{jejeupData.jejeupMetaData.ownerName}</cite>
                  <time dateTime={jejeupData.jejeupMetaData.datePublished}>
                    {FormatDate(`${jejeupData.jejeupMetaData.datePublished}`)}
                  </time>
                </div>
              </div>
              {jejeupData.jejeupMetaData.ogDescription ? (
                <p>{jejeupData.jejeupMetaData.ogDescription}</p>
              ) : (
                <p>
                  <strong>유튜버가 더보기 정보를 등록하지 않았습니다.</strong>
                </p>
              )}
            </div>
          </div>
        )}
        <div className={styles.figcaption}>
          <dl className={styles.summary}>
            <dt>
              {jejeupData.attributes.ott === 'wavveOnly' && (
                <cite>
                  <WavveOriginal /> 웨이브 독점 스트리밍
                </cite>
              )}
              {jejeupData.attributes.category !== 'ott' && jejeupData.attributes.category !== 'ottFilm' && (
                <em>{CategoryName(jejeupData.attributes.category)}</em>
              )}
              {jejeupData.attributes.category === 'animation' && <em>{AnimeName(jejeupData.attributes.anime)}</em>}
              {jejeupData.attributes.ott === 'amazonOriginal' && (
                <cite>
                  <AmazonOriginal /> 아마존 오리지널
                </cite>
              )}
              {jejeupData.attributes.ott === 'appleOriginal' && (
                <cite>
                  <AppleOriginal /> 애플 티비+ 오리지널
                </cite>
              )}
              {jejeupData.attributes.ott === 'appleFilm' && (
                <cite>
                  <AppleOriginal /> 애플 티비+ 오리지널 영화
                </cite>
              )}
              {jejeupData.attributes.ott === 'disneyOriginal' && (
                <cite>
                  <DisneyOriginal /> 디즈니+ 오리지널
                </cite>
              )}
              {jejeupData.attributes.ott === 'netflixOriginal' && (
                <cite>
                  <NetflixOriginal /> 넷플릭스 오리지널
                </cite>
              )}
              {jejeupData.attributes.ott === 'netflixFilm' && (
                <cite>
                  <NetflixOriginal /> 넷플릭스 오리지널 영화
                </cite>
              )}
              {jejeupData.attributes.ott === 'netflixAnime' && (
                <cite>
                  <NetflixOriginal /> 넷플릭스 오리지널 애니메이션
                </cite>
              )}
              {jejeupData.attributes.ott === 'netflixAnimeFilm' && (
                <cite>
                  <NetflixOriginal /> 넷플릭스 오리지널 애니메이션 영화
                </cite>
              )}
              {jejeupData.attributes.ott === 'tvingOriginal' && (
                <cite>
                  <TvingOriginal /> 티빙 오리지널
                </cite>
              )}
              {jejeupData.attributes.ott === 'watchaOriginal' && (
                <cite>
                  <WatchaOriginal /> 왓챠 오리지널
                </cite>
              )}
              {jejeupData.attributes.ott === 'wavveOriginal' && (
                <cite>
                  <WavveOriginal /> 웨이브 오리지널
                </cite>
              )}
              {(jejeupData.attributes.category === 'drama' ||
                jejeupData.attributes.category === 'ott' ||
                jejeupData.attributes.anime === 'tva' ||
                jejeupData.attributes.anime === 'ova') &&
                jejeupData.attributes.rating !== 'd19' && (
                  <>
                    {jejeupData.attributes.rating === 'all' ? (
                      <i className={`${styles.drama} ${styles.all} number`}>
                        {RatingsDrama(jejeupData.attributes.rating)}
                      </i>
                    ) : (
                      <i className={`${styles.drama} number`}>{RatingsDrama(jejeupData.attributes.rating)}</i>
                    )}
                  </>
                )}
              {(jejeupData.attributes.category === 'drama' ||
                jejeupData.attributes.category === 'ott' ||
                jejeupData.attributes.anime === 'tva' ||
                jejeupData.attributes.anime === 'ova') &&
                jejeupData.attributes.rating === 'd19' && (
                  <i className={`${styles.drama} ${styles.d19} number`}>{RatingsDrama(jejeupData.attributes.rating)}</i>
                )}
              {(jejeupData.attributes.category === 'movie' ||
                jejeupData.attributes.category === 'ottFilm' ||
                jejeupData.attributes.anime === 'movie') &&
                jejeupData.attributes.rating === 'all' && (
                  <>
                    <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                  </>
                )}
              {(jejeupData.attributes.category === 'movie' ||
                jejeupData.attributes.category === 'ottFilm' ||
                jejeupData.attributes.anime === 'movie') &&
                jejeupData.attributes.rating === 'b12' && (
                  <>
                    <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                  </>
                )}
              {(jejeupData.attributes.category === 'movie' ||
                jejeupData.attributes.category === 'ottFilm' ||
                jejeupData.attributes.anime === 'movie') &&
                jejeupData.attributes.rating === 'c15' && (
                  <>
                    <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                  </>
                )}
              {(jejeupData.attributes.category === 'movie' ||
                jejeupData.attributes.category === 'ottFilm' ||
                jejeupData.attributes.anime === 'movie') &&
                jejeupData.attributes.rating === 'd19' && (
                  <>
                    <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                  </>
                )}
              {jejeupData.attributes.category === 'game' && jejeupData.attributes.rating === 'all' && (
                <>
                  <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                </>
              )}
              {jejeupData.attributes.category === 'game' && jejeupData.attributes.rating === 'b12' && (
                <>
                  <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                </>
              )}
              {jejeupData.attributes.category === 'game' && jejeupData.attributes.rating === 'c15' && (
                <>
                  <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                </>
              )}
              {jejeupData.attributes.category === 'game' && jejeupData.attributes.rating === 'd19' && (
                <>
                  <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                </>
              )}
            </dt>
            <dd>
              <strong
                dangerouslySetInnerHTML={{
                  __html: `${FormatLang(jejeupData.attributes.description)} (${jejeupData.attributes.release})`,
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
          {(jejeupData.attributes.posterDefault || jejeupData.attributes.posterOther) && (
            <div className={styles.posters}>
              <h2>{jejeupData.attributes.category === 'game' ? '게임 공식 배너' : '포스터'}</h2>
              <div
                className={`${styles['poster-list']} ${jejeupData.attributes.category === 'game' ? styles['posters-game'] : styles['posters-other']}`}
              >
                {jejeupData.attributes.posterDefault && (
                  <div className={styles.poster}>
                    <Image
                      src={jejeupData.attributes.posterDefault}
                      alt=""
                      width={jejeupData.attributes.category === 'game' ? 460 : 390}
                      height={jejeupData.attributes.category === 'game' ? 215 : 560}
                      unoptimized
                    />
                  </div>
                )}
                <div className={styles.poster}>
                  {jejeupData.attributes.posterOther && (
                    <Image
                      src={jejeupData.attributes.posterOther}
                      alt=""
                      width={jejeupData.attributes.category === 'game' ? 460 : 390}
                      height={jejeupData.attributes.category === 'game' ? 215 : 560}
                      unoptimized
                    />
                  )}
                </div>
              </div>
            </div>
          )}
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
