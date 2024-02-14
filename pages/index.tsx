import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import PullToRefresh from 'react-simple-pull-to-refresh';
import useSWRInfinite from 'swr/infinite';
import styled from '@emotion/styled';
import { Masonry } from 'masonic';
import { JejeupData } from 'types';
import Seo from '@/components/Seo';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { FormatLang } from '@/components/FormatLang';
import { FormatDate } from '@/components/FormatDate';
import { vectors } from '@/components/vectors';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Home.module.sass';

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

export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  });

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${process.env.NEXT_PUBLIC_API_URL}/api/jejeups?page=${pageIndex + 1}`;
};

export default function Home() {
  const timestamp = Date.now();

  useEffect(() => {
    localStorage.removeItem('currentPage');
  }, []);

  const router = useRouter();

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const itemId = Array.isArray(router.query.itemId) ? router.query.itemId[0] : router.query.itemId;

  const jejeups = data ? [].concat(...data) : [];
  const isLoading = !data && !error;
  const isReachingEnd = data && data[data.length - 1]?.length < 20;

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting && !isReachingEnd && !isLoading && (size === 0 || size === 1)) {
      setSize((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(onIntersect);
    observer.observe(target);
    return () => observer && observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!target || isLoading) return;
  }, [target, isLoading]);

  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (itemId !== undefined) {
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    }

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [itemId]);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 671) setColumnCount(1);
    else if (width >= 671 && width <= 922) setColumnCount(2);
    else if (width >= 922 && width <= 1396) setColumnCount(3);
    else setColumnCount(4);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderCard = ({ data }: { data: JejeupData }) => (
    <div className={styles.item}>
      <figure>
        {data.jejeupMetaData && !data.jejeupMetaData.error && (
          <div className={`${styles.preview} preview`}>
            <div className={styles['preview-container']}>
              <Image src={data.jejeupMetaData.ogImage} width="1920" height="1080" alt="" unoptimized />
              <div className={styles['preview-info']}>
                <div className={styles.detail}>
                  <Image src={`${data.jejeupMetaData.ownerAvatar}`} width="36" height="36" alt="" unoptimized />
                  <div className={`${styles['user-info']}`}>
                    <strong>{data.jejeupMetaData.ogTitle}</strong>{' '}
                    <div className={styles.user}>
                      <cite>{data.jejeupMetaData.ownerName}</cite>
                      <time dateTime={data.jejeupMetaData.datePublished}>
                        {FormatDate(`${data.jejeupMetaData.datePublished}`)}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <figcaption>
          <Link key={data.idx} href={`/jejeup/${data.idx}`} scroll={false} shallow={true}>
            <dl className={styles.summary}>
              <dt>
                {data.category !== 'ott' && <em>{CategoryName(data.category)}</em>}
                {data.category === 'animation' && <em>{AnimeName(data.anime)}</em>}
                {data.ott === 'amazonOriginal' && (
                  <cite>
                    <AmazonOriginal /> 아마존 오리지널
                  </cite>
                )}
                {data.ott === 'appleOriginal' && (
                  <cite>
                    <AppleOriginal /> 애플 티비+ 오리지널
                  </cite>
                )}
                {data.ott === 'disneyOriginal' && (
                  <cite>
                    <DisneyOriginal /> 디즈니+ 오리지널
                  </cite>
                )}
                {data.ott === 'netflixOriginal' && (
                  <cite>
                    <NetflixOriginal /> 넷플릭스 오리지널
                  </cite>
                )}
                {data.ott === 'netflixFilm' && (
                  <cite>
                    <NetflixOriginal /> 넷플릭스 오리지널 영화
                  </cite>
                )}
                {data.ott === 'netflixAnime' && (
                  <cite>
                    <NetflixOriginal /> 넷플릭스 오리지널 애니메이션
                  </cite>
                )}
                {data.ott === 'netflixAnimeFilm' && (
                  <cite>
                    <NetflixOriginal /> 넷플릭스 오리지널 애니메이션 영화
                  </cite>
                )}
                {data.ott === 'tvingOriginal' && (
                  <cite>
                    <TvingOriginal /> 티빙 오리지널
                  </cite>
                )}
                {data.ott === 'watchaOriginal' && (
                  <cite>
                    <WatchaOriginal /> 왓챠 오리지널
                  </cite>
                )}
                {data.ott === 'wavveOriginal' && (
                  <cite>
                    <WavveOriginal /> 웨이브 오리지널
                  </cite>
                )}
                {(data.category === 'drama' ||
                  data.category === 'ott' ||
                  data.anime === 'tva' ||
                  data.anime === 'ova') &&
                  data.rating !== 'd19' && <i className={`${styles.drama} number`}>{RatingsDrama(data.rating)}</i>}
                {(data.category === 'drama' ||
                  data.category === 'ott' ||
                  data.anime === 'tva' ||
                  data.anime === 'ova') &&
                  data.rating === 'd19' && (
                    <i className={`${styles.drama} ${styles.d19} number`}>{RatingsDrama(data.rating)}</i>
                  )}
                {(data.category === 'movie' || data.category === 'ottFilm' || data.anime === 'movie') &&
                  data.rating === 'all' && (
                    <>
                      <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                    </>
                  )}
                {(data.category === 'movie' || data.category === 'ottFilm' || data.anime === 'movie') &&
                  data.rating === 'b12' && (
                    <>
                      <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                    </>
                  )}
                {(data.category === 'movie' || data.category === 'ottFilm' || data.anime === 'movie') &&
                  data.rating === 'c15' && (
                    <>
                      <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                    </>
                  )}
                {(data.category === 'movie' || data.category === 'ottFilm' || data.anime === 'movie') &&
                  data.rating === 'd19' && (
                    <>
                      <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                    </>
                  )}
                {data.category === 'game' && data.rating === 'all' && (
                  <>
                    <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                  </>
                )}
                {data.category === 'game' && data.rating === 'b12' && (
                  <>
                    <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                  </>
                )}
                {data.category === 'game' && data.rating === 'c15' && (
                  <>
                    <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                  </>
                )}
                {data.category === 'game' && data.rating === 'd19' && (
                  <>
                    <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                  </>
                )}
              </dt>
              <dd>
                <strong dangerouslySetInnerHTML={{ __html: `${FormatLang(data.description)} (${data.release})` }} />
              </dd>
            </dl>
          </Link>
          <dl className={styles.info}>
            <div>
              <dt>제작국가</dt>
              <dd>{data.country}</dd>
            </div>
            <div>
              <dt>장르</dt>
              <dd>{data.genre}</dd>
            </div>
            <div>
              <dt>퍼블리셔</dt>
              <dd>{data.publisher}</dd>
            </div>
            <div>
              <dt>주요 제작자</dt>
              <dd>{data.creator}</dd>
            </div>
            {data.category !== 'game' && (
              <div>
                <dt>주요 출연자</dt>
                <dd>{data.cast}</dd>
              </div>
            )}
          </dl>
        </figcaption>
      </figure>
    </div>
  );

  const handleRefresh = async () => {
    window.location.reload();
  };
  const [columnCount, setColumnCount] = useState(1);

  return (
    <main className={styles.main}>
      <Seo
        pageTitle="제목에 제목이 없어서 짜증나서 만든 사이트"
        pageDescription="클릭하지 않아도 제목과 정보를 알 수 있게 도와드려요"
        pageImg={`https://jejeup.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <h1>
        <i className="preview" />
        클릭하지 않아도 제목과 정보를 알 수 있게 도와드려요 💃
      </h1>
      <div className={styles.list}>
        {isLoading && <div className={styles.loading}>이것저것 불러오는 중</div>}
        {error && (
          <div className={styles.error}>
            <p>데이터를 불러오는데 실패했습니다.</p>
            <button onClick={() => window.location.reload()}>다시 시도</button>
          </div>
        )}
        {!isLoading && !error && (
          <div className={styles['jejeup-content']}>
            <PullToRefresh onRefresh={handleRefresh}>
              <Masonry
                items={jejeups || []}
                columnCount={columnCount}
                render={renderCard}
                key={jejeups.length}
                data-index={jejeups.length}
              />
            </PullToRefresh>
            {isReachingEnd !== undefined && (
              <div ref={setTarget} className={styles.ref}>
                {isReachingEnd === false && <p>이것저것 불러오는 중</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
