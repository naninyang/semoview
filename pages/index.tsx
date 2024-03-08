import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { JejeupData } from 'types';
import Seo from '@/components/Seo';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { OriginalName } from '@/components/OriginalName';
import { FormatDate } from '@/components/FormatDate';
import { vectors } from '@/components/vectors';
import { Pagination } from '@/components/Pagination';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Home.module.sass';

interface Counts {
  jejeup: number;
}

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

function Home() {
  const router = useRouter();
  const timestamp = Date.now();
  const [data, setData] = useState<JejeupData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const currentPage = Number(router.query.page) || 1;

  useEffect(() => {
    localStorage.removeItem('currentPage');
  }, []);

  useEffect(() => {
    sessionStorage.setItem('location', router.asPath);
  }, [router.asPath]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const renewResponse = await fetch(`/api/renew?page=${currentPage}`);
      const renewData = await renewResponse.json();
      const renewValue = renewData.renew;
      const cachedData = localStorage.getItem(`jejeupsData${currentPage}`);
      let dataToUse;

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (parsedData.jejeups.length > 0 && parsedData.jejeups[0].createdAt) {
          if (parsedData.jejeups[0].createdAt === renewValue) {
            dataToUse = parsedData;
          }
        }
      }

      if (!dataToUse) {
        const response = await fetch(`/api/jejeups?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const newData = await response.json();
        localStorage.setItem(`jejeupsData${currentPage}`, JSON.stringify(newData));
        dataToUse = newData;
      }

      setData(dataToUse);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  function FormatDuration(duration: string) {
    const match = duration.match(/PT(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    const minutes = match[1] ? match[1].slice(0, -1) : '0';
    const seconds = match[2] ? match[2].slice(0, -1) : '0';
    return `${minutes}:${seconds.padStart(2, '0')}`;
  }

  const [count, setCount] = useState<Counts | null>(null);

  function formatNumber(value: number): string {
    return value.toLocaleString();
  }

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
    <main className={styles.main}>
      <Seo
        pageTitle="제목에 제목이 없어서 짜증나서 만든 사이트"
        pageDescription="클릭하지 않아도 타이틀의 제목과 정보를 알 수 있게 도와드려요"
        pageImg={`https://jejeup.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <h1>
        <span>
          <i className="preview" />
          클릭하지 않아도 제목과 정보를 알 수 있게 도와드려요 💃
        </span>
        {count && <em>({formatNumber(count.jejeup)}개 콘텐츠)</em>}
      </h1>
      <div className={styles.list}>
        {isLoading && <div className={styles.loading}>이것저것 불러오는 중</div>}
        {error && (
          <div className={styles.error}>
            <p>데이터를 불러오는데 실패했습니다.</p>
            <button type="button" onClick={() => window.location.reload()}>
              다시 시도
            </button>
          </div>
        )}
        {data && !isLoading && !error && (
          <div className={styles['jejeup-content']}>
            {Array.isArray(data.jejeups) &&
              data.jejeups.map((jejeup: JejeupData) => (
                <div className={styles.item} key={jejeup.id}>
                  <figure>
                    <Link key={jejeup.idx} href={`/jejeup/${jejeup.idx}`} scroll={false} shallow={true}>
                      {Object.keys(jejeup.jejeupMetaData).length > 0 ? (
                        <div className={`${styles.preview} preview`}>
                          <div className={styles['preview-container']}>
                            <div className={styles.thumbnail}>
                              <Image
                                src={jejeup.jejeupMetaData.ogImage}
                                width="1920"
                                height="1080"
                                alt=""
                                unoptimized
                              />
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
                                      <strong className="number">Worst</strong>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
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
                      )}
                    </Link>
                    <figcaption>
                      {jejeup.worst && (
                        <dl className={styles.worst}>
                          <dt>Worst 경고!</dt>
                          <dd>이 영상은 영상과 더보기에 그 어떤 정보도 존재하지 않는 최악의 영상입니다.</dd>
                        </dl>
                      )}
                      <dl className={styles.summary}>
                        <dt>
                          {jejeup.amusementData.category !== 'ott' && jejeup.amusementData.category !== 'ottFilm' && (
                            <em>{CategoryName(jejeup.amusementData.category)}</em>
                          )}
                          {jejeup.amusementData.category === 'animation' && (
                            <em>{AnimeName(jejeup.amusementData.anime)}</em>
                          )}
                          {jejeup.amusementData.ott === 'amazonOriginal' && (
                            <cite>
                              <AmazonOriginal /> Amazon Prime Video
                            </cite>
                          )}
                          {jejeup.amusementData.ott === 'appleOriginal' && (
                            <cite>
                              <AppleOriginal /> An Apple Original
                            </cite>
                          )}
                          {jejeup.amusementData.ott === 'appleFilm' && (
                            <cite>
                              <AppleOriginal /> An Apple Original Film
                            </cite>
                          )}
                          {jejeup.amusementData.ott === 'disneyOriginal' && (
                            <cite>
                              <DisneyOriginal /> Disney+ Original
                            </cite>
                          )}
                          {jejeup.amusementData.ott === 'netflixOriginal' && (
                            <cite>
                              <NetflixOriginal /> NETFLIX Original
                            </cite>
                          )}
                          {jejeup.amusementData.ott === 'netflixFilm' && (
                            <cite>
                              <NetflixOriginal /> NETFLIX Original Film
                            </cite>
                          )}
                          {jejeup.amusementData.ott === 'netflixAnime' && (
                            <cite>
                              <NetflixOriginal /> NETFLIX Original Animation
                            </cite>
                          )}
                          {jejeup.amusementData.ott === 'netflixAnimeFilm' && (
                            <cite>
                              <NetflixOriginal /> NETFLIX Original Animation Film
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
                          {(jejeup.amusementData.category === 'drama' ||
                            jejeup.amusementData.category === 'ott' ||
                            jejeup.amusementData.anime === 'tva' ||
                            jejeup.amusementData.anime === 'ova') &&
                            jejeup.amusementData.rating !== 'd19' && (
                              <>
                                {jejeup.amusementData.rating === 'all' ? (
                                  <i className={`${styles.drama} ${styles.all} number`}>
                                    {RatingsDrama(jejeup.amusementData.rating)}
                                  </i>
                                ) : (
                                  <i className={`${styles.drama} number`}>
                                    {RatingsDrama(jejeup.amusementData.rating)}
                                  </i>
                                )}
                              </>
                            )}
                          {(jejeup.amusementData.category === 'drama' ||
                            jejeup.amusementData.category === 'ott' ||
                            jejeup.amusementData.anime === 'tva' ||
                            jejeup.amusementData.anime === 'ova') &&
                            jejeup.amusementData.rating === 'd19' && (
                              <i className={`${styles.drama} ${styles.d19} number`}>
                                {RatingsDrama(jejeup.amusementData.rating)}
                              </i>
                            )}
                          {(jejeup.amusementData.category === 'movie' ||
                            jejeup.amusementData.category === 'ottFilm' ||
                            jejeup.amusementData.anime === 'movie') &&
                            jejeup.amusementData.rating === 'all' && (
                              <>
                                <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                              </>
                            )}
                          {(jejeup.amusementData.category === 'movie' ||
                            jejeup.amusementData.category === 'ottFilm' ||
                            jejeup.amusementData.anime === 'movie') &&
                            jejeup.amusementData.rating === 'b12' && (
                              <>
                                <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                              </>
                            )}
                          {(jejeup.amusementData.category === 'movie' ||
                            jejeup.amusementData.category === 'ottFilm' ||
                            jejeup.amusementData.anime === 'movie') &&
                            jejeup.amusementData.rating === 'c15' && (
                              <>
                                <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                              </>
                            )}
                          {(jejeup.amusementData.category === 'movie' ||
                            jejeup.amusementData.category === 'ottFilm' ||
                            jejeup.amusementData.anime === 'movie') &&
                            jejeup.amusementData.rating === 'd19' && (
                              <>
                                <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                              </>
                            )}
                          {jejeup.amusementData.category === 'game' && jejeup.amusementData.rating === 'all' && (
                            <>
                              <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                            </>
                          )}
                          {jejeup.amusementData.category === 'game' && jejeup.amusementData.rating === 'b12' && (
                            <>
                              <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                            </>
                          )}
                          {jejeup.amusementData.category === 'game' && jejeup.amusementData.rating === 'c15' && (
                            <>
                              <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                            </>
                          )}
                          {jejeup.amusementData.category === 'game' && jejeup.amusementData.rating === 'd19' && (
                            <>
                              <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                            </>
                          )}
                        </dt>
                        <dd>
                          <strong>
                            {jejeup.amusementData.lang === 'chineseBeonche' && (
                              <span lang="zh-Hant">{jejeup.amusementData.title} </span>
                            )}
                            {jejeup.amusementData.lang === 'chineseGanche' && (
                              <span lang="zh-Hans">{jejeup.amusementData.title} </span>
                            )}
                            {jejeup.amusementData.lang === 'english' && (
                              <span lang="en">{jejeup.amusementData.title}</span>
                            )}
                            {jejeup.amusementData.lang === 'japanese' && (
                              <span lang="ja">{jejeup.amusementData.title}</span>
                            )}
                            {jejeup.amusementData.lang === 'thai' && (
                              <span lang="th">{jejeup.amusementData.title}</span>
                            )}
                            {jejeup.amusementData.lang === null && <span lang="ko">{jejeup.amusementData.title}</span>}{' '}
                            {jejeup.amusementData.originalAuthor &&
                              `('${jejeup.amusementData.originalAuthor}'의 ${OriginalName(jejeup.amusementData.original)} '${jejeup.amusementData.originTitle}' 원작)`}
                            {(jejeup.amusementData.titleKorean || jejeup.amusementData.titleOther) && (
                              <>
                                ({jejeup.amusementData.titleKorean && jejeup.amusementData.titleKorean}
                                {jejeup.amusementData.titleKorean && jejeup.amusementData.titleOther && ' / '}
                                {jejeup.amusementData.titleOther && jejeup.amusementData.titleOther})
                              </>
                            )}{' '}
                            {jejeup.amusementData.originalAuthor === null && jejeup.amusementData.original && (
                              <span className={styles.origin}>
                                동명의 {OriginalName(jejeup.amusementData.original)} 원작
                              </span>
                            )}
                            <time>{jejeup.amusementData.release}</time>
                          </strong>
                          <em>{jejeup.amusementData.etc && jejeup.amusementData.etc}</em>
                        </dd>
                      </dl>
                      <dl className={styles.info}>
                        <div>
                          <dt>제작국가</dt>
                          <dd>{jejeup.amusementData.country}</dd>
                        </div>
                        <div>
                          <dt>장르</dt>
                          <dd>{jejeup.amusementData.genre}</dd>
                        </div>
                        <div>
                          <dt>퍼블리셔</dt>
                          <dd>{jejeup.amusementData.publisher}</dd>
                        </div>
                        <div>
                          <dt>주요 제작자</dt>
                          <dd>{jejeup.amusementData.creator}</dd>
                        </div>
                        {jejeup.amusementData.category !== 'game' && (
                          <div>
                            <dt>주요 출연자</dt>
                            <dd>{jejeup.amusementData.cast}</dd>
                          </div>
                        )}
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
