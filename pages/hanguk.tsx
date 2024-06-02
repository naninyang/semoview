import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import ChoiceBarrierFree from '@/components/ChoiceBarrierFree';
import { vectors } from '@/components/vectors';
import { RatingsDrama } from '@/components/RatingsDrama';
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
  BbcIcon,
  DaewonIcon,
  DisneyIcon,
  EnaIcon,
  FujitvIcon,
  HbomaxIcon,
  HuluIcon,
  JtbcIcon,
  Kbs2Icon,
  MbcIcon,
  MbsIcon,
  NetflixIcon,
  NippontvIcon,
  OcnIcon,
  ParamountIcon,
  PeacockIcon,
  RatingFilmAll,
  RatingFilmB12,
  RatingFilmC15,
  RatingFilmD18,
  RatingGameAll,
  RatingGameB12,
  RatingGameC15,
  RatingGameD19,
  SbsIcon,
  SkyIcon,
  StarIcon,
  SyfyIcon,
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

const HangukBackground = styled.div({
  background: `url(${vectors.supportLang}) no-repeat 50% 50%/cover`,
});

function Hanguk({
  subtitleData,
  subtitleGameData,
  dubbingData,
  unofficialGameData,
  ccData,
  descriptionData,
  error,
}: {
  subtitleData: any;
  subtitleGameData: any;
  dubbingData: any;
  unofficialGameData: any;
  ccData: any;
  descriptionData: any;
  error: string;
}) {
  const router = useRouter();
  const timestamp = Date.now();

  useEffect(() => {
    sessionStorage.removeItem('amusementCategory');
    sessionStorage.removeItem('amusementTag');
    sessionStorage.removeItem('amusementPlatform');
    sessionStorage.removeItem('amusementHanguk');
    sessionStorage.removeItem('amusementSubdub');
    sessionStorage.removeItem('amusementBfree');

    sessionStorage.removeItem('category');
    sessionStorage.removeItem('platform');
    sessionStorage.removeItem('tag');
    sessionStorage.removeItem('subdub');
    sessionStorage.removeItem('bfree');

    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem('semoview', router.asPath);
    sessionStorage.setItem('hanguk', router.asPath);
  }, [router.asPath]);

  return (
    <main className={styles.categories}>
      <Seo
        pageTitles={`자막/더빙/베리어프리 지원 여부 확인하기 - ${originTitle}`}
        pageTitle={`자막/더빙/베리어프리 지원 여부 확인하기`}
        pageDescription="한글 자막, 한국어 더빙, 베리어프리(CC/AD)"
        pageImg={`https://semo.dev1stud.io/og-hanguk.webp?ts=${timestamp}`}
      />
      <ChoiceBarrierFree />
      <div className="headline">
        <h1 className="April16thPromise">
          <em dangerouslySetInnerHTML={{ __html: '자막/더빙/베리어프리<br />지원 작품!' }} />
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
          {subtitleData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?hanguk=subtitle&page=1">한글 자막 공식 지원!</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${subtitleData.total}개`}
                </h2>
                <Anchor href="/amusement?hanguk=subtitle&page=1">
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
                {Array.isArray(subtitleData.data) &&
                  subtitleData.data.map((amusement: AmusementData, index: number) => (
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
                          {(amusement.broadcast !== null || amusement.wavveSeries !== null) && (
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
                                {amusement.wavveSeries &&
                                  amusement.wavveSeries.map((item: string, index: number) => (
                                    <React.Fragment key={index}>
                                      {item === 'bbc' && (
                                        <>
                                          <BbcIcon />
                                          <span>BBC</span>
                                        </>
                                      )}
                                      {item === 'hbomax' && (
                                        <>
                                          <HbomaxIcon />
                                          <span>HBO맥스</span>
                                        </>
                                      )}
                                      {item === 'hulu' && (
                                        <>
                                          <HuluIcon />
                                          <span>Hulu</span>
                                        </>
                                      )}
                                      {item === 'peacock' && (
                                        <>
                                          <PeacockIcon />
                                          <span>Peacock</span>
                                        </>
                                      )}
                                      {item === 'sky' && (
                                        <>
                                          <SkyIcon />
                                          <span>SKY</span>
                                        </>
                                      )}
                                      {item === 'syfy' && (
                                        <>
                                          <SyfyIcon />
                                          <span>SYFY</span>
                                        </>
                                      )}
                                    </React.Fragment>
                                  ))}
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
                                  {(amusement.category === 'drama' ||
                                    amusement.category === 'ott_drama' ||
                                    amusement.category === 'ott_anime' ||
                                    amusement.category === 'ott_documentary' ||
                                    amusement.anime === 'tva' ||
                                    amusement.anime === 'ova') && (
                                    <>
                                      {amusement.rating === 'all' ? (
                                        <>
                                          <i className={`${styles.drama} ${styles.all} number`}>
                                            {RatingsDrama(amusement.rating)}
                                          </i>
                                          <span>전체 이용가</span>
                                        </>
                                      ) : (
                                        <>
                                          {amusement.rating === 'd19' ? (
                                            <>
                                              <i className={`${styles.drama} ${styles.d19} number`}>
                                                {RatingsDrama(amusement.rating)}
                                              </i>
                                              <span>세 미만 이용불가</span>
                                            </>
                                          ) : (
                                            <>
                                              <i className={`${styles.drama} number`}>
                                                {RatingsDrama(amusement.rating)}
                                              </i>
                                              <span>세 이상 이용가</span>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
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
                                  {amusement.supportLang
                                    .filter((item: string) => item !== 'subtitle')
                                    .map((item: string, index: number) => (
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
          {subtitleGameData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?hanguk=subtitle&category=game&page=1">
                    한글 UI 또는 자막 공식 지원 게임!
                  </Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${subtitleGameData.total}개`}
                </h2>
                <Anchor href="/amusement?hanguk=subtitle&category=game&page=1">
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
                {Array.isArray(subtitleGameData.data) &&
                  subtitleGameData.data.map((amusement: AmusementData, index: number) => (
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
                                    {amusement.supportLang
                                      .filter((item: string) => item !== 'subtitle')
                                      .map((item: string, index: number) => (
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
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {dubbingData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?hanguk=dubbing&page=1">한국어 더빙 공식 지원!</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${dubbingData.total}개`}
                </h2>
                <Anchor href="/amusement?hanguk=dubbing&page=1">
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
                {Array.isArray(dubbingData.data) &&
                  dubbingData.data.map((amusement: AmusementData, index: number) => (
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
                          {(amusement.broadcast !== null || amusement.wavveSeries !== null) && (
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
                                {amusement.wavveSeries &&
                                  amusement.wavveSeries.map((item: string, index: number) => (
                                    <React.Fragment key={index}>
                                      {item === 'bbc' && (
                                        <>
                                          <BbcIcon />
                                          <span>BBC</span>
                                        </>
                                      )}
                                      {item === 'hbomax' && (
                                        <>
                                          <HbomaxIcon />
                                          <span>HBO맥스</span>
                                        </>
                                      )}
                                      {item === 'hulu' && (
                                        <>
                                          <HuluIcon />
                                          <span>Hulu</span>
                                        </>
                                      )}
                                      {item === 'peacock' && (
                                        <>
                                          <PeacockIcon />
                                          <span>Peacock</span>
                                        </>
                                      )}
                                      {item === 'sky' && (
                                        <>
                                          <SkyIcon />
                                          <span>SKY</span>
                                        </>
                                      )}
                                      {item === 'syfy' && (
                                        <>
                                          <SyfyIcon />
                                          <span>SYFY</span>
                                        </>
                                      )}
                                    </React.Fragment>
                                  ))}
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
                                  {(amusement.category === 'drama' ||
                                    amusement.category === 'ott_drama' ||
                                    amusement.category === 'ott_anime' ||
                                    amusement.category === 'ott_documentary' ||
                                    amusement.anime === 'tva' ||
                                    amusement.anime === 'ova') && (
                                    <>
                                      {amusement.rating === 'all' ? (
                                        <>
                                          <i className={`${styles.drama} ${styles.all} number`}>
                                            {RatingsDrama(amusement.rating)}
                                          </i>
                                          <span>전체 이용가</span>
                                        </>
                                      ) : (
                                        <>
                                          {amusement.rating === 'd19' ? (
                                            <>
                                              <i className={`${styles.drama} ${styles.d19} number`}>
                                                {RatingsDrama(amusement.rating)}
                                              </i>
                                              <span>세 미만 이용불가</span>
                                            </>
                                          ) : (
                                            <>
                                              <i className={`${styles.drama} number`}>
                                                {RatingsDrama(amusement.rating)}
                                              </i>
                                              <span>세 이상 이용가</span>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
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
                                  {amusement.supportLang
                                    .filter((item: string) => item !== 'dubbing')
                                    .map((item: string, index: number) => (
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
          {unofficialGameData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?hanguk=unofficial&category=game&page=1">비공식 한글 자막 지원 게임!</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${unofficialGameData.total}개`}
                </h2>
                <Anchor href="/amusement?hanguk=unofficial&category=game&page=1">
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
                {Array.isArray(unofficialGameData.data) &&
                  unofficialGameData.data.map((amusement: AmusementData, index: number) => (
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
                                    {amusement.supportLang
                                      .filter((item: string) => item !== 'unofficial')
                                      .map((item: string, index: number) => (
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
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {ccData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?hanguk=cc&page=1">청각 장애인용 자막 지원!</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${ccData.total}개`}
                </h2>
                <Anchor href="/amusement?hanguk=cc&page=1">
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
                {Array.isArray(ccData.data) &&
                  ccData.data.map((amusement: AmusementData, index: number) => (
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
                          {(amusement.broadcast !== null || amusement.wavveSeries !== null) && (
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
                                {amusement.wavveSeries &&
                                  amusement.wavveSeries.map((item: string, index: number) => (
                                    <React.Fragment key={index}>
                                      {item === 'bbc' && (
                                        <>
                                          <BbcIcon />
                                          <span>BBC</span>
                                        </>
                                      )}
                                      {item === 'hbomax' && (
                                        <>
                                          <HbomaxIcon />
                                          <span>HBO맥스</span>
                                        </>
                                      )}
                                      {item === 'hulu' && (
                                        <>
                                          <HuluIcon />
                                          <span>Hulu</span>
                                        </>
                                      )}
                                      {item === 'peacock' && (
                                        <>
                                          <PeacockIcon />
                                          <span>Peacock</span>
                                        </>
                                      )}
                                      {item === 'sky' && (
                                        <>
                                          <SkyIcon />
                                          <span>SKY</span>
                                        </>
                                      )}
                                      {item === 'syfy' && (
                                        <>
                                          <SyfyIcon />
                                          <span>SYFY</span>
                                        </>
                                      )}
                                    </React.Fragment>
                                  ))}
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
                                  {(amusement.category === 'drama' ||
                                    amusement.category === 'ott_drama' ||
                                    amusement.category === 'ott_anime' ||
                                    amusement.category === 'ott_documentary' ||
                                    amusement.anime === 'tva' ||
                                    amusement.anime === 'ova') && (
                                    <>
                                      {amusement.rating === 'all' ? (
                                        <>
                                          <i className={`${styles.drama} ${styles.all} number`}>
                                            {RatingsDrama(amusement.rating)}
                                          </i>
                                          <span>전체 이용가</span>
                                        </>
                                      ) : (
                                        <>
                                          {amusement.rating === 'd19' ? (
                                            <>
                                              <i className={`${styles.drama} ${styles.d19} number`}>
                                                {RatingsDrama(amusement.rating)}
                                              </i>
                                              <span>세 미만 이용불가</span>
                                            </>
                                          ) : (
                                            <>
                                              <i className={`${styles.drama} number`}>
                                                {RatingsDrama(amusement.rating)}
                                              </i>
                                              <span>세 이상 이용가</span>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
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
                                  {amusement.supportLang
                                    .filter((item: string) => item !== 'cc')
                                    .map((item: string, index: number) => (
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
          {descriptionData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?hanguk=description&page=1">화면 해설 지원!</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${descriptionData.total}개`}
                </h2>
                <Anchor href="/amusement?hanguk=description&page=1">
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
                {Array.isArray(descriptionData.data) &&
                  descriptionData.data.map((amusement: AmusementData, index: number) => (
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
                          {(amusement.broadcast !== null || amusement.wavveSeries !== null) && (
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
                                {amusement.wavveSeries &&
                                  amusement.wavveSeries.map((item: string, index: number) => (
                                    <React.Fragment key={index}>
                                      {item === 'bbc' && (
                                        <>
                                          <BbcIcon />
                                          <span>BBC</span>
                                        </>
                                      )}
                                      {item === 'hbomax' && (
                                        <>
                                          <HbomaxIcon />
                                          <span>HBO맥스</span>
                                        </>
                                      )}
                                      {item === 'hulu' && (
                                        <>
                                          <HuluIcon />
                                          <span>Hulu</span>
                                        </>
                                      )}
                                      {item === 'peacock' && (
                                        <>
                                          <PeacockIcon />
                                          <span>Peacock</span>
                                        </>
                                      )}
                                      {item === 'sky' && (
                                        <>
                                          <SkyIcon />
                                          <span>SKY</span>
                                        </>
                                      )}
                                      {item === 'syfy' && (
                                        <>
                                          <SyfyIcon />
                                          <span>SYFY</span>
                                        </>
                                      )}
                                    </React.Fragment>
                                  ))}
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
                                  {(amusement.category === 'drama' ||
                                    amusement.category === 'ott_drama' ||
                                    amusement.category === 'ott_anime' ||
                                    amusement.category === 'ott_documentary' ||
                                    amusement.anime === 'tva' ||
                                    amusement.anime === 'ova') && (
                                    <>
                                      {amusement.rating === 'all' ? (
                                        <>
                                          <i className={`${styles.drama} ${styles.all} number`}>
                                            {RatingsDrama(amusement.rating)}
                                          </i>
                                          <span>전체 이용가</span>
                                        </>
                                      ) : (
                                        <>
                                          {amusement.rating === 'd19' ? (
                                            <>
                                              <i className={`${styles.drama} ${styles.d19} number`}>
                                                {RatingsDrama(amusement.rating)}
                                              </i>
                                              <span>세 미만 이용불가</span>
                                            </>
                                          ) : (
                                            <>
                                              <i className={`${styles.drama} number`}>
                                                {RatingsDrama(amusement.rating)}
                                              </i>
                                              <span>세 이상 이용가</span>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
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
                                  {amusement.supportLang
                                    .filter((item: string) => item !== 'description')
                                    .map((item: string, index: number) => (
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
          <div className={styles.asides}>
            <HangukBackground />
            <aside>
              <p>한눈에 모든 작품 보기! (게임 제외)</p>
              <p className="April16thPromise">
                <Anchor href="/amusement?hanguk=anything&page=1">작품 확인하기!</Anchor>
              </p>
            </aside>
            <hr />
            <aside>
              <p>한눈에 모든 게임 보기!</p>
              <p className="April16thPromise">
                <Anchor href="/amusement?hanguk=anything&category=game&page=1">게임 확인하기!</Anchor>
              </p>
            </aside>
          </div>
        </div>
      )}
    </main>
  );
}

export default Hanguk;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query.page) || 1;
  let subtitleData = null;
  let subtitleGameData = null;
  let dubbingData = null;
  let unofficialGameData = null;
  let ccData = null;
  let descriptionData = null;
  let anythingData = null;
  let anythingGameData = null;
  let error = null;

  try {
    const subtitle = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hanguk?page=1&pageSize=7&hangukName=subtitle`);
    if (!subtitle.ok) {
      throw new Error('Network response was not ok');
    }
    subtitleData = await subtitle.json();

    const dubbing = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hanguk?page=1&pageSize=7&hangukName=dubbing`);
    if (!dubbing.ok) {
      throw new Error('Network response was not ok');
    }
    dubbingData = await dubbing.json();

    const subtitleGame = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hanguk?page=1&pageSize=5&hangukName=subtitle&categoryName=game`,
    );
    if (!subtitleGame.ok) {
      throw new Error('Network response was not ok');
    }
    subtitleGameData = await subtitleGame.json();

    const unofficialGame = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hanguk?page=1&pageSize=5&hangukName=unofficial&categoryName=game`,
    );
    if (!unofficialGame.ok) {
      throw new Error('Network response was not ok');
    }
    unofficialGameData = await unofficialGame.json();

    const cc = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hanguk?page=1&pageSize=7&hangukName=cc`);
    if (!cc.ok) {
      throw new Error('Network response was not ok');
    }
    ccData = await cc.json();

    const description = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hanguk?page=1&pageSize=7&hangukName=description`,
    );
    if (!description.ok) {
      throw new Error('Network response was not ok');
    }
    descriptionData = await description.json();

    const anything = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hanguk?page=1&pageSize=7&hangukName=anything`);
    if (!anything.ok) {
      throw new Error('Network response was not ok');
    }
    anythingData = await anything.json();

    const anythingGame = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hanguk?page=1&pageSize=7&hangukName=anything&categoryName=game`,
    );
    if (!anythingGame.ok) {
      throw new Error('Network response was not ok');
    }
    anythingGameData = await anythingGame.json();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      subtitleData,
      subtitleGameData,
      dubbingData,
      unofficialGameData,
      ccData,
      descriptionData,
      anythingData,
      anythingGameData,
      error,
      currentPage,
    },
  };
};
