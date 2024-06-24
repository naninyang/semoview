import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import styled from '@emotion/styled';
import { AmusementData, BannerData, Counts, JejeupAmusementData, JejeupData } from 'types';
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

const fetchSequentially = async (urls: any) => {
  const results = [];
  for (const url of urls) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    results.push(data);
  }
  return results;
};

const LoadingIndicator = ({ isGame }: { isGame: boolean }) => {
  const loadingBlocks = Array.from({ length: isGame ? 5 : 7 }, (_, index) => index);
  return (
    <>
      {loadingBlocks.map((_, index) => (
        <div
          key={index}
          className={`${styles['loading-indicator']} ${isGame ? styles['loading-game'] : ''}`}
          aria-hidden="true"
        >
          <i />
          <strong />
        </div>
      ))}
    </>
  );
};

function Home({ bannerData, bannerError }: { bannerData: any; bannerError: string }) {
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

  const router = useRouter();
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

  useEffect(() => {
    sessionStorage.setItem('home', router.asPath);
    sessionStorage.setItem('backhistory', router.asPath);
  }, [router.asPath]);

  const [reviewData, setReviewData] = useState<JejeupData | null>(null);
  const [gameData, setGameData] = useState<JejeupAmusementData | null>(null);
  const [ottData, setOttData] = useState<JejeupAmusementData | null>(null);
  const [healingData, setHealingData] = useState<JejeupAmusementData | null>(null);
  const [horrorGameData, setHorrorGameData] = useState<JejeupAmusementData | null>(null);
  const [tvnData, setTvnData] = useState<JejeupAmusementData | null>(null);
  const [jtbcData, setJtbcData] = useState<JejeupAmusementData | null>(null);
  const [dubbingData, setDubbingData] = useState<JejeupAmusementData | null>(null);
  const [bfreeData, setBfreeData] = useState<JejeupAmusementData | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urls = [
      `/api/jejeups?page=1&main=true`,
      `/api/category?categoryName=game&page=1&pageSize=5`,
      `/api/category?categoryName=ott&page=1&pageSize=7`,
      `/api/tag?page=1&pageSize=7&tagName=healing`,
      `/api/tag?page=1&pageSize=5&tagName=horror&categoryName=game`,
      `/api/platform?page=1&pageSize=7&platformName=tvN`,
      `/api/platform?page=1&pageSize=7&platformName=JTBC`,
      `/api/subdub?page=1&pageSize=7&subdubName=dubbing`,
      `/api/bfree?page=1&pageSize=7&bfreeName=bfree`,
    ];

    fetchSequentially(urls)
      .then((results) => {
        setReviewData(results[0]);
        setGameData(results[1]);
        setOttData(results[2]);
        setHealingData(results[3]);
        setHorrorGameData(results[4]);
        setTvnData(results[5]);
        setJtbcData(results[6]);
        setDubbingData(results[7]);
        setBfreeData(results[8]);
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <main className={styles.main}>
      <Seo
        pageTitle="세상의 모든 리뷰"
        pageDescription="세상의 모든 리뷰를 수집한다"
        pageImg={`https://semo.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      {bannerError && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      {!bannerError && (
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
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?category=ott&page=1">OTT 오리지널 리뷰</Anchor>
                {process.env.NODE_ENV === 'development' && ottData && ` ${ottData.total}개`}
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
              {!error && ottData ? (
                <>
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
                </>
              ) : (
                <LoadingIndicator isGame={false} />
              )}
            </section>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?category=game&page=1">게임 리뷰 & 실황</Anchor>
                {process.env.NODE_ENV === 'development' && gameData && ` ${gameData.total}개`}
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
              {!error && gameData ? (
                <>
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
                </>
              ) : (
                <LoadingIndicator isGame={true} />
              )}
            </section>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?tag=healing&page=1">
                  <span>#힐링</span> <span>#치유</span> <span>#감동</span> <span>#드라마</span> <span>#영화</span>{' '}
                  <span>#애니</span> <span>#유튜브리뷰</span>
                </Anchor>
                {process.env.NODE_ENV === 'development' && healingData && ` ${healingData.total}개`}
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
              {!error && healingData ? (
                <>
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
                </>
              ) : (
                <LoadingIndicator isGame={false} />
              )}
            </section>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?tag=horror&category=game&page=1">
                  <span>#공포</span> <span>#호러</span> <span>#게임</span> <span>#유튜브리뷰</span>{' '}
                  <span>#유튜브실황</span>
                </Anchor>
                {process.env.NODE_ENV === 'development' && horrorGameData && ` ${horrorGameData.total}개`}
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
              {!error && horrorGameData ? (
                <>
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
                </>
              ) : (
                <LoadingIndicator isGame={true} />
              )}
            </section>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?platform=tvN&page=1">tvN 드라마 리뷰</Anchor>
                {process.env.NODE_ENV === 'development' && tvnData && ` ${tvnData.total}개`}
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
              {!error && tvnData ? (
                <>
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
                </>
              ) : (
                <LoadingIndicator isGame={false} />
              )}
            </section>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?platform=JTBC&page=1">JTBC 드라마 리뷰</Anchor>
                {process.env.NODE_ENV === 'development' && jtbcData && ` ${jtbcData.total}개`}
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
              {!error && jtbcData ? (
                <>
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
                </>
              ) : (
                <LoadingIndicator isGame={false} />
              )}
            </section>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?subdub=dubbing&page=1">한국어 더빙 공식 지원!</Anchor>
                {process.env.NODE_ENV === 'development' && dubbingData && ` ${dubbingData.total}개`}
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
              {!error && dubbingData ? (
                <>
                  {Array.isArray(dubbingData.data) &&
                    dubbingData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} supportLanguage={'dubbing'} />
                        <strong>
                          <span className="seed">
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                          </span>
                        </strong>
                      </Link>
                    ))}
                </>
              ) : (
                <LoadingIndicator isGame={false} />
              )}
            </section>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?bfree=bfree&page=1">CC(SDH)/AD 둘다 지원하는 작품!</Anchor>
                {process.env.NODE_ENV === 'development' && bfreeData && ` ${bfreeData.total}개`}
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
              {!error && bfreeData ? (
                <>
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
                </>
              ) : (
                <LoadingIndicator isGame={false} />
              )}
            </section>
          </div>
          <div className={styles['review-content']}>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/reviews?page=1">리뷰 & 요약 영상</Anchor>
                {process.env.NODE_ENV === 'development' && count && reviewData && ` ${count.total}개`}
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
              {!error && reviewData ? (
                <>
                  {Array.isArray(reviewData.jejeups) &&
                    reviewData.jejeups.map((jejeup: JejeupData) => (
                      <div className={styles.item} key={jejeup.id}>
                        <ReviewItem jejeup={jejeup} />
                      </div>
                    ))}
                </>
              ) : (
                <>
                  <div className={styles.item}>
                    <figure className={styles.figure} aria-hidden="true">
                      <div className={styles['loading-primary']}>
                        <div className={styles['preview-container']} aria-hidden="true">
                          <div className={styles.thumbnail}>
                            <div className={`${styles.dummy} ${styles.skeleton}`} />
                          </div>
                          <div className={styles['preview-info']}>
                            <div className={styles.detail}>
                              <div className={`${styles['user-info']}`}>
                                <strong className={styles.skeleton} />
                                <cite className={styles.skeleton} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles['loading-secondary']}>
                        <div className={`${styles.option} ${styles.skeleton}`} />
                        <div className={`${styles.subject} ${styles.skeleton}`} />
                        <div className={`${styles.lang} ${styles.skeleton}`} />
                        <div className={`${styles.release} ${styles.skeleton}`} />
                      </div>
                    </figure>
                  </div>
                  <div className={styles.item}>
                    <figure className={styles.figure} aria-hidden="true">
                      <div className={styles['loading-primary']}>
                        <div className={styles['preview-container']} aria-hidden="true">
                          <div className={styles.thumbnail}>
                            <div className={`${styles.dummy} ${styles.skeleton}`} />
                          </div>
                          <div className={styles['preview-info']}>
                            <div className={styles.detail}>
                              <div className={`${styles['user-info']}`}>
                                <strong className={styles.skeleton} />
                                <cite className={styles.skeleton} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles['loading-secondary']}>
                        <div className={`${styles.option} ${styles.skeleton}`} />
                        <div className={`${styles.subject} ${styles.skeleton}`} />
                        <div className={`${styles.lang} ${styles.skeleton}`} />
                        <div className={`${styles.release} ${styles.skeleton}`} />
                      </div>
                    </figure>
                  </div>
                  <div className={styles.item}>
                    <figure className={styles.figure} aria-hidden="true">
                      <div className={styles['loading-primary']}>
                        <div className={styles['preview-container']} aria-hidden="true">
                          <div className={styles.thumbnail}>
                            <div className={`${styles.dummy} ${styles.skeleton}`} />
                          </div>
                          <div className={styles['preview-info']}>
                            <div className={styles.detail}>
                              <div className={`${styles['user-info']}`}>
                                <strong className={styles.skeleton} />
                                <cite className={styles.skeleton} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles['loading-secondary']}>
                        <div className={`${styles.option} ${styles.skeleton}`} />
                        <div className={`${styles.subject} ${styles.skeleton}`} />
                        <div className={`${styles.lang} ${styles.skeleton}`} />
                        <div className={`${styles.release} ${styles.skeleton}`} />
                      </div>
                    </figure>
                  </div>
                  <div className={styles.item}>
                    <figure className={styles.figure} aria-hidden="true">
                      <div className={styles['loading-primary']}>
                        <div className={styles['preview-container']} aria-hidden="true">
                          <div className={styles.thumbnail}>
                            <div className={`${styles.dummy} ${styles.skeleton}`} />
                          </div>
                          <div className={styles['preview-info']}>
                            <div className={styles.detail}>
                              <div className={`${styles['user-info']}`}>
                                <strong className={styles.skeleton} />
                                <cite className={styles.skeleton} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles['loading-secondary']}>
                        <div className={`${styles.option} ${styles.skeleton}`} />
                        <div className={`${styles.subject} ${styles.skeleton}`} />
                        <div className={`${styles.lang} ${styles.skeleton}`} />
                        <div className={`${styles.release} ${styles.skeleton}`} />
                      </div>
                    </figure>
                  </div>
                </>
              )}
            </section>
          </div>
        </>
      )}
    </main>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let bannerData = null;
  let bannerError = null;

  try {
    const banner = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banners`);
    if (!banner.ok) {
      throw new Error('Network response was not ok');
    }
    bannerData = await banner.json();
  } catch (err) {
    bannerError = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      bannerData,
      bannerError,
    },
  };
};
