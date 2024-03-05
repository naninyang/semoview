import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData } from 'types';
import Seo from '@/components/Seo';
import { RatingsDrama } from '@/components/RatingsDrama';
import { vectors } from '@/components/vectors';
import { Pagination } from '@/components/Pagination';
import Anchor from '@/components/Anchor';
import styles from '@/styles/Categories.module.sass';

const BackButton = styled.i({
  display: 'block',
  background: `url(${vectors.backward}) no-repeat 50% 50%/contain`,
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

function Amusement() {
  const timestamp = Date.now();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryData, setCategoryData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  const handleCategorySubmit = () => {
    if (!selectedCategory) {
      alert('카테고리를 선택해 주세요');
    } else {
      router.push(`/amusement?category=${selectedCategory}&page=1`);
    }
  };

  useEffect(() => {
    const { category } = router.query;
    if (!category) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/category?categoryName=${category}&page=${currentPage}&pageSize=48`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setCategoryData(responseData);
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

    fetchData();
  }, [router.query]);

  return (
    <main className={`${styles.categories} ${styles.amusement}`}>
      <Seo
        pageTitle="제목에 제목이 없어서 짜증나서 만든 사이트"
        pageDescription="클릭하지 않아도 제목과 정보를 알 수 있게 도와드려요"
        pageImg={`https://jejeup.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <div className="top-link">
        <Anchor href="/categories">
          <BackButton />
          <span>뒤로가기</span>
        </Anchor>
      </div>
      {isLoading && <div className={styles.loading}>이것저것 불러오는 중</div>}
      {error && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      {!router.query.category && (
        <div className={styles.unselect}>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">카테고리 선택</option>
            <option value="drama">드라마</option>
            <option value="movie">영화</option>
            <option value="game">게임</option>
            <option value="animation">애니메이션</option>
            <option value="ott">OTT 오리지널</option>
          </select>
          <button onClick={handleCategorySubmit}>선택</button>
        </div>
      )}
      {categoryData && !isLoading && !error && (
        <div className={styles.content}>
          <div className={styles.headline}>
            <h1>
              {categoryData.data[0].category === 'drama' && '개가 짖어도 드라마는 정주행 할 수밖에 없다!'}
              {categoryData.data[0].category === 'movie' && '영화 사회에서는 영원한 우방도, 영원한 적도 없다!'}
              {categoryData.data[0].category === 'game' && '게임은 끝날 때까지 끝난 게 아니다!'}
              {categoryData.data[0].category === 'animation' && '애니입니다만, 문제라도?'}
              {categoryData.data[0].category === 'ott' ||
                (categoryData.data[0].category === 'ottFilm' && 'OTT 오리지널이 이렇게 재밌을 리가 없어')}
            </h1>
            <div className={styles.select}>
              <select onChange={handleCategoryChange} defaultValue={selectedCategory}>
                <option value="">카테고리 선택</option>
                <option value={'drama'}>드라마</option>
                <option value={'movie'}>영화</option>
                <option value={'game'}>게임</option>
                <option value={'animation'}>애니메이션</option>
                <option value={'ott'}>OTT 오리지널</option>
              </select>
              <button onClick={handleCategorySubmit}>선택</button>
            </div>
          </div>
          {Array.isArray(categoryData.data) && (
            <>
              <section>
                {categoryData.data.map((amusement: AmusementData, index: number) => (
                  <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                    <div
                      className={`${styles.thumbnail} ${categoryData.data[0].category === 'game' ? styles.game : ''}`}
                    >
                      <Image
                        src={amusement.posterDefault}
                        width={categoryData.data[0].category === 'game' ? 460 : 390}
                        height={categoryData.data[0].category === 'game' ? 215 : 560}
                        alt=""
                        unoptimized
                      />
                      <dl>
                        <div>
                          <dt>{categoryData.data[0].category === 'game' ? '심의등급' : '시청등급'}</dt>
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
          <Pagination
            currentPage={currentPage}
            pageCount={categoryData.pageCount}
            category={categoryData.data[0].category}
            sorting={'amusement'}
          />
        </div>
      )}
    </main>
  );
}

export default Amusement;
