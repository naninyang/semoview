import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementPermalinkData, JejeupData } from 'types';
import { formatDate } from '@/utils/strapi';
import Seo, { originTitle } from '@/components/Seo';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { OriginalName } from '@/components/OriginalName';
import { FormatDate } from '@/components/FormatDate';
import { vectors } from '@/components/vectors';
import Anchor from '@/components/Anchor';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Amusement.module.sass';

const BackButton = styled.i({
  display: 'block',
  background: `url(${vectors.backward}) no-repeat 50% 50%/contain`,
});

const ClipboardIcon = styled.i({
  background: `url(${vectors.share2}) no-repeat 50% 50%/contain`,
});

const AmazonOriginal = styled.i({
  width: rem(52),
  background: `url(${vectors.ott.amazon2}) no-repeat 50% 50%/contain`,
});

const AppleOriginal = styled.i({
  width: rem(42),
  background: `url(${vectors.ott.apple2}) no-repeat 50% 50%/contain`,
});

const DisneyOriginal = styled.i({
  width: rem(29),
  background: `url(${vectors.ott.disney2}) no-repeat 50% 50%/contain`,
});

const NetflixOriginal = styled.i({
  width: rem(59),
  background: `url(${vectors.ott.netflix}) no-repeat 50% 50%/contain`,
});

const TvingOriginal = styled.i({
  width: rem(105),
  background: `url(${vectors.ott.tvingOrigin}) no-repeat 50% 50%/contain`,
});

const TvingOnly = styled.i({
  width: rem(70),
  background: `url(${vectors.ott.tvingOnly}) no-repeat 50% 50%/contain`,
});

const WatchaOriginal = styled.i({
  width: rem(55),
  background: `url(${vectors.ott.watchaOrigin}) no-repeat 50% 50%/contain`,
});

const WatchaOnly = styled.i({
  width: rem(70),
  background: `url(${vectors.ott.watchaOnly}) no-repeat 50% 50%/contain`,
});

const WavveOriginal = styled.i({
  width: rem(72),
  background: `url(${vectors.ott.wavveOrigin}) no-repeat 50% 50%/contain`,
});

const WavveOnly = styled.i({
  width: rem(50),
  background: `url(${vectors.ott.wavveOnly}) no-repeat 50% 50%/contain`,
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

export default function Amusement({ amusementData }: { amusementData: AmusementPermalinkData | null }) {
  const router = useRouter();
  const timestamp = Date.now();
  const [data, setData] = useState<JejeupData | null>(null);
  const [isJejeupsLoading, setIsJejeupsLoading] = useState(false);
  const [isJejeupsError, setIsJejeupsError] = useState<null | string>(null);
  const currentPage = Number(router.query.page) || 1;
  const [isActive, setIsActive] = useState(true);
  const [relation1, setRelation1] = useState<AmusementPermalinkData | null>(null);
  const [relation2, setRelation2] = useState<AmusementPermalinkData | null>(null);
  const [isRelationLoading, setIsRelationLoading] = useState(false);
  const [isRelationError, setIsRelationError] = useState<null | string>(null);
  const [selectedRelation, setSelectedRelation] = useState<string>('');

  useEffect(() => {
    sessionStorage.setItem('location', router.asPath);
  }, [router.asPath]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      sessionStorage.setItem('location', url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const previousPageHandler = () => {
    const previousPage = sessionStorage.getItem('location');
    if (previousPage) {
      router.back();
    } else {
      if (amusementData) {
        if (amusementData.attributes.category === 'ottFilm') router.push('/amusement?category=ott');
        else router.push(`/amusement?category=${amusementData.attributes.category}`);
      }
    }
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('URL이 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('URL 복사에 실패했습니다:', err);
      });
  };

  const relation = async () => {
    if (amusementData) {
      if (amusementData.attributes.relation1) {
        setIsRelationLoading(true);
        setIsRelationError(null);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/amusement?amusementId=${amusementData.attributes.relation1}`,
          );
          const amusementResponse = (await response.json()) as { data: AmusementPermalinkData };
          setRelation1(amusementResponse.data);
        } catch (err) {
          if (err instanceof Error) {
            setIsRelationError(err.message);
          } else {
            setIsRelationError('An unknown error occurred');
          }
        } finally {
          setIsRelationLoading(false);
        }
      }
      if (amusementData.attributes.relation2) {
        setIsRelationLoading(true);
        setIsRelationError(null);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/amusement?amusementId=${amusementData.attributes.relation2}`,
          );
          const amusementResponse = (await response.json()) as { data: AmusementPermalinkData };
          setRelation2(amusementResponse.data);
        } catch (err) {
          if (err instanceof Error) {
            setIsRelationError(err.message);
          } else {
            setIsRelationError('An unknown error occurred');
          }
        } finally {
          setIsRelationLoading(false);
        }
      }
    }
  };

  const handleRelationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRelation(event.target.value);
  };
  const handleRelationSubmit = () => {
    router.push(`${selectedRelation}`);
  };

  const fetchData = async () => {
    setIsJejeupsLoading(true);
    setIsJejeupsError(null);
    try {
      const response =
        amusementData && (await fetch(`/api/jejeuAmusement?page=${currentPage}&amusementId=${amusementData.id}`));
      const newData = response && (await response.json());
      setData(newData);
    } catch (err) {
      if (err instanceof Error) {
        setIsJejeupsError(err.message);
      } else {
        setIsJejeupsError('An unknown error occurred');
      }
    } finally {
      setIsJejeupsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    relation();
  }, [amusementData]);

  const [timeoutReached, setTimeoutReached] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!amusementData) {
    if (timeoutReached) {
      return (
        <main className={styles.jejeup}>
          <p className={styles.error}>
            영상을 불러오지 못했습니다. 삭제된 영상이거나 인터넷 속도가 느립니다.{' '}
            <Anchor href="/jejeups">뒤로가기</Anchor>
          </p>
        </main>
      );
    } else {
      return (
        <main className={styles.jejeup}>
          <p className={styles.loading}>영상 불러오는 중...</p>
        </main>
      );
    }
  }

  function FormatDuration(duration: string) {
    const match = duration.match(/PT(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    const minutes = match[1] ? match[1].slice(0, -1) : '0';
    const seconds = match[2] ? match[2].slice(0, -1) : '0';
    return `${minutes}:${seconds.padStart(2, '0')}`;
  }

  const togglePoster = () => {
    setIsActive(!isActive);
  };

  function RelationSelect() {
    if (
      amusementData &&
      amusementData.attributes.relation1 !== null &&
      relation1 !== null &&
      !isRelationLoading &&
      !isRelationError
    ) {
      return (
        <div className={styles.relation}>
          <dt>다른 버전 보기</dt>
          <dd>
            <select value={selectedRelation} onChange={handleRelationChange}>
              <option value={router.asPath}>{amusementData.attributes.title}</option>
              {relation1 !== null && (
                <option
                  value={`/amusement/${formatDate(relation1.attributes.createdAt)}${amusementData.attributes.relation1}`}
                >
                  {relation1.attributes.title}
                </option>
              )}
              {amusementData.attributes.relation2 !== null &&
                relation2 !== null &&
                !isRelationLoading &&
                !isRelationError && (
                  <option
                    value={`/amusement/${formatDate(relation2.attributes.createdAt)}${amusementData.attributes.relation2}`}
                  >
                    {relation2.attributes.title}
                  </option>
                )}
            </select>
            <button type="button" onClick={handleRelationSubmit}>
              이동
            </button>
          </dd>
        </div>
      );
    }
  }

  return (
    <main className={styles.amusement}>
      <Seo
        pageTitles={`${amusementData.attributes.titleKorean !== null ? amusementData.attributes.titleKorean : amusementData.attributes.title} - ${originTitle}`}
        pageTitle={`${amusementData.attributes.titleKorean !== null ? amusementData.attributes.titleKorean : amusementData.attributes.title}`}
        pageDescription={`'${amusementData.attributes.titleKorean !== null ? amusementData.attributes.titleKorean : amusementData.attributes.title}' 리뷰 영상을 모아서 한방에 즐기자!`}
        pageImg={`https://jejeup.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <div className="top-link">
        <button onClick={previousPageHandler} type="button">
          <BackButton />
          <span>뒤로가기</span>
        </button>
      </div>
      <div className={styles.cover}>
        <div className={styles.background}>
          <div className={styles.images}>
            <Image
              src={amusementData.attributes.posterDefault}
              alt=""
              width={amusementData.attributes.category === 'game' ? 460 : 390}
              height={amusementData.attributes.category === 'game' ? 215 : 560}
              unoptimized
              className={`${isActive ? styles.active : ''}`}
            />
            {amusementData.attributes.posterOther && (
              <Image
                src={amusementData.attributes.posterOther}
                alt=""
                width={amusementData.attributes.category === 'game' ? 460 : 390}
                height={amusementData.attributes.category === 'game' ? 215 : 560}
                unoptimized
                className={`${!isActive ? styles.active : ''}`}
              />
            )}
          </div>
          <div className={styles.dummy} />
        </div>
        <div className={styles.info}>
          <h1>
            {amusementData.attributes.titleKorean !== null
              ? amusementData.attributes.titleKorean
              : amusementData.attributes.title}
          </h1>
          <dl className={styles.title}>
            {amusementData.attributes.titleKorean !== null && (
              <div>
                <dt>원제</dt>
                <dd>
                  {amusementData.attributes.lang === 'chineseBeonche' && (
                    <span lang="zh-Hant">{amusementData.attributes.title}</span>
                  )}
                  {amusementData.attributes.lang === 'chineseGanche' && (
                    <span lang="zh-Hans">{amusementData.attributes.title}</span>
                  )}
                  {amusementData.attributes.lang === 'english' && (
                    <span lang="en">{amusementData.attributes.title}</span>
                  )}
                  {amusementData.attributes.lang === 'japanese' && (
                    <span lang="ja">{amusementData.attributes.title}</span>
                  )}
                  {amusementData.attributes.lang === 'thai' && <span lang="th">{amusementData.attributes.title}</span>}
                  {amusementData.attributes.lang === null && <span lang="ko">{amusementData.attributes.title}</span>}
                </dd>
              </div>
            )}
            {amusementData.attributes.titleOther && (
              <div>
                <dt>다른 제목</dt>
                <dd>{amusementData.attributes.titleOther}</dd>
              </div>
            )}
            {amusementData.attributes.etc && (
              <div>
                <dt>추가 제목 또는 제목 설명</dt>
                <dd>{amusementData.attributes.etc}</dd>
              </div>
            )}
            {amusementData.attributes.originalAuthor === null && amusementData.attributes.original && (
              <div>
                <dt>원작</dt>
                <dd>동명의 {OriginalName(amusementData.attributes.original)} 원작</dd>
              </div>
            )}
          </dl>
          <div className={styles.function}>
            <dl className={styles.summary}>
              {amusementData.attributes.ott !== null && (
                <div className={styles.platform}>
                  <dt>플랫폼</dt>
                  <dd>
                    {amusementData.attributes.ott === 'amazonOriginal' && (
                      <>
                        <AmazonOriginal /> Amazon Prime Video
                      </>
                    )}
                    {amusementData.attributes.ott === 'appleOriginal' && (
                      <>
                        <AppleOriginal /> An Apple Original
                      </>
                    )}
                    {amusementData.attributes.ott === 'appleFilm' && (
                      <>
                        <AppleOriginal /> An Apple Original Film
                      </>
                    )}
                    {amusementData.attributes.ott === 'disneyOriginal' && (
                      <>
                        <DisneyOriginal /> Disney+ Original
                      </>
                    )}
                    {amusementData.attributes.ott === 'netflixOriginal' && (
                      <>
                        <NetflixOriginal /> NETFLIX Original
                      </>
                    )}
                    {amusementData.attributes.ott === 'netflixFilm' && (
                      <>
                        <NetflixOriginal /> NETFLIX Original Film
                      </>
                    )}
                    {amusementData.attributes.ott === 'netflixAnime' && (
                      <>
                        <NetflixOriginal /> NETFLIX Original Animation
                      </>
                    )}
                    {amusementData.attributes.ott === 'netflixAnimeFilm' && (
                      <>
                        <NetflixOriginal /> NETFLIX Original Animation Film
                      </>
                    )}
                    {amusementData.attributes.ott === 'tvingOriginal' && (
                      <>
                        <TvingOriginal /> 티빙 오리지널
                      </>
                    )}
                    {amusementData.attributes.ott === 'tvingOnly' && (
                      <>
                        <TvingOnly /> 오직 티빙에서
                      </>
                    )}
                    {amusementData.attributes.ott === 'watchaOriginal' && (
                      <>
                        <WatchaOriginal /> 왓챠 오리지널
                      </>
                    )}
                    {amusementData.attributes.ott === 'watchaExclusive' && (
                      <>
                        <WatchaOnly /> 오직 왓챠에서
                      </>
                    )}
                    {amusementData.attributes.ott === 'wavveOriginal' && (
                      <>
                        <WavveOriginal /> 웨이브 오리지널
                      </>
                    )}
                    {amusementData.attributes.ott === 'wavveOnly' && (
                      <>
                        <WavveOnly /> 오직 웨이브에서
                      </>
                    )}
                  </dd>
                </div>
              )}
              {amusementData.attributes.ott !== null && amusementData.attributes.ottAddr !== null && (
                <div className={styles.link}>
                  <dt>OTT에서 보기</dt>
                  <dd>
                    <Anchor href={amusementData.attributes.ottAddr}>
                      {amusementData.attributes.ott === 'amazonOriginal' && 'Amazon Prime Video'}
                      {(amusementData.attributes.ott === 'appleOriginal' ||
                        amusementData.attributes.ott === 'appleFilm') &&
                        'Apple TV+'}
                      {amusementData.attributes.ott === 'disneyOriginal' && 'Disney+'}
                      {(amusementData.attributes.ott === 'netflixOriginal' ||
                        amusementData.attributes.ott === 'netflixFilm' ||
                        amusementData.attributes.ott === 'netflixAnime' ||
                        amusementData.attributes.ott === 'netflixAnimeFilm') &&
                        'NETFLIX'}
                      {(amusementData.attributes.ott === 'tvingOriginal' ||
                        amusementData.attributes.ott === 'tvingOnly') &&
                        'TVING'}
                      {(amusementData.attributes.ott === 'watchaOriginal' ||
                        amusementData.attributes.ott === 'watchaExclusive') &&
                        'WATCHA'}
                      {(amusementData.attributes.ott === 'wavveOriginal' ||
                        amusementData.attributes.ott === 'wavveOnly') &&
                        'Wavve'}
                      에서 시청하기
                    </Anchor>
                  </dd>
                </div>
              )}
              <RelationSelect />
            </dl>
            <button onClick={copyToClipboard}>
              <ClipboardIcon /> <span>URL 복사</span>
            </button>
          </div>
          <dl className={styles.summary}>
            <div className={styles.item}>
              {amusementData.attributes.category !== 'ott' && amusementData.attributes.category !== 'ottFilm' && (
                <div className={styles.category}>
                  <dt>카테고리</dt>
                  <dd>
                    <em>{CategoryName(amusementData.attributes.category)}</em>
                    {amusementData.attributes.category === 'animation' && (
                      <em>{AnimeName(amusementData.attributes.anime)}</em>
                    )}
                  </dd>
                </div>
              )}
              <div className={styles.country}>
                <dt>제작국가</dt>
                <dd>{amusementData.attributes.country === '?' ? '알 수 없음' : amusementData.attributes.country}</dd>
              </div>
              <div className={styles.release}>
                <dt>제작년도</dt>
                <dd>
                  {amusementData.attributes.release === '?'
                    ? '출시일을 알 수 없거나 출시예정작'
                    : amusementData.attributes.release}
                  년
                </dd>
              </div>
              <div className={styles.rating}>
                <dt>등급</dt>
                <dd>
                  {(amusementData.attributes.category === 'drama' ||
                    amusementData.attributes.category === 'ott' ||
                    amusementData.attributes.anime === 'tva' ||
                    amusementData.attributes.anime === 'ova') &&
                    amusementData.attributes.rating !== 'd19' && (
                      <>
                        {amusementData.attributes.rating === 'all' ? (
                          <i className={`${styles.drama} ${styles.all} number`}>
                            {RatingsDrama(amusementData.attributes.rating)}
                          </i>
                        ) : (
                          <i className={`${styles.drama} number`}>{RatingsDrama(amusementData.attributes.rating)}</i>
                        )}
                      </>
                    )}
                  {(amusementData.attributes.category === 'drama' ||
                    amusementData.attributes.category === 'ott' ||
                    amusementData.attributes.anime === 'tva' ||
                    amusementData.attributes.anime === 'ova') &&
                    amusementData.attributes.rating === 'd19' && (
                      <i className={`${styles.drama} ${styles.d19} number`}>
                        {RatingsDrama(amusementData.attributes.rating)}
                      </i>
                    )}
                  {(amusementData.attributes.category === 'movie' ||
                    amusementData.attributes.category === 'ottFilm' ||
                    amusementData.attributes.anime === 'movie') &&
                    amusementData.attributes.rating === 'all' && (
                      <>
                        <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                      </>
                    )}
                  {(amusementData.attributes.category === 'movie' ||
                    amusementData.attributes.category === 'ottFilm' ||
                    amusementData.attributes.anime === 'movie') &&
                    amusementData.attributes.rating === 'b12' && (
                      <>
                        <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                      </>
                    )}
                  {(amusementData.attributes.category === 'movie' ||
                    amusementData.attributes.category === 'ottFilm' ||
                    amusementData.attributes.anime === 'movie') &&
                    amusementData.attributes.rating === 'c15' && (
                      <>
                        <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                      </>
                    )}
                  {(amusementData.attributes.category === 'movie' ||
                    amusementData.attributes.category === 'ottFilm' ||
                    amusementData.attributes.anime === 'movie') &&
                    amusementData.attributes.rating === 'd19' && (
                      <>
                        <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                      </>
                    )}
                  {amusementData.attributes.category === 'game' && amusementData.attributes.rating === 'all' && (
                    <>
                      <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                    </>
                  )}
                  {amusementData.attributes.category === 'game' && amusementData.attributes.rating === 'b12' && (
                    <>
                      <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                    </>
                  )}
                  {amusementData.attributes.category === 'game' && amusementData.attributes.rating === 'c15' && (
                    <>
                      <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                    </>
                  )}
                  {amusementData.attributes.category === 'game' && amusementData.attributes.rating === 'd19' && (
                    <>
                      <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                    </>
                  )}
                </dd>
              </div>
            </div>
          </dl>
          <dl className={styles.staff}>
            <div>
              <dt>장르</dt>
              <dd>{amusementData.attributes.genre}</dd>
            </div>
            <div>
              <dt>퍼블리셔</dt>
              <dd>{amusementData.attributes.publisher === '?' ? '알 수 없음' : amusementData.attributes.publisher}</dd>
            </div>
            <div>
              <dt>주요 제작자</dt>
              <dd>{amusementData.attributes.creator}</dd>
            </div>
            {amusementData.attributes.category !== 'game' && (
              <div>
                <dt>주요 출연자</dt>
                <dd>{amusementData.attributes.cast}</dd>
              </div>
            )}
            {amusementData.attributes.synopsys && (
              <div className={styles.synopsys}>
                <dt>시놉시스</dt>
                <dd
                  dangerouslySetInnerHTML={{
                    __html: amusementData.attributes.synopsys.replace(/\n/g, '<br />'),
                  }}
                />
              </div>
            )}
          </dl>
        </div>
        <div
          className={`${styles.poster} ${amusementData.attributes.category === 'game' ? styles['poster-game'] : ''}`}
        >
          <div className={styles.images}>
            <Image
              src={amusementData.attributes.posterDefault}
              alt=""
              width={amusementData.attributes.category === 'game' ? 460 : 390}
              height={amusementData.attributes.category === 'game' ? 215 : 560}
              unoptimized
              className={`${isActive ? styles.active : ''}`}
            />
            {amusementData.attributes.posterOther && (
              <Image
                src={amusementData.attributes.posterOther}
                alt=""
                width={amusementData.attributes.category === 'game' ? 460 : 390}
                height={amusementData.attributes.category === 'game' ? 215 : 560}
                unoptimized
                className={`${!isActive ? styles.active : ''}`}
              />
            )}
          </div>
          {amusementData.attributes.posterOther && (
            <button type="button" onClick={togglePoster}>
              <span>다른 이미지 보기</span>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="1">
                  <path
                    d="M4.58333 2.25006L2.25 4.58339L4.58333 6.91673V5.16673H8.66667C10.2846 5.16673 11.5833 6.46542 11.5833 8.0834C11.5833 9.70137 10.2846 11.0001 8.66667 11.0001H2.83333V12.1667H8.66667C10.915 12.1667 12.75 10.3318 12.75 8.0834C12.75 5.83503 10.915 4.00006 8.66667 4.00006H4.58333V2.25006Z"
                    fill="white"
                  />
                </g>
              </svg>
            </button>
          )}
        </div>
      </div>
      {isJejeupsError && (
        <p className={styles['amusement-error']}>
          영상을 불러오지 못했습니다. 삭제된 영상이거나 인터넷 속도가 느립니다.{' '}
          <Anchor href="/jejeups">뒤로가기</Anchor>
        </p>
      )}
      {isJejeupsLoading && <p className={styles['amusement-loading']}>목록 불러오는 중...</p>}
      {data && !isJejeupsLoading && !isJejeupsError && (
        <div className={styles.list}>
          {Array.isArray(data.jejeups) &&
            data.jejeups.map((jejeup: JejeupData) => (
              <div className={styles.item} key={jejeup.id}>
                {Object.keys(jejeup.jejeupMetaData).length > 0 ? (
                  <Link key={jejeup.idx} href={`/jejeup/${jejeup.idx}`} scroll={false} shallow={true}>
                    <div className={`${styles.preview} preview`}>
                      <div className={styles['preview-container']}>
                        <div className={styles.thumbnail}>
                          <Image src={jejeup.jejeupMetaData.ogImage} width="1920" height="1080" alt="" unoptimized />
                          <em>{FormatDuration(jejeup.jejeupMetaData.duration)}</em>
                        </div>
                        <div className={styles['preview-info']}>
                          <div className={styles.detail}>
                            <Image
                              src={`${jejeup.jejeupMetaData.ownerAvatar === null ? jejeup.ownerAvatar : jejeup.jejeupMetaData.ownerAvatar}`}
                              width="36"
                              height="36"
                              alt=""
                              unoptimized
                            />
                            <div className={`${styles['user-info']}`}>
                              <strong>{jejeup.jejeupMetaData.ogTitle}</strong>
                              <div className={styles.user}>
                                <cite>{jejeup.jejeupMetaData.ownerName}</cite>
                                <time dateTime={jejeup.jejeupMetaData.datePublished}>
                                  {FormatDate(`${jejeup.jejeupMetaData.datePublished}`)}
                                </time>
                              </div>
                              {jejeup.worst && (
                                <div className={styles.worst}>
                                  <button type="button" className="number">
                                    Worst
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link key={jejeup.idx} href={`/jejeup/${jejeup.idx}`} scroll={false} shallow={true}>
                    <div className={`${styles.preview} preview`}>
                      <div className={styles['preview-container']}>
                        <div className={styles.thumbnail}>
                          <Image src="/missing.webp" width="1920" height="1080" alt="" unoptimized />
                        </div>
                        <div className={styles['preview-info']}>
                          <div className={styles.detail}>
                            <Image src="/unknown.webp" width="36" height="36" alt="" unoptimized />
                            <div className={`${styles['user-info']}`}>
                              <strong>삭제된 영상</strong>
                              <div className={styles.user}>
                                <cite>관리자에게 제보해 주세요</cite>
                                <time>알 수 없는 시간</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
        </div>
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const amusementId = context.params?.amusementId;
  let amusementData = null;

  if (amusementId && typeof amusementId === 'string') {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/amusement?amusementId=${amusementId.substring(14)}`,
    );
    const amusementResponse = (await response.json()) as { data: AmusementPermalinkData };
    amusementData = amusementResponse.data;
  }

  if (!amusementData) {
    return {
      props: {
        amusementData: null,
      },
    };
  }

  return {
    props: {
      amusementData,
      idx: amusementId,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
