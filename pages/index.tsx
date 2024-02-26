import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import useSWRInfinite from 'swr/infinite';
import styled from '@emotion/styled';
import { Masonry } from 'masonic';
import { JejeupData } from 'types';
import Seo from '@/components/Seo';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { OriginalName } from '@/components/OriginalName';
import { FormatDate } from '@/components/FormatDate';
import { vectors } from '@/components/vectors';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Home.module.sass';
import { GetServerSideProps } from 'next';

interface Counts {
  jejeup: number;
}

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

function Home() {
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
        {Object.keys(data.jejeupMetaData).length > 0 ? (
          <div className={`${styles.preview} preview`}>
            <div className={styles['preview-container']}>
              <Image src={data.jejeupMetaData.ogImage} width="1920" height="1080" alt="" unoptimized />
              <div className={styles['preview-info']}>
                <div className={styles.detail}>
                  <Image
                    src={`${data.jejeupMetaData.ownerAvatar === null ? data.ownerAvatar : data.jejeupMetaData.ownerAvatar}`}
                    width="36"
                    height="36"
                    alt=""
                    unoptimized
                  />
                  <div className={`${styles['user-info']}`}>
                    <strong>{data.jejeupMetaData.ogTitle}</strong>
                    <div className={styles.user}>
                      <cite>{data.jejeupMetaData.ownerName}</cite>
                      <time dateTime={data.jejeupMetaData.datePublished}>
                        {FormatDate(`${data.jejeupMetaData.datePublished}`)}
                      </time>
                    </div>
                    {data.worst && (
                      <div className={styles.worst}>
                        <button type="button" className="number">
                          Worst
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`${styles.preview} preview`}>
            <div className={styles['preview-container']}>
              <Image src="/missing.webp" width="36" height="36" alt="" unoptimized />
              <div className={styles['preview-info']}>
                <div className={styles.detail}>
                  <Image src="/unknown.webp" width="1920" height="1080" alt="" unoptimized />
                  <div className={`${styles['user-info']}`}>
                    <strong>삭제된 영상</strong>
                    <div className={styles.user}>
                      <cite>관리자에게 제보해 주세요</cite>
                      <time>알 수 없는 시간</time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <figcaption>
          <Link key={data.idx} href={`/jejeup/${data.idx}`} scroll={false} shallow={true}>
            {data.worst && (
              <dl className={styles.worst}>
                <dt>Worst 경고!</dt>
                <dd>이 영상은 영상과 더보기에 그 어떤 정보도 존재하지 않는 최악의 영상입니다.</dd>
              </dl>
            )}
            <dl className={styles.summary}>
              <dt>
                {data.amusementData.ott === 'wavveOnly' && (
                  <cite>
                    <WavveOriginal /> 웨이브 독점 스트리밍
                  </cite>
                )}
                {data.amusementData.category !== 'ott' && data.amusementData.category !== 'ottFilm' && (
                  <em>{CategoryName(data.amusementData.category)}</em>
                )}
                {data.amusementData.category === 'animation' && <em>{AnimeName(data.amusementData.anime)}</em>}
                {data.amusementData.ott === 'amazonOriginal' && (
                  <cite>
                    <AmazonOriginal /> 아마존 오리지널
                  </cite>
                )}
                {data.amusementData.ott === 'appleOriginal' && (
                  <cite>
                    <AppleOriginal /> 애플 티비+ 오리지널
                  </cite>
                )}
                {data.amusementData.ott === 'appleFilm' && (
                  <cite>
                    <AppleOriginal /> 애플 티비+ 오리지널 영화
                  </cite>
                )}
                {data.amusementData.ott === 'disneyOriginal' && (
                  <cite>
                    <DisneyOriginal /> 디즈니+ 오리지널
                  </cite>
                )}
                {data.amusementData.ott === 'netflixOriginal' && (
                  <cite>
                    <NetflixOriginal /> 넷플릭스 오리지널
                  </cite>
                )}
                {data.amusementData.ott === 'netflixFilm' && (
                  <cite>
                    <NetflixOriginal /> 넷플릭스 오리지널 영화
                  </cite>
                )}
                {data.amusementData.ott === 'netflixAnime' && (
                  <cite>
                    <NetflixOriginal /> 넷플릭스 오리지널 애니메이션
                  </cite>
                )}
                {data.amusementData.ott === 'netflixAnimeFilm' && (
                  <cite>
                    <NetflixOriginal /> 넷플릭스 오리지널 애니메이션 영화
                  </cite>
                )}
                {data.amusementData.ott === 'tvingOriginal' && (
                  <cite>
                    <TvingOriginal /> 티빙 오리지널
                  </cite>
                )}
                {data.amusementData.ott === 'watchaOriginal' && (
                  <cite>
                    <WatchaOriginal /> 왓챠 오리지널
                  </cite>
                )}
                {data.amusementData.ott === 'wavveOriginal' && (
                  <cite>
                    <WavveOriginal /> 웨이브 오리지널
                  </cite>
                )}
                {(data.amusementData.category === 'drama' ||
                  data.amusementData.category === 'ott' ||
                  data.amusementData.anime === 'tva' ||
                  data.amusementData.anime === 'ova') &&
                  data.amusementData.rating !== 'd19' && (
                    <>
                      {data.amusementData.rating === 'all' ? (
                        <i className={`${styles.drama} ${styles.all} number`}>
                          {RatingsDrama(data.amusementData.rating)}
                        </i>
                      ) : (
                        <i className={`${styles.drama} number`}>{RatingsDrama(data.amusementData.rating)}</i>
                      )}
                    </>
                  )}
                {(data.amusementData.category === 'drama' ||
                  data.amusementData.category === 'ott' ||
                  data.amusementData.anime === 'tva' ||
                  data.amusementData.anime === 'ova') &&
                  data.amusementData.rating === 'd19' && (
                    <i className={`${styles.drama} ${styles.d19} number`}>{RatingsDrama(data.amusementData.rating)}</i>
                  )}
                {(data.amusementData.category === 'movie' ||
                  data.amusementData.category === 'ottFilm' ||
                  data.amusementData.anime === 'movie') &&
                  data.amusementData.rating === 'all' && (
                    <>
                      <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                    </>
                  )}
                {(data.amusementData.category === 'movie' ||
                  data.amusementData.category === 'ottFilm' ||
                  data.amusementData.anime === 'movie') &&
                  data.amusementData.rating === 'b12' && (
                    <>
                      <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                    </>
                  )}
                {(data.amusementData.category === 'movie' ||
                  data.amusementData.category === 'ottFilm' ||
                  data.amusementData.anime === 'movie') &&
                  data.amusementData.rating === 'c15' && (
                    <>
                      <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                    </>
                  )}
                {(data.amusementData.category === 'movie' ||
                  data.amusementData.category === 'ottFilm' ||
                  data.amusementData.anime === 'movie') &&
                  data.amusementData.rating === 'd19' && (
                    <>
                      <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                    </>
                  )}
                {data.amusementData.category === 'game' && data.amusementData.rating === 'all' && (
                  <>
                    <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                  </>
                )}
                {data.amusementData.category === 'game' && data.amusementData.rating === 'b12' && (
                  <>
                    <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                  </>
                )}
                {data.amusementData.category === 'game' && data.amusementData.rating === 'c15' && (
                  <>
                    <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                  </>
                )}
                {data.amusementData.category === 'game' && data.amusementData.rating === 'd19' && (
                  <>
                    <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                  </>
                )}
              </dt>
              <dd>
                <strong>
                  {data.amusementData.lang === 'chineseBeonche' && (
                    <span lang="zh-Hant">{data.amusementData.title} </span>
                  )}
                  {data.amusementData.lang === 'chineseGanche' && (
                    <span lang="zh-Hans">{data.amusementData.title} </span>
                  )}
                  {data.amusementData.lang === 'english' && <span lang="en">{data.amusementData.title}</span>}
                  {data.amusementData.lang === 'japanese' && <span lang="ja">{data.amusementData.title}</span>}
                  {data.amusementData.lang === 'thai' && <span lang="th">{data.amusementData.title}</span>}
                  {data.amusementData.lang === null && <span lang="ko">{data.amusementData.title}</span>}{' '}
                  {data.amusementData.originalAuthor &&
                    `('${data.amusementData.originalAuthor}'의 ${OriginalName(data.amusementData.original)} '${data.amusementData.originTitle}' 원작)`}
                  {data.amusementData.titleOther && `(${data.amusementData.titleOther})`}{' '}
                  {data.amusementData.originalAuthor === null && data.amusementData.original && (
                    <span className={styles.origin}>동명의 {OriginalName(data.amusementData.original)} 원작</span>
                  )}
                  <time>{data.amusementData.release}</time>
                </strong>
                <em>{data.amusementData.etc && data.amusementData.etc}</em>
              </dd>
            </dl>
          </Link>
          <dl className={styles.info}>
            <div>
              <dt>제작국가</dt>
              <dd>{data.amusementData.country}</dd>
            </div>
            <div>
              <dt>장르</dt>
              <dd>{data.amusementData.genre}</dd>
            </div>
            <div>
              <dt>퍼블리셔</dt>
              <dd>{data.amusementData.publisher}</dd>
            </div>
            <div>
              <dt>주요 제작자</dt>
              <dd>{data.amusementData.creator}</dd>
            </div>
            {data.amusementData.category !== 'game' && (
              <div>
                <dt>주요 출연자</dt>
                <dd>{data.amusementData.cast}</dd>
              </div>
            )}
          </dl>
        </figcaption>
      </figure>
    </div>
  );

  const [columnCount, setColumnCount] = useState(1);

  const [count, setCount] = useState<Counts | null>(null);

  function formatNumber(value: number): string {
    return value.toLocaleString();
  }

  async function fetchCountData() {
    try {
      const response = await fetch(`/api/count`);
      const data = await response.json();
      setCount(data);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchCountData();
  }, []);

  return (
    <main className={styles.main}>
      <Seo
        pageTitle="제목에 제목이 없어서 짜증나서 만든 사이트"
        pageDescription="클릭하지 않아도 제목과 정보를 알 수 있게 도와드려요"
        pageImg={`https://jejeup.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <h1>
        <span>
          <i className="preview" />
          클릭하지 않아도 제목과 정보를 알 수 있게 도와드려요 💃
        </span>
        {count && <em>({formatNumber(count.jejeup)}개 콘텐츠)</em>}
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
            <Masonry
              items={jejeups || []}
              columnCount={columnCount}
              render={renderCard}
              key={jejeups.length}
              data-index={jejeups.length}
            />
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

export default Home;
