import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData, Counts } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import ChoiceGenre from '@/components/ChoiceGenre';
import { vectors } from '@/components/vectors';
import { RatingsDrama } from '@/components/RatingsDrama';
import { formatNumber } from '@/components/FormatNumber';
import { BadgeLang } from '@/components/BadgeLang';
import styles from '@/styles/Categories.module.sass';
import {
  AbcIcon,
  AmazonIcon,
  AniboxIcon,
  AnimaxIcon,
  AniplusIcon,
  AppleIcon,
  AtxIcon,
  DaewonIcon,
  DisneyIcon,
  EnaIcon,
  FujitvIcon,
  JtbcIcon,
  Kbs2Icon,
  MbcIcon,
  MbsIcon,
  NetflixIcon,
  NippontvIcon,
  OcnIcon,
  ParamountIcon,
  RatingFilmAll,
  RatingFilmB12,
  RatingFilmC15,
  RatingFilmD18,
  RatingGameAll,
  RatingGameB12,
  RatingGameC15,
  RatingGameD19,
  SbsIcon,
  StarIcon,
  TbsIcon,
  TokyomxIcon,
  TooniverseIcon,
  TvingIcon,
  TvnIcon,
  TvtokyoIcon,
  WatchaIcon,
  WavveIcon,
  WavveIcon2,
  WowowIcon,
} from '@/components/Icons';

const Hanguk = styled.div({
  background: `url(${vectors.supportLang}) no-repeat 50% 50%/cover`,
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

    sessionStorage.setItem('backhistory', router.asPath);
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
        pageImg={`https://semo.dev1stud.io/og-categories.webp?ts=${timestamp}`}
      />
      <ChoiceGenre />
      <div className="headline">
        <h1 className="April16thPromise">
          <em dangerouslySetInnerHTML={{ __html: '카테고리별 보고싶다?<br/>골라보세요' }} />{' '}
          {count && <span>({formatNumber(count.amusement)}개 작품)</span>}
        </h1>
      </div>
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
                <h2 className="April16thPromise">
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
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized priority />
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
                                    <AmazonIcon /> <span>아마존 프라임비디오</span>
                                  </>
                                )}
                                {amusement.ott === 'appleOriginal' && (
                                  <>
                                    <AppleIcon /> <span>Apple TV+ 시리즈</span>
                                  </>
                                )}
                                {amusement.ott === 'appleFilm' && (
                                  <>
                                    <AppleIcon /> <span>Apple TV+ 영화</span>
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
                                    <NetflixIcon />
                                    <span>
                                      {(amusement.ott === 'netflixSeries' ||
                                        amusement.ott === 'netflixOriginal' ||
                                        amusement.ott === 'netflixAnime') &&
                                        '넷플릭스 시리즈'}
                                      {(amusement.ott === 'netflixPresents' ||
                                        amusement.ott === 'netflixFilm' ||
                                        amusement.ott === 'netflixAnimeFilm') &&
                                        '넷플릭스 영화'}
                                      {amusement.ott === 'netflixDocumentary' && '넷플릭스 다큐멘터리'}
                                    </span>
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
                                {(amusement.ott === 'wavveOriginal' ||
                                  amusement.ott === 'wavveOnly' ||
                                  amusement.ott === 'waveOnly') && (
                                  <>
                                    <WavveIcon /> <span>웨이브</span>
                                  </>
                                )}
                                {amusement.ott === 'waveFirstrun' && (
                                  <>
                                    <WavveIcon2 /> <span>웨이브 해외시리즈</span>
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
                            {amusement.supportLang && (
                              <>
                                <dt>추가지원</dt>
                                <dd>
                                  {amusement.supportLang.map((item: string, index: number) => (
                                    <i className={styles.supportLang} key={index}>
                                      {BadgeLang(item)}
                                    </i>
                                  ))}
                                </dd>
                              </>
                            )}
                          </div>
                        </dl>
                      </div>
                      <strong>
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {filmData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
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
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized priority />
                        <dl>
                          {amusement.ott !== null && (
                            <div className={styles.platform}>
                              <dt>플랫폼</dt>
                              <dd>
                                {amusement.ott === 'amazonOriginal' && (
                                  <>
                                    <AmazonIcon /> <span>아마존 프라임비디오</span>
                                  </>
                                )}
                                {amusement.ott === 'appleOriginal' && (
                                  <>
                                    <AppleIcon /> <span>Apple TV+ 시리즈</span>
                                  </>
                                )}
                                {amusement.ott === 'appleFilm' && (
                                  <>
                                    <AppleIcon /> <span>Apple TV+ 영화</span>
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
                                    <NetflixIcon />
                                    <span>
                                      {(amusement.ott === 'netflixSeries' ||
                                        amusement.ott === 'netflixOriginal' ||
                                        amusement.ott === 'netflixAnime') &&
                                        '넷플릭스 시리즈'}
                                      {(amusement.ott === 'netflixPresents' ||
                                        amusement.ott === 'netflixFilm' ||
                                        amusement.ott === 'netflixAnimeFilm') &&
                                        '넷플릭스 영화'}
                                      {amusement.ott === 'netflixDocumentary' && '넷플릭스 다큐멘터리'}
                                    </span>
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
                                {(amusement.ott === 'wavveOriginal' ||
                                  amusement.ott === 'wavveOnly' ||
                                  amusement.ott === 'waveOnly') && (
                                  <>
                                    <WavveIcon /> <span>웨이브</span>
                                  </>
                                )}
                                {amusement.ott === 'waveFirstrun' && (
                                  <>
                                    <WavveIcon2 /> <span>웨이브 해외시리즈</span>
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
                            {amusement.supportLang && (
                              <>
                                <dt>추가지원</dt>
                                <dd>
                                  {amusement.supportLang.map((item: string, index: number) => (
                                    <i className={styles.supportLang} key={index}>
                                      {BadgeLang(item)}
                                    </i>
                                  ))}
                                </dd>
                              </>
                            )}
                          </div>
                        </dl>
                      </div>
                      <strong>
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {animeData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
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
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized priority />
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
                                    <AnimaxIcon /> <span>애니맥스 코리아</span>
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
                                    <TokyomxIcon /> <span>도쿄MX</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'tvtokyo' && (
                                  <>
                                    <TvtokyoIcon /> <span>테레토</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'fujitv' && (
                                  <>
                                    <FujitvIcon /> <span>후지테레비</span>
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
                                    <NippontvIcon /> <span>닛테레</span>
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
                                    <AmazonIcon /> <span>아마존 프라임비디오</span>
                                  </>
                                )}
                                {amusement.ott === 'appleOriginal' && (
                                  <>
                                    <AppleIcon /> <span>Apple TV+ 시리즈</span>
                                  </>
                                )}
                                {amusement.ott === 'appleFilm' && (
                                  <>
                                    <AppleIcon /> <span>Apple TV+ 영화</span>
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
                                    <NetflixIcon />
                                    <span>
                                      {(amusement.ott === 'netflixSeries' ||
                                        amusement.ott === 'netflixOriginal' ||
                                        amusement.ott === 'netflixAnime') &&
                                        '넷플릭스 시리즈'}
                                      {(amusement.ott === 'netflixPresents' ||
                                        amusement.ott === 'netflixFilm' ||
                                        amusement.ott === 'netflixAnimeFilm') &&
                                        '넷플릭스 영화'}
                                      {amusement.ott === 'netflixDocumentary' && '넷플릭스 다큐멘터리'}
                                    </span>
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
                                {(amusement.ott === 'wavveOriginal' ||
                                  amusement.ott === 'wavveOnly' ||
                                  amusement.ott === 'waveOnly') && (
                                  <>
                                    <WavveIcon /> <span>웨이브</span>
                                  </>
                                )}
                                {amusement.ott === 'waveFirstrun' && (
                                  <>
                                    <WavveIcon2 /> <span>웨이브 해외시리즈</span>
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
                            {amusement.supportLang && (
                              <>
                                <dt>추가지원</dt>
                                <dd>
                                  {amusement.supportLang.map((item: string, index: number) => (
                                    <i className={styles.supportLang} key={index}>
                                      {BadgeLang(item)}
                                    </i>
                                  ))}
                                </dd>
                              </>
                            )}
                          </div>
                        </dl>
                      </div>
                      <strong>
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {ottData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
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
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized priority />
                        <dl>
                          {amusement.animeBroadcast1 !== null && (
                            <div
                              className={`${styles.anime1} ${amusement.animeBroadcast1 !== null ? styles.anime1 : ''} ${amusement.ott !== null ? styles.broadcasts : ''}`}
                            >
                              <dt>방송사</dt>
                              <dd>
                                {amusement.animeBroadcast1 === 'tokyomx' && (
                                  <>
                                    <TokyomxIcon /> <span>도쿄MX</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'tvtokyo' && (
                                  <>
                                    <TvtokyoIcon /> <span>테레토</span>
                                  </>
                                )}
                                {amusement.animeBroadcast1 === 'fujitv' && (
                                  <>
                                    <FujitvIcon /> <span>후지테레비</span>
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
                                    <NippontvIcon /> <span>닛테레</span>
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
                                  <AmazonIcon /> <span>아마존 프라임비디오</span>
                                </>
                              )}
                              {amusement.ott === 'appleOriginal' && (
                                <>
                                  <AppleIcon /> <span>Apple TV+ 시리즈</span>
                                </>
                              )}
                              {amusement.ott === 'appleFilm' && (
                                <>
                                  <AppleIcon /> <span>Apple TV+ 영화</span>
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
                                  <NetflixIcon />
                                  <span>
                                    {(amusement.ott === 'netflixSeries' ||
                                      amusement.ott === 'netflixOriginal' ||
                                      amusement.ott === 'netflixAnime') &&
                                      '넷플릭스 시리즈'}
                                    {(amusement.ott === 'netflixPresents' ||
                                      amusement.ott === 'netflixFilm' ||
                                      amusement.ott === 'netflixAnimeFilm') &&
                                      '넷플릭스 영화'}
                                    {amusement.ott === 'netflixDocumentary' && '넷플릭스 다큐멘터리'}
                                  </span>
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
                              {(amusement.ott === 'wavveOriginal' ||
                                amusement.ott === 'wavveOnly' ||
                                amusement.ott === 'waveOnly') && (
                                <>
                                  <WavveIcon /> <span>웨이브</span>
                                </>
                              )}
                              {amusement.ott === 'waveFirstrun' && (
                                <>
                                  <WavveIcon2 /> <span>웨이브 해외시리즈</span>
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
                            {amusement.supportLang && (
                              <>
                                <dt>추가지원</dt>
                                <dd>
                                  {amusement.supportLang.map((item: string, index: number) => (
                                    <i className={styles.supportLang} key={index}>
                                      {BadgeLang(item)}
                                    </i>
                                  ))}
                                </dd>
                              </>
                            )}
                          </div>
                        </dl>
                      </div>
                      <strong>
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {gameData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
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
                        <Image src={amusement.posterDefault} width="460" height="215" alt="" unoptimized priority />
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
                              {amusement.supportLang && (
                                <>
                                  <dt>추가지원</dt>
                                  <dd>
                                    {amusement.supportLang.map((item: string, index: number) => (
                                      <i className={styles.supportLang} key={index}>
                                        {BadgeLang(item)}
                                      </i>
                                    ))}
                                  </dd>
                                </>
                              )}
                            </div>
                          </dl>
                        )}
                      </div>
                      <strong>
                        <strong>
                          <span className="seed">
                            {amusement.category === 'game_fan'
                              ? `'${amusement.title}' 팬 게임 콜렉션`
                              : amusement.titleKorean
                                ? amusement.titleKorean
                                : amusement.title}
                          </span>
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
                <h2 className="April16thPromise">
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
                        <Image src={amusement.posterDefault} width="460" height="215" alt="" unoptimized priority />
                      </div>
                      <strong>
                        <span className="seed">&apos;{amusement.title}&apos; 팬 게임 콜렉션</span>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          <aside className={styles.hanguk}>
            <Hanguk />
            <p>자막 / 더빙 / 베리어프리 작품 확인!</p>
            <p className="April16thPromise">
              <Anchor href="/hanguk">작품 확인하기!</Anchor>
            </p>
          </aside>
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
