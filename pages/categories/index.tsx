import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData, Counts } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import Choice from '@/components/Choice';
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

const StarIcon = styled.i({
  background: `url(${vectors.ott.starIcon}) no-repeat 50% 50%/contain`,
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

const ParamountIcon = styled.i({
  background: `url(${vectors.ott.paramountIcon}) no-repeat 50% 50%/contain`,
});

const EnaIcon = styled.i({
  background: `url(${vectors.broadcast.enaIcon}) no-repeat 50% 50%/contain`,
});

const JtbcIcon = styled.i({
  background: `url(${vectors.broadcast.jtbcIcon}) no-repeat 50% 50%/contain`,
});

const Kbs2Icon = styled.i({
  background: `url(${vectors.broadcast.kbs2Icon}) no-repeat 50% 50%/contain`,
});

const MbcIcon = styled.i({
  background: `url(${vectors.broadcast.mbcIcon}) no-repeat 50% 50%/contain`,
});

const OcnIcon = styled.i({
  background: `url(${vectors.broadcast.ocnIcon}) no-repeat 50% 50%/contain`,
});

const SbsIcon = styled.i({
  background: `url(${vectors.broadcast.sbsIcon}) no-repeat 50% 50%/contain`,
});

const TvnIcon = styled.i({
  background: `url(${vectors.broadcast.tvnIcon}) no-repeat 50% 50%/contain`,
});

const AbcIcon = styled.i({
  background: `url(${vectors.broadcast.abcIcon}) no-repeat 50% 50%/contain`,
});

const AniboxIcon = styled.i({
  background: `url(${vectors.anime.aniboxIcon}) no-repeat 0 50%/contain`,
});

const AnimaxIcon = styled.i({
  background: `url(${vectors.anime.animaxIcon}) no-repeat 0 50%/contain`,
});

const AniplusIcon = styled.i({
  background: `url(${vectors.anime.aniplusIcon}) no-repeat 0 50%/contain`,
});

const AtxIcon = styled.i({
  background: `url(${vectors.anime.atxIcon}) no-repeat 0 50%/contain`,
});

const DaewonIcon = styled.i({
  background: `url(${vectors.anime.daewonIcon}) no-repeat 0 50%/contain`,
});

const FujitvIcon = styled.i({
  background: `url(${vectors.anime.fujitvIcon}) no-repeat 0 50%/contain`,
});

const MbsIcon = styled.i({
  background: `url(${vectors.anime.mbsIcon}) no-repeat 0 50%/contain`,
});

const NippontvIcon = styled.i({
  background: `url(${vectors.anime.nippontvIcon}) no-repeat 0 50%/contain`,
});

const TbsIcon = styled.i({
  background: `url(${vectors.anime.tbsIcon}) no-repeat 0 50%/contain`,
});

const TokyomxIcon = styled.i({
  background: `url(${vectors.anime.tokyomxIcon}) no-repeat 0 50%/contain`,
});

const TooniverseIcon = styled.i({
  background: `url(${vectors.anime.tooniverseIcon}) no-repeat 0 50%/contain`,
});

const TvtokyoIcon = styled.i({
  background: `url(${vectors.anime.tvtokyoIcon}) no-repeat 0 50%/contain`,
});

const WowowIcon = styled.i({
  background: `url(${vectors.anime.wowowIcon}) no-repeat 0 50%/contain`,
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

function Categories({
  dramaData,
  filmData,
  gameData,
  animeData,
  ottData,
  fanData,
  error,
}: {
  dramaData: any;
  filmData: any;
  gameData: any;
  animeData: any;
  ottData: any;
  fanData: any;
  error: string;
}) {
  const router = useRouter();
  const timestamp = Date.now();

  useEffect(() => {
    sessionStorage.removeItem('amusementCategory');
    sessionStorage.removeItem('amusementTag');
    sessionStorage.removeItem('amusementPlatform');

    sessionStorage.removeItem('tag');
    sessionStorage.removeItem('platform');

    sessionStorage.setItem('category', router.asPath);
  }, [router.asPath]);

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

  return (
    <main className={styles.categories}>
      <Seo
        pageTitles={`리뷰 카테고리 선택하기 - ${originTitle}`}
        pageTitle={`리뷰 카테고리 선택하기`}
        pageDescription="OTT / 영화 / 애니메이션 / 드라마 / 게임"
        pageImg={`https://jejeup.dev1stud.io/og-categories.webp?ts=${timestamp}`}
      />
      <Choice />
      <h1>
        <span>
          <i className="preview" />
          카테고리별 보고싶다? 골라보세요 💁‍♀️
        </span>
        {count && <em>({formatNumber(count.amusement)}개 작품)</em>}
      </h1>
      {error && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      {!error && (
        <div className={styles.content}>
          {dramaData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?category=drama&page=1">드라마 리뷰</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${dramaData.total}개`}
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
                  dramaData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          {amusement.broadcast !== null && (
                            <div className={`${styles.broadcast} ${amusement.ott !== null ? styles.broadcasts : ''}`}>
                              <dt>방송국</dt>
                              <dd>
                                {amusement.broadcast === 'ENA' && (
                                  <>
                                    <EnaIcon /> <span>ENA</span>
                                  </>
                                )}
                                {amusement.broadcast === 'JTBC' && (
                                  <>
                                    <JtbcIcon /> <span>JTBC</span>
                                  </>
                                )}
                                {amusement.broadcast === 'KBS2' && (
                                  <>
                                    <Kbs2Icon /> <span>KBS 2TV</span>
                                  </>
                                )}
                                {amusement.broadcast === 'MBC' && (
                                  <>
                                    <MbcIcon /> <span>MBC</span>
                                  </>
                                )}
                                {amusement.broadcast === 'OCN' && (
                                  <>
                                    <OcnIcon /> <span>OCN</span>
                                  </>
                                )}
                                {amusement.broadcast === 'SBS' && (
                                  <>
                                    <SbsIcon /> <span>SBS</span>
                                  </>
                                )}
                                {amusement.broadcast === 'tvN' && (
                                  <>
                                    <TvnIcon /> <span>tvN</span>
                                  </>
                                )}
                                {amusement.broadcast === 'ABC' && (
                                  <>
                                    <AbcIcon /> <span>ABC</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
                          {amusement.ott !== null && (
                            <div className={styles.platform}>
                              <dt>플랫폼</dt>
                              <dd>
                                {amusement.ott === 'amazonOriginal' && (
                                  <>
                                    <AmazonIcon /> <span>AMAZON</span>
                                  </>
                                )}
                                {(amusement.ott === 'appleOriginal' || amusement.ott === 'appleFilm') && (
                                  <>
                                    <AppleIcon /> <span>Apple TV+</span>
                                  </>
                                )}
                                {amusement.ott === 'disneyOriginal' && (
                                  <>
                                    <DisneyIcon /> <span>Disney+</span>
                                  </>
                                )}
                                {amusement.ott === 'disneyStar' && (
                                  <>
                                    <StarIcon /> <span>Star+</span>
                                  </>
                                )}
                                {(amusement.ott === 'netflixSeries' ||
                                  amusement.ott === 'netflixPresents' ||
                                  amusement.ott === 'netflixOriginal' ||
                                  amusement.ott === 'netflixFilm' ||
                                  amusement.ott === 'netflixAnime' ||
                                  amusement.ott === 'netflixAnimeFilm' ||
                                  amusement.ott === 'netflixDocumentary') && (
                                  <>
                                    <NetflixIcon /> <span>NETFLIX</span>
                                  </>
                                )}
                                {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                                  <>
                                    <TvingIcon /> <span>티빙</span>
                                  </>
                                )}
                                {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                                  <>
                                    <WatchaIcon /> <span>왓챠</span>
                                  </>
                                )}
                                {(amusement.ott === 'wavveOriginal' || amusement.ott === 'wavveOnly') && (
                                  <>
                                    <WavveIcon /> <span>웨이브</span>
                                  </>
                                )}
                                {amusement.ott === 'paramount' && (
                                  <>
                                    <ParamountIcon /> <span>Paramount+</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              {amusement.ott === 'amazonOriginal' ? (
                                <i className={`${styles['rating-amazon']} number`} aria-label="시청 가능 연령">
                                  {amusement.rating === 'all' && 'All'}
                                  {amusement.rating === 'a7' && '7+'}
                                  {amusement.rating === 'b12' && '13+'}
                                  {amusement.rating === 'c15' && '16+'}
                                  {amusement.rating === 'd19' && '18+'}
                                </i>
                              ) : (
                                <>
                                  {amusement.rating !== 'd19' ? (
                                    <>
                                      {amusement.rating === 'all' ? (
                                        <i className={`${styles.drama} ${styles.all} number`}>
                                          {RatingsDrama(amusement.rating)}
                                        </i>
                                      ) : (
                                        <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                                      )}
                                    </>
                                  ) : (
                                    <i className={`${styles.drama} ${styles.d19} number`}>
                                      {RatingsDrama(amusement.rating)}
                                    </i>
                                  )}
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
                            {amusement.lang === 'europe' && <span lang="en">{amusement.title}</span>}
                            {amusement.lang === 'english' && <span lang="en-US">{amusement.title}</span>}
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
                  {process.env.NODE_ENV === 'development' && ` ${filmData.total}개`}
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
                  filmData.data.map((amusement: AmusementData, index: number) => (
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
                                    <AmazonIcon /> <span>AMAZON</span>
                                  </>
                                )}
                                {(amusement.ott === 'appleOriginal' || amusement.ott === 'appleFilm') && (
                                  <>
                                    <AppleIcon /> <span>Apple TV+</span>
                                  </>
                                )}
                                {amusement.ott === 'disneyOriginal' && (
                                  <>
                                    <DisneyIcon /> <span>Disney+</span>
                                  </>
                                )}
                                {amusement.ott === 'disneyStar' && (
                                  <>
                                    <StarIcon /> <span>Star+</span>
                                  </>
                                )}
                                {(amusement.ott === 'netflixSeries' ||
                                  amusement.ott === 'netflixPresents' ||
                                  amusement.ott === 'netflixOriginal' ||
                                  amusement.ott === 'netflixFilm' ||
                                  amusement.ott === 'netflixAnime' ||
                                  amusement.ott === 'netflixAnimeFilm' ||
                                  amusement.ott === 'netflixDocumentary') && (
                                  <>
                                    <NetflixIcon /> <span>NETFLIX</span>
                                  </>
                                )}
                                {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                                  <>
                                    <TvingIcon /> <span>티빙</span>
                                  </>
                                )}
                                {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                                  <>
                                    <WatchaIcon /> <span>왓챠</span>
                                  </>
                                )}
                                {(amusement.ott === 'wavveOriginal' || amusement.ott === 'wavveOnly') && (
                                  <>
                                    <WavveIcon /> <span>웨이브</span>
                                  </>
                                )}
                                {amusement.ott === 'paramount' && (
                                  <>
                                    <ParamountIcon /> <span>Paramount+</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              {amusement.ott === 'amazonOriginal' ? (
                                <i className={`${styles['rating-amazon']} number`} aria-label="시청 가능 연령">
                                  {amusement.rating === 'all' && 'All'}
                                  {amusement.rating === 'a7' && '7+'}
                                  {amusement.rating === 'b12' && '13+'}
                                  {amusement.rating === 'c15' && '16+'}
                                  {amusement.rating === 'd19' && '18+'}
                                </i>
                              ) : (
                                <>
                                  {(amusement.category === 'film' ||
                                    amusement.category === 'anime_film' ||
                                    amusement.category === 'ott_anime_film' ||
                                    amusement.category === 'ott_documentary_film' ||
                                    amusement.category === 'ott_film' ||
                                    amusement.anime === 'film') && (
                                    <>
                                      {amusement.rating === 'all' && (
                                        <>
                                          <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                        </>
                                      )}
                                      {amusement.rating === 'b12' && (
                                        <>
                                          <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                        </>
                                      )}
                                      {amusement.rating === 'c15' && (
                                        <>
                                          <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                        </>
                                      )}
                                      {amusement.rating === 'd19' && (
                                        <>
                                          <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>{amusement.titleKorean != null ? amusement.titleKorean : amusement.title}</strong>
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
                  {process.env.NODE_ENV === 'development' && ` ${animeData.total}개`}
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
                  animeData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          {amusement.animeBroadcast2 !== null && (
                            <div
                              className={`${styles.anime2} ${amusement.animeBroadcast1 !== null ? styles.anime2 : ''} ${amusement.ott !== null ? styles.broadcasts : ''}`}
                            >
                              <dt>방송사</dt>
                              <dd>
                                {amusement.animeBroadcast2 === 'aniplus' && (
                                  <>
                                    <AniplusIcon /> <span>애니플러스</span>
                                  </>
                                )}
                                {amusement.animeBroadcast2 === 'daewon' && (
                                  <>
                                    <DaewonIcon /> <span>애니원</span>
                                  </>
                                )}
                                {amusement.animeBroadcast2 === 'anibox' && (
                                  <>
                                    <AniboxIcon /> <span>애니박스</span>
                                  </>
                                )}
                                {amusement.animeBroadcast2 === 'tooniverse' && (
                                  <>
                                    <TooniverseIcon /> <span>투니버스</span>
                                  </>
                                )}
                                {amusement.animeBroadcast2 === 'animax' && (
                                  <>
                                    <AniboxIcon /> <span>애니박스</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
                          {amusement.animeBroadcast1 !== null && (
                            <div
                              className={`${styles.anime1} ${amusement.animeBroadcast1 !== null ? styles.anime1 : ''}`}
                            >
                              <dt>방송사</dt>
                              <dd>
                                {amusement.animeBroadcast1 === 'tokyomx' && (
                                  <>
                                    <TokyomxIcon /> <span>도쿄 MX</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'tvtokyo' && (
                                  <>
                                    <TvtokyoIcon /> <span>테레비 도쿄</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'fujitv' && (
                                  <>
                                    <FujitvIcon /> <span>후지 테레비</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'mbs' && (
                                  <>
                                    <MbsIcon /> <span>MBS</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'tbs' && (
                                  <>
                                    <TbsIcon /> <span>TBS</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'atx' && (
                                  <>
                                    <AtxIcon /> <span>AT-X</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'nippontv' && (
                                  <>
                                    <NippontvIcon /> <span>닛폰 테레비</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'wowow' && (
                                  <>
                                    <WowowIcon /> <span>WOWOW</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
                          {amusement.ott !== null && (
                            <div className={styles.platform}>
                              <dt>플랫폼</dt>
                              <dd>
                                {amusement.ott === 'amazonOriginal' && (
                                  <>
                                    <AmazonIcon /> <span>AMAZON</span>
                                  </>
                                )}
                                {(amusement.ott === 'appleOriginal' || amusement.ott === 'appleFilm') && (
                                  <>
                                    <AppleIcon /> <span>Apple TV+</span>
                                  </>
                                )}
                                {amusement.ott === 'disneyOriginal' && (
                                  <>
                                    <DisneyIcon /> <span>Disney+</span>
                                  </>
                                )}
                                {amusement.ott === 'disneyStar' && (
                                  <>
                                    <StarIcon /> <span>Star+</span>
                                  </>
                                )}
                                {(amusement.ott === 'netflixSeries' ||
                                  amusement.ott === 'netflixPresents' ||
                                  amusement.ott === 'netflixOriginal' ||
                                  amusement.ott === 'netflixFilm' ||
                                  amusement.ott === 'netflixAnime' ||
                                  amusement.ott === 'netflixAnimeFilm' ||
                                  amusement.ott === 'netflixDocumentary') && (
                                  <>
                                    <NetflixIcon /> <span>NETFLIX</span>
                                  </>
                                )}
                                {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                                  <>
                                    <TvingIcon /> <span>티빙</span>
                                  </>
                                )}
                                {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                                  <>
                                    <WatchaIcon /> <span>왓챠</span>
                                  </>
                                )}
                                {(amusement.ott === 'wavveOriginal' || amusement.ott === 'wavveOnly') && (
                                  <>
                                    <WavveIcon /> <span>웨이브</span>
                                  </>
                                )}
                                {amusement.ott === 'paramount' && (
                                  <>
                                    <ParamountIcon /> <span>Paramount+</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              {amusement.ott === 'amazonOriginal' ? (
                                <i className={`${styles['rating-amazon']} number`} aria-label="시청 가능 연령">
                                  {amusement.rating === 'all' && 'All'}
                                  {amusement.rating === 'a7' && '7+'}
                                  {amusement.rating === 'b12' && '13+'}
                                  {amusement.rating === 'c15' && '16+'}
                                  {amusement.rating === 'd19' && '18+'}
                                </i>
                              ) : (
                                <>
                                  {amusement.category === 'anime' || amusement.category === 'ott_anime' ? (
                                    <>
                                      {amusement.rating !== 'd19' ? (
                                        <>
                                          {amusement.rating === 'all' ? (
                                            <i className={`${styles.drama} ${styles.all} number`}>
                                              {RatingsDrama(amusement.rating)}
                                            </i>
                                          ) : (
                                            <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                                          )}
                                        </>
                                      ) : (
                                        <i className={`${styles.drama} ${styles.d19} number`}>
                                          {RatingsDrama(amusement.rating)}
                                        </i>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {amusement.rating === 'all' && (
                                        <>
                                          <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                        </>
                                      )}
                                      {amusement.rating === 'b12' && (
                                        <>
                                          <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                        </>
                                      )}
                                      {amusement.rating === 'c15' && (
                                        <>
                                          <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                        </>
                                      )}
                                      {amusement.rating === 'd19' && (
                                        <>
                                          <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>{amusement.titleKorean != null ? amusement.titleKorean : amusement.title}</strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {ottData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?category=ott&page=1">OTT 오리지널 리뷰</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${ottData.total}개`}
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
                  ottData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          {amusement.animeBroadcast1 !== null && (
                            <div
                              className={`${styles.anime1} ${amusement.animeBroadcast1 !== null ? styles.anime1 : ''} ${amusement.ott !== null ? styles.broadcasts : ''}`}
                            >
                              <dt>방송사</dt>
                              <dd>
                                {amusement.animeBroadcast1 === 'tokyomx' && (
                                  <>
                                    <TokyomxIcon /> <span>도쿄 MX</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'tvtokyo' && (
                                  <>
                                    <TvtokyoIcon /> <span>테레비 도쿄</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'fujitv' && (
                                  <>
                                    <FujitvIcon /> <span>후지 테레비</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'mbs' && (
                                  <>
                                    <MbsIcon /> <span>MBS</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'tbs' && (
                                  <>
                                    <TbsIcon /> <span>TBS</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'atx' && (
                                  <>
                                    <AtxIcon /> <span>AT-X</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'nippontv' && (
                                  <>
                                    <NippontvIcon /> <span>닛폰 테레비</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'wowow' && (
                                  <>
                                    <WowowIcon /> <span>WOWOW</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
                          {amusement.broadcast !== null && (
                            <div className={`${styles.broadcast} ${amusement.ott !== null ? styles.broadcasts : ''}`}>
                              <dt>방송국</dt>
                              <dd>
                                {amusement.broadcast === 'ENA' && (
                                  <>
                                    <EnaIcon /> <span>ENA</span>
                                  </>
                                )}
                                {amusement.broadcast === 'JTBC' && (
                                  <>
                                    <JtbcIcon /> <span>JTBC</span>
                                  </>
                                )}
                                {amusement.broadcast === 'KBS2' && (
                                  <>
                                    <Kbs2Icon /> <span>KBS 2TV</span>
                                  </>
                                )}
                                {amusement.broadcast === 'MBC' && (
                                  <>
                                    <MbcIcon /> <span>MBC</span>
                                  </>
                                )}
                                {amusement.broadcast === 'OCN' && (
                                  <>
                                    <OcnIcon /> <span>OCN</span>
                                  </>
                                )}
                                {amusement.broadcast === 'SBS' && (
                                  <>
                                    <SbsIcon /> <span>SBS</span>
                                  </>
                                )}
                                {amusement.broadcast === 'tvN' && (
                                  <>
                                    <TvnIcon /> <span>tvN</span>
                                  </>
                                )}
                                {amusement.broadcast === 'ABC' && (
                                  <>
                                    <AbcIcon /> <span>ABC</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
                          <div className={styles.platform}>
                            <dt>플랫폼</dt>
                            <dd>
                              {amusement.ott === 'amazonOriginal' && (
                                <>
                                  <AmazonIcon /> <span>AMAZON</span>
                                </>
                              )}
                              {(amusement.ott === 'appleOriginal' || amusement.ott === 'appleFilm') && (
                                <>
                                  <AppleIcon /> <span>Apple TV+</span>
                                </>
                              )}
                              {amusement.ott === 'disneyOriginal' && (
                                <>
                                  <DisneyIcon /> <span>Disney+</span>
                                </>
                              )}
                              {amusement.ott === 'disneyStar' && (
                                <>
                                  <StarIcon /> <span>Star+</span>
                                </>
                              )}
                              {(amusement.ott === 'netflixSeries' ||
                                amusement.ott === 'netflixPresents' ||
                                amusement.ott === 'netflixOriginal' ||
                                amusement.ott === 'netflixFilm' ||
                                amusement.ott === 'netflixAnime' ||
                                amusement.ott === 'netflixAnimeFilm' ||
                                amusement.ott === 'netflixDocumentary') && (
                                <>
                                  <NetflixIcon /> <span>NETFLIX</span>
                                </>
                              )}
                              {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                                <>
                                  <TvingIcon /> <span>티빙</span>
                                </>
                              )}
                              {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                                <>
                                  <WatchaIcon /> <span>왓챠</span>
                                </>
                              )}
                              {(amusement.ott === 'wavveOriginal' || amusement.ott === 'wavveOnly') && (
                                <>
                                  <WavveIcon /> <span>웨이브</span>
                                </>
                              )}
                              {amusement.ott === 'paramount' && (
                                <>
                                  <ParamountIcon /> <span>Paramount+</span>
                                </>
                              )}
                            </dd>
                          </div>
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              {amusement.ott === 'amazonOriginal' ? (
                                <i className={`${styles['rating-amazon']} number`} aria-label="시청 가능 연령">
                                  {amusement.rating === 'all' && 'All'}
                                  {amusement.rating === 'a7' && '7+'}
                                  {amusement.rating === 'b12' && '13+'}
                                  {amusement.rating === 'c15' && '16+'}
                                  {amusement.rating === 'd19' && '18+'}
                                </i>
                              ) : (
                                <>
                                  {amusement.category === 'ott_drama' || amusement.category === 'ott_anime' ? (
                                    <>
                                      {amusement.rating !== 'd19' ? (
                                        <>
                                          {amusement.rating === 'all' ? (
                                            <i className={`${styles.drama} ${styles.all} number`}>
                                              {RatingsDrama(amusement.rating)}
                                            </i>
                                          ) : (
                                            <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                                          )}
                                        </>
                                      ) : (
                                        <i className={`${styles.drama} ${styles.d19} number`}>
                                          {RatingsDrama(amusement.rating)}
                                        </i>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {amusement.rating === 'all' && (
                                        <>
                                          <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                        </>
                                      )}
                                      {amusement.rating === 'b12' && (
                                        <>
                                          <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                        </>
                                      )}
                                      {amusement.rating === 'c15' && (
                                        <>
                                          <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                        </>
                                      )}
                                      {amusement.rating === 'd19' && (
                                        <>
                                          <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>{amusement.titleKorean != null ? amusement.titleKorean : amusement.title}</strong>
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
                  {process.env.NODE_ENV === 'development' && ` ${gameData.total}개`}
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
                  gameData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="460" height="215" alt="" unoptimized />
                        {amusement.category !== 'game_fan' && (
                          <dl>
                            <div className={styles.game}>
                              <dt>심의등급</dt>
                              <dd>
                                {amusement.rating === 'all' && (
                                  <>
                                    <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                                  </>
                                )}
                                {amusement.rating === 'b12' && (
                                  <>
                                    <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                                  </>
                                )}
                                {amusement.rating === 'c15' && (
                                  <>
                                    <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                                  </>
                                )}
                                {amusement.rating === 'd19' && (
                                  <>
                                    <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          </dl>
                        )}
                      </div>
                      <strong>
                        <strong>
                          {amusement.category === 'game_fan' ? (
                            `'${amusement.title}' 팬 게임 콜렉션`
                          ) : amusement.titleKorean != null ? (
                            amusement.titleKorean
                          ) : (
                            <>
                              {amusement.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusement.title} </span>}
                              {amusement.lang === 'chineseGanche' && <span lang="zh-Hans">{amusement.title} </span>}
                              {amusement.lang === 'europe' && <span lang="en">{amusement.title}</span>}
                              {amusement.lang === 'english' && <span lang="en-US">{amusement.title}</span>}
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
          {fanData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?category=game_fan&page=1">팬 게임 콜렉션</Anchor>
                </h2>
                <Anchor href="/amusement?category=game_fan&page=1">
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
                {Array.isArray(fanData.data) &&
                  fanData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="460" height="215" alt="" unoptimized />
                      </div>
                      <strong>
                        <strong>&apos;{amusement.title}&apos; 팬 게임 콜렉션</strong>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query.page) || 1;
  let dramaData = null;
  let filmData = null;
  let gameData = null;
  let animeData = null;
  let ottData = null;
  let fanData = null;
  let error = null;

  try {
    const drama = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category?page=1&pageSize=7&categoryName=drama`);
    if (!drama.ok) {
      throw new Error('Network response was not ok');
    }
    dramaData = await drama.json();

    const film = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category?page=1&pageSize=7&categoryName=film`);
    if (!film.ok) {
      throw new Error('Network response was not ok');
    }
    filmData = await film.json();

    const game = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category?categoryName=game&page=1&pageSize=5`);
    if (!game.ok) {
      throw new Error('Network response was not ok');
    }
    gameData = await game.json();

    const fan = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category?categoryName=game_fan&page=1&pageSize=5`);
    if (!fan.ok) {
      throw new Error('Network response was not ok');
    }
    fanData = await fan.json();

    const anime = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category?categoryName=anime&page=1&pageSize=7`);
    if (!anime.ok) {
      throw new Error('Network response was not ok');
    }
    animeData = await anime.json();

    const ott = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category?categoryName=ott&page=1&pageSize=7`);
    if (!ott.ok) {
      throw new Error('Network response was not ok');
    }
    ottData = await ott.json();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      dramaData,
      filmData,
      gameData,
      animeData,
      ottData,
      fanData,
      error,
      currentPage,
    },
  };
};
