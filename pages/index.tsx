import React, { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import styled from '@emotion/styled';
import { AmusementData, BannerData, Counts, JejeupData } from 'types';
import Seo from '@/components/Seo';
import Anchor from '@/components/Anchor';
import { vectors } from '@/components/vectors';
import { rem } from '@/styles/designSystem';
import { ReviewItem } from '@/components/ReviewItem';
import { AmusementItem } from '@/components/AmusementItem';
import styles from '@/styles/Home.module.sass';
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
              <div className={`${styles.banners} home-banner`}>
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
                                  ({banner.author} ‘{banner.title}’ {banner.type === 'wavve' && '시리즈'})
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
                                  ({banner.author} ‘{banner.title}’ {banner.type === 'wavve' && '시리즈'})
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
                        <AmusementItem amusement={amusement} />
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
                        <AmusementItem amusement={amusement} isGame={true} />
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
                        <AmusementItem amusement={amusement} />
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
                        <AmusementItem amusement={amusement} isGame={true} />
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
                        <AmusementItem amusement={amusement} platform={'tvN'} />
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
                        <AmusementItem amusement={amusement} platform={'JTBC'} />
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
                        <AmusementItem amusement={amusement} supportLanguage={'dubbing'} />
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
                    <Anchor href="/amusement?bfree=bfree&page=1">CC(SDH)/AD 둘다 지원하는 작품!</Anchor>
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
                        <AmusementItem amusement={amusement} supportLanguage={'bfree'} />
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
                  <Anchor href="/reviews?page=1">리뷰 & 요약 영상</Anchor>
                  {process.env.NODE_ENV === 'development' && count && ` ${count.total}개`}
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
                      <ReviewItem jejeup={jejeup} />
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
