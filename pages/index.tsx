import React, { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import styled from '@emotion/styled';
import { AmusementData, BannerData, Category, Counts, JejeupData, JejeupMetaData } from 'types';
import Seo from '@/components/Seo';
import Anchor from '@/components/Anchor';
import { vectors } from '@/components/vectors';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { formatDate } from '@/components/FormatDate';
import { formatDuration } from '@/components/FormatDuration';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Home.module.sass';
import {
  Abc,
  AbcIcon,
  AmazonIcon,
  AmazonOriginal,
  Anibox,
  AniboxIcon,
  Animax,
  AnimaxIcon,
  Aniplus,
  AniplusIcon,
  AppleIcon,
  AppleOriginal,
  Atx,
  AtxIcon,
  Daewon,
  DaewonIcon,
  DisneyIcon,
  DisneyOriginal,
  Ena,
  EnaIcon,
  Fujitv,
  FujitvIcon,
  Jtbc,
  JtbcIcon,
  Kbs2Icon,
  Kbs2tv,
  Mbc,
  MbcIcon,
  Mbs,
  MbsIcon,
  NetflixIcon,
  NetflixOriginal,
  Nippontv,
  NippontvIcon,
  Ocn,
  OcnIcon,
  Paramount,
  ParamountIcon,
  RatingFilmAll,
  RatingFilmB12,
  RatingFilmC15,
  RatingFilmD18,
  RatingGameAll,
  RatingGameB12,
  RatingGameC15,
  RatingGameD19,
  Sbs,
  SbsIcon,
  StarIcon,
  StarOriginal,
  Tbs,
  TbsIcon,
  Tokyomx,
  TokyomxIcon,
  Tooniverse,
  TooniverseIcon,
  TvingIcon,
  TvingOnly,
  TvingOriginal,
  Tvn,
  TvnIcon,
  Tvtokyo,
  TvtokyoIcon,
  WatchaIcon,
  WatchaOnly,
  WatchaOriginal,
  WavveFirstrun,
  WavveIcon,
  WavveIcon2,
  WavveOnly,
  WavveOriginal,
  Wowow,
  WowowIcon,
} from '@/components/Icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextIcon = styled.i({
  background: `url(${vectors.slide.next}) no-repeat 50% 50%/contain`,
});

const PauseIcon = styled.i({
  background: `url(${vectors.slide.pause}) no-repeat 50% 50%/contain`,
});

const PlayIcon = styled.i({
  background: `url(${vectors.slide.play}) no-repeat 50% 50%/contain`,
});

const PrevIcon = styled.i({
  background: `url(${vectors.slide.prev}) no-repeat 50% 50%/contain`,
});

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: `(max-width: ${rem(575)}` });
  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  return isMobile;
}

export function Amusements({ jejeup }: { jejeup: any }) {
  const items = jejeup.split(',');
  const result = items.length - 1;
  return (
    <p>
      <strong>본 작품 외 {result}개 작품 리뷰가 추가로 존재함</strong>
    </p>
  );
}

export function JejeupMeta({ jejeup }: { jejeup: any }) {
  const jejeupMetaData = jejeup.reviewData;

  const handleReport = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const jejeupVideo = event.currentTarget.getAttribute('data-video');

    try {
      const response = await fetch('/api/unpublish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jejeupVideo: jejeupVideo }),
      });

      if (response.ok) {
        alert('제보 성공! 감사합니다 ☺️');
      } else {
        const errorData = await response.json();
        console.log(errorData.error);
        alert('서버 오류입니다. 잠시 뒤 다시 시도해 주세요 😭');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 오류입니다. 잠시 뒤 다시 시도해 주세요 😭');
    }
  };

  return (
    <>
      {jejeupMetaData ? (
        <>
          {Object.keys(jejeupMetaData).length > 0 && (
            <>
              {jejeupMetaData.error === 'Video not found or is deleted/private' ? (
                <div className={`${styles.preview} ${styles['preview-dummy']}`}>
                  <div className={styles.notice}>
                    <p>유튜버가 삭제했거나 비공개 처리한 영상입니다.</p>
                    <p>
                      <button type="button" data-video={jejeup.video} onClick={handleReport}>
                        세모뷰 운영자에게 제보
                      </button>
                      해 주세요. {process.env.NODE_ENV === 'development' && jejeup.idx}
                    </p>
                  </div>
                  <div className={styles['preview-container']}>
                    <div className={styles.thumbnail}>
                      <div className={`${styles.dummy} ${styles.skeleton}`} />
                    </div>
                    <div className={styles['preview-info']}>
                      <div className={styles.detail}>
                        <div className={`${styles['user-info']}`}>
                          <strong className={styles.skeleton} />
                          <div className={styles.user}>
                            <cite>
                              <i className={styles.skeleton} />
                            </cite>
                            <time className={styles.skeleton} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={jejeup.idx} href={`/jejeup/${jejeup.idx}`} scroll={false} shallow={true}>
                  <div className={`${styles.preview} preview`}>
                    <div className={styles['preview-container']}>
                      <div className={styles.thumbnail}>
                        <Image
                          src={jejeupMetaData.thumbnailUrl}
                          width="1920"
                          height="1080"
                          alt=""
                          unoptimized
                          priority
                        />
                        <em aria-label="재생시간">{formatDuration(jejeupMetaData.duration)}</em>
                      </div>
                      <div className={styles['preview-info']}>
                        <div className={styles.detail}>
                          <div className={`${styles['user-info']}`}>
                            <strong aria-label="영상제목">{jejeupMetaData.title}</strong>
                            <div className={styles.user}>
                              <cite aria-label="유튜브 채널이름">{jejeupMetaData.channelTitle}</cite>
                              <time dateTime={jejeupMetaData.publishedAt}>
                                {formatDate(`${jejeupMetaData.publishedAt}`)}
                              </time>
                            </div>
                            {(jejeup.worst || jejeup.embeddingOff) && (
                              <div className={styles.option}>
                                {jejeup.worst && (
                                  <div className={styles.worst} aria-label="Worst 영상">
                                    <strong className="number">Worst</strong>
                                  </div>
                                )}
                                {jejeup.embeddingOff && (
                                  <div className={styles.embed} aria-label="퍼가기 금지 영상">
                                    <strong className="preview">퍼가기 금지 콘텐츠</strong>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </>
          )}
        </>
      ) : (
        <div className={`${styles.preview} ${styles['preview-dummy']}`}>
          <div className={styles.notice} hidden>
            <p>불러오는 중</p>
          </div>
          <div className={styles['preview-container']} aria-hidden="true">
            <div className={styles.thumbnail}>
              <div className={`${styles.dummy} ${styles.skeleton}`} />
            </div>
            <div className={styles['preview-info']}>
              <div className={styles.detail}>
                <div className={`${styles['user-info']}`}>
                  <strong className={styles.skeleton} />
                  <div className={styles.user}>
                    <cite>
                      <i className={styles.skeleton} />
                    </cite>
                    <time className={styles.skeleton} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Home({
  bannerData,
  reviewData,
  gameData,
  ottData,
  healingData,
  horrorGameData,
  tvnData,
  jtbcData,
  dubbingData,
  bfreeData,
  error,
}: {
  bannerData: any;
  reviewData: any;
  gameData: any;
  ottData: any;
  healingData: any;
  horrorGameData: any;
  tvnData: any;
  jtbcData: any;
  dubbingData: any;
  bfreeData: any;
  error: string;
}) {
  const timestamp = Date.now();
  const isMobile = useMobile();

  const amazonRatingHandler = () => {
    alert('아마존 자체 심의등급으로 설정된 작품입니다.\n아마존 프라임 비디오에 가입이 되어 있다면 시청 가능합니다.');
  };

  const regionRatingHandler = () => {
    alert('한국에서 시청이 불가능한 아마존 오리지널 작품입니다.\n시청 등급은 아마존 자체 심의등급입니다.');
  };

  const customRatingHandler = () => {
    alert(
      '한국에서 시청/심의등급이 없거나 한국에 정식 발매된 작품이 아닙니다.\n해당 시청/심의등급은 세모뷰 자체설정 시청/심의등급입니다.\n따라서 세모뷰 심의등급은 법적구속력이 없습니다.\n\n자세한 내용은 공지사항을 참고하세요.',
    );
  };

  const [count, setCount] = useState<Counts | null>(null);

  async function fetchCountData() {
    try {
      const response = await fetch(`/api/count`);
      const reviewData = await response.json();
      setCount(reviewData);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchCountData();
  }, []);

  function Background({ color }: { color: string }) {
    const hexToRgb = (hex: string) => {
      hex = hex.replace(/^#/, '');
      let bigint = parseInt(hex, 16);
      let r = (bigint >> 16) & 255;
      let g = (bigint >> 8) & 255;
      let b = bigint & 255;

      return { r, g, b };
    };

    const rgbColor = hexToRgb(color);
    return (
      <div className={styles.semo}>
        {isMobile ? (
          <>
            <div
              style={{
                background: `linear-gradient(180deg, rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0) 0%, rgba(255, 255, 255, 1) 100%)`,
              }}
            />
            <div style={{ backgroundColor: '#fff' }} />
          </>
        ) : (
          <>
            <div
              style={{
                background: `linear-gradient(180deg, rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0) 0%, rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.9) 100%)`,
              }}
            />
            <div style={{ backgroundColor: `#${color}` }} />
          </>
        )}
      </div>
    );
  }

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    centerPadding: '14%',
    centerMode: isMobile ? false : true,
    className: 'center',
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5200,
    arrows: false,
    afterChange: (current: number) => setCurrentSlide(current),
  };

  const toggleAutoplay = () => {
    if (isPlaying) {
      sliderRef.current?.slickPause();
    } else {
      sliderRef.current?.slickPlay();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main className={styles.main}>
      <Seo
        pageTitle="세상의 모든 리뷰"
        pageDescription="세상의 모든 리뷰를 수집한다"
        pageImg={`https://semo.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      {error && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      {!error && (
        <>
          <div className={styles.content}>
            {bannerData && (
              <div className={styles.banners}>
                <Slider ref={sliderRef} {...settings}>
                  {Array.isArray(bannerData) &&
                    bannerData
                      .sort((a, b) => a.order - b.order)
                      .map((banner: BannerData) => (
                        <div key={banner.order}>
                          {isMobile ? (
                            <Anchor
                              href={banner.link}
                              style={{
                                background: `url(https://cdn.dev1stud.io/semoview/banner/pao-${banner.type}.webp) no-repeat 50% 50%/contain`,
                              }}
                            >
                              <div className={styles.summary} style={{ color: '#000' }}>
                                <p>{banner.description}</p>
                                <em>
                                  ({banner.author} ‘{banner.title}’)
                                </em>
                              </div>
                              <Background color={banner.color} />
                            </Anchor>
                          ) : (
                            <Anchor
                              href={banner.link}
                              style={{
                                background: `url(https://cdn.dev1stud.io/semoview/banner/bread-${banner.type}.webp) no-repeat 50% 50%/contain`,
                              }}
                            >
                              <div className={styles.summary} style={{ color: banner.isLight ? '#000' : '#fff' }}>
                                <p>{banner.description}</p>
                                <em>
                                  ({banner.author} ‘{banner.title}’)
                                </em>
                              </div>
                              <Background color={banner.color} />
                            </Anchor>
                          )}
                        </div>
                      ))}
                </Slider>
                <button
                  type="button"
                  className={`${styles.prev} ${styles.move}`}
                  onClick={() => sliderRef.current?.slickPrev()}
                >
                  <PrevIcon />
                  <span>이전으로 이동</span>
                </button>
                <button
                  type="button"
                  className={`${styles.next} ${styles.move}`}
                  onClick={() => sliderRef.current?.slickNext()}
                >
                  <NextIcon />
                  <span>다음으로 이동</span>
                </button>
                <div className={styles.paging}>
                  <button type="button" className={styles.stat} onClick={toggleAutoplay}>
                    {isPlaying ? (
                      <>
                        <PauseIcon />
                        <span>일시멈춤</span>
                      </>
                    ) : (
                      <>
                        <PlayIcon />
                        <span>재생</span>
                      </>
                    )}
                  </button>
                  {bannerData.map((_: string, index: number) => (
                    <button
                      key={index}
                      type="button"
                      className={`${styles.pager} ${currentSlide === index ? styles.active : ''}`}
                      onClick={() => sliderRef.current?.slickGoTo(index)}
                    >
                      <i />
                      <span>{index + 1}번째</span>
                    </button>
                  ))}
                </div>
              </div>
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
                                              <i className={`${styles.drama} number`}>
                                                {RatingsDrama(amusement.rating)}
                                              </i>
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
                        <strong>
                          <span className="seed">
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                          </span>
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
            {healingData && (
              <>
                <div className={styles.headline}>
                  <h2 className="April16thPromise">
                    <Anchor href="/amusement?tag=healing&page=1">
                      <span>#힐링</span> <span>#치유</span> <span>#감동</span> <span>#드라마</span> <span>#영화</span>{' '}
                      <span>#애니</span> <span>#유튜브리뷰</span>
                    </Anchor>
                    {process.env.NODE_ENV === 'development' && ` ${healingData.total}개`}
                  </h2>
                  <Anchor href="/amusement?tag=healing&page=1">
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
                  {Array.isArray(healingData.data) &&
                    healingData.data.map((amusement: AmusementData, index: number) => (
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
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                          </span>
                        </strong>
                      </Link>
                    ))}
                </section>
              </>
            )}
            {horrorGameData && (
              <>
                <div className={styles.headline}>
                  <h2 className="April16thPromise">
                    <Anchor href="/amusement?tag=horror&category=game&page=1">
                      <span>#공포</span> <span>#호러</span> <span>#게임</span> <span>#유튜브리뷰</span>{' '}
                      <span>#유튜브실황</span>
                    </Anchor>
                    {process.env.NODE_ENV === 'development' && ` ${horrorGameData.total}개`}
                  </h2>
                  <Anchor href="/amusement?tag=horror&category=game&page=1">
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
                  {Array.isArray(horrorGameData.data) &&
                    horrorGameData.data.map((amusement: AmusementData, index: number) => (
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
                              </div>
                            </dl>
                          )}
                        </div>
                        <strong>
                          <span className="seed">
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                          </span>
                        </strong>
                      </Link>
                    ))}
                </section>
              </>
            )}
            {tvnData && (
              <>
                <div className={styles.headline}>
                  <h2 className="April16thPromise">
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
                          <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized priority />
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
                                      <AnimaxIcon /> <span>애니맥스 코리아</span>
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
                            </div>
                          </dl>
                        </div>
                        <strong>
                          <span className="seed">
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                          </span>
                        </strong>
                      </Link>
                    ))}
                </section>
              </>
            )}
            {jtbcData && (
              <>
                <div className={styles.headline}>
                  <h2 className="April16thPromise">
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
                          <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized priority />
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
                                      <AnimaxIcon /> <span>애니맥스 코리아</span>
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
                            </div>
                          </dl>
                        </div>
                        <strong>
                          <span className="seed">
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
                    <Anchor href="/amusement?subdub=dubbing&page=1">한국어 더빙 공식 지원!</Anchor>
                    {process.env.NODE_ENV === 'development' && ` ${dubbingData.total}개`}
                  </h2>
                  <Anchor href="/amusement?subdub=dubbing&page=1">
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
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                          </span>
                        </strong>
                      </Link>
                    ))}
                </section>
              </>
            )}
          </div>
          {reviewData && (
            <div className={styles['review-content']}>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/reviews?page=1">최근 리뷰</Anchor>
                  {process.env.NODE_ENV === 'development' && count && ` ${count.jejeup}개`}
                </h2>
                <Anchor href="/reviews?page=1">
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
                {Array.isArray(reviewData.jejeups) &&
                  reviewData.jejeups.map((jejeup: JejeupData) => (
                    <div className={styles.item} key={jejeup.id}>
                      <figure>
                        <JejeupMeta jejeup={jejeup} />
                        <figcaption>
                          {jejeup.worst && (
                            <dl className={styles.worst}>
                              <dt>Worst 경고!</dt>
                              <dd>이 영상은 영상과 더보기에 그 어떤 정보도 존재하지 않는 최악의 영상입니다.</dd>
                            </dl>
                          )}
                          {jejeup.isAmusements && <Amusements jejeup={jejeup.amusements} />}
                          <dl className={styles.summary}>
                            <dt>
                              {jejeup.amusementData.category !== 'ott_drama' &&
                              jejeup.amusementData.category !== 'ott_documentary_film' &&
                              jejeup.amusementData.category !== 'ott_film' &&
                              jejeup.amusementData.category !== 'ott_anime' &&
                              jejeup.amusementData.category !== 'ott_anime_film' ? (
                                <>
                                  {jejeup.amusementData.category !== 'anime_film' ? (
                                    <>
                                      <em className={styles[jejeup.amusementData.broadcast]}>
                                        {jejeup.amusementData.broadcast === 'ENA' && (
                                          <>
                                            <Ena /> <span>ENA</span>
                                          </>
                                        )}
                                        {jejeup.amusementData.broadcast === 'JTBC' && (
                                          <>
                                            <Jtbc /> <span>JTBC</span>
                                          </>
                                        )}
                                        {jejeup.amusementData.broadcast === 'KBS2' && (
                                          <>
                                            <Kbs2tv /> <span>KBS 2TV</span>
                                          </>
                                        )}
                                        {jejeup.amusementData.broadcast === 'MBC' && (
                                          <>
                                            <Mbc /> <span>MBC</span>
                                          </>
                                        )}
                                        {jejeup.amusementData.broadcast === 'OCN' && (
                                          <>
                                            <Ocn /> <span>OCN</span>
                                          </>
                                        )}
                                        {jejeup.amusementData.broadcast === 'SBS' && (
                                          <>
                                            <Sbs /> <span>SBS</span>
                                          </>
                                        )}
                                        {jejeup.amusementData.broadcast === 'tvN' && (
                                          <>
                                            <Tvn /> <span>tvN</span>
                                          </>
                                        )}
                                        {jejeup.amusementData.broadcast === 'ABC' && (
                                          <>
                                            <Abc /> <span>ABC</span>
                                          </>
                                        )}
                                        {(jejeup.amusementData.animeBroadcast1 !== null ||
                                          jejeup.amusementData.animeBroadcast2 !== null) && (
                                          <>
                                            {jejeup.amusementData.animeBroadcast1 === 'tokyomx' && (
                                              <>
                                                <Tokyomx /> <span>도쿄MX</span>
                                              </>
                                            )}
                                            {jejeup.amusementData.animeBroadcast1 === 'tvtokyo' && (
                                              <>
                                                <Tvtokyo /> <span>테레토</span>
                                              </>
                                            )}
                                            {jejeup.amusementData.animeBroadcast1 === 'fujitv' && (
                                              <>
                                                <Fujitv /> <span>후지테레비</span>
                                              </>
                                            )}
                                            {jejeup.amusementData.animeBroadcast1 === 'mbs' && (
                                              <>
                                                <Mbs /> <span>MBS</span>
                                              </>
                                            )}
                                            {jejeup.amusementData.animeBroadcast1 === 'tbs' && (
                                              <>
                                                <Tbs /> <span>TBS</span>
                                              </>
                                            )}
                                            {jejeup.amusementData.animeBroadcast1 === 'atx' && (
                                              <>
                                                <Atx /> <span>AT-X</span>
                                              </>
                                            )}
                                            {jejeup.amusementData.animeBroadcast1 === 'nippontv' && (
                                              <>
                                                <Nippontv /> <span>닛테레</span>
                                              </>
                                            )}
                                            {jejeup.amusementData.animeBroadcast1 === 'wowow' && (
                                              <>
                                                <Wowow /> <span>WOWOW</span>
                                              </>
                                            )}
                                            {jejeup.amusementData.animeBroadcast2 === 'aniplus' && (
                                              <>
                                                {jejeup.amusementData.animeBroadcast1 !== null && '|'}
                                                <Aniplus />
                                                <span>애니플러스</span> 방영{' '}
                                              </>
                                            )}
                                            {jejeup.amusementData.animeBroadcast2 === 'daewon' && (
                                              <>
                                                {jejeup.amusementData.animeBroadcast1 !== null && '|'}
                                                <Daewon /> <span>애니원</span> 방영{' '}
                                              </>
                                            )}
                                            {jejeup.amusementData.animeBroadcast2 === 'anibox' && (
                                              <>
                                                {jejeup.amusementData.animeBroadcast1 !== null && '|'}
                                                <Anibox /> <span>애니박스</span> 방영{' '}
                                              </>
                                            )}
                                            {jejeup.amusementData.animeBroadcast2 === 'tooniverse' && (
                                              <>
                                                {jejeup.amusementData.animeBroadcast1 !== null && '|'}
                                                <Tooniverse /> <span>투니버스</span> 방영{' '}
                                              </>
                                            )}
                                            {jejeup.amusementData.animeBroadcast2 === 'animax' && (
                                              <>
                                                {jejeup.amusementData.animeBroadcast1 !== null && '|'}
                                                <Animax /> <span>애니맥스</span> 방영{' '}
                                              </>
                                            )}
                                          </>
                                        )}
                                        {jejeup.amusementData.category === 'game' &&
                                          jejeup.amusementData.isMobile &&
                                          '모바일 '}
                                        {jejeup.amusementData.category === 'game_fan' && '팬 게임'}
                                        {jejeup.amusementData.animeBroadcast1 === null &&
                                          jejeup.amusementData.animeBroadcast2 === null &&
                                          jejeup.amusementData.category !== 'anime_film' &&
                                          CategoryName(jejeup.amusementData.category)}
                                      </em>
                                    </>
                                  ) : (
                                    <>
                                      <em>애니메이션</em>
                                      <em>영화</em>
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  {(jejeup.amusementData.category as Category) !== 'ott_drama' &&
                                    (jejeup.amusementData.category as Category) !== 'ott_anime_film' &&
                                    (jejeup.amusementData.category as Category) !== 'ott_documentary_film' && (
                                      <em>{CategoryName(jejeup.amusementData.category)}</em>
                                    )}
                                  {jejeup.amusementData.category === 'ott_anime_film' && (
                                    <>
                                      <em>애니메이션</em>
                                      <em>영화</em>
                                    </>
                                  )}
                                  {jejeup.amusementData.category === 'ott_documentary_film' && (
                                    <>
                                      <em>다큐멘터리</em>
                                      <em>영화</em>
                                    </>
                                  )}
                                  {jejeup.amusementData.category === 'ott_drama' &&
                                    jejeup.amusementData.broadcast === null && <em>드라마</em>}
                                  {jejeup.amusementData.broadcast !== null && (
                                    <em className={styles[jejeup.amusementData.broadcast]}>
                                      {jejeup.amusementData.broadcast === 'ENA' && (
                                        <>
                                          <Ena /> <span>ENA</span>
                                        </>
                                      )}
                                      {jejeup.amusementData.broadcast === 'JTBC' && (
                                        <>
                                          <Jtbc /> <span>JTBC</span>
                                        </>
                                      )}
                                      {jejeup.amusementData.broadcast === 'KBS2' && (
                                        <>
                                          <Kbs2tv /> <span>KBS 2TV</span>
                                        </>
                                      )}
                                      {jejeup.amusementData.broadcast === 'MBC' && (
                                        <>
                                          <Mbc /> <span>MBC</span>
                                        </>
                                      )}
                                      {jejeup.amusementData.broadcast === 'OCN' && (
                                        <>
                                          <Ocn /> <span>OCN</span>
                                        </>
                                      )}
                                      {jejeup.amusementData.broadcast === 'SBS' && (
                                        <>
                                          <Sbs /> <span>SBS</span>
                                        </>
                                      )}
                                      {jejeup.amusementData.broadcast === 'tvN' && (
                                        <>
                                          <Tvn /> <span>tvN</span>
                                        </>
                                      )}
                                      드라마
                                    </em>
                                  )}
                                </>
                              )}
                              {jejeup.amusementData.category === 'anime' && (
                                <em>{AnimeName(jejeup.amusementData.anime)}</em>
                              )}
                              {jejeup.amusementData.ott === 'amazonOriginal' && (
                                <cite>
                                  <AmazonOriginal /> AMAZON ORIGINAL
                                </cite>
                              )}
                              {(jejeup.amusementData.ott === 'appleOriginal' ||
                                jejeup.amusementData.ott === 'appleFilm') && (
                                <cite>
                                  <AppleOriginal />{' '}
                                  {jejeup.amusementData.ott === 'appleOriginal' && 'An Apple Original'}
                                  {jejeup.amusementData.ott === 'appleFilm' && 'Apple Original Films'}
                                </cite>
                              )}
                              {jejeup.amusementData.ott === 'disneyOriginal' && (
                                <cite>
                                  <DisneyOriginal /> Disney Original
                                </cite>
                              )}
                              {jejeup.amusementData.ott === 'disneyStar' && (
                                <cite>
                                  <StarOriginal /> Star Original
                                </cite>
                              )}
                              {(jejeup.amusementData.ott === 'netflixSeries' ||
                                jejeup.amusementData.ott === 'netflixOriginal' ||
                                jejeup.amusementData.ott === 'netflixAnime' ||
                                jejeup.amusementData.ott === 'netflixPresents' ||
                                jejeup.amusementData.ott === 'netflixFilm' ||
                                jejeup.amusementData.ott === 'netflixAnimeFilm' ||
                                jejeup.amusementData.ott === 'netflixDocumentary') && (
                                <cite>
                                  <NetflixOriginal />
                                  {(jejeup.amusementData.ott === 'netflixSeries' ||
                                    jejeup.amusementData.ott === 'netflixOriginal' ||
                                    jejeup.amusementData.ott === 'netflixAnime') &&
                                    'A NETFLIX Series'}
                                  {(jejeup.amusementData.ott === 'netflixPresents' ||
                                    jejeup.amusementData.ott === 'netflixFilm' ||
                                    jejeup.amusementData.ott === 'netflixAnimeFilm') &&
                                    'NETFLIX Presents'}
                                  {jejeup.amusementData.ott === 'netflixDocumentary' && 'A NETFLIX Documentary'}
                                </cite>
                              )}
                              {jejeup.amusementData.ott === 'tvingOriginal' && (
                                <cite>
                                  <TvingOriginal /> 티빙 오리지널
                                </cite>
                              )}
                              {jejeup.amusementData.ott === 'tvingOnly' && (
                                <cite>
                                  <TvingOnly /> 오직 티빙에서
                                </cite>
                              )}
                              {jejeup.amusementData.ott === 'watchaOriginal' && (
                                <cite>
                                  <WatchaOriginal /> 왓챠 오리지널
                                </cite>
                              )}
                              {jejeup.amusementData.ott === 'watchaExclusive' && (
                                <cite>
                                  <WatchaOnly /> 오직 왓챠에서
                                </cite>
                              )}
                              {jejeup.amusementData.ott === 'wavveOriginal' && (
                                <cite>
                                  <WavveOriginal /> 웨이브 오리지널
                                </cite>
                              )}
                              {jejeup.amusementData.ott === 'wavveOnly' && (
                                <cite>
                                  <WavveOnly /> 오직 웨이브에서
                                </cite>
                              )}
                              {jejeup.amusementData.ott === 'waveOnly' && (
                                <cite>
                                  <WavveOnly /> 웨이브 해외시리즈
                                </cite>
                              )}
                              {jejeup.amusementData.ott === 'waveFirstrun' && (
                                <cite>
                                  <WavveFirstrun /> 웨이브 해외시리즈
                                </cite>
                              )}
                              {jejeup.amusementData.ott === 'paramount' && (
                                <cite>
                                  <Paramount /> Paramount+
                                </cite>
                              )}
                              {jejeup.amusementData.ott === 'amazonOriginal' ? (
                                <i className={`${styles['rating-amazon']} number`} aria-label="시청 가능 연령">
                                  {jejeup.amusementData.rating === 'all' && 'All'}
                                  {jejeup.amusementData.rating === 'a7' && '7+'}
                                  {jejeup.amusementData.rating === 'b12' && '13+'}
                                  {jejeup.amusementData.rating === 'c15' && '16+'}
                                  {jejeup.amusementData.rating === 'd19' && '18+'}
                                </i>
                              ) : (
                                <>
                                  {(jejeup.amusementData.category === 'drama' ||
                                    jejeup.amusementData.category === 'ott_drama' ||
                                    jejeup.amusementData.category === 'ott_anime' ||
                                    jejeup.amusementData.anime === 'tva' ||
                                    jejeup.amusementData.anime === 'ova') && (
                                    <>
                                      {jejeup.amusementData.rating === 'all' ? (
                                        <>
                                          <i className={`${styles.drama} ${styles.all} number`}>
                                            {RatingsDrama(jejeup.amusementData.rating)}
                                          </i>
                                          <span>전체 이용가</span>
                                        </>
                                      ) : (
                                        <>
                                          {jejeup.amusementData.rating === 'd19' ? (
                                            <>
                                              <i className={`${styles.drama} ${styles.d19} number`}>
                                                {RatingsDrama(jejeup.amusementData.rating)}
                                              </i>
                                              <span>세 미만 이용불가</span>
                                            </>
                                          ) : (
                                            <>
                                              <i className={`${styles.drama} number`}>
                                                {RatingsDrama(jejeup.amusementData.rating)}
                                              </i>
                                              <span>세 이상 이용가</span>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                  {(jejeup.amusementData.category === 'film' ||
                                    jejeup.amusementData.category === 'anime_film' ||
                                    jejeup.amusementData.category === 'ott_anime_film' ||
                                    jejeup.amusementData.category === 'ott_film' ||
                                    jejeup.amusementData.category === 'ott_documentary_film' ||
                                    jejeup.amusementData.anime === 'film') && (
                                    <>
                                      {jejeup.amusementData.rating === 'all' && (
                                        <>
                                          <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                        </>
                                      )}
                                      {jejeup.amusementData.rating === 'b12' && (
                                        <>
                                          <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                        </>
                                      )}
                                      {jejeup.amusementData.rating === 'c15' && (
                                        <>
                                          <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                        </>
                                      )}
                                      {jejeup.amusementData.rating === 'd19' && (
                                        <>
                                          <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                              {jejeup.amusementData.category === 'game' && (
                                <>
                                  {jejeup.amusementData.rating === 'all' && (
                                    <>
                                      <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                                    </>
                                  )}
                                  {jejeup.amusementData.rating === 'b12' && (
                                    <>
                                      <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                                    </>
                                  )}
                                  {jejeup.amusementData.rating === 'c15' && (
                                    <>
                                      <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                                    </>
                                  )}
                                  {jejeup.amusementData.rating === 'd19' && (
                                    <>
                                      <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                                    </>
                                  )}
                                </>
                              )}
                              {(jejeup.amusementData.ott === 'amazonOriginal' || jejeup.amusementData.ratingCustom) && (
                                <div className={styles.custom}>
                                  {jejeup.amusementData.ott === 'amazonOriginal' &&
                                    !jejeup.amusementData.ratingCustom && (
                                      <button type="button" onClick={amazonRatingHandler}>
                                        <i />
                                        <span>아마존 자체 심의등급 작품</span>
                                      </button>
                                    )}
                                  {jejeup.amusementData.ott === 'amazonOriginal' &&
                                    jejeup.amusementData.ratingCustom && (
                                      <button type="button" onClick={regionRatingHandler}>
                                        <i />
                                        <span>한국 리전 아마존 시청 불가 작품</span>
                                      </button>
                                    )}
                                  {jejeup.amusementData.ott !== 'amazonOriginal' &&
                                    jejeup.amusementData.ratingCustom && (
                                      <button type="button" onClick={customRatingHandler}>
                                        <i />
                                        <span>세모뷰 자체설정 심의등급 안내</span>
                                      </button>
                                    )}
                                </div>
                              )}
                            </dt>
                            <dd>
                              <strong aria-label="작품명">
                                <span className={`${styles.title} April16thPromise`}>
                                  {jejeup.amusementData.category === 'game_fan'
                                    ? `'${jejeup.amusementData.title}'의 팬 게임 콜렉션`
                                    : jejeup.amusementData.titleKorean
                                      ? jejeup.amusementData.titleKorean
                                      : jejeup.amusementData.title}
                                </span>
                                {jejeup.amusementData.lang === 'chineseBeonche' && (
                                  <span lang="zh-Hant">{jejeup.amusementData.title} </span>
                                )}
                                {jejeup.amusementData.lang === 'chineseGanche' && (
                                  <span lang="zh-Hans">{jejeup.amusementData.title} </span>
                                )}
                                {jejeup.amusementData.lang === 'europe' && (
                                  <span lang="en">{jejeup.amusementData.title}</span>
                                )}
                                {jejeup.amusementData.lang === 'english' && (
                                  <span lang="en-US">{jejeup.amusementData.title}</span>
                                )}
                                {jejeup.amusementData.lang === 'japanese' && (
                                  <span lang="ja">{jejeup.amusementData.title}</span>
                                )}
                                {jejeup.amusementData.lang === 'thai' && (
                                  <span lang="th">{jejeup.amusementData.title}</span>
                                )}
                                {jejeup.amusementData.titleOther !== null && (
                                  <span className="lang" aria-label="작품의 다른 언어 제목">
                                    {jejeup.amusementData.titleOther}
                                  </span>
                                )}
                                {jejeup.amusementData.release !== '?' && (
                                  <>
                                    {(jejeup.amusementData.category === 'drama' ||
                                      jejeup.amusementData.category === 'ott_drama' ||
                                      jejeup.amusementData.category === 'ott_anime' ||
                                      jejeup.amusementData.anime === 'tva' ||
                                      jejeup.amusementData.anime === 'ova') && (
                                      <time aria-label="방영년도">{jejeup.amusementData.release}</time>
                                    )}
                                    {(jejeup.amusementData.category === 'film' ||
                                      jejeup.amusementData.category === 'anime_film' ||
                                      jejeup.amusementData.category === 'ott_anime_film' ||
                                      jejeup.amusementData.category === 'ott_film' ||
                                      jejeup.amusementData.anime === 'film') && (
                                      <time aria-label="상영년도">{jejeup.amusementData.release}</time>
                                    )}
                                    {jejeup.amusementData.category === 'game' && (
                                      <time aria-label="출시년도">{jejeup.amusementData.release}</time>
                                    )}
                                  </>
                                )}
                              </strong>
                            </dd>
                          </dl>
                        </figcaption>
                      </figure>
                    </div>
                  ))}
              </section>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let bannerData = null;
  let reviewData = null;
  let gameData = null;
  let ottData = null;
  let healingData = null;
  let horrorGameData = null;
  let tvnData = null;
  let jtbcData = null;
  let dubbingData = null;
  let bfreeData = null;
  let error = null;

  try {
    const banner = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banners`);
    if (!banner.ok) {
      throw new Error('Network response was not ok');
    }
    bannerData = await banner.json();

    const review = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jejeups?page=1&main=true}`);
    if (!review.ok) {
      throw new Error('Network response was not ok');
    }
    reviewData = await review.json();

    const game = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category?categoryName=game&page=1&pageSize=5`);
    if (!game.ok) {
      throw new Error('Network response was not ok');
    }
    gameData = await game.json();

    const ott = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category?categoryName=ott&page=1&pageSize=7`);
    if (!ott.ok) {
      throw new Error('Network response was not ok');
    }
    ottData = await ott.json();

    const healing = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tag?page=1&pageSize=7&tagName=healing`);
    if (!healing.ok) {
      throw new Error('Network response was not ok');
    }
    healingData = await healing.json();

    const horrorGame = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tag?page=1&pageSize=5&tagName=horror&categoryName=game`,
    );
    if (!horrorGame.ok) {
      throw new Error('Network response was not ok');
    }
    horrorGameData = await horrorGame.json();

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

    const dubbing = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subdub?page=1&pageSize=7&subdubName=dubbing`);
    if (!dubbing.ok) {
      throw new Error('Network response was not ok');
    }
    dubbingData = await dubbing.json();

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
      bannerData,
      reviewData,
      gameData,
      ottData,
      healingData,
      horrorGameData,
      tvnData,
      jtbcData,
      dubbingData,
      bfreeData,
      error,
    },
  };
};
