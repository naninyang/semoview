import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category, JejeupMetaData } from 'types';
import { formatDate } from '@/components/FormatDate';
import { CategoryName } from './CategoryName';
import { AnimeName } from './AnimeName';
import { RatingsDrama } from './RatingsDrama';
import { formatDuration } from '@/components/FormatDuration';
import styles from '@/styles/Reviews.module.sass';
import {
  Abc,
  AmazonOriginal,
  Anibox,
  Animax,
  Aniplus,
  AppleOriginal,
  Atx,
  Bbc,
  Daewon,
  DisneyOriginal,
  Ena,
  Fujitv,
  Hbomax,
  Hulu,
  Jtbc,
  Kbs2tv,
  Mbc,
  Mbs,
  NetflixOriginal,
  Nippontv,
  Ocn,
  Paramount,
  Peacock,
  RatingFilmAll,
  RatingFilmB12,
  RatingFilmC15,
  RatingFilmD18,
  RatingGameAll,
  RatingGameB12,
  RatingGameC15,
  RatingGameD19,
  Sbs,
  Sky,
  StarOriginal,
  Syfy,
  Tbs,
  Tokyomx,
  Tooniverse,
  TvingOnly,
  TvingOriginal,
  Tvn,
  Tvtokyo,
  WatchaOnly,
  WatchaOriginal,
  WavveFirstrun,
  WavveOnly,
  WavveOriginal,
  Wowow,
} from './Icons';

export function Amusements({ jejeup }: { jejeup: string }) {
  const items = jejeup.split(',');
  const result = items.length - 1;
  return (
    <p>
      <strong>본 작품 외 {result}개 작품 리뷰가 추가로 존재함</strong>
    </p>
  );
}

export function JejeupMeta({ jejeup }: { jejeup: any }) {
  const [jejeupMetaData, setJejeupMetaData] = useState<JejeupMetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const maxRetries = 2;

  const fetchMetadata = async (currentRetryCount = 0) => {
    try {
      const jejeupMeta = await fetch(`/api/metadata?url=${jejeup.video}`);
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

  const isDevelopment = process.env.NODE_ENV === 'development';
  const handleReport = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const jejeupVideo = event.currentTarget.getAttribute('data-video');
    const jejeupID = event.currentTarget.getAttribute('data-id');

    try {
      const response = await fetch('/api/unpublish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jejeupVideo: jejeupVideo, jejeupID: jejeupID }),
      });

      if (response.ok) {
        alert(isDevelopment ? '비공개 처리됨.' : '제보 성공! 감사합니다 ☺️');
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
              {jejeupMetaData.error === 'Video not found or is deleted/private' ? (
                <div className={`${styles.preview} ${styles['preview-dummy']}`}>
                  <div className={styles.notice}>
                    <p>유튜버가 삭제했거나 비공개 처리한 영상입니다.</p>
                    <p>
                      <button
                        type="button"
                        data-video={jejeup.video}
                        data-id={jejeup.idx.substring(14)}
                        onClick={handleReport}
                      >
                        {isDevelopment ? '비공개 처리하기' : '세모뷰 운영자에게 제보해 주세요.'}
                      </button>
                    </p>
                    <p>
                      {process.env.NODE_ENV === 'development' &&
                        `${jejeup.idx} / ${jejeup.idx.substring(14)} / ${jejeup.video}`}
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

export function ReviewItem({ jejeup }: { jejeup: any }) {
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
  return (
    <figure className={styles.figure}>
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
            jejeup.amusementData.category !== 'ott_film' ? (
              <>
                {jejeup.amusementData.category !== 'anime_film' && (
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
                      {jejeup.amusementData.category === 'game' && jejeup.amusementData.isMobile && '모바일 '}
                      {jejeup.amusementData.category === 'game_fan' && '팬 게임'}
                      {jejeup.amusementData.animeBroadcast1 === null &&
                        jejeup.amusementData.animeBroadcast2 === null &&
                        jejeup.amusementData.category !== 'anime_film' &&
                        CategoryName(jejeup.amusementData.category)}
                    </em>
                  </>
                )}
              </>
            ) : (
              <>
                {(jejeup.amusementData.category as Category) !== 'ott_drama' &&
                  (jejeup.amusementData.category as Category) !== 'ott_documentary_film' && (
                    <em>{CategoryName(jejeup.amusementData.category)}</em>
                  )}
                {jejeup.amusementData.category === 'ott_documentary_film' && (
                  <>
                    <em>다큐멘터리</em>
                    <em>영화</em>
                  </>
                )}
                {jejeup.amusementData.category === 'ott_drama' &&
                  jejeup.amusementData.broadcast === null &&
                  jejeup.amusementData.wavveSeries === null && <em>드라마</em>}
                {jejeup.amusementData.wavveSeries && (
                  <em className={styles[jejeup.amusementData.broadcast]}>
                    {jejeup.amusementData.wavveSeries.map((item: string, index: number) => (
                      <React.Fragment key={index}>
                        {item === 'bbc' && (
                          <>
                            <Bbc />
                            <span>BBC</span>
                          </>
                        )}
                        {item === 'hbomax' && (
                          <>
                            <Hbomax />
                            <span>HBO맥스</span>
                          </>
                        )}
                        {item === 'hulu' && (
                          <>
                            <Hulu />
                            <span>Hulu</span>
                          </>
                        )}
                        {item === 'peacock' && (
                          <>
                            <Peacock />
                            <span>Peacock</span>
                          </>
                        )}
                        {item === 'sky' && (
                          <>
                            <Sky />
                            <span>SKY</span>
                          </>
                        )}
                        {item === 'syfy' && (
                          <>
                            <Syfy />
                            <span>SYFY</span>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                    드라마
                  </em>
                )}
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
            {jejeup.amusementData.category === 'anime' && <em>{AnimeName(jejeup.amusementData.anime)}</em>}
            {jejeup.amusementData.ott === 'amazonOriginal' && (
              <cite>
                <AmazonOriginal /> AMAZON ORIGINAL
              </cite>
            )}
            {(jejeup.amusementData.ott === 'appleOriginal' || jejeup.amusementData.ott === 'appleFilm') && (
              <cite>
                <AppleOriginal /> {jejeup.amusementData.ott === 'appleOriginal' && 'An Apple Original'}
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
              jejeup.amusementData.ott === 'netflixPresents' ||
              jejeup.amusementData.ott === 'netflixFilm' ||
              jejeup.amusementData.ott === 'netflixDocumentary') && (
              <cite>
                <NetflixOriginal />
                {(jejeup.amusementData.ott === 'netflixSeries' || jejeup.amusementData.ott === 'netflixOriginal') &&
                  'A NETFLIX Series'}
                {(jejeup.amusementData.ott === 'netflixPresents' || jejeup.amusementData.ott === 'netflixFilm') &&
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
                            <i className={`${styles.drama} number`}>{RatingsDrama(jejeup.amusementData.rating)}</i>
                            <span>세 이상 이용가</span>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                {(jejeup.amusementData.category === 'film' ||
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
              {jejeup.amusementData.lang === 'europe' && <span lang="en">{jejeup.amusementData.title}</span>}
              {jejeup.amusementData.lang === 'english' && <span lang="en-US">{jejeup.amusementData.title}</span>}
              {jejeup.amusementData.lang === 'japanese' && <span lang="ja">{jejeup.amusementData.title}</span>}
              {jejeup.amusementData.lang === 'thai' && <span lang="th">{jejeup.amusementData.title}</span>}
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
                    <time aria-label="방영년도">{jejeup.amusementData.release}년</time>
                  )}
                  {(jejeup.amusementData.category === 'film' ||
                    jejeup.amusementData.category === 'anime_film' ||
                    jejeup.amusementData.category === 'ott_anime_film' ||
                    jejeup.amusementData.category === 'ott_film' ||
                    jejeup.amusementData.anime === 'film') && (
                    <time aria-label="상영년도">{jejeup.amusementData.release}년</time>
                  )}
                  {jejeup.amusementData.category === 'game' && (
                    <time aria-label="출시년도">{jejeup.amusementData.release}년</time>
                  )}
                </>
              )}
            </strong>
          </dd>
        </dl>
      </figcaption>
    </figure>
  );
}
