import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Category, Counts, JejeupData, JejeupMetaData } from 'types';
import Seo from '@/components/Seo';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { formatDate } from '@/components/FormatDate';
import { formatDuration } from '@/components/FormatDuration';
import { formatNumber } from '@/components/FormatNumber';
import { vectors } from '@/components/vectors';
import { Pagination } from '@/components/Pagination';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Home.module.sass';

const AmazonOriginal = styled.i({
  width: rem(52),
  background: `url(${vectors.ott.amazon}) no-repeat 50% 50%/contain`,
});

const AppleOriginal = styled.i({
  width: rem(42),
  background: `url(${vectors.ott.apple}) no-repeat 50% 50%/contain`,
});

const DisneyOriginal = styled.i({
  width: rem(29),
  background: `url(${vectors.ott.disney}) no-repeat 50% 50%/contain`,
});

const StarOriginal = styled.i({
  width: rem(49),
  background: `url(${vectors.ott.star}) no-repeat 50% 50%/contain`,
});

const NetflixOriginal = styled.i({
  width: rem(59),
  background: `url(${vectors.ott.netflix}) no-repeat 50% 50%/contain`,
});

const TvingOriginal = styled.i({
  width: rem(63),
  background: `url(${vectors.ott.tvingOrigin2}) no-repeat 50% 50%/contain`,
});

const TvingOnly = styled.i({
  width: rem(70),
  background: `url(${vectors.ott.tvingOnly2}) no-repeat 50% 50%/contain`,
});

const WatchaOriginal = styled.i({
  width: rem(55),
  background: `url(${vectors.ott.watchaOrigin2}) no-repeat 50% 50%/contain`,
});

const WatchaOnly = styled.i({
  width: rem(70),
  background: `url(${vectors.ott.watchaOnly2}) no-repeat 50% 50%/contain`,
});

const WavveOriginal = styled.i({
  width: rem(72),
  background: `url(${vectors.ott.wavveOrigin2}) no-repeat 50% 50%/contain`,
});

const WavveOnly = styled.i({
  width: rem(50),
  background: `url(${vectors.ott.wavveOnly2}) no-repeat 50% 50%/contain`,
});

const Paramount = styled.i({
  width: rem(81),
  background: `url(${vectors.ott.paramount}) no-repeat 50% 50%/contain`,
});

const Ena = styled.i({
  width: rem(37),
  background: `url(${vectors.broadcast.ena}) no-repeat 0 50%/contain`,
});

const Jtbc = styled.i({
  width: rem(27),
  background: `url(${vectors.broadcast.jtbc}) no-repeat 0 50%/contain`,
});

const Kbs2tv = styled.i({
  width: rem(43),
  background: `url(${vectors.broadcast.kbs2tv}) no-repeat 0 50%/contain`,
});

const Mbc = styled.i({
  width: rem(49),
  background: `url(${vectors.broadcast.mbc}) no-repeat 0 50%/contain`,
});

const Ocn = styled.i({
  width: rem(42),
  background: `url(${vectors.broadcast.ocn}) no-repeat 0 50%/contain`,
});

const Sbs = styled.i({
  width: rem(31),
  background: `url(${vectors.broadcast.sbs}) no-repeat 0 50%/contain`,
});

const Tvn = styled.i({
  width: rem(34),
  background: `url(${vectors.broadcast.tvn}) no-repeat 0 50%/contain`,
});

const Abc = styled.i({
  width: rem(34),
  background: `url(${vectors.broadcast.abc}) no-repeat 0 50%/contain`,
});

const Anibox = styled.i({
  width: rem(48),
  background: `url(${vectors.anime.anibox}) no-repeat 0 50%/contain`,
});

const Animax = styled.i({
  width: rem(40),
  background: `url(${vectors.anime.animax}) no-repeat 0 50%/contain`,
});

const Aniplus = styled.i({
  width: rem(93),
  background: `url(${vectors.anime.aniplus}) no-repeat 0 50%/contain`,
});

const Atx = styled.i({
  width: rem(22),
  background: `url(${vectors.anime.atx}) no-repeat 0 50%/contain`,
});

const Daewon = styled.i({
  width: rem(44),
  background: `url(${vectors.anime.daewon}) no-repeat 0 50%/contain`,
});

const Fujitv = styled.i({
  width: rem(81),
  background: `url(${vectors.anime.fujitv}) no-repeat 0 50%/contain`,
});

const Mbs = styled.i({
  width: rem(42),
  background: `url(${vectors.anime.mbs}) no-repeat 0 50%/contain`,
});

const Nippontv = styled.i({
  width: rem(30),
  background: `url(${vectors.anime.nippontv}) no-repeat 0 50%/contain`,
});

const Tbs = styled.i({
  width: rem(31),
  background: `url(${vectors.anime.tbs}) no-repeat 0 50%/contain`,
});

const Tokyomx = styled.i({
  width: rem(108),
  background: `url(${vectors.anime.tokyomx}) no-repeat 0 50%/contain`,
});

const Tooniverse = styled.i({
  width: rem(93),
  background: `url(${vectors.anime.tooniverse}) no-repeat 0 50%/contain`,
});

const Tvtokyo = styled.i({
  width: rem(42),
  background: `url(${vectors.anime.tvtokyo}) no-repeat 0 50%/contain`,
});

const Wowow = styled.i({
  width: rem(108),
  background: `url(${vectors.anime.wowow}) no-repeat 0 50%/contain`,
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

export function Amusements({ jejeup }: { jejeup: any }) {
  const items = jejeup.split(',');
  const result = items.length - 1;
  return (
    <p>
      <strong>본 작품 외 {result}개 작품 리뷰가 추가로 존재함</strong>
    </p>
  );
}

function Home({ data, error, currentPage }: { data: any; error: string; currentPage: number }) {
  const router = useRouter();
  const timestamp = Date.now();

  useEffect(() => {
    localStorage.removeItem('currentPage');
  }, []);

  useEffect(() => {
    sessionStorage.setItem('location', router.asPath);
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

  const amazonRatingHandler = () => {
    alert('아마존 자체 심의등급으로 설정된 작품입니다.\n아마존 프라임 비디오에 가입이 되어 있다면 시청 가능합니다.');
  };

  const regionRatingHandler = () => {
    alert('대한민국에서 시청이 불가능한 아마존 오리지널 작품입니다.\n시청 등급은 아마존 자체 심의등급입니다.');
  };

  const customRatingHandler = () => {
    alert(
      '대한민국에서 시청/심의등급이 없거나 대한민국에 정식 발매된 작품이 아닙니다.\n해당 시청/심의등급은 제제없 자체설정 시청/심의등급입니다.\n따라서 제제없 심의등급은 법적구속력이 없습니다.\n\n자세한 내용은 공지사항을 참고하세요.',
    );
  };

  function JejeupMeta({ jejeup }: { jejeup: any }) {
    const [jejeupMetaData, setJejeupMetaData] = useState<JejeupMetaData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const maxRetries = 7;

    const fetchMetadata = async (currentRetryCount = 0) => {
      try {
        const jejeupMeta = await fetch(`/api/metadata?url=https://youtu.be/${jejeup.video}`);
        const jejeupMetaDataResponse = await jejeupMeta.json();
        if (
          Array.isArray(jejeupMetaDataResponse) === false &&
          Object.keys(jejeupMetaDataResponse).length === 0 &&
          jejeupMetaDataResponse.duration === undefined &&
          currentRetryCount < maxRetries
        ) {
          setTimeout(() => fetchMetadata(currentRetryCount + 1), 5000);
        } else {
          setJejeupMetaData(jejeupMetaDataResponse);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const handleRetry = () => {
      setJejeupMetaData(null);
      setIsLoading(true);
      fetchMetadata().finally(() => setIsLoading(false));
    };

    useEffect(() => {
      setIsLoading(true);
      fetchMetadata().finally(() => setIsLoading(false));
    }, []);

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
        {!isLoading && jejeupMetaData ? (
          <>
            {Object.keys(jejeupMetaData).length > 0 ? (
              <>
                {jejeupMetaData.error === 'Failed to fetch data' || jejeupMetaData.originalTitle === ' - YouTube' ? (
                  <div className={`${styles.preview} ${styles['preview-dummy']}`}>
                    <div className={styles.notice}>
                      <p>유튜버가 삭제했거나 비공개 처리한 영상입니다.</p>
                      <p>
                        <button type="button" data-video={jejeup.video} onClick={handleReport}>
                          제제없 운영자에게 제보
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
                          <Image src={jejeupMetaData.ogImage} width="1920" height="1080" alt="" unoptimized />
                          <em aria-label="재생시간">{formatDuration(jejeupMetaData.duration)}</em>
                        </div>
                        <div className={styles['preview-info']}>
                          <div className={styles.detail}>
                            <div className={`${styles['user-info']}`}>
                              <strong aria-label="영상제목">{jejeupMetaData.ogTitle}</strong>
                              <div className={styles.user}>
                                <cite aria-label="유튜브 채널이름">{jejeupMetaData.ownerName}</cite>
                                <time dateTime={jejeupMetaData.datePublished}>
                                  {formatDate(`${jejeupMetaData.datePublished}`)}
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
            ) : (
              <div className={`${styles.preview} ${styles['preview-dummy']}`}>
                <div className={styles.notice}>
                  <p>알 수 없는 사유로 불러오지 못했습니다.</p>
                  <p>
                    <button type="button" data-video={jejeup.video} onClick={handleRetry}>
                      새로고침
                    </button>
                    해 주세요.
                  </p>
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

  return (
    <main className={styles.main}>
      <Seo
        pageTitle="제목에 제목이 없어서 짜증나서 만든 사이트"
        pageDescription="클릭하지 않아도 작품의 제목과 정보를 알 수 있게 도와드려요"
        pageImg={`https://jejeup.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <h1>
        <span>
          <i className="preview" />
          클릭하지 않아도 제목과 정보를 알 수 있게 도와드려요 💃
        </span>
        {count && <em>({formatNumber(count.jejeup)}개 리뷰/실황)</em>}
      </h1>
      <div className={styles.list}>
        {error && (
          <div className={styles.error}>
            <p>데이터를 불러오는데 실패했습니다.</p>
            <button type="button" onClick={() => window.location.reload()}>
              다시 시도
            </button>
          </div>
        )}
        {data && !error && (
          <div className={styles['jejeup-content']}>
            {Array.isArray(data.jejeups) &&
              data.jejeups.map((jejeup: JejeupData) => (
                <div className={styles.item} key={jejeup.id}>
                  <figure>
                    <JejeupMeta key={jejeup.idx} jejeup={jejeup} />
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
                          {jejeup.amusementData.ott === 'appleOriginal' && (
                            <cite>
                              <AppleOriginal /> An Apple Original
                            </cite>
                          )}
                          {jejeup.amusementData.ott === 'appleFilm' && (
                            <cite>
                              <AppleOriginal /> Apple Original Films
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
                            jejeup.amusementData.ott === 'netflixAnime') && (
                            <cite>
                              <NetflixOriginal /> A NETFLIX Series
                            </cite>
                          )}
                          {(jejeup.amusementData.ott === 'netflixPresents' ||
                            jejeup.amusementData.ott === 'netflixFilm' ||
                            jejeup.amusementData.ott === 'netflixAnimeFilm') && (
                            <cite>
                              <NetflixOriginal /> NETFLIX Presents
                            </cite>
                          )}
                          {jejeup.amusementData.ott === 'netflixDocumentary' && (
                            <cite>
                              <NetflixOriginal /> A NETFLIX Documentary
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
                              {jejeup.amusementData.ott === 'amazonOriginal' && !jejeup.amusementData.ratingCustom && (
                                <button type="button" onClick={amazonRatingHandler}>
                                  <i />
                                  <span>아마존 자체 심의등급 작품</span>
                                </button>
                              )}
                              {jejeup.amusementData.ott === 'amazonOriginal' && jejeup.amusementData.ratingCustom && (
                                <button type="button" onClick={regionRatingHandler}>
                                  <i />
                                  <span>한국 리전 아마존 시청 불가 작품</span>
                                </button>
                              )}
                              {jejeup.amusementData.ott !== 'amazonOriginal' && jejeup.amusementData.ratingCustom && (
                                <button type="button" onClick={customRatingHandler}>
                                  <i />
                                  <span>제제없 자체설정 심의등급 안내</span>
                                </button>
                              )}
                            </div>
                          )}
                        </dt>
                        <dd>
                          <strong aria-label="작품명">
                            <span className={styles.title}>
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
            <Pagination currentPage={currentPage} pageCount={data.pageCount} sorting={'jejeup'} />
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query.page) || 1;
  let data = null;
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jejeups?page=${currentPage}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      data,
      error,
      currentPage,
    },
  };
};
