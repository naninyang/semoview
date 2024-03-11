import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData, Counts, JejeupAmusementData } from 'types';
import Seo from '@/components/Seo';
import Anchor from '@/components/Anchor';
import { vectors } from '@/components/vectors';
import { RatingsDrama } from '@/components/RatingsDrama';
import { formatNumber } from '@/components/FormatNumber';
import styles from '@/styles/Categories.module.sass';

const AmazonIcon = styled.i({
  background: `url(${vectors.ott.amazonIcon}) no-repeat 50% 50%/contain`,
});

const AppleIcon = styled.i({
  background: `url(${vectors.ott.appleIcon}) no-repeat 50% 50%/contain`,
});

const DisneyIcon = styled.i({
  background: `url(${vectors.ott.disneyIcon}) no-repeat 50% 50%/contain`,
});

const NetflixIcon = styled.i({
  background: `url(${vectors.ott.netflixIcon}) no-repeat 50% 50%/contain`,
});

const TvingIcon = styled.i({
  background: `url(${vectors.ott.tvingIcon}) no-repeat 50% 50%/contain`,
});

const WatchaIcon = styled.i({
  background: `url(${vectors.ott.watchaIcon}) no-repeat 50% 50%/contain`,
});

const WavveIcon = styled.i({
  background: `url(${vectors.ott.wavveIcon}) no-repeat 50% 50%/contain`,
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

function Categories() {
  const router = useRouter();
  const timestamp = Date.now();
  const [dramaData, setDaramaData] = useState<JejeupAmusementData | null>(null);
  const [filmData, setMovieData] = useState<JejeupAmusementData | null>(null);
  const [gameData, setGameData] = useState<JejeupAmusementData | null>(null);
  const [animeData, setAnimationData] = useState<JejeupAmusementData | null>(null);
  const [ottData, setOttData] = useState<JejeupAmusementData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const currentPage = Number(router.query.page) || 1;

  useEffect(() => {
    sessionStorage.setItem('category', router.asPath);
  }, [router.asPath]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dramaResponse = await fetch(`/api/category?page=1&pageSize=7&categoryName=drama`);
      if (!dramaResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const dramaResponseData = await dramaResponse.json();

      const filmResponse = await fetch(`/api/category?page=1&pageSize=7&categoryName=film`);
      if (!filmResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const filmResponseData = await filmResponse.json();

      const gameResponse = await fetch(`/api/category?categoryName=game&page=1&pageSize=5`);
      if (!gameResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const gameResponseData = await gameResponse.json();

      const animeResponse = await fetch(`/api/category?categoryName=anime&page=1&pageSize=7`);
      if (!animeResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const animeResponseData = await animeResponse.json();

      const ottResponse = await fetch(`/api/category?categoryName=ott&page=1&pageSize=7`);
      if (!ottResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const ottResponseData = await ottResponse.json();

      setDaramaData(dramaResponseData);
      setMovieData(filmResponseData);
      setGameData(gameResponseData);
      setAnimationData(animeResponseData);
      setOttData(ottResponseData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const [count, setCount] = useState<Counts | null>(null);

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

  const data = dramaData && filmData && gameData && animeData && ottData;

  return (
    <main className={styles.categories}>
      <Seo
        pageTitle="제목에 제목이 없어서 짜증나서 만든 사이트"
        pageDescription="클릭하지 않아도 타이틀의 제목과 정보를 알 수 있게 도와드려요"
        pageImg={`https://jejeup.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <h1>
        <span>
          <i className="preview" />
          카테고리별 보고싶다? 골라보세요 💁‍♀️
        </span>
        {count && <em>({formatNumber(count.amusement)}개 타이틀)</em>}
      </h1>
      {isLoading && <div className={styles.loading}>이것저것 불러오는 중</div>}
      {error && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      {data && !isLoading && !error && (
        <div className={styles.content}>
          {dramaData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?category=drama&page=1">드라마 리뷰</Anchor>
                </h2>
                <Anchor href="/amusement?category=drama&page=1">
                  <span>더보기</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z"
                      fill="black"
                    />
                  </svg>
                </Anchor>
              </div>
              <section>
                {Array.isArray(dramaData.data) &&
                  dramaData.data.map((amusement: AmusementData, index) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          {amusement.ott !== null && (
                            <div className={styles.platform}>
                              <dt>플랫폼</dt>
                              <dd>
                                {amusement.ott === 'amazonOriginal' && (
                                  <>
                                    <AmazonIcon /> <span>Amazon Prime Video</span>
                                  </>
                                )}
                                {(amusement.ott === 'appleOriginal' || amusement.ott === 'appleFilm') && (
                                  <>
                                    <AppleIcon /> <span>An Apple Original</span>
                                  </>
                                )}
                                {amusement.ott === 'disneyOriginal' && (
                                  <>
                                    <DisneyIcon /> <span>Disney Plus Original</span>
                                  </>
                                )}
                                {(amusement.ott === 'netflixOriginal' ||
                                  amusement.ott === 'netflixFilm' ||
                                  amusement.ott === 'netflixAnime' ||
                                  amusement.ott === 'netflixAnimeFilm') && (
                                  <>
                                    <NetflixIcon /> <span>NETFLIX Original</span>
                                  </>
                                )}
                                {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                                  <>
                                    <TvingIcon /> <span>티빙 오리지널</span>
                                  </>
                                )}
                                {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                                  <>
                                    <WatchaIcon /> <span>왓챠 오리지널</span>
                                  </>
                                )}
                                {(amusement.ott === 'wavveOriginal' || amusement.ott === 'wavveOnly') && (
                                  <>
                                    <WavveIcon /> <span>웨이브 오리지널</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              {amusement.rating !== 'd19' && (
                                <>
                                  {amusement.rating === 'all' ? (
                                    <i className={`${styles.drama} ${styles.all} number`}>
                                      {RatingsDrama(amusement.rating)}
                                    </i>
                                  ) : (
                                    <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                                  )}
                                </>
                              )}
                              {amusement.rating === 'd19' && (
                                <i className={`${styles.drama} ${styles.d19} number`}>
                                  {RatingsDrama(amusement.rating)}
                                </i>
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>
                        {amusement.titleKorean != null ? (
                          amusement.titleKorean
                        ) : (
                          <>
                            {amusement.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusement.title} </span>}
                            {amusement.lang === 'chineseGanche' && <span lang="zh-Hans">{amusement.title} </span>}
                            {amusement.lang === 'english' && <span lang="en">{amusement.title}</span>}
                            {amusement.lang === 'japanese' && <span lang="ja">{amusement.title}</span>}
                            {amusement.lang === 'thai' && <span lang="th">{amusement.title}</span>}
                            {amusement.lang === null && <span lang="ko">{amusement.title}</span>}
                          </>
                        )}
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {filmData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?category=film&page=1">영화 리뷰</Anchor>
                </h2>
                <Anchor href="/amusement?category=film&page=1">
                  <span>더보기</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z"
                      fill="black"
                    />
                  </svg>
                </Anchor>
              </div>
              <section>
                {Array.isArray(filmData.data) &&
                  filmData.data.map((amusement: AmusementData, index) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          {amusement.ott !== null && (
                            <div className={styles.platform}>
                              <dt>플랫폼</dt>
                              <dd>
                                {amusement.ott === 'amazonOriginal' && (
                                  <>
                                    <AmazonIcon /> <span>Amazon Prime Video</span>
                                  </>
                                )}
                                {(amusement.ott === 'appleOriginal' || amusement.ott === 'appleFilm') && (
                                  <>
                                    <AppleIcon /> <span>An Apple Original</span>
                                  </>
                                )}
                                {amusement.ott === 'disneyOriginal' && (
                                  <>
                                    <DisneyIcon /> <span>Disney Plus Original</span>
                                  </>
                                )}
                                {(amusement.ott === 'netflixOriginal' ||
                                  amusement.ott === 'netflixFilm' ||
                                  amusement.ott === 'netflixAnime' ||
                                  amusement.ott === 'netflixAnimeFilm') && (
                                  <>
                                    <NetflixIcon /> <span>NETFLIX Original</span>
                                  </>
                                )}
                                {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                                  <>
                                    <TvingIcon /> <span>티빙 오리지널</span>
                                  </>
                                )}
                                {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                                  <>
                                    <WatchaIcon /> <span>왓챠 오리지널</span>
                                  </>
                                )}
                                {(amusement.ott === 'wavveOriginal' || amusement.ott === 'wavveOnly') && (
                                  <>
                                    <WavveIcon /> <span>웨이브 오리지널</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              {(amusement.category === 'film' ||
                                amusement.category === 'ott_film' ||
                                amusement.anime === 'film') &&
                                amusement.rating === 'all' && (
                                  <>
                                    <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'film' ||
                                amusement.category === 'ott_film' ||
                                amusement.anime === 'film') &&
                                amusement.rating === 'b12' && (
                                  <>
                                    <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'film' ||
                                amusement.category === 'ott_film' ||
                                amusement.anime === 'film') &&
                                amusement.rating === 'c15' && (
                                  <>
                                    <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'film' ||
                                amusement.category === 'ott_film' ||
                                amusement.anime === 'film') &&
                                amusement.rating === 'd19' && (
                                  <>
                                    <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                  </>
                                )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>
                        {amusement.titleKorean != null ? (
                          amusement.titleKorean
                        ) : (
                          <>
                            {amusement.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusement.title} </span>}
                            {amusement.lang === 'chineseGanche' && <span lang="zh-Hans">{amusement.title} </span>}
                            {amusement.lang === 'english' && <span lang="en">{amusement.title}</span>}
                            {amusement.lang === 'japanese' && <span lang="ja">{amusement.title}</span>}
                            {amusement.lang === 'thai' && <span lang="th">{amusement.title}</span>}
                            {amusement.lang === null && <span lang="ko">{amusement.title}</span>}
                          </>
                        )}
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {animeData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?category=anime&page=1">애니메이션 리뷰</Anchor>
                </h2>
                <Anchor href="/amusement?category=anime&page=1">
                  <span>더보기</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z"
                      fill="black"
                    />
                  </svg>
                </Anchor>
              </div>
              <section>
                {Array.isArray(animeData.data) &&
                  animeData.data.map((amusement: AmusementData, index) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          {' '}
                          {amusement.ott !== null && (
                            <div className={styles.platform}>
                              <dt>플랫폼</dt>
                              <dd>
                                {amusement.ott === 'amazonOriginal' && (
                                  <>
                                    <AmazonIcon /> <span>Amazon Prime Video</span>
                                  </>
                                )}
                                {(amusement.ott === 'appleOriginal' || amusement.ott === 'appleFilm') && (
                                  <>
                                    <AppleIcon /> <span>An Apple Original</span>
                                  </>
                                )}
                                {amusement.ott === 'disneyOriginal' && (
                                  <>
                                    <DisneyIcon /> <span>Disney Plus Original</span>
                                  </>
                                )}
                                {(amusement.ott === 'netflixOriginal' ||
                                  amusement.ott === 'netflixFilm' ||
                                  amusement.ott === 'netflixAnime' ||
                                  amusement.ott === 'netflixAnimeFilm') && (
                                  <>
                                    <NetflixIcon /> <span>NETFLIX Original</span>
                                  </>
                                )}
                                {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                                  <>
                                    <TvingIcon /> <span>티빙 오리지널</span>
                                  </>
                                )}
                                {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                                  <>
                                    <WatchaIcon /> <span>왓챠 오리지널</span>
                                  </>
                                )}
                                {(amusement.ott === 'wavveOriginal' || amusement.ott === 'wavveOnly') && (
                                  <>
                                    <WavveIcon /> <span>웨이브 오리지널</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              {(amusement.category === 'drama' ||
                                amusement.category === 'ott_drama' ||
                                amusement.category === 'ott_anime' ||
                                amusement.anime === 'tva' ||
                                amusement.anime === 'ova') &&
                                amusement.rating !== 'd19' && (
                                  <>
                                    {amusement.rating === 'all' ? (
                                      <i className={`${styles.drama} ${styles.all} number`}>
                                        {RatingsDrama(amusement.rating)}
                                      </i>
                                    ) : (
                                      <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                                    )}
                                  </>
                                )}
                              {(amusement.category === 'drama' ||
                                amusement.category === 'ott_drama' ||
                                amusement.category === 'ott_anime' ||
                                amusement.anime === 'tva' ||
                                amusement.anime === 'ova') &&
                                amusement.rating === 'd19' && (
                                  <i className={`${styles.drama} ${styles.d19} number`}>
                                    {RatingsDrama(amusement.rating)}
                                  </i>
                                )}
                              {(amusement.category === 'film' ||
                                amusement.category === 'ott_drama' ||
                                amusement.category === 'ott_anime' ||
                                amusement.anime === 'film') &&
                                amusement.rating === 'all' && (
                                  <>
                                    <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'film' ||
                                amusement.category === 'ott_drama' ||
                                amusement.category === 'ott_anime' ||
                                amusement.anime === 'film') &&
                                amusement.rating === 'b12' && (
                                  <>
                                    <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'film' ||
                                amusement.category === 'ott_drama' ||
                                amusement.category === 'ott_anime' ||
                                amusement.anime === 'film') &&
                                amusement.rating === 'c15' && (
                                  <>
                                    <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'film' ||
                                amusement.category === 'ott_drama' ||
                                amusement.category === 'ott_anime' ||
                                amusement.anime === 'film') &&
                                amusement.rating === 'd19' && (
                                  <>
                                    <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                  </>
                                )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>
                        {amusement.titleKorean != null ? (
                          amusement.titleKorean
                        ) : (
                          <>
                            {amusement.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusement.title} </span>}
                            {amusement.lang === 'chineseGanche' && <span lang="zh-Hans">{amusement.title} </span>}
                            {amusement.lang === 'english' && <span lang="en">{amusement.title}</span>}
                            {amusement.lang === 'japanese' && <span lang="ja">{amusement.title}</span>}
                            {amusement.lang === 'thai' && <span lang="th">{amusement.title}</span>}
                            {amusement.lang === null && <span lang="ko">{amusement.title}</span>}
                          </>
                        )}
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {ottData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?category=ott&page=1">OTT 오리지널 & OTT 온리 콘텐츠 리뷰</Anchor>
                </h2>
                <Anchor href="/amusement?category=ott&page=1">
                  <span>더보기</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z"
                      fill="black"
                    />
                  </svg>
                </Anchor>
              </div>
              <section>
                {Array.isArray(ottData.data) &&
                  ottData.data.map((amusement: AmusementData, index) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          <div className={styles.platform}>
                            <dt>플랫폼</dt>
                            <dd>
                              {amusement.ott === 'amazonOriginal' && (
                                <>
                                  <AmazonIcon /> <span>Amazon Prime Video</span>
                                </>
                              )}
                              {(amusement.ott === 'appleOriginal' || amusement.ott === 'appleFilm') && (
                                <>
                                  <AppleIcon /> <span>An Apple Original</span>
                                </>
                              )}
                              {amusement.ott === 'disneyOriginal' && (
                                <>
                                  <DisneyIcon /> <span>Disney Plus Original</span>
                                </>
                              )}
                              {(amusement.ott === 'netflixOriginal' ||
                                amusement.ott === 'netflixFilm' ||
                                amusement.ott === 'netflixAnime' ||
                                amusement.ott === 'netflixAnimeFilm') && (
                                <>
                                  <NetflixIcon /> <span>NETFLIX Original</span>
                                </>
                              )}
                              {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                                <>
                                  <TvingIcon /> <span>티빙 오리지널</span>
                                </>
                              )}
                              {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                                <>
                                  <WatchaIcon /> <span>왓챠 오리지널</span>
                                </>
                              )}
                              {(amusement.ott === 'wavveOriginal' || amusement.ott === 'wavveOnly') && (
                                <>
                                  <WavveIcon /> <span>웨이브 오리지널</span>
                                </>
                              )}
                            </dd>
                          </div>
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              {(amusement.category === 'drama' ||
                                amusement.category === 'ott_drama' ||
                                amusement.category === 'ott_anime' ||
                                amusement.anime === 'tva' ||
                                amusement.anime === 'ova') &&
                                amusement.rating !== 'd19' && (
                                  <>
                                    {amusement.rating === 'all' ? (
                                      <i className={`${styles.drama} ${styles.all} number`}>
                                        {RatingsDrama(amusement.rating)}
                                      </i>
                                    ) : (
                                      <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                                    )}
                                  </>
                                )}
                              {(amusement.category === 'drama' ||
                                amusement.category === 'ott_drama' ||
                                amusement.category === 'ott_anime' ||
                                amusement.anime === 'tva' ||
                                amusement.anime === 'ova') &&
                                amusement.rating === 'd19' && (
                                  <i className={`${styles.drama} ${styles.d19} number`}>
                                    {RatingsDrama(amusement.rating)}
                                  </i>
                                )}
                              {(amusement.category === 'film' ||
                                amusement.category === 'ott_anime_film' ||
                                amusement.category === 'ott_film' ||
                                amusement.anime === 'film') &&
                                amusement.rating === 'all' && (
                                  <>
                                    <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'film' ||
                                amusement.category === 'ott_anime_film' ||
                                amusement.category === 'ott_film' ||
                                amusement.anime === 'film') &&
                                amusement.rating === 'b12' && (
                                  <>
                                    <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'film' ||
                                amusement.category === 'ott_anime_film' ||
                                amusement.category === 'ott_film' ||
                                amusement.anime === 'film') &&
                                amusement.rating === 'c15' && (
                                  <>
                                    <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'film' ||
                                amusement.category === 'ott_film' ||
                                amusement.anime === 'film') &&
                                amusement.rating === 'd19' && (
                                  <>
                                    <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                  </>
                                )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>
                        {amusement.titleKorean != null ? (
                          amusement.titleKorean
                        ) : (
                          <>
                            {amusement.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusement.title} </span>}
                            {amusement.lang === 'chineseGanche' && <span lang="zh-Hans">{amusement.title} </span>}
                            {amusement.lang === 'english' && <span lang="en">{amusement.title}</span>}
                            {amusement.lang === 'japanese' && <span lang="ja">{amusement.title}</span>}
                            {amusement.lang === 'thai' && <span lang="th">{amusement.title}</span>}
                            {amusement.lang === null && <span lang="ko">{amusement.title}</span>}
                          </>
                        )}
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {gameData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?category=game&page=1">게임 리뷰 & 실황</Anchor>
                </h2>
                <Anchor href="/amusement?category=game&page=1">
                  <span>더보기</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z"
                      fill="black"
                    />
                  </svg>
                </Anchor>
              </div>
              <section className={styles.game}>
                {Array.isArray(gameData.data) &&
                  gameData.data.map((amusement: AmusementData, index) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="460" height="215" alt="" unoptimized />
                        <dl>
                          <div className={styles.game}>
                            <dt>심의등급</dt>
                            <dd>
                              {amusement.category === 'game' && amusement.rating === 'all' && (
                                <>
                                  <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                                </>
                              )}
                              {amusement.category === 'game' && amusement.rating === 'b12' && (
                                <>
                                  <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                                </>
                              )}
                              {amusement.category === 'game' && amusement.rating === 'c15' && (
                                <>
                                  <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                                </>
                              )}
                              {amusement.category === 'game' && amusement.rating === 'd19' && (
                                <>
                                  <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                                </>
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>
                        <strong>
                          {amusement.titleKorean != null ? (
                            amusement.titleKorean
                          ) : (
                            <>
                              {amusement.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusement.title} </span>}
                              {amusement.lang === 'chineseGanche' && <span lang="zh-Hans">{amusement.title} </span>}
                              {amusement.lang === 'english' && <span lang="en">{amusement.title}</span>}
                              {amusement.lang === 'japanese' && <span lang="ja">{amusement.title}</span>}
                              {amusement.lang === 'thai' && <span lang="th">{amusement.title}</span>}
                              {amusement.lang === null && <span lang="ko">{amusement.title}</span>}
                            </>
                          )}
                        </strong>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
        </div>
      )}
    </main>
  );
}

export default Categories;
