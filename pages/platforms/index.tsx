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

function Platforms({
  amazonData,
  netflixData,
  tvingData,
  kbsData,
  tvnData,
  jtbcData,
  error,
}: {
  amazonData: any;
  netflixData: any;
  tvingData: any;
  kbsData: any;
  tvnData: any;
  jtbcData: any;
  error: string;
}) {
  const router = useRouter();
  const timestamp = Date.now();

  useEffect(() => {
    sessionStorage.removeItem('amusementCategory');
    sessionStorage.removeItem('amusementTag');
    sessionStorage.removeItem('amusementPlatform');

    sessionStorage.removeItem('category');
    sessionStorage.removeItem('tag');

    sessionStorage.setItem('platform', router.asPath);
  }, [router.asPath]);

  return (
    <main className={styles.categories}>
      <Seo
        pageTitles={`리뷰 OTT & 방송국 선택하기 - ${originTitle}`}
        pageTitle={`리뷰 OTT & 방송국 선택하기`}
        pageDescription="아마존 프라임비디오 / 애플 TV+ / 디즈니+ & 스타+ / 넷플릭스 / 티빙 & 파라마운트+ / 왓챠 / 웨이브 / KBS 2TV / MBC / SBS / JTBC / OCN / tvN / ENA / ABC & 20th & FOX & FX "
        pageImg={`https://jejeup.dev1stud.io/og-platforms.webp?ts=${timestamp}`}
      />
      <Choice />
      <h1>
        <span>
          <i className="preview" />
          OTT & 방송국 골라보기! 💁‍♀️
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
          {tvingData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?platform=tving&page=1">티빙 오리지널 리뷰</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${tvingData.total}개`}
                </h2>
                <Anchor href="/amusement?platform=tving&page=1">
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
                {Array.isArray(tvingData.data) &&
                  tvingData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          {amusement.animeBroadcast2 !== null && (
                            <div
                              className={`${styles.anime2} ${amusement.animeBroadcast1 === null ? styles.anime2only : ''}`}
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
                                    <AnimaxIcon /> <span>애니박스</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
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
                            <div className={styles.broadcast}>
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
                          <div>
                            <dt>시청등급</dt>
                            <dd>
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
                                          <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
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
          {netflixData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?platform=netflix&page=1">넷플릭스 오리지널 리뷰</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${netflixData.total}개`}
                </h2>
                <Anchor href="/amusement?platform=netflix&page=1">
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
                {Array.isArray(netflixData.data) &&
                  netflixData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          {amusement.animeBroadcast2 !== null && (
                            <div
                              className={`${styles.anime2} ${amusement.animeBroadcast1 === null ? styles.anime2only : ''}`}
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
                                    <AnimaxIcon /> <span>애니박스</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
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
                            <div className={styles.broadcast}>
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
                          <div>
                            <dt>시청등급</dt>
                            <dd>
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
                                          <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
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
          {amazonData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?platform=amazon&page=1">아마존 프라임비디오 오리지널 리뷰</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${amazonData.total}개`}
                </h2>
                <Anchor href="/amusement?platform=amazon&page=1">
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
                {Array.isArray(amazonData.data) &&
                  amazonData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          {amusement.animeBroadcast2 !== null && (
                            <div
                              className={`${styles.anime2} ${amusement.animeBroadcast1 === null ? styles.anime2only : ''}`}
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
                                    <AnimaxIcon /> <span>애니박스</span>
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
                            <div className={styles.broadcast}>
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
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              <i className={`${styles['rating-amazon']} number`} aria-label="시청 가능 연령">
                                {amusement.rating === 'all' && 'All'}
                                {amusement.rating === 'a7' && '7+'}
                                {amusement.rating === 'b12' && '13+'}
                                {amusement.rating === 'c15' && '16+'}
                                {amusement.rating === 'd19' && '18+'}
                              </i>
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
          {kbsData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?platform=KBS2&page=1">KBS 2TV 드라마 리뷰</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${kbsData.total}개`}
                </h2>
                <Anchor href="/amusement?platform=KBS2&page=1">
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
                {Array.isArray(kbsData.data) &&
                  kbsData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          {amusement.animeBroadcast2 !== null && (
                            <div
                              className={`${styles.anime2} ${amusement.animeBroadcast1 === null ? styles.anime2only : ''}`}
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
                                    <AnimaxIcon /> <span>애니박스</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
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
                      <strong>{amusement.titleKorean != null ? amusement.titleKorean : amusement.title}</strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {tvnData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?platform=tvN&page=1">tvN 드라마 리뷰</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${tvnData.total}개`}
                </h2>
                <Anchor href="/amusement?platform=tvN&page=1">
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
                {Array.isArray(tvnData.data) &&
                  tvnData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          {amusement.animeBroadcast2 !== null && (
                            <div
                              className={`${styles.anime2} ${amusement.animeBroadcast1 === null ? styles.anime2only : ''}`}
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
                                    <AnimaxIcon /> <span>애니박스</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
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
                      <strong>{amusement.titleKorean != null ? amusement.titleKorean : amusement.title}</strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {jtbcData && (
            <>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/amusement?platform=JTBC&page=1">JTBC 드라마 리뷰</Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${jtbcData.total}개`}
                </h2>
                <Anchor href="/amusement?platform=JTBC&page=1">
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
                {Array.isArray(jtbcData.data) &&
                  jtbcData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          {amusement.animeBroadcast2 !== null && (
                            <div
                              className={`${styles.anime2} ${amusement.animeBroadcast1 === null ? styles.anime2only : ''}`}
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
                                    <AnimaxIcon /> <span>애니박스</span>
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
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
                      <strong>{amusement.titleKorean != null ? amusement.titleKorean : amusement.title}</strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          <aside>
            <div className={styles.sideA} />
            <div className={styles.sideB} />
            <p>좀 더 많은 OTT/방송국을 보고 싶으신가요?</p>
            <p>
              <Anchor href="/amusement">플랫폼을 골라보세요!</Anchor>
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Platforms;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query.page) || 1;
  let amazonData = null;
  let netflixData = null;
  let tvingData = null;
  let kbsData = null;
  let tvnData = null;
  let jtbcData = null;
  let error = null;

  try {
    const amazon = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/platform?page=1&pageSize=7&platformName=amazon`);
    if (!amazon.ok) {
      throw new Error('Network response was not ok');
    }
    amazonData = await amazon.json();

    const netflix = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/platform?page=1&pageSize=7&platformName=netflix`,
    );
    if (!netflix.ok) {
      throw new Error('Network response was not ok');
    }
    netflixData = await netflix.json();

    const tving = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/platform?page=1&pageSize=7&platformName=tving`);
    if (!tving.ok) {
      throw new Error('Network response was not ok');
    }
    tvingData = await tving.json();

    const kbs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/platform?page=1&pageSize=7&platformName=KBS2`);
    if (!kbs.ok) {
      throw new Error('Network response was not ok');
    }
    kbsData = await kbs.json();

    const tvn = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/platform?page=1&pageSize=7&platformName=tvN`);
    if (!tvn.ok) {
      throw new Error('Network response was not ok');
    }
    tvnData = await tvn.json();

    const jtbc = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/platform?page=1&pageSize=7&platformName=JTBC`);
    if (!jtbc.ok) {
      throw new Error('Network response was not ok');
    }
    jtbcData = await jtbc.json();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      amazonData,
      netflixData,
      tvingData,
      kbsData,
      tvnData,
      jtbcData,
      error,
      currentPage,
    },
  };
};
