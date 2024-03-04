import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementPermalinkData } from 'types';
import Seo from '@/components/Seo';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { OriginalName } from '@/components/OriginalName';
import { FormatDate } from '@/components/FormatDate';
import { vectors } from '@/components/vectors';
import { Pagination } from '@/components/Pagination';
import Anchor from '@/components/Anchor';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Amusement.module.sass';

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
  background: `url(${vectors.ott.tving}) no-repeat 50% 50%/contain`,
});

const WatchaOriginal = styled.i({
  width: rem(55),
  background: `url(${vectors.ott.watcha}) no-repeat 50% 50%/contain`,
});

const WavveOriginal = styled.i({
  width: rem(72),
  background: `url(${vectors.ott.wavve}) no-repeat 50% 50%/contain`,
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

export default function Amusement({
  amusementData,
  musicData,
}: {
  amusementData: AmusementPermalinkData | null;
  musicData: any;
}) {
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
  return (
    <main className={styles.amusement}>
      <div className="top-link">
        <Anchor href="/">
          <BackButton />
          <span>뒤로가기</span>
        </Anchor>
      </div>
      <div className={styles.cover}>
        <div className={styles.background}>
          <Image
            src={amusementData.attributes.posterDefault}
            alt=""
            width={amusementData.attributes.category === 'game' ? 460 : 390}
            height={amusementData.attributes.category === 'game' ? 215 : 560}
            unoptimized
          />
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
                    <span lang="zh-Hant">{amusementData.attributes.title} </span>
                  )}
                  {amusementData.attributes.lang === 'chineseGanche' && (
                    <span lang="zh-Hans">{amusementData.attributes.title} </span>
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
            {amusementData.attributes.originalAuthor === null && amusementData.attributes.original && (
              <div>
                <dt>원작</dt>
                <dd>동명의 {OriginalName(amusementData.attributes.original)} 원작</dd>
              </div>
            )}
          </dl>
          <dl className={styles.summary}>
            {amusementData.attributes.ott !== null && (
              <div className={styles.platform}>
                <dt>플랫폼</dt>
                <dd>
                  {amusementData.attributes.ott === 'wavveOnly' && (
                    <>
                      <WavveOriginal /> 웨이브 독점 스트리밍
                    </>
                  )}
                  {amusementData.attributes.ott === 'amazonOriginal' && (
                    <>
                      <AmazonOriginal /> 아마존 오리지널
                    </>
                  )}
                  {amusementData.attributes.ott === 'appleOriginal' && (
                    <>
                      <AppleOriginal /> 애플 티비+ 오리지널
                    </>
                  )}
                  {amusementData.attributes.ott === 'appleFilm' && (
                    <>
                      <AppleOriginal /> 애플 티비+ 오리지널 영화
                    </>
                  )}
                  {amusementData.attributes.ott === 'disneyOriginal' && (
                    <>
                      <DisneyOriginal /> 디즈니+ 오리지널
                    </>
                  )}
                  {amusementData.attributes.ott === 'netflixOriginal' && (
                    <>
                      <NetflixOriginal /> 넷플릭스 오리지널
                    </>
                  )}
                  {amusementData.attributes.ott === 'netflixFilm' && (
                    <>
                      <NetflixOriginal /> 넷플릭스 오리지널 영화
                    </>
                  )}
                  {amusementData.attributes.ott === 'netflixAnime' && (
                    <>
                      <NetflixOriginal /> 넷플릭스 오리지널 애니메이션
                    </>
                  )}
                  {amusementData.attributes.ott === 'netflixAnimeFilm' && (
                    <>
                      <NetflixOriginal /> 넷플릭스 오리지널 애니메이션 영화
                    </>
                  )}
                  {amusementData.attributes.ott === 'tvingOriginal' && (
                    <>
                      <TvingOriginal /> 티빙 오리지널
                    </>
                  )}
                  {amusementData.attributes.ott === 'watchaOriginal' && (
                    <>
                      <WatchaOriginal /> 왓챠 오리지널
                    </>
                  )}
                  {amusementData.attributes.ott === 'wavveOriginal' && (
                    <>
                      <WavveOriginal /> 웨이브 오리지널
                    </>
                  )}
                </dd>
              </div>
            )}
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
                <dd>{amusementData.attributes.release === '?' ? '알 수 없음' : amusementData.attributes.release}년</dd>
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
          </dl>
        </div>
        <div
          className={`${styles.poster} ${amusementData.attributes.category === 'game' ? styles['poster-game'] : ''}`}
        >
          <Image
            src={amusementData.attributes.posterDefault}
            alt=""
            width={amusementData.attributes.category === 'game' ? 460 : 390}
            height={amusementData.attributes.category === 'game' ? 215 : 560}
            unoptimized
          />
        </div>
      </div>
      <div className={styles.list}></div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const amusementId = context.params?.amusementId;
  let amusementData = null;
  // let musicData = null;

  if (amusementId && typeof amusementId === 'string') {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/amusement?amusementId=${amusementId.substring(14)}`,
    );
    const amusementResponse = (await response.json()) as { data: AmusementPermalinkData };
    amusementData = amusementResponse.data;
    // const musicResponse = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api/musics?musicId=${newsicData.attributes.music}`,
    // );
    // const musicResponseData = (await musicResponse.json()) as { data: MusicParalinkData };
    // musicData = musicResponseData.data;
  }

  console.log('amusementData: ', amusementData);

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
      // musicData,
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
