import { useEffect } from 'react';
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

const HangukBackground = styled.div({
  background: `url(${vectors.supportLang}) no-repeat 50% 50%/cover`,
});

function BarrierFree({
  ccData,
  descriptionData,
  bfreeData,
  error,
}: {
  ccData: any;
  descriptionData: any;
  bfreeData: any;
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

    sessionStorage.removeItem('category');
    sessionStorage.removeItem('platform');
    sessionStorage.removeItem('tag');
    sessionStorage.removeItem('hanguk');

    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem('semoview', router.asPath);
    sessionStorage.setItem('subdub', router.asPath);
  }, [router.asPath]);

  return (
    <main className={styles.categories}>
      <Seo
        pageTitles={`베리어프리 지원 여부 확인하기 - ${originTitle}`}
        pageTitle={`베리어프리 지원 여부 확인하기`}
        pageDescription="청각 장애인용 자막 (CC), 화면 해설 (AD)"
        pageImg={`https://semo.dev1stud.io/og-barrier-free.webp?ts=${timestamp}`}
      />
      <ChoiceBarrierFree />
      <h1>
        <span className="April16thPromise">
          <i className="preview" />
          베리어프리 지원 작품!
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
          {ccData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?bfree=cc&page=1">청각 장애인용 자막 지원!</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${ccData.total}개`}
                </h2>
                <Anchor href="/amusement?bfree=cc&page=1">
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
                          {amusement.supportLang
                            .filter((item: string) => item === 'description')
                            .map((index: number) => (
                              <span key={index}>화면해설 지원</span>
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
                  <Anchor href="/amusement?bfree=description&page=1">화면 해설 지원!</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${descriptionData.total}개`}
                </h2>
                <Anchor href="/amusement?bfree=description&page=1">
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
                          {amusement.supportLang
                            .filter((item: string) => item === 'subtitle')
                            .map((index: number) => (
                              <span key={index}>자막 지원</span>
                            ))}{' '}
                          {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                        </span>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {bfreeData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?bfree=bfree&page=1">CC/AD 둘다 지원하는 작품!</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${bfreeData.total}개`}
                </h2>
                <Anchor href="/amusement?bfree=bfree&page=1">
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
                {Array.isArray(bfreeData.data) &&
                  bfreeData.data.map((amusement: AmusementData, index: number) => (
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
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          <aside className={styles.hanguk}>
            <HangukBackground />
            <p>자막/더빙 작품 확인!</p>
            <p className="April16thPromise">
              <Anchor href="/subdub">작품 확인하기!</Anchor>
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

export default BarrierFree;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query.page) || 1;
  let ccData = null;
  let descriptionData = null;
  let bfreeData = null;
  let error = null;

  try {
    const cc = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bfree?page=1&pageSize=7&bfreeName=cc`);
    if (!cc.ok) {
      throw new Error('Network response was not ok');
    }
    ccData = await cc.json();

    const description = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bfree?page=1&pageSize=7&bfreeName=description`,
    );
    if (!description.ok) {
      throw new Error('Network response was not ok');
    }
    descriptionData = await description.json();

    const bfree = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bfree?page=1&pageSize=7&bfreeName=bfree`);
    if (!bfree.ok) {
      throw new Error('Network response was not ok');
    }
    bfreeData = await bfree.json();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      ccData,
      descriptionData,
      bfreeData,
      error,
      currentPage,
    },
  };
};
