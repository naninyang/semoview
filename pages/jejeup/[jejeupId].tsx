import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';
import { JejeupPermalinkData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import YouTubeController from '@/components/YouTubeController';
import Anchor from '@/components/Anchor';
import { vectors } from '@/components/vectors';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { FormatDate } from '@/components/FormatDate';
import { OriginalName } from '@/components/OriginalName';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Jejeup.module.sass';

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

const ClipboardIcon = styled.i({
  background: `url(${vectors.share}) no-repeat 50% 50%/contain`,
});

export default function JejeupDetail({ jejeupData }: { jejeupData: JejeupPermalinkData | null }) {
  const router = useRouter();
  let savedScrollPosition;

  const handleBackClick = () => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition_' + router.asPath);
    if (savedScrollPosition) {
      router.back();
    }
  };

  const [timeoutReached, setTimeoutReached] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  function FormatDuration(duration: string) {
    const match = duration.match(/PT(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    const minutes = match[1] ? match[1].slice(0, -1) : '0';
    const seconds = match[2] ? match[2].slice(0, -1) : '0';
    return `${minutes}분 ${seconds.padStart(2, '0')}초`;
  }

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

  return (
    <main className={styles.jejeup}>
      <Seo
        pageTitles={`${jejeupData.attributes.subject} - ${originTitle}`}
        pageTitle={`${jejeupData.attributes.subject}`}
        pageDescription={`${jejeupData.amusementData.title} (${jejeupData.amusementData.release})`}
        pageImg={jejeupData.jejeupMetaData.ogImage ? jejeupData.jejeupMetaData.ogImage : '/missing.webp'}
        pageOgType={'video.other'}
        pageImgWidth={1920}
        pageImgHeight={1080}
      />
      <div className="top-link">
        {savedScrollPosition ? (
          <button onClick={handleBackClick}>
            <BackButton />
            <span>뒤로가기</span>
          </button>
        ) : (
          <Anchor href="/">
            <BackButton />
            <span>뒤로가기</span>
          </Anchor>
        )}
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
                  src={`${jejeupData.jejeupMetaData.ownerAvatar === null ? jejeupData.attributes.ownerAvatar : jejeupData.jejeupMetaData.ownerAvatar}`}
                  width="36"
                  height="36"
                  alt=""
                  unoptimized
                />
                <div className={styles.user}>
                  <cite>{jejeupData.jejeupMetaData.ownerName}</cite>
                  <time dateTime={jejeupData.jejeupMetaData.datePublished}>
                    {FormatDate(`${jejeupData.jejeupMetaData.datePublished}`)}
                  </time>
                </div>
              </div>
              {jejeupData.jejeupMetaData.ogDescription ? (
                <p>
                  <em>{FormatDuration(jejeupData.jejeupMetaData.duration)}</em>{' '}
                  {jejeupData.jejeupMetaData.ogDescription}
                </p>
              ) : (
                <p>
                  <strong>유튜버가 더보기 정보를 등록하지 않았습니다.</strong>
                </p>
              )}
              {jejeupData.attributes.worst && (
                <div className={styles.worst}>
                  <button type="button" className="number">
                    Worst
                  </button>
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
          <dl className={styles.summary}>
            <dt>
              {jejeupData.amusementData.ott === 'wavveOnly' && (
                <cite>
                  <WavveOriginal /> 웨이브 독점 스트리밍
                </cite>
              )}
              {jejeupData.amusementData.category !== 'ott' && jejeupData.amusementData.category !== 'ottFilm' && (
                <em>{CategoryName(jejeupData.amusementData.category)}</em>
              )}
              {jejeupData.amusementData.category === 'animation' && (
                <em>{AnimeName(jejeupData.amusementData.anime)}</em>
              )}
              {jejeupData.amusementData.ott === 'amazonOriginal' && (
                <cite>
                  <AmazonOriginal /> 아마존 오리지널
                </cite>
              )}
              {jejeupData.amusementData.ott === 'appleOriginal' && (
                <cite>
                  <AppleOriginal /> 애플 티비+ 오리지널
                </cite>
              )}
              {jejeupData.amusementData.ott === 'appleFilm' && (
                <cite>
                  <AppleOriginal /> 애플 티비+ 오리지널 영화
                </cite>
              )}
              {jejeupData.amusementData.ott === 'disneyOriginal' && (
                <cite>
                  <DisneyOriginal /> 디즈니+ 오리지널
                </cite>
              )}
              {jejeupData.amusementData.ott === 'netflixOriginal' && (
                <cite>
                  <NetflixOriginal /> 넷플릭스 오리지널
                </cite>
              )}
              {jejeupData.amusementData.ott === 'netflixFilm' && (
                <cite>
                  <NetflixOriginal /> 넷플릭스 오리지널 영화
                </cite>
              )}
              {jejeupData.amusementData.ott === 'netflixAnime' && (
                <cite>
                  <NetflixOriginal /> 넷플릭스 오리지널 애니메이션
                </cite>
              )}
              {jejeupData.amusementData.ott === 'netflixAnimeFilm' && (
                <cite>
                  <NetflixOriginal /> 넷플릭스 오리지널 애니메이션 영화
                </cite>
              )}
              {jejeupData.amusementData.ott === 'tvingOriginal' && (
                <cite>
                  <TvingOriginal /> 티빙 오리지널
                </cite>
              )}
              {jejeupData.amusementData.ott === 'watchaOriginal' && (
                <cite>
                  <WatchaOriginal /> 왓챠 오리지널
                </cite>
              )}
              {jejeupData.amusementData.ott === 'wavveOriginal' && (
                <cite>
                  <WavveOriginal /> 웨이브 오리지널
                </cite>
              )}
              {(jejeupData.amusementData.category === 'drama' ||
                jejeupData.amusementData.category === 'ott' ||
                jejeupData.amusementData.anime === 'tva' ||
                jejeupData.amusementData.anime === 'ova') &&
                jejeupData.amusementData.rating !== 'd19' && (
                  <>
                    {jejeupData.amusementData.rating === 'all' ? (
                      <i className={`${styles.drama} ${styles.all} number`}>
                        {RatingsDrama(jejeupData.amusementData.rating)}
                      </i>
                    ) : (
                      <i className={`${styles.drama} number`}>{RatingsDrama(jejeupData.amusementData.rating)}</i>
                    )}
                  </>
                )}
              {(jejeupData.amusementData.category === 'drama' ||
                jejeupData.amusementData.category === 'ott' ||
                jejeupData.amusementData.anime === 'tva' ||
                jejeupData.amusementData.anime === 'ova') &&
                jejeupData.amusementData.rating === 'd19' && (
                  <i className={`${styles.drama} ${styles.d19} number`}>
                    {RatingsDrama(jejeupData.amusementData.rating)}
                  </i>
                )}
              {(jejeupData.amusementData.category === 'movie' ||
                jejeupData.amusementData.category === 'ottFilm' ||
                jejeupData.amusementData.anime === 'movie') &&
                jejeupData.amusementData.rating === 'all' && (
                  <>
                    <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                  </>
                )}
              {(jejeupData.amusementData.category === 'movie' ||
                jejeupData.amusementData.category === 'ottFilm' ||
                jejeupData.amusementData.anime === 'movie') &&
                jejeupData.amusementData.rating === 'b12' && (
                  <>
                    <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                  </>
                )}
              {(jejeupData.amusementData.category === 'movie' ||
                jejeupData.amusementData.category === 'ottFilm' ||
                jejeupData.amusementData.anime === 'movie') &&
                jejeupData.amusementData.rating === 'c15' && (
                  <>
                    <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                  </>
                )}
              {(jejeupData.amusementData.category === 'movie' ||
                jejeupData.amusementData.category === 'ottFilm' ||
                jejeupData.amusementData.anime === 'movie') &&
                jejeupData.amusementData.rating === 'd19' && (
                  <>
                    <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                  </>
                )}
              {jejeupData.amusementData.category === 'game' && jejeupData.amusementData.rating === 'all' && (
                <>
                  <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                </>
              )}
              {jejeupData.amusementData.category === 'game' && jejeupData.amusementData.rating === 'b12' && (
                <>
                  <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                </>
              )}
              {jejeupData.amusementData.category === 'game' && jejeupData.amusementData.rating === 'c15' && (
                <>
                  <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                </>
              )}
              {jejeupData.amusementData.category === 'game' && jejeupData.amusementData.rating === 'd19' && (
                <>
                  <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                </>
              )}
            </dt>
            <dd>
              <strong>
                {jejeupData.amusementData.lang === 'chineseBeonche' && (
                  <span lang="zh-Hant">{jejeupData.amusementData.title} </span>
                )}
                {jejeupData.amusementData.lang === 'chineseGanche' && (
                  <span lang="zh-Hans">{jejeupData.amusementData.title} </span>
                )}
                {jejeupData.amusementData.lang === 'english' && <span lang="en">{jejeupData.amusementData.title}</span>}
                {jejeupData.amusementData.lang === 'japanese' && (
                  <span lang="ja">{jejeupData.amusementData.title}</span>
                )}
                {jejeupData.amusementData.lang === 'thai' && <span lang="th">{jejeupData.amusementData.title}</span>}
                {jejeupData.amusementData.lang === null && <span lang="ko">{jejeupData.amusementData.title}</span>}{' '}
                {jejeupData.amusementData.originalAuthor &&
                  `('${jejeupData.amusementData.originalAuthor}'의 ${OriginalName(jejeupData.amusementData.original)} '${jejeupData.amusementData.originTitle}' 원작)`}
                {jejeupData.amusementData.titleOther && `(${jejeupData.amusementData.titleOther})`}{' '}
                {jejeupData.amusementData.originalAuthor === null && jejeupData.amusementData.original && (
                  <span className={styles.origin}>동명의 {OriginalName(jejeupData.amusementData.original)} 원작</span>
                )}
                <time>{jejeupData.amusementData.release}</time>
              </strong>
              <em>{jejeupData.amusementData.etc && jejeupData.amusementData.etc}</em>
            </dd>
          </dl>
          <div className={styles.function}>
            <button onClick={copyToClipboard}>
              <ClipboardIcon /> <span>URL 복사</span>
            </button>
          </div>
          <dl className={styles.info}>
            <div>
              <dt>제작국가</dt>
              <dd>{jejeupData.amusementData.country}</dd>
            </div>
            <div>
              <dt>장르</dt>
              <dd>{jejeupData.amusementData.genre}</dd>
            </div>
            <div>
              <dt>퍼블리셔</dt>
              <dd>{jejeupData.amusementData.publisher}</dd>
            </div>
            <div>
              <dt>주요 제작자</dt>
              <dd>{jejeupData.amusementData.creator}</dd>
            </div>
            {jejeupData.amusementData.category !== 'game' && (
              <div>
                <dt>주요 출연자</dt>
                <dd>{jejeupData.amusementData.cast}</dd>
              </div>
            )}
          </dl>
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
          {(jejeupData.amusementData.posterDefault || jejeupData.amusementData.posterOther) && (
            <div className={styles.posters}>
              <h2>{jejeupData.amusementData.category === 'game' ? '게임 공식 배너' : '포스터'}</h2>
              <div
                className={`${styles['poster-list']} ${jejeupData.amusementData.category === 'game' ? styles['posters-game'] : styles['posters-other']}`}
              >
                {jejeupData.amusementData.posterDefault && (
                  <div className={styles.poster}>
                    <Image
                      src={jejeupData.amusementData.posterDefault}
                      alt=""
                      width={jejeupData.amusementData.category === 'game' ? 460 : 390}
                      height={jejeupData.amusementData.category === 'game' ? 215 : 560}
                      unoptimized
                    />
                  </div>
                )}
                <div className={styles.poster}>
                  {jejeupData.amusementData.posterOther && (
                    <Image
                      src={jejeupData.amusementData.posterOther}
                      alt=""
                      width={jejeupData.amusementData.category === 'game' ? 460 : 390}
                      height={jejeupData.amusementData.category === 'game' ? 215 : 560}
                      unoptimized
                    />
                  )}
                </div>
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
