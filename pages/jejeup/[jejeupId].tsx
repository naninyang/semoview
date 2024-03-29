import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from '@emotion/styled';
import { JejeupData, JejeupPermalinkData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import YouTubeController from '@/components/YouTubeController';
import Anchor from '@/components/Anchor';
import { vectors } from '@/components/vectors';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { formatDuration } from '@/components/FormatDuration';
import { formatDate } from '@/components/FormatDate';
import { OriginalName } from '@/components/OriginalName';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Jejeup.module.sass';
import 'react-perfect-scrollbar/dist/css/styles.css';

const BackButton = styled.i({
  display: 'block',
  background: `url(${vectors.backward}) no-repeat 50% 50%/contain`,
});

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

const ClipboardIcon = styled.i({
  background: `url(${vectors.share}) no-repeat 50% 50%/contain`,
});

export default function JejeupDetail({
  jejeupData,
  jejeupId,
}: {
  jejeupData: JejeupPermalinkData | null;
  jejeupId: number;
}) {
  const router = useRouter();
  const [relations, setRelations] = useState<JejeupData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRelations = async () => {
    if (jejeupData) {
      if (jejeupData.attributes.relations) {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/relations?relations=${jejeupData.attributes.relations}&type=jejeup`);
          const relationsResponse = await response.json();
          setRelations(relationsResponse);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    loadRelations();
  }, [jejeupData]);

  const previousPageHandler = () => {
    const previousPage = sessionStorage.getItem('location');
    if (previousPage) {
      router.push(`${previousPage}`);
    } else {
      router.push('/');
    }
  };

  const [timeoutReached, setTimeoutReached] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!jejeupData) {
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

  const customRatingHandler = () => {
    alert(
      '대한민국에서 시청/심의등급이 없거나 대한민국에 정식 발매된 작품이 아닙니다.\n해당 시청/심의등급은 제제없 자체설정 시청/심의등급입니다.\n따라서 제제없 심의등급은 법적구속력이 없습니다.\n\n자세한 내용은 공지사항을 참고하세요.',
    );
  };

  return (
    <main className={styles.jejeup}>
      <Seo
        pageTitles={`${jejeupData.attributes.subject} - ${originTitle}`}
        pageTitle={`${jejeupData.attributes.subject}`}
        pageDescription={
          Array.isArray(jejeupData.amusementData) && jejeupData.amusementData.length > 0
            ? `${jejeupData.amusementData[0].titleKorean ? jejeupData.amusementData[0].titleKorean : jejeupData.amusementData[0].title} (${jejeupData.amusementData[0].release})`
            : '서버 에러'
        }
        pageImg={jejeupData.jejeupMetaData.ogImage ? jejeupData.jejeupMetaData.ogImage : '/missing.webp'}
        pageOgType={'video.other'}
        pageImgWidth={1920}
        pageImgHeight={1080}
      />
      <div className="top-link">
        <button onClick={previousPageHandler} type="button">
          <BackButton />
          <span>뒤로가기</span>
        </button>
      </div>
      <article className={styles['article-jejeup']}>
        {jejeupData.jejeupMetaData && jejeupData.jejeupMetaData.ogTitle !== ' - YouTube' ? (
          <div className={`${styles.preview} preview`}>
            <div className={styles.video}>
              <YouTubeController videoId={jejeupData.attributes.video} videoImage={jejeupData.jejeupMetaData.ogImage} />
            </div>
            <div className={styles.youtube}>
              <h1>{jejeupData.jejeupMetaData.ogTitle}</h1>
              <div className={styles.detail}>
                <Image
                  src={`${jejeupData.jejeupMetaData.ownerAvatar === undefined ? jejeupData.attributes.ownerAvatar : jejeupData.jejeupMetaData.ownerAvatar}`}
                  width="36"
                  height="36"
                  alt=""
                  unoptimized
                />
                <div className={styles.user}>
                  <cite>{jejeupData.jejeupMetaData.ownerName}</cite>
                  <time dateTime={jejeupData.jejeupMetaData.datePublished}>
                    {formatDate(`${jejeupData.jejeupMetaData.datePublished}`)}
                  </time>
                </div>
              </div>
              {jejeupData.jejeupMetaData.ogDescription ? (
                <div className={styles.seemore}>
                  <em>{formatDuration(jejeupData.jejeupMetaData.duration)}</em>
                  {jejeupData.jejeupMetaData.ogDescription}
                  {isLoading && (
                    <dl>
                      <dt>관련 영상</dt>
                      <dd>관련 영상 로딩 중...</dd>
                    </dl>
                  )}
                  {jejeupData.attributes.relations && relations && !isLoading && !error && (
                    <dl>
                      <dt>관련 영상</dt>
                      {Array.isArray(relations) &&
                        relations
                          .filter((relation) => relation.idx !== jejeupId)
                          .map((relation) => (
                            <dd key={relation.idx}>
                              <Anchor href={`/jejeup/${relation.idx}`}>{relation.subject}</Anchor>
                            </dd>
                          ))}
                    </dl>
                  )}
                </div>
              ) : (
                <div className={styles.seemore}>
                  <strong>유튜버가 더보기 정보를 등록하지 않았습니다.</strong>
                </div>
              )}
              {jejeupData.attributes.worst && (
                <div className={styles.worst}>
                  <strong className="number">Worst</strong>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={`${styles.preview} preview`}>
            <YouTubeController videoId={jejeupData.attributes.video} videoImage="/missing.webp" />
            <div className={styles.youtube}>
              <h1>유튜버가 삭제했거나 비공개 처리한 영상입니다 ㅠㅠ</h1>
              <div className={styles.detail}>
                <Image src="/unknown.webp" width="36" height="36" alt="" unoptimized />
                <div className={styles.user}>
                  <cite>관리자에게 제보해 주세요</cite>
                  <time>알 수 없는 시간</time>
                </div>
              </div>
              <p>
                <strong>유튜버가 영상을 삭제했거나 비공개 처리한 영상입니다. 관리자에게 제보해 주세요.</strong>
              </p>
            </div>
          </div>
        )}
        <div className={styles.figcaption}>
          {jejeupData.attributes.worst && (
            <dl className={styles.worst}>
              <dt>Worst 경고!</dt>
              <dd>이 영상은 영상과 더보기에 그 어떤 정보도 존재하지 않는 최악의 영상입니다.</dd>
            </dl>
          )}
          {jejeupData.attributes.comment && (
            <div className={styles.comment}>
              <h2>큐레이터의 한줄평</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: jejeupData.attributes.comment.replace(/\n/g, '<br />'),
                }}
              />
            </div>
          )}
          <div className={styles.title}>
            <h2>작품 정보</h2>
            <div className={styles.function}>
              <button onClick={copyToClipboard}>
                <ClipboardIcon /> <span>URL 복사</span>
              </button>
            </div>
            {Array.isArray(jejeupData.amusementData) &&
              (jejeupData.amusementData.length > 1 ? (
                <div className={styles['title-container']}>
                  <PerfectScrollbar className={styles['scrollbar-container']}>
                    <div className={styles['title-list']}>
                      {jejeupData.amusementData.map((data, index) => (
                        <div className={styles['title-info']} key={index}>
                          <div className={styles['info-container']}>
                            <dl className={styles.summary}>
                              <dt>
                                {data.category !== 'ott_drama' &&
                                data.category !== 'ott_film' &&
                                data.category !== 'ott_anime' &&
                                data.category !== 'ott_anime_film' ? (
                                  <em className={styles[data.broadcast]}>
                                    {data.broadcast === 'ENA' && (
                                      <>
                                        <Ena /> <span>ENA</span>
                                      </>
                                    )}
                                    {data.broadcast === 'JTBC' && (
                                      <>
                                        <Jtbc /> <span>JTBC</span>
                                      </>
                                    )}
                                    {data.broadcast === 'KBS2' && (
                                      <>
                                        <Kbs2tv /> <span>KBS 2TV</span>
                                      </>
                                    )}
                                    {data.broadcast === 'MBC' && (
                                      <>
                                        <Mbc /> <span>MBC</span>
                                      </>
                                    )}
                                    {data.broadcast === 'OCN' && (
                                      <>
                                        <Ocn /> <span>OCN</span>
                                      </>
                                    )}
                                    {data.broadcast === 'SBS' && (
                                      <>
                                        <Sbs /> <span>SBS</span>
                                      </>
                                    )}
                                    {data.broadcast === 'tvN' && (
                                      <>
                                        <Tvn /> <span>tvN</span>
                                      </>
                                    )}
                                    {(data.animeBroadcast1 !== null || data.animeBroadcast2 !== null) && (
                                      <>
                                        {data.animeBroadcast1 === 'tokyomx' && (
                                          <>
                                            <Tokyomx /> <span>도쿄 MX</span>
                                          </>
                                        )}
                                        {data.animeBroadcast1 === 'tvtokyo' && (
                                          <>
                                            <Tvtokyo /> <span>테레비 도쿄</span>
                                          </>
                                        )}
                                        {data.animeBroadcast1 === 'fujitv' && (
                                          <>
                                            <Fujitv /> <span>후지 테레비</span>
                                          </>
                                        )}
                                        {data.animeBroadcast1 === 'mbs' && (
                                          <>
                                            <Mbs /> <span>MBS</span>
                                          </>
                                        )}
                                        {data.animeBroadcast1 === 'tbs' && (
                                          <>
                                            <Tbs /> <span>TBS</span>
                                          </>
                                        )}
                                        {data.animeBroadcast1 === 'atx' && (
                                          <>
                                            <Atx /> <span>AT-X</span>
                                          </>
                                        )}
                                        {data.animeBroadcast1 === 'nippontv' && (
                                          <>
                                            <Nippontv /> <span>닛폰 테레비</span>
                                          </>
                                        )}
                                        {data.animeBroadcast1 === 'wowow' && (
                                          <>
                                            <Wowow /> <span>WOWOW</span>
                                          </>
                                        )}
                                        {data.animeBroadcast2 === 'aniplus' && (
                                          <>
                                            {data.animeBroadcast1 !== null && '|'}
                                            <Aniplus />
                                            <span>애니플러스</span> 방영{' '}
                                          </>
                                        )}
                                        {data.animeBroadcast2 === 'daewon' && (
                                          <>
                                            {data.animeBroadcast1 !== null && '|'}
                                            <Daewon /> <span>애니원</span> 방영{' '}
                                          </>
                                        )}
                                        {data.animeBroadcast2 === 'anibox' && (
                                          <>
                                            {data.animeBroadcast1 !== null && '|'}
                                            <Anibox /> <span>애니박스</span> 방영{' '}
                                          </>
                                        )}
                                        {data.animeBroadcast2 === 'tooniverse' && (
                                          <>
                                            {data.animeBroadcast1 !== null && '|'}
                                            <Tooniverse /> <span>투니버스</span> 방영{' '}
                                          </>
                                        )}
                                        {data.animeBroadcast2 === 'animax' && (
                                          <>
                                            {data.animeBroadcast1 !== null && '|'}
                                            <Animax /> <span>애니맥스</span> 방영{' '}
                                          </>
                                        )}
                                      </>
                                    )}
                                    {(data.category === 'game' || data.category === 'game_fan') &&
                                      data.isMobile &&
                                      '모바일 '}
                                    {CategoryName(data.category)}
                                    {data.ott === null && data.ottAddr !== null && ' | 단편영화'}
                                  </em>
                                ) : (
                                  <>
                                    {data.broadcast !== null && (
                                      <em className={styles[data.broadcast]}>
                                        {data.broadcast === 'ENA' && (
                                          <>
                                            <Ena /> <span>ENA</span>
                                          </>
                                        )}
                                        {data.broadcast === 'JTBC' && (
                                          <>
                                            <Jtbc /> <span>JTBC</span>
                                          </>
                                        )}
                                        {data.broadcast === 'KBS2' && (
                                          <>
                                            <Kbs2tv /> <span>KBS 2TV</span>
                                          </>
                                        )}
                                        {data.broadcast === 'MBC' && (
                                          <>
                                            <Mbc /> <span>MBC</span>
                                          </>
                                        )}
                                        {data.broadcast === 'OCN' && (
                                          <>
                                            <Ocn /> <span>OCN</span>
                                          </>
                                        )}
                                        {data.broadcast === 'SBS' && (
                                          <>
                                            <Sbs /> <span>SBS</span>
                                          </>
                                        )}
                                        {data.broadcast === 'tvN' && (
                                          <>
                                            <Tvn /> <span>tvN</span>
                                          </>
                                        )}
                                        드라마
                                      </em>
                                    )}
                                  </>
                                )}
                                {data.category === 'anime' && <em>{AnimeName(data.anime)}</em>}
                                {data.ott === 'amazonOriginal' && (
                                  <cite>
                                    <AmazonOriginal /> AMAZON ORIGINAL
                                  </cite>
                                )}
                                {data.ott === 'appleOriginal' && (
                                  <cite>
                                    <AppleOriginal /> An Apple Original
                                  </cite>
                                )}
                                {data.ott === 'appleFilm' && (
                                  <cite>
                                    <AppleOriginal /> An Apple Original Film
                                  </cite>
                                )}
                                {data.ott === 'disneyOriginal' && (
                                  <cite>
                                    <DisneyOriginal /> Disney+ Original
                                  </cite>
                                )}
                                {data.ott === 'netflixOriginal' && (
                                  <cite>
                                    <NetflixOriginal /> NETFLIX Original
                                  </cite>
                                )}
                                {data.ott === 'netflixFilm' && (
                                  <cite>
                                    <NetflixOriginal /> NETFLIX Original Film
                                  </cite>
                                )}
                                {data.ott === 'netflixAnime' && (
                                  <cite>
                                    <NetflixOriginal /> NETFLIX Original Animation
                                  </cite>
                                )}
                                {data.ott === 'netflixAnimeFilm' && (
                                  <cite>
                                    <NetflixOriginal /> NETFLIX Original Animation Film
                                  </cite>
                                )}
                                {data.ott === 'tvingOriginal' && (
                                  <cite>
                                    <TvingOriginal /> 티빙 오리지널
                                  </cite>
                                )}
                                {data.ott === 'tvingOnly' && (
                                  <cite>
                                    <TvingOnly /> 오직 티빙에서
                                  </cite>
                                )}
                                {data.ott === 'watchaOriginal' && (
                                  <cite>
                                    <WatchaOriginal /> 왓챠 오리지널
                                  </cite>
                                )}
                                {data.ott === 'watchaExclusive' && (
                                  <cite>
                                    <WatchaOnly /> 오직 왓챠에서
                                  </cite>
                                )}
                                {data.ott === 'wavveOriginal' && (
                                  <cite>
                                    <WavveOriginal /> 웨이브 오리지널
                                  </cite>
                                )}
                                {data.ott === 'wavveOnly' && (
                                  <cite>
                                    <WavveOnly /> 오직 웨이브에서
                                  </cite>
                                )}
                                {data.ott === 'paramount' && (
                                  <cite>
                                    <Paramount /> Paramaount+에서 스트리밍 중
                                  </cite>
                                )}
                                {(data.category === 'drama' ||
                                  data.category === 'ott_drama' ||
                                  data.category === 'ott_anime' ||
                                  data.anime === 'tva' ||
                                  data.anime === 'ova') && (
                                  <>
                                    {data.rating === 'all' ? (
                                      <>
                                        <i className={`${styles.drama} ${styles.all} number`}>
                                          {RatingsDrama(data.rating)}
                                        </i>
                                        <span>전체 이용가</span>
                                      </>
                                    ) : (
                                      <>
                                        {data.rating === 'd19' ? (
                                          <>
                                            <i className={`${styles.drama} ${styles.d19} number`}>
                                              {RatingsDrama(data.rating)}
                                            </i>
                                            <span>세 미만 이용불가</span>
                                          </>
                                        ) : (
                                          <>
                                            <i className={`${styles.drama} number`}>{RatingsDrama(data.rating)}</i>
                                            <span>세 이상 이용가</span>
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                                {(data.category === 'film' ||
                                  data.category === 'ott_anime_film' ||
                                  data.category === 'ott_film' ||
                                  data.anime === 'film') && (
                                  <>
                                    {data.rating === 'all' && (
                                      <>
                                        <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                      </>
                                    )}
                                    {data.rating === 'b12' && (
                                      <>
                                        <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                      </>
                                    )}
                                    {data.rating === 'c15' && (
                                      <>
                                        <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                      </>
                                    )}
                                    {data.rating === 'd19' && (
                                      <>
                                        <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                      </>
                                    )}
                                  </>
                                )}
                                {(data.category === 'game' || data.category === 'game_fan') && (
                                  <>
                                    {data.rating === 'all' && (
                                      <>
                                        <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                                      </>
                                    )}
                                    {data.rating === 'b12' && (
                                      <>
                                        <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                                      </>
                                    )}
                                    {data.rating === 'c15' && (
                                      <>
                                        <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                                      </>
                                    )}
                                    {data.rating === 'd19' && (
                                      <>
                                        <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                                      </>
                                    )}
                                  </>
                                )}
                                {data.ratingCustom && (
                                  <div className={styles.custom}>
                                    <button type="button" onClick={customRatingHandler}>
                                      <i />
                                      <span>제제없 자체설정 심의등급 안내</span>
                                    </button>
                                  </div>
                                )}
                                {data.ott !== null && data.ottAddr !== null && (
                                  <Anchor href={data.ottAddr}>
                                    {data.ott === 'amazonOriginal' && 'Prime Video'}
                                    {(data.ott === 'appleOriginal' || data.ott === 'appleFilm') && 'Apple TV+'}
                                    {data.ott === 'disneyOriginal' && 'Disney+'}
                                    {(data.ott === 'netflixOriginal' ||
                                      data.ott === 'netflixFilm' ||
                                      data.ott === 'netflixAnime' ||
                                      data.ott === 'netflixAnimeFilm') &&
                                      'NETFLIX'}
                                    {(data.ott === 'tvingOriginal' || data.ott === 'tvingOnly') && 'TVING'}
                                    {(data.ott === 'watchaOriginal' || data.ott === 'watchaExclusive') && 'WATCHA'}
                                    {(data.ott === 'wavveOriginal' || data.ott === 'wavveOnly') && 'Wavve'}
                                    {data.ott === 'paramount' && 'TVING'}
                                    에서 시청하기
                                  </Anchor>
                                )}
                                {data.ott === null && data.ottAddr !== null && (
                                  <Anchor href={data.ottAddr}>단편영화 &apos;{data.title}&apos; 보러가기</Anchor>
                                )}
                              </dt>
                              <dd>
                                <strong>
                                  <span className={styles.title}>
                                    {data.titleKorean ? data.titleKorean : data.title}
                                  </span>
                                  {data.lang === 'chineseBeonche' && <span lang="zh-Hant">{data.title} </span>}
                                  {data.lang === 'chineseGanche' && <span lang="zh-Hans">{data.title} </span>}
                                  {data.lang === 'english' && <span lang="en">{data.title}</span>}
                                  {data.lang === 'japanese' && <span lang="ja">{data.title}</span>}
                                  {data.lang === 'thai' && <span lang="th">{data.title}</span>}
                                  {data.titleOther !== null && <span className="lang">{data.titleOther}</span>}
                                  {data.originalAuthor && data.original && data.originTitle && (
                                    <span>
                                      &apos;{data.originalAuthor}&apos;의 {OriginalName(data.original)} &apos;
                                      {data.originTitle}&apos; 원작
                                    </span>
                                  )}
                                  {data.original !== null &&
                                    data.originTitle === null &&
                                    data.originalAuthor !== null && (
                                      <span className={styles.origin}>동명의 {OriginalName(data.original)} 원작</span>
                                    )}
                                  {data.release !== '?' && <time>{data.release}</time>}
                                </strong>
                                {data.etc !== null && <em className="lang">{data.etc}</em>}
                              </dd>
                            </dl>
                            <dl className={styles.info}>
                              {data.original !== null && data.originTitle === null && data.originalAuthor !== null && (
                                <div>
                                  <dt>원작자</dt>
                                  <dd>{data.originalAuthor}</dd>
                                </div>
                              )}
                              {data.country !== '?' && (
                                <div>
                                  <dt>제작국가</dt>
                                  <dd>{data.country}</dd>
                                </div>
                              )}
                              {data.genre !== '?' && (
                                <div>
                                  <dt>장르</dt>
                                  <dd>{data.genre}</dd>
                                </div>
                              )}
                              {data.publisher !== '?' && (
                                <div>
                                  <dt>
                                    {data.category === 'game' || data.category === 'game_fan'
                                      ? '유통/배급'
                                      : '퍼블리싱'}
                                  </dt>
                                  <dd>{data.publisher}</dd>
                                </div>
                              )}
                              {data.creator !== '?' && (
                                <div>
                                  <dt>
                                    {data.category === 'game' || data.category === 'game_fan' ? '개발' : '주요 제작자'}
                                  </dt>
                                  <dd>{data.creator}</dd>
                                </div>
                              )}
                              {data.cast !== null && (
                                <div>
                                  {data.category !== 'anime' &&
                                  data.category !== 'ott_anime' &&
                                  data.category !== 'ott_anime_film' &&
                                  data.category !== 'game' ? (
                                    <dt>주요 출연자</dt>
                                  ) : (
                                    <dt>주요 성우</dt>
                                  )}
                                  <dd>{data.cast}</dd>
                                </div>
                              )}
                            </dl>
                          </div>
                          <div
                            className={`${styles.poster} ${data.category === 'game' || data.category === 'game_fan' ? styles['posters-game'] : styles['posters-other']}`}
                          >
                            <Image
                              src={data.posterDefault}
                              alt=""
                              width={data.category === 'game' || data.category === 'game_fan' ? 460 : 390}
                              height={data.category === 'game' || data.category === 'game_fan' ? 215 : 560}
                              unoptimized
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </PerfectScrollbar>
                </div>
              ) : (
                <div className={styles['title-item']}>
                  {jejeupData.amusementData.map((data, index) => (
                    <div className={styles['title-info']} key={index}>
                      <dl className={styles.summary}>
                        <dt>
                          {data.category !== 'ott_drama' &&
                          data.category !== 'ott_film' &&
                          data.category !== 'ott_anime' &&
                          data.category !== 'ott_anime_film' ? (
                            <em className={styles[data.broadcast]}>
                              {data.broadcast === 'ENA' && (
                                <>
                                  <Ena /> <span>ENA</span>
                                </>
                              )}
                              {data.broadcast === 'JTBC' && (
                                <>
                                  <Jtbc /> <span>JTBC</span>
                                </>
                              )}
                              {data.broadcast === 'KBS2' && (
                                <>
                                  <Kbs2tv /> <span>KBS 2TV</span>
                                </>
                              )}
                              {data.broadcast === 'MBC' && (
                                <>
                                  <Mbc /> <span>MBC</span>
                                </>
                              )}
                              {data.broadcast === 'OCN' && (
                                <>
                                  <Ocn /> <span>OCN</span>
                                </>
                              )}
                              {data.broadcast === 'SBS' && (
                                <>
                                  <Sbs /> <span>SBS</span>
                                </>
                              )}
                              {data.broadcast === 'tvN' && (
                                <>
                                  <Tvn /> <span>tvN</span>
                                </>
                              )}
                              {(data.animeBroadcast1 !== null || data.animeBroadcast2 !== null) && (
                                <>
                                  {data.animeBroadcast1 === 'tokyomx' && (
                                    <>
                                      <Tokyomx /> <span>도쿄 MX</span>
                                    </>
                                  )}
                                  {data.animeBroadcast1 === 'tvtokyo' && (
                                    <>
                                      <Tvtokyo /> <span>테레비 도쿄</span>
                                    </>
                                  )}
                                  {data.animeBroadcast1 === 'fujitv' && (
                                    <>
                                      <Fujitv /> <span>후지 테레비</span>
                                    </>
                                  )}
                                  {data.animeBroadcast1 === 'mbs' && (
                                    <>
                                      <Mbs /> <span>MBS</span>
                                    </>
                                  )}
                                  {data.animeBroadcast1 === 'tbs' && (
                                    <>
                                      <Tbs /> <span>TBS</span>
                                    </>
                                  )}
                                  {data.animeBroadcast1 === 'atx' && (
                                    <>
                                      <Atx /> <span>AT-X</span>
                                    </>
                                  )}
                                  {data.animeBroadcast1 === 'nippontv' && (
                                    <>
                                      <Nippontv /> <span>닛폰 테레비</span>
                                    </>
                                  )}
                                  {data.animeBroadcast1 === 'wowow' && (
                                    <>
                                      <Wowow /> <span>WOWOW</span>
                                    </>
                                  )}
                                  {data.animeBroadcast2 === 'aniplus' && (
                                    <>
                                      {data.animeBroadcast1 !== null && '|'}
                                      <Aniplus />
                                      <span>애니플러스</span> 방영{' '}
                                    </>
                                  )}
                                  {data.animeBroadcast2 === 'daewon' && (
                                    <>
                                      {data.animeBroadcast1 !== null && '|'}
                                      <Daewon /> <span>애니원</span> 방영{' '}
                                    </>
                                  )}
                                  {data.animeBroadcast2 === 'anibox' && (
                                    <>
                                      {data.animeBroadcast1 !== null && '|'}
                                      <Anibox /> <span>애니박스</span> 방영{' '}
                                    </>
                                  )}
                                  {data.animeBroadcast2 === 'tooniverse' && (
                                    <>
                                      {data.animeBroadcast1 !== null && '|'}
                                      <Tooniverse /> <span>투니버스</span> 방영{' '}
                                    </>
                                  )}
                                  {data.animeBroadcast2 === 'animax' && (
                                    <>
                                      {data.animeBroadcast1 !== null && '|'}
                                      <Animax /> <span>애니맥스</span> 방영{' '}
                                    </>
                                  )}
                                </>
                              )}
                              {(data.category === 'game' ||
                                data.category === 'game_fan' ||
                                data.category === 'game_fan') &&
                                data.isMobile &&
                                '모바일 '}
                              {CategoryName(data.category)}
                              {data.category === 'game_fan' && '팬 게임'}
                              {data.ott === null && data.ottAddr !== null && ' | 단편영화'}
                            </em>
                          ) : (
                            <>
                              {data.broadcast !== null && (
                                <em className={styles[data.broadcast]}>
                                  {data.broadcast === 'ENA' && (
                                    <>
                                      <Ena /> <span>ENA</span>
                                    </>
                                  )}
                                  {data.broadcast === 'JTBC' && (
                                    <>
                                      <Jtbc /> <span>JTBC</span>
                                    </>
                                  )}
                                  {data.broadcast === 'KBS2' && (
                                    <>
                                      <Kbs2tv /> <span>KBS 2TV</span>
                                    </>
                                  )}
                                  {data.broadcast === 'MBC' && (
                                    <>
                                      <Mbc /> <span>MBC</span>
                                    </>
                                  )}
                                  {data.broadcast === 'OCN' && (
                                    <>
                                      <Ocn /> <span>OCN</span>
                                    </>
                                  )}
                                  {data.broadcast === 'SBS' && (
                                    <>
                                      <Sbs /> <span>SBS</span>
                                    </>
                                  )}
                                  {data.broadcast === 'tvN' && (
                                    <>
                                      <Tvn /> <span>tvN</span>
                                    </>
                                  )}
                                  드라마
                                </em>
                              )}
                            </>
                          )}
                          {data.category === 'anime' && <em>{AnimeName(data.anime)}</em>}
                          {data.ott === 'amazonOriginal' && (
                            <cite>
                              <AmazonOriginal /> AMAZON ORIGINAL
                            </cite>
                          )}
                          {data.ott === 'appleOriginal' && (
                            <cite>
                              <AppleOriginal /> An Apple Original
                            </cite>
                          )}
                          {data.ott === 'appleFilm' && (
                            <cite>
                              <AppleOriginal /> An Apple Original Film
                            </cite>
                          )}
                          {data.ott === 'disneyOriginal' && (
                            <cite>
                              <DisneyOriginal /> Disney+ Original
                            </cite>
                          )}
                          {data.ott === 'netflixOriginal' && (
                            <cite>
                              <NetflixOriginal /> NETFLIX Original
                            </cite>
                          )}
                          {data.ott === 'netflixFilm' && (
                            <cite>
                              <NetflixOriginal /> NETFLIX Original Film
                            </cite>
                          )}
                          {data.ott === 'netflixAnime' && (
                            <cite>
                              <NetflixOriginal /> NETFLIX Original Animation
                            </cite>
                          )}
                          {data.ott === 'netflixAnimeFilm' && (
                            <cite>
                              <NetflixOriginal /> NETFLIX Original Animation Film
                            </cite>
                          )}
                          {data.ott === 'tvingOriginal' && (
                            <cite>
                              <TvingOriginal /> 티빙 오리지널
                            </cite>
                          )}
                          {data.ott === 'tvingOnly' && (
                            <cite>
                              <TvingOnly /> 오직 티빙에서
                            </cite>
                          )}
                          {data.ott === 'watchaOriginal' && (
                            <cite>
                              <WatchaOriginal /> 왓챠 오리지널
                            </cite>
                          )}
                          {data.ott === 'watchaExclusive' && (
                            <cite>
                              <WatchaOnly /> 오직 왓챠에서
                            </cite>
                          )}
                          {data.ott === 'wavveOriginal' && (
                            <cite>
                              <WavveOriginal /> 웨이브 오리지널
                            </cite>
                          )}
                          {data.ott === 'wavveOnly' && (
                            <cite>
                              <WavveOnly /> 오직 웨이브에서
                            </cite>
                          )}
                          {data.ott === 'paramount' && (
                            <cite>
                              <Paramount /> Paramaount+에서 스트리밍 중
                            </cite>
                          )}
                          {(data.category === 'drama' ||
                            data.category === 'ott_drama' ||
                            data.category === 'ott_anime' ||
                            data.anime === 'tva' ||
                            data.anime === 'ova') && (
                            <>
                              {data.rating === 'all' ? (
                                <>
                                  <i className={`${styles.drama} ${styles.all} number`}>{RatingsDrama(data.rating)}</i>
                                  <span>전체 이용가</span>
                                </>
                              ) : (
                                <>
                                  {data.rating === 'd19' ? (
                                    <>
                                      <i className={`${styles.drama} ${styles.d19} number`}>
                                        {RatingsDrama(data.rating)}
                                      </i>
                                      <span>세 미만 이용불가</span>
                                    </>
                                  ) : (
                                    <>
                                      <i className={`${styles.drama} number`}>{RatingsDrama(data.rating)}</i>
                                      <span>세 이상 이용가</span>
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                          {(data.category === 'film' ||
                            data.category === 'ott_anime_film' ||
                            data.category === 'ott_film' ||
                            data.anime === 'film') && (
                            <>
                              {data.rating === 'all' && (
                                <>
                                  <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                </>
                              )}
                              {data.rating === 'b12' && (
                                <>
                                  <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                </>
                              )}
                              {data.rating === 'c15' && (
                                <>
                                  <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                </>
                              )}
                              {data.rating === 'd19' && (
                                <>
                                  <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                </>
                              )}
                            </>
                          )}
                          {(data.category === 'game' || data.category === 'game_fan') && (
                            <>
                              {data.rating === 'all' && (
                                <>
                                  <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                                </>
                              )}
                              {data.rating === 'b12' && (
                                <>
                                  <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                                </>
                              )}
                              {data.rating === 'c15' && (
                                <>
                                  <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                                </>
                              )}
                              {data.rating === 'd19' && (
                                <>
                                  <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                                </>
                              )}
                            </>
                          )}
                          {data.ratingCustom && (
                            <div className={styles.custom}>
                              <button type="button" onClick={customRatingHandler}>
                                <i />
                                <span>제제없 자체설정 심의등급 안내</span>
                              </button>
                            </div>
                          )}
                          {data.ott !== null && data.ottAddr !== null && (
                            <Anchor href={data.ottAddr}>
                              {data.ott === 'amazonOriginal' && 'Prime Video'}
                              {(data.ott === 'appleOriginal' || data.ott === 'appleFilm') && 'Apple TV+'}
                              {data.ott === 'disneyOriginal' && 'Disney+'}
                              {(data.ott === 'netflixOriginal' ||
                                data.ott === 'netflixFilm' ||
                                data.ott === 'netflixAnime' ||
                                data.ott === 'netflixAnimeFilm') &&
                                'NETFLIX'}
                              {(data.ott === 'tvingOriginal' || data.ott === 'tvingOnly') && 'TVING'}
                              {(data.ott === 'watchaOriginal' || data.ott === 'watchaExclusive') && 'WATCHA'}
                              {(data.ott === 'wavveOriginal' || data.ott === 'wavveOnly') && 'Wavve'}
                              {data.ott === 'paramount' && 'TVING'}
                              에서 시청하기
                            </Anchor>
                          )}
                          {data.ott === null && data.ottAddr !== null && (
                            <Anchor href={data.ottAddr}>
                              단편영화 &apos;{data.titleKorean ? data.titleKorean : data.title}&apos; 보러가기
                            </Anchor>
                          )}
                        </dt>
                        <dd>
                          <strong>
                            <span className={styles.title}>{data.titleKorean ? data.titleKorean : data.title}</span>
                            {data.lang === 'chineseBeonche' && <span lang="zh-Hant">{data.title} </span>}
                            {data.lang === 'chineseGanche' && <span lang="zh-Hans">{data.title} </span>}
                            {data.lang === 'english' && <span lang="en">{data.title}</span>}
                            {data.lang === 'japanese' && <span lang="ja">{data.title}</span>}
                            {data.lang === 'thai' && <span lang="th">{data.title}</span>}
                            {data.titleOther !== null && <span className="lang">{data.titleOther}</span>}
                            {data.originalAuthor && data.original && data.originTitle && (
                              <span>
                                &apos;{data.originalAuthor}&apos;의 {OriginalName(data.original)} &apos;
                                {data.originTitle}&apos; 원작
                              </span>
                            )}
                            {data.original !== null && data.originTitle === null && data.originalAuthor !== null && (
                              <span className={styles.origin}>동명의 {OriginalName(data.original)} 원작</span>
                            )}
                            {data.release !== '?' && <time>{data.release}</time>}
                          </strong>
                          {data.etc !== null && <em className="lang">{data.etc}</em>}
                        </dd>
                      </dl>
                      <dl className={styles.info}>
                        {data.original !== null && data.originTitle === null && data.originalAuthor !== null && (
                          <div>
                            <dt>원작자</dt>
                            <dd>{data.originalAuthor}</dd>
                          </div>
                        )}
                        {data.country !== '?' && (
                          <div>
                            <dt>제작국가</dt>
                            <dd>{data.country}</dd>
                          </div>
                        )}
                        {data.genre !== '?' && (
                          <div>
                            <dt>장르</dt>
                            <dd>{data.genre}</dd>
                          </div>
                        )}
                        {data.publisher !== '?' && (
                          <div>
                            <dt>
                              {data.category === 'game' || data.category === 'game_fan' ? '유통/배급' : '퍼블리싱'}
                            </dt>
                            <dd>{data.publisher}</dd>
                          </div>
                        )}
                        {data.creator !== '?' && (
                          <div>
                            <dt>{data.category === 'game' || data.category === 'game_fan' ? '개발' : '주요 제작자'}</dt>
                            <dd>{data.creator}</dd>
                          </div>
                        )}
                        {data.cast !== null && (
                          <div>
                            {data.category !== 'anime' &&
                            data.category !== 'ott_anime' &&
                            data.category !== 'ott_anime_film' &&
                            data.category !== 'game' ? (
                              <dt>주요 출연자</dt>
                            ) : (
                              <dt>주요 성우</dt>
                            )}
                            <dd>{data.cast}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  ))}
                </div>
              ))}
          </div>
          {Array.isArray(jejeupData.amusementData) && jejeupData.amusementData.length == 1 && (
            <div className={styles.posters}>
              <h2>
                {jejeupData.amusementData[0].category === 'game' || jejeupData.amusementData[0].category === 'game_fan'
                  ? '배너/썸네일'
                  : '비주얼/포스터'}
              </h2>
              <div
                className={`${styles['poster-list']} ${jejeupData.amusementData[0].category === 'game' || jejeupData.amusementData[0].category === 'game_fan' ? styles['posters-game'] : styles['posters-other']}`}
              >
                <div className={styles.poster}>
                  <Image
                    src={jejeupData.amusementData[0].posterDefault}
                    alt=""
                    width={
                      jejeupData.amusementData[0].category === 'game' ||
                      jejeupData.amusementData[0].category === 'game_fan'
                        ? 460
                        : 390
                    }
                    height={
                      jejeupData.amusementData[0].category === 'game' ||
                      jejeupData.amusementData[0].category === 'game_fan'
                        ? 215
                        : 560
                    }
                    unoptimized
                  />
                </div>
                {jejeupData.amusementData[0].posterOther && (
                  <div className={styles.poster}>
                    <Image
                      src={jejeupData.amusementData[0].posterOther}
                      alt=""
                      width={
                        jejeupData.amusementData[0].category === 'game' ||
                        jejeupData.amusementData[0].category === 'game_fan'
                          ? 460
                          : 390
                      }
                      height={
                        jejeupData.amusementData[0].category === 'game' ||
                        jejeupData.amusementData[0].category === 'game_fan'
                          ? 215
                          : 560
                      }
                      unoptimized
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const jejeupId = context.params?.jejeupId;
  let jejeupData = null;

  if (jejeupId && typeof jejeupId === 'string') {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jejeups?id=${jejeupId.substring(14)}`);
    const jejeupResponse = (await response.json()) as { data: JejeupPermalinkData };
    jejeupData = jejeupResponse;
  }

  if (!jejeupData) {
    return {
      props: {
        jejeupData: null,
      },
    };
  }

  return {
    props: {
      jejeupId,
      jejeupData,
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
