import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData } from 'types';
import Seo from '@/components/Seo';
import { vectors } from '@/components/vectors';
import { RatingsDrama } from '@/components/RatingsDrama';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Categories.module.sass';

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

function Categories() {
  const router = useRouter();
  const timestamp = Date.now();
  const [dramaData, setDaramaData] = useState<AmusementData | null>(null);
  const [movieData, setMovieData] = useState<AmusementData | null>(null);
  const [gameData, setGameData] = useState<AmusementData | null>(null);
  const [animationData, setAnimationData] = useState<AmusementData | null>(null);
  const [ottData, setOttData] = useState<AmusementData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const currentPage = Number(router.query.page) || 1;

  useEffect(() => {
    localStorage.removeItem('currentPage');
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dramaResponse = await fetch(`/api/category?page=1&pageSize=7&categoryName=drama`);
      if (!dramaResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const dramaResponseData = await dramaResponse.json();

      const movieResponse = await fetch(`/api/category?page=1&pageSize=7&categoryName=movie`);
      if (!movieResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const movieResponseData = await movieResponse.json();

      const gameResponse = await fetch(`/api/category?page=1&pageSize=7&categoryName=game`);
      if (!gameResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const gameResponseData = await gameResponse.json();

      const animationResponse = await fetch(`/api/category?page=1&pageSize=7&categoryName=animation`);
      if (!animationResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const animationResponseData = await animationResponse.json();

      const ottResponse = await fetch(`/api/category?page=1&pageSize=7&categoryName=ott`);
      if (!ottResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const ottResponseData = await ottResponse.json();

      setDaramaData(dramaResponseData);
      setMovieData(movieResponseData);
      setGameData(gameResponseData);
      setAnimationData(animationResponseData);
      setOttData(ottResponseData);
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

  const data = dramaData && movieData && gameData && animationData && ottData;

  return (
    <main className={styles.categories}>
      <Seo
        pageTitle="제목에 제목이 없어서 짜증나서 만든 사이트"
        pageDescription="클릭하지 않아도 제목과 정보를 알 수 있게 도와드려요"
        pageImg={`https://jejeup.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <h1>
        <span>
          <i className="preview" />
          카테고리별 보고싶다? 골라보세요 💁‍♀️
        </span>
      </h1>
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
        <div className={styles.content}>
          {dramaData && (
            <>
              <div className={styles.headline}>
                <h2>드라마 리뷰</h2>
                <Link href="/">더보기</Link>
              </div>
              <section>
                {Array.isArray(dramaData) &&
                  dramaData.map((amusement: AmusementData, index) => (
                    <Link href="/" key={index}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              {amusement.rating !== 'd19' && (
                                <>
                                  {amusement.rating === 'all' ? (
                                    <i className={`${styles.drama} ${styles.all} number`}>
                                      {RatingsDrama(amusement.rating)}
                                    </i>
                                  ) : (
                                    <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                                  )}
                                </>
                              )}
                              {amusement.rating === 'd19' && (
                                <i className={`${styles.drama} ${styles.d19} number`}>
                                  {RatingsDrama(amusement.rating)}
                                </i>
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>
                        {amusement.titleKorean != null ? (
                          amusement.titleKorean
                        ) : (
                          <>
                            {amusement.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusement.title} </span>}
                            {amusement.lang === 'chineseGanche' && <span lang="zh-Hans">{amusement.title} </span>}
                            {amusement.lang === 'english' && <span lang="en">{amusement.title}</span>}
                            {amusement.lang === 'japanese' && <span lang="ja">{amusement.title}</span>}
                            {amusement.lang === 'thai' && <span lang="th">{amusement.title}</span>}
                            {amusement.lang === null && <span lang="ko">{amusement.title}</span>}
                          </>
                        )}
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {movieData && (
            <>
              <div className={styles.headline}>
                <h2>영화 리뷰</h2>
                <Link href="/">더보기</Link>
              </div>
              <section>
                {Array.isArray(movieData) &&
                  movieData.map((amusement: AmusementData, index) => (
                    <Link href="/" key={index}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              {(amusement.category === 'movie' ||
                                amusement.category === 'ottFilm' ||
                                amusement.anime === 'movie') &&
                                amusement.rating === 'all' && (
                                  <>
                                    <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'movie' ||
                                amusement.category === 'ottFilm' ||
                                amusement.anime === 'movie') &&
                                amusement.rating === 'b12' && (
                                  <>
                                    <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'movie' ||
                                amusement.category === 'ottFilm' ||
                                amusement.anime === 'movie') &&
                                amusement.rating === 'c15' && (
                                  <>
                                    <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'movie' ||
                                amusement.category === 'ottFilm' ||
                                amusement.anime === 'movie') &&
                                amusement.rating === 'd19' && (
                                  <>
                                    <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                  </>
                                )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>
                        {amusement.titleKorean != null ? (
                          amusement.titleKorean
                        ) : (
                          <>
                            {amusement.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusement.title} </span>}
                            {amusement.lang === 'chineseGanche' && <span lang="zh-Hans">{amusement.title} </span>}
                            {amusement.lang === 'english' && <span lang="en">{amusement.title}</span>}
                            {amusement.lang === 'japanese' && <span lang="ja">{amusement.title}</span>}
                            {amusement.lang === 'thai' && <span lang="th">{amusement.title}</span>}
                            {amusement.lang === null && <span lang="ko">{amusement.title}</span>}
                          </>
                        )}
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {animationData && (
            <>
              <div className={styles.headline}>
                <h2>애니메이션 리뷰</h2>
                <Link href="/">더보기</Link>
              </div>
              <section>
                {Array.isArray(animationData) &&
                  animationData.map((amusement: AmusementData, index) => (
                    <Link href="/" key={index}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              {(amusement.category === 'drama' ||
                                amusement.category === 'ott' ||
                                amusement.anime === 'tva' ||
                                amusement.anime === 'ova') &&
                                amusement.rating !== 'd19' && (
                                  <>
                                    {amusement.rating === 'all' ? (
                                      <i className={`${styles.drama} ${styles.all} number`}>
                                        {RatingsDrama(amusement.rating)}
                                      </i>
                                    ) : (
                                      <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                                    )}
                                  </>
                                )}
                              {(amusement.category === 'drama' ||
                                amusement.category === 'ott' ||
                                amusement.anime === 'tva' ||
                                amusement.anime === 'ova') &&
                                amusement.rating === 'd19' && (
                                  <i className={`${styles.drama} ${styles.d19} number`}>
                                    {RatingsDrama(amusement.rating)}
                                  </i>
                                )}
                              {(amusement.category === 'movie' ||
                                amusement.category === 'ottFilm' ||
                                amusement.anime === 'movie') &&
                                amusement.rating === 'all' && (
                                  <>
                                    <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'movie' ||
                                amusement.category === 'ottFilm' ||
                                amusement.anime === 'movie') &&
                                amusement.rating === 'b12' && (
                                  <>
                                    <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'movie' ||
                                amusement.category === 'ottFilm' ||
                                amusement.anime === 'movie') &&
                                amusement.rating === 'c15' && (
                                  <>
                                    <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'movie' ||
                                amusement.category === 'ottFilm' ||
                                amusement.anime === 'movie') &&
                                amusement.rating === 'd19' && (
                                  <>
                                    <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                  </>
                                )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>
                        {amusement.titleKorean != null ? (
                          amusement.titleKorean
                        ) : (
                          <>
                            {amusement.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusement.title} </span>}
                            {amusement.lang === 'chineseGanche' && <span lang="zh-Hans">{amusement.title} </span>}
                            {amusement.lang === 'english' && <span lang="en">{amusement.title}</span>}
                            {amusement.lang === 'japanese' && <span lang="ja">{amusement.title}</span>}
                            {amusement.lang === 'thai' && <span lang="th">{amusement.title}</span>}
                            {amusement.lang === null && <span lang="ko">{amusement.title}</span>}
                          </>
                        )}
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {ottData && (
            <>
              <div className={styles.headline}>
                <h2>OTT 오리지널 리뷰</h2>
                <Link href="/">더보기</Link>
              </div>
              <section>
                {Array.isArray(ottData) &&
                  ottData.map((amusement: AmusementData, index) => (
                    <Link href="/" key={index}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                        <dl>
                          <div className={styles.platform}>
                            <dt>플랫폼</dt>
                            <dd>
                              {amusement.ott === 'amazonOriginal' && (
                                <>
                                  <AmazonOriginal /> <span>아마존 오리지널</span>
                                </>
                              )}
                              {(amusement.ott === 'appleOriginal' || amusement.ott === 'appleFilm') && (
                                <>
                                  <AppleOriginal /> <span>애플TV 플러스 오리지널</span>
                                </>
                              )}
                              {amusement.ott === 'disneyOriginal' && (
                                <>
                                  <DisneyOriginal /> <span>디즈니 플러스 오리지널</span>
                                </>
                              )}
                              {(amusement.ott === 'netflixOriginal' ||
                                amusement.ott === 'netflixFilm' ||
                                amusement.ott === 'netflixAnime' ||
                                amusement.ott === 'netflixAnimeFilm') && (
                                <>
                                  <NetflixOriginal /> <span>넷플릭스 오리지널</span>
                                </>
                              )}
                              {amusement.ott === 'tvingOriginal' && (
                                <>
                                  <TvingOriginal /> <span>티빙 오리지널</span>
                                </>
                              )}
                              {amusement.ott === 'watchaOriginal' && (
                                <>
                                  <WatchaOriginal /> <span>왓챠 오리지널</span>
                                </>
                              )}
                              {amusement.ott === 'wavveOriginal' && (
                                <>
                                  <WavveOriginal /> <span>웨이브 오리지널</span>
                                </>
                              )}
                              {amusement.ott === 'wavveOnly' && (
                                <>
                                  <WavveOriginal /> <span>오직 웨이브에서</span>
                                </>
                              )}
                            </dd>
                          </div>
                          <div>
                            <dt>시청등급</dt>
                            <dd>
                              {(amusement.category === 'drama' ||
                                amusement.category === 'ott' ||
                                amusement.anime === 'tva' ||
                                amusement.anime === 'ova') &&
                                amusement.rating !== 'd19' && (
                                  <>
                                    {amusement.rating === 'all' ? (
                                      <i className={`${styles.drama} ${styles.all} number`}>
                                        {RatingsDrama(amusement.rating)}
                                      </i>
                                    ) : (
                                      <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                                    )}
                                  </>
                                )}
                              {(amusement.category === 'drama' ||
                                amusement.category === 'ott' ||
                                amusement.anime === 'tva' ||
                                amusement.anime === 'ova') &&
                                amusement.rating === 'd19' && (
                                  <i className={`${styles.drama} ${styles.d19} number`}>
                                    {RatingsDrama(amusement.rating)}
                                  </i>
                                )}
                              {(amusement.category === 'movie' ||
                                amusement.category === 'ottFilm' ||
                                amusement.anime === 'movie') &&
                                amusement.rating === 'all' && (
                                  <>
                                    <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'movie' ||
                                amusement.category === 'ottFilm' ||
                                amusement.anime === 'movie') &&
                                amusement.rating === 'b12' && (
                                  <>
                                    <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'movie' ||
                                amusement.category === 'ottFilm' ||
                                amusement.anime === 'movie') &&
                                amusement.rating === 'c15' && (
                                  <>
                                    <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                  </>
                                )}
                              {(amusement.category === 'movie' ||
                                amusement.category === 'ottFilm' ||
                                amusement.anime === 'movie') &&
                                amusement.rating === 'd19' && (
                                  <>
                                    <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                  </>
                                )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>
                        {amusement.titleKorean != null ? (
                          amusement.titleKorean
                        ) : (
                          <>
                            {amusement.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusement.title} </span>}
                            {amusement.lang === 'chineseGanche' && <span lang="zh-Hans">{amusement.title} </span>}
                            {amusement.lang === 'english' && <span lang="en">{amusement.title}</span>}
                            {amusement.lang === 'japanese' && <span lang="ja">{amusement.title}</span>}
                            {amusement.lang === 'thai' && <span lang="th">{amusement.title}</span>}
                            {amusement.lang === null && <span lang="ko">{amusement.title}</span>}
                          </>
                        )}
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {gameData && (
            <>
              <div className={styles.headline}>
                <h2>게임 리뷰 & 게임 실황</h2>
                <Link href="/">더보기</Link>
              </div>
              <section className={styles.game}>
                {Array.isArray(gameData) &&
                  gameData.map((amusement: AmusementData, index) => (
                    <Link href="/" key={index}>
                      <div className={styles.thumbnail}>
                        <Image src={amusement.posterDefault} width="460" height="215" alt="" unoptimized />
                        <dl>
                          <div>
                            <dt>심의등급</dt>
                            <dd>
                              {amusement.category === 'game' && amusement.rating === 'all' && (
                                <>
                                  <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                                </>
                              )}
                              {amusement.category === 'game' && amusement.rating === 'b12' && (
                                <>
                                  <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                                </>
                              )}
                              {amusement.category === 'game' && amusement.rating === 'c15' && (
                                <>
                                  <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                                </>
                              )}
                              {amusement.category === 'game' && amusement.rating === 'd19' && (
                                <>
                                  <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                                </>
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <strong>
                        <strong>
                          {amusement.titleKorean != null ? (
                            amusement.titleKorean
                          ) : (
                            <>
                              {amusement.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusement.title} </span>}
                              {amusement.lang === 'chineseGanche' && <span lang="zh-Hans">{amusement.title} </span>}
                              {amusement.lang === 'english' && <span lang="en">{amusement.title}</span>}
                              {amusement.lang === 'japanese' && <span lang="ja">{amusement.title}</span>}
                              {amusement.lang === 'thai' && <span lang="th">{amusement.title}</span>}
                              {amusement.lang === null && <span lang="ko">{amusement.title}</span>}
                            </>
                          )}
                        </strong>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
        </div>
      )}
    </main>
  );
}

export default Categories;
