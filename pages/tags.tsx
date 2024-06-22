import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AmusementData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import ChoiceGenre from '@/components/ChoiceGenre';
import { AmusementItem } from '@/components/AmusementItem';
import styles from '@/styles/Categories.module.sass';

function Tags({
  healingData,
  healingGameData,
  horrorDramaData,
  horrorAnimeData,
  horrorFilmData,
  horrorGameData,
  error,
}: {
  healingData: any;
  healingGameData: any;
  horrorDramaData: any;
  horrorAnimeData: any;
  horrorFilmData: any;
  horrorGameData: any;
  error: string;
}) {
  const router = useRouter();
  const timestamp = Date.now();

  useEffect(() => {
    sessionStorage.removeItem('amusementCategory');
    sessionStorage.removeItem('amusementTag');
    sessionStorage.removeItem('amusementPlatform');
    sessionStorage.removeItem('amusementHanguk');
    sessionStorage.removeItem('amusementSubdub');
    sessionStorage.removeItem('amusementBfree');

    sessionStorage.removeItem('category');
    sessionStorage.removeItem('platform');
    sessionStorage.removeItem('hanguk');
    sessionStorage.removeItem('subdub');
    sessionStorage.removeItem('bfree');

    sessionStorage.removeItem('ai');
    sessionStorage.removeItem('works');

    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem('semoview', router.asPath);
    sessionStorage.setItem('tag', router.asPath);
  }, [router.asPath]);

  return (
    <main className={styles.categories}>
      <Seo
        pageTitles={`리뷰 태그 선택하기 - ${originTitle}`}
        pageTitle={`리뷰 태그 선택하기`}
        pageDescription="#힐링 #치유 #감동 #백합 #레즈 #퀴어 #LGBTQ+ #이세계 #타임슬립 #타임리프 #타임루프 #회귀 #이상현상 #아노말리 #아포칼립스 #피카레스크 #악인전 #공포 #호러 #경영 #전략 #시뮬레이션 #백룸 #전생 #전이"
        pageImg={`https://semo.dev1stud.io/og-tags.webp?ts=${timestamp}`}
      />
      <ChoiceGenre />
      <div className="headline">
        <h1 className="April16thPromise">
          <em dangerouslySetInnerHTML={{ __html: '태그 골라보기!' }} />
        </h1>
      </div>
      {error && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      {!error && (
        <div className={styles.content}>
          {horrorDramaData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?tag=horror&category=drama&page=1">
                    <span>#공포</span> <span>#호러</span> <span>#드라마</span> <span>#유튜브리뷰</span>
                  </Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${horrorDramaData.total}개`}
                </h2>
                <Anchor href="/amusement?tag=horror&category=drama&page=1">
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
                {Array.isArray(horrorDramaData.data) &&
                  horrorDramaData.data.map((amusement: AmusementData, index: number) => (
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
          {horrorFilmData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?tag=horror&category=film&page=1">
                    <span>#공포</span> <span>#호러</span> <span>#영화</span> <span>#유튜브리뷰</span>
                  </Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${horrorFilmData.total}개`}
                </h2>
                <Anchor href="/amusement?tag=horror&category=film&page=1">
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
                {Array.isArray(horrorFilmData.data) &&
                  horrorFilmData.data.map((amusement: AmusementData, index: number) => (
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
          {horrorAnimeData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?tag=horror&category=anime&page=1">
                    <span>#공포</span> <span>#호러</span> <span>#애니</span> <span>#유튜브리뷰</span>
                  </Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${horrorAnimeData.total}개`}
                </h2>
                <Anchor href="/amusement?tag=horror&category=anime&page=1">
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
                {Array.isArray(horrorAnimeData.data) &&
                  horrorAnimeData.data.map((amusement: AmusementData, index: number) => (
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
          {horrorGameData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?tag=horror&category=game&page=1">
                    <span>#공포</span> <span>#호러</span> <span>#게임</span> <span>#유튜브리뷰</span>{' '}
                    <span>#유튜브실황</span>
                  </Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${horrorGameData.total}개`}
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
                {Array.isArray(horrorGameData.data) &&
                  horrorGameData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <AmusementItem amusement={amusement} isGame={true} />
                      <strong>
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          {healingData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?tag=healing&page=1">
                    <span>#힐링</span> <span>#치유</span> <span>#감동</span> <span>#드라마</span> <span>#영화</span>{' '}
                    <span>#애니</span> <span>#유튜브리뷰</span>
                  </Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${healingData.total}개`}
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
                {Array.isArray(healingData.data) &&
                  healingData.data.map((amusement: AmusementData, index: number) => (
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
          {healingGameData && (
            <>
              <div className={styles.headline}>
                <h2 className="April16thPromise">
                  <Anchor href="/amusement?tag=healing&category=game&page=1">
                    <span>#힐링</span> <span>#치유</span> <span>#감동</span> <span>#게임</span> <span>#유튜브리뷰</span>{' '}
                    <span>#유튜브실황</span>
                  </Anchor>
                  {process.env.NODE_ENV === 'development' && ` ${healingGameData.total}개`}
                </h2>
                <Anchor href="/amusement?tag=healing&category=game&page=1">
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
                {Array.isArray(healingGameData.data) &&
                  healingGameData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <AmusementItem amusement={amusement} isGame={true} />
                      <strong>
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
              </section>
            </>
          )}
          <aside>
            <div className={styles.sideA} />
            <div className={styles.sideB} />
            <p>좀 더 많은 태그를 보고 싶으신가요?</p>
            <p className="April16thPromise">
              <Anchor href="/amusement">태그를 골라보세요!</Anchor>
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Tags;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query.page) || 1;
  let healingData = null;
  let healingGameData = null;
  let horrorDramaData = null;
  let horrorAnimeData = null;
  let horrorFilmData = null;
  let horrorGameData = null;
  let error = null;

  try {
    const healing = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tag?page=1&pageSize=7&tagName=healing`);
    if (!healing.ok) {
      throw new Error('Network response was not ok');
    }
    healingData = await healing.json();

    const healingGame = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tag?page=1&pageSize=7&tagName=healing&categoryName=game`,
    );
    if (!healingGame.ok) {
      throw new Error('Network response was not ok');
    }
    healingGameData = await healingGame.json();

    const horrorDrama = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tag?page=1&pageSize=7&tagName=horror&categoryName=drama`,
    );
    if (!horrorDrama.ok) {
      throw new Error('Network response was not ok');
    }
    horrorDramaData = await horrorDrama.json();

    const horrorAnime = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tag?page=1&pageSize=7&tagName=horror&categoryName=anime`,
    );
    if (!horrorAnime.ok) {
      throw new Error('Network response was not ok');
    }
    horrorAnimeData = await horrorAnime.json();

    const horrorFilm = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tag?page=1&pageSize=7&tagName=horror&categoryName=film`,
    );
    if (!horrorFilm.ok) {
      throw new Error('Network response was not ok');
    }
    horrorFilmData = await horrorFilm.json();

    const horrorGame = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tag?page=1&pageSize=5&tagName=horror&categoryName=game`,
    );
    if (!horrorGame.ok) {
      throw new Error('Network response was not ok');
    }
    horrorGameData = await horrorGame.json();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      healingData,
      healingGameData,
      horrorDramaData,
      horrorAnimeData,
      horrorFilmData,
      horrorGameData,
      error,
      currentPage,
    },
  };
};
