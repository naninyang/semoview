import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData, Counts, JejeupAmusementData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import ChoiceGenre from '@/components/ChoiceGenre';
import { vectors } from '@/components/vectors';
import { formatNumber } from '@/components/FormatNumber';
import { AmusementItem } from '@/components/AmusementItem';
import styles from '@/styles/Categories.module.sass';

const Hanguk = styled.div({
  background: `url(${vectors.supportLang}) no-repeat 50% 50%/cover`,
});

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

function Categories({ dramaData, errorDrama }: { dramaData: any; errorDrama: string }) {
  const router = useRouter();
  const timestamp = Date.now();

  useEffect(() => {
    sessionStorage.removeItem('amusementCategory');
    sessionStorage.removeItem('amusementTag');
    sessionStorage.removeItem('amusementPlatform');
    sessionStorage.removeItem('amusementHanguk');
    sessionStorage.removeItem('amusementSubdub');
    sessionStorage.removeItem('amusementBfree');

    sessionStorage.removeItem('tag');
    sessionStorage.removeItem('platform');
    sessionStorage.removeItem('hanguk');
    sessionStorage.removeItem('subdub');
    sessionStorage.removeItem('bfree');

    sessionStorage.removeItem('ai');
    sessionStorage.removeItem('works');

    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem('category', router.asPath);
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

  const [filmData, setFilmData] = useState<JejeupAmusementData | null>(null);
  const [animeData, setAnimeData] = useState<JejeupAmusementData | null>(null);
  const [ottData, setOttData] = useState<JejeupAmusementData | null>(null);
  const [gameData, setGameData] = useState<JejeupAmusementData | null>(null);
  const [fanData, setFanData] = useState<JejeupAmusementData | null>(null);

  const [filmLoading, setFilmLoading] = useState(true);
  const [animeLoading, setAnimeLoading] = useState(true);
  const [ottLoading, setOttLoading] = useState(true);
  const [gameLoading, setGameLoading] = useState(true);
  const [fanLoading, setFanLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('/api/category?categoryName=film&page=1&pageSize=7');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        setFilmData(data);
        setFilmLoading(false);

        response = await fetch('/api/category?categoryName=anime&page=1&pageSize=7');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setAnimeData(data);
        setAnimeLoading(false);

        response = await fetch('/api/category?categoryName=ott&page=1&pageSize=7');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setOttData(data);
        setOttLoading(false);

        response = await fetch('/api/category?categoryName=game&page=1&pageSize=5');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setGameData(data);
        setGameLoading(false);

        response = await fetch('/api/category?categoryName=game_fan&page=1&pageSize=5');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setFanData(data);
        setFanLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('알 수 없는 오류');
        }
        setFilmLoading(false);
        setAnimeLoading(false);
        setOttLoading(false);
        setGameLoading(false);
        setFanLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className={styles.categories}>
      <Seo
        pageTitles={`리뷰 카테고리 선택하기 - ${originTitle}`}
        pageTitle={`리뷰 카테고리 선택하기`}
        pageDescription="OTT / 영화 / 애니메이션 / 드라마 / 게임"
        pageImg={`https://semo.dev1stud.io/og-categories.webp?ts=${timestamp}`}
      />
      <ChoiceGenre />
      <div className="headline">
        <h1 className="April16thPromise">
          <em dangerouslySetInnerHTML={{ __html: '카테고리별 보고싶다?<br/>골라보세요' }} />{' '}
          {process.env.NODE_ENV === 'development' && count && <span>({formatNumber(count.amusement)}개 작품)</span>}
        </h1>
      </div>
      {(errorDrama || error) && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      <div className={styles.content}>
        {!errorDrama && dramaData && (
          <>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?category=drama&page=1">드라마 리뷰</Anchor>
                {process.env.NODE_ENV === 'development' && ` ${dramaData.total}개`}
              </h2>
              <Anchor href="/amusement?category=drama&page=1">
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
              {Array.isArray(dramaData.data) &&
                dramaData.data.map((amusement: AmusementData, index: number) => (
                  <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                    <AmusementItem amusement={amusement} />
                    <strong>
                      <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                    </strong>
                  </Link>
                ))}
            </section>
          </>
        )}
        {!error && (
          <>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?category=film&page=1">영화 리뷰</Anchor>
                {process.env.NODE_ENV === 'development' && filmData && ` ${filmData.total}개`}
              </h2>
              <Anchor href="/amusement?category=film&page=1">
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
              {!filmLoading ? (
                <>
                  {filmData &&
                    Array.isArray(filmData.data) &&
                    filmData.data.map((amusement: AmusementData, index: number) => (
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
                <Anchor href="/amusement?category=anime&page=1">애니메이션 리뷰</Anchor>
                {process.env.NODE_ENV === 'development' && animeData && ` ${animeData.total}개`}
              </h2>
              <Anchor href="/amusement?category=anime&page=1">
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
              {!animeLoading ? (
                <>
                  {animeData &&
                    Array.isArray(animeData.data) &&
                    animeData.data.map((amusement: AmusementData, index: number) => (
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
              {!ottLoading ? (
                <>
                  {ottData &&
                    Array.isArray(ottData.data) &&
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
              {!gameLoading ? (
                <>
                  {gameData &&
                    Array.isArray(gameData.data) &&
                    gameData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} isGame={true} />
                        <strong>
                          <span className="seed">
                            {amusement.category === 'game_fan'
                              ? `'${amusement.title}' 팬 게임 콜렉션`
                              : amusement.titleKorean
                                ? amusement.titleKorean
                                : amusement.title}
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
                <Anchor href="/amusement?category=game_fan&page=1">팬 게임 콜렉션</Anchor>
              </h2>
              <Anchor href="/amusement?category=game_fan&page=1">
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
              {!fanLoading ? (
                <>
                  {fanData &&
                    Array.isArray(fanData.data) &&
                    fanData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} isGame={true} />
                        <strong>
                          <span className="seed">&apos;{amusement.title}&apos; 팬 게임 콜렉션</span>
                        </strong>
                      </Link>
                    ))}
                </>
              ) : (
                <LoadingIndicator isGame={true} />
              )}
            </section>
          </>
        )}
        <aside className={styles.hanguk}>
          <Hanguk />
          <p>자막 / 더빙 / 베리어프리 작품 확인!</p>
          <p className="April16thPromise">
            <Anchor href="/hanguk">작품 확인하기!</Anchor>
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Categories;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let dramaData = null;
  let dramaError = null;

  try {
    const drama = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category?page=1&pageSize=7&categoryName=drama`);
    if (!drama.ok) {
      throw new Error('Network response was not ok');
    }
    dramaData = await drama.json();
  } catch (err) {
    dramaError = err instanceof Error ? err.message : 'An unknown error occurred';
  }
  return {
    props: {
      dramaData,
      dramaError,
    },
  };
};
