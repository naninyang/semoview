import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import Choice from '@/components/Choice';
import { vectors } from '@/components/vectors';
import { RatingsDrama } from '@/components/RatingsDrama';
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

    sessionStorage.removeItem('category');
    sessionStorage.removeItem('platform');

    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem('semoview', router.asPath);
    sessionStorage.setItem('tag', router.asPath);
  }, [router.asPath]);

  return (
    <main className={styles.categories}>
      <Seo
        pageTitles={`자막 여부 선택하기 - ${originTitle}`}
        pageTitle={`자막 여부 선택하기`}
        pageDescription="한글 자막, 한국어 더빙, 베리어프리"
        pageImg={`https://semo.dev1stud.io/og-hanguk.webp?ts=${timestamp}`}
      />
      <Choice />
      <h1>
        <span className="April16thPromise">
          <i className="preview" />
          자막, 더빙, 베리어프리 지원 작품!
        </span>
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
                          </div>
                        </dl>
                      </div>
                      <strong>
                        <span className="seed">
                          {amusement.supportLang.map((item: string, index: number) => (
                            <>{item === 'dubbing' && <span key={index}>더빙 지원</span>}</>
                          ))}{' '}
                          {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                        </span>
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
                        <span className="seed">
                          {amusement.supportLang.map((item: string, index: number) => (
                            <>{item === 'dubbing' && <span key={index}>더빙 지원</span>}</>
                          ))}{' '}
                          {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                        </span>
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
                          </div>
                        </dl>
                      </div>
                      <strong>
                        <span className="seed">
                          {amusement.supportLang.map((item: string, index: number) => (
                            <>{item === 'subtitle' && <span key={index}>자막 지원</span>}</>
                          ))}{' '}
                          {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                        </span>
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
                          </div>
                        </dl>
                      </div>
                      <strong>
                        <span className="seed">
                          {amusement.supportLang.map((item: string, index: number) => (
                            <>{item === 'description' && <span key={index}>화면해설 지원</span>}</>
                          ))}{' '}
                          {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                        </span>
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
                          </div>
                        </dl>
                      </div>
                      <strong>
                        <span className="seed">
                          {amusement.supportLang.map((item: string, index: number) => (
                            <>{item === 'cc' && <span key={index}>청각장애인 자막</span>}</>
                          ))}{' '}
                          {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                        </span>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          <div className={styles.asides}>
            <aside>
              <div className={styles.sideA} />
              <div className={styles.sideB} />
              <p>한눈에 모든 작품 보기! (게임 제외)</p>
              <p className="April16thPromise">
                <Anchor href="/amusement?hanguk=anything&page=1">작품 확인하기!</Anchor>
              </p>
            </aside>
            <aside>
              <div className={styles.sideA} />
              <div className={styles.sideB} />
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
