import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import { RatingsDrama } from '@/components/RatingsDrama';
import { vectors } from '@/components/vectors';
import { Pagination } from '@/components/Pagination';
import Anchor from '@/components/Anchor';
import styles from '@/styles/Categories.module.sass';

const AmazonIcon = styled.i({
  background: `url(${vectors.ott.amazonIcon}) no-repeat 50% 50%/contain`,
});

const AppleIcon = styled.i({
  background: `url(${vectors.ott.appleIcon}) no-repeat 50% 50%/contain`,
});

const DisneyIcon = styled.i({
  background: `url(${vectors.ott.disneyIcon}) no-repeat 50% 50%/contain`,
});

const NetflixIcon = styled.i({
  background: `url(${vectors.ott.netflixIcon}) no-repeat 50% 50%/contain`,
});

const TvingIcon = styled.i({
  background: `url(${vectors.ott.tvingIcon}) no-repeat 50% 50%/contain`,
});

const WatchaIcon = styled.i({
  background: `url(${vectors.ott.watchaIcon}) no-repeat 50% 50%/contain`,
});

const WavveIcon = styled.i({
  background: `url(${vectors.ott.wavveIcon}) no-repeat 50% 50%/contain`,
});

const ParamountIcon = styled.i({
  background: `url(${vectors.ott.paramountIcon}) no-repeat 50% 50%/contain`,
});

const EnaIcon = styled.i({
  background: `url(${vectors.broadcast.enaIcon}) no-repeat 50% 50%/contain`,
});

const JtbcIcon = styled.i({
  background: `url(${vectors.broadcast.jtbcIcon}) no-repeat 50% 50%/contain`,
});

const Kbs2Icon = styled.i({
  background: `url(${vectors.broadcast.kbs2Icon}) no-repeat 50% 50%/contain`,
});

const MbcIcon = styled.i({
  background: `url(${vectors.broadcast.mbcIcon}) no-repeat 50% 50%/contain`,
});

const OcnIcon = styled.i({
  background: `url(${vectors.broadcast.ocnIcon}) no-repeat 50% 50%/contain`,
});

const SbsIcon = styled.i({
  background: `url(${vectors.broadcast.sbsIcon}) no-repeat 50% 50%/contain`,
});

const TvnIcon = styled.i({
  background: `url(${vectors.broadcast.tvnIcon}) no-repeat 50% 50%/contain`,
});

const AniboxIcon = styled.i({
  background: `url(${vectors.anime.aniboxIcon}) no-repeat 0 50%/contain`,
});

const AnimaxIcon = styled.i({
  background: `url(${vectors.anime.animaxIcon}) no-repeat 0 50%/contain`,
});

const AniplusIcon = styled.i({
  background: `url(${vectors.anime.aniplusIcon}) no-repeat 0 50%/contain`,
});

const AtxIcon = styled.i({
  background: `url(${vectors.anime.atxIcon}) no-repeat 0 50%/contain`,
});

const DaewonIcon = styled.i({
  background: `url(${vectors.anime.daewonIcon}) no-repeat 0 50%/contain`,
});

const FujitvIcon = styled.i({
  background: `url(${vectors.anime.fujitvIcon}) no-repeat 0 50%/contain`,
});

const MbsIcon = styled.i({
  background: `url(${vectors.anime.mbsIcon}) no-repeat 0 50%/contain`,
});

const NippontvIcon = styled.i({
  background: `url(${vectors.anime.nippontvIcon}) no-repeat 0 50%/contain`,
});

const TbsIcon = styled.i({
  background: `url(${vectors.anime.tbsIcon}) no-repeat 0 50%/contain`,
});

const TokyomxIcon = styled.i({
  background: `url(${vectors.anime.tokyomxIcon}) no-repeat 0 50%/contain`,
});

const TooniverseIcon = styled.i({
  background: `url(${vectors.anime.tooniverseIcon}) no-repeat 0 50%/contain`,
});

const TvtokyoIcon = styled.i({
  background: `url(${vectors.anime.tvtokyoIcon}) no-repeat 0 50%/contain`,
});

const WowowIcon = styled.i({
  background: `url(${vectors.anime.wowowIcon}) no-repeat 0 50%/contain`,
});

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

function Amusement({ categoryQuery }: { categoryQuery: string }) {
  const router = useRouter();
  const timestamp = Date.now();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryData, setCategoryData] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentPage = Number(router.query.page) || 1;

  useEffect(() => {
    sessionStorage.setItem('amuement', router.asPath);
  }, [router.asPath]);

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
      setCategory(category);

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
        pageTitles={`${categoryQuery === 'drama' ? '개가 짖어도 드라마는 정주행 할 수밖에 없다!' : ''}
              ${categoryQuery === 'film' ? '영화 사회에서는 영원한 우방도, 영원한 적도 없다!' : ''}
              ${categoryQuery === 'game' ? '게임은 끝날 때까지 끝난 게 아니다!' : ''}
              ${categoryQuery === 'anime' ? '애니입니다만, 문제라도?' : ''}
              ${categoryQuery === 'ott' ? '퇴근 후, 이세계 OTT에서만 볼 수 있는 콘텐츠를.' : ''} - ${originTitle}`}
        pageTitle={`${categoryQuery === 'drama' ? '개가 짖어도 드라마는 정주행 할 수밖에 없다!' : ''}
              ${categoryQuery === 'film' ? '영화 사회에서는 영원한 우방도, 영원한 적도 없다!' : ''}
              ${categoryQuery === 'game' ? '게임은 끝날 때까지 끝난 게 아니다!' : ''}
              ${categoryQuery === 'anime' ? '애니입니다만, 문제라도?' : ''}
              ${categoryQuery === 'ott' ? '퇴근 후, 이세계 OTT에서만 볼 수 있는 콘텐츠를.' : ''}`}
        pageDescription="원하는 카테고리를 선택해 리뷰영상을 즐겨보세요. 드라마, 영화, 애니, OTT 오리지널, 게임의 모든 것"
        pageImg={`https://jejeup.dev1stud.io/og-${categoryQuery}.webp?ts=${timestamp}`}
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
            <option value="ott">오직 OTT에서</option>
            <option value="film">영화</option>
            <option value="drama">드라마</option>
            <option value="anime">애니메이션</option>
            <option value="game">게임</option>
          </select>
          <button onClick={handleCategorySubmit}>선택</button>
        </div>
      )}
      {categoryData && !isLoading && !error && (
        <div className={styles.content}>
          <div className={styles.headline}>
            <h1>
              {category === 'drama' && '개가 짖어도 드라마는 정주행 할 수밖에 없다!'}
              {category === 'film' && '영화 사회에서는 영원한 우방도, 영원한 적도 없다!'}
              {category === 'game' && '게임은 끝날 때까지 끝난 게 아니다!'}
              {category === 'anime' && '애니입니다만, 문제라도?'}
              {category === 'ott' && '퇴근 후, 이세계 OTT에서만 볼 수 있는 콘텐츠를.'}{' '}
              {categoryData.total > 0 && <span>({categoryData.total}개 타이틀)</span>}
            </h1>
            <div className={styles.select}>
              <select onChange={handleCategoryChange} defaultValue={selectedCategory}>
                <option value="">카테고리 선택</option>
                <option value="ott">오직 OTT에서</option>
                <option value="film">영화</option>
                <option value="drama">드라마</option>
                <option value="anime">애니메이션</option>
                <option value="game">게임</option>
              </select>
              <button onClick={handleCategorySubmit}>선택</button>
            </div>
          </div>
          {Array.isArray(categoryData.data) && (
            <section className={category === 'game' ? styles.game : ''}>
              {categoryData.data.map((amusement: AmusementData, index: number) => (
                <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                  <div className={`${styles.thumbnail} ${category === 'game' ? styles.game : ''}`}>
                    <Image
                      src={amusement.posterDefault}
                      width={category === 'game' ? 460 : 390}
                      height={category === 'game' ? 215 : 560}
                      alt=""
                      unoptimized
                    />
                    <dl>
                      {amusement.broadcast !== null && (
                        <div className={`${styles.broadcast} ${amusement.ott !== null ? styles.broadcasts : ''}`}>
                          <dt>방송국</dt>
                          <dd>
                            {amusement.broadcast === 'ENA' && (
                              <>
                                <EnaIcon /> <span>ENA</span>
                              </>
                            )}
                            {amusement.broadcast === 'JTBC' && (
                              <>
                                <JtbcIcon /> <span>JTBC</span>
                              </>
                            )}
                            {amusement.broadcast === 'KBS2' && (
                              <>
                                <Kbs2Icon /> <span>KBS 2TV</span>
                              </>
                            )}
                            {amusement.broadcast === 'MBC' && (
                              <>
                                <MbcIcon /> <span>MBC</span>
                              </>
                            )}
                            {amusement.broadcast === 'OCN' && (
                              <>
                                <OcnIcon /> <span>OCN</span>
                              </>
                            )}
                            {amusement.broadcast === 'SBS' && (
                              <>
                                <SbsIcon /> <span>SBS</span>
                              </>
                            )}
                            {amusement.broadcast === 'tvN' && (
                              <>
                                <TvnIcon /> <span>tvN</span>
                              </>
                            )}
                          </dd>
                        </div>
                      )}
                      {amusement.ott !== null && (
                        <div className={styles.platform}>
                          <dt>플랫폼</dt>
                          <dd>
                            {amusement.ott === 'amazonOriginal' && (
                              <>
                                <AmazonIcon /> <span>AMAZON ORIGINAL</span>
                              </>
                            )}
                            {(amusement.ott === 'appleOriginal' || amusement.ott === 'appleFilm') && (
                              <>
                                <AppleIcon /> <span>An Apple Original</span>
                              </>
                            )}
                            {amusement.ott === 'disneyOriginal' && (
                              <>
                                <DisneyIcon /> <span>Disney Plus Original</span>
                              </>
                            )}
                            {(amusement.ott === 'netflixOriginal' ||
                              amusement.ott === 'netflixFilm' ||
                              amusement.ott === 'netflixAnime' ||
                              amusement.ott === 'netflixAnimeFilm') && (
                              <>
                                <NetflixIcon /> <span>NETFLIX Original</span>
                              </>
                            )}
                            {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                              <>
                                <TvingIcon /> <span>티빙 오리지널</span>
                              </>
                            )}
                            {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                              <>
                                <WatchaIcon /> <span>왓챠 오리지널</span>
                              </>
                            )}
                            {(amusement.ott === 'wavveOriginal' || amusement.ott === 'wavveOnly') && (
                              <>
                                <WavveIcon /> <span>웨이브 오리지널</span>
                              </>
                            )}
                            {amusement.ott === 'paramount' && (
                              <>
                                <ParamountIcon /> <span>Paramount+에서 스트리밍 중</span>
                              </>
                            )}
                          </dd>
                        </div>
                      )}
                      {amusement.animeBroadcast2 !== null && (
                        <div className={`${styles.anime2} ${amusement.animeBroadcast1 !== null ? styles.anime2 : ''}`}>
                          <dt>방송사</dt>
                          <dd>
                            {amusement.animeBroadcast2 === 'aniplus' && (
                              <>
                                <AniplusIcon /> <span>애니플러스</span>
                              </>
                            )}
                            {amusement.animeBroadcast2 === 'daewon' && (
                              <>
                                <DaewonIcon /> <span>애니원</span>
                              </>
                            )}
                            {amusement.animeBroadcast2 === 'anibox' && (
                              <>
                                <AniboxIcon /> <span>애니박스</span>
                              </>
                            )}
                            {amusement.animeBroadcast2 === 'tooniverse' && (
                              <>
                                <TooniverseIcon /> <span>투니버스</span>
                              </>
                            )}
                            {amusement.animeBroadcast2 === 'animax' && (
                              <>
                                <AnimaxIcon /> <span>애니박스</span>
                              </>
                            )}
                          </dd>
                        </div>
                      )}
                      {amusement.animeBroadcast1 !== null && (
                        <div className={`${styles.anime1} ${amusement.animeBroadcast1 !== null ? styles.anime1 : ''}`}>
                          <dt>방송사</dt>
                          <dd>
                            {amusement.animeBroadcast1 === 'tokyomx' && (
                              <>
                                <TokyomxIcon /> <span>도쿄 MX</span>
                              </>
                            )}
                            {amusement.animeBroadcast1 === 'tvtokyo' && (
                              <>
                                <TvtokyoIcon /> <span>테레비 도쿄</span>
                              </>
                            )}
                            {amusement.animeBroadcast1 === 'fujitv' && (
                              <>
                                <FujitvIcon /> <span>후지 테레비</span>
                              </>
                            )}
                            {amusement.animeBroadcast1 === 'mbs' && (
                              <>
                                <MbsIcon /> <span>MBS</span>
                              </>
                            )}
                            {amusement.animeBroadcast1 === 'tbs' && (
                              <>
                                <TbsIcon /> <span>TBS</span>
                              </>
                            )}
                            {amusement.animeBroadcast1 === 'atx' && (
                              <>
                                <AtxIcon /> <span>AT-X</span>
                              </>
                            )}
                            {amusement.animeBroadcast1 === 'nippontv' && (
                              <>
                                <NippontvIcon /> <span>닛폰 테레비</span>
                              </>
                            )}
                            {amusement.animeBroadcast1 === 'wowow' && (
                              <>
                                <WowowIcon /> <span>WOWOW</span>
                              </>
                            )}
                          </dd>
                        </div>
                      )}
                      <div className={category === 'game' ? styles.game : ''}>
                        <dt>{category === 'game' ? '심의등급' : '시청등급'}</dt>
                        <dd>
                          {(amusement.category === 'drama' ||
                            amusement.category === 'ott_drama' ||
                            amusement.category === 'ott_anime' ||
                            amusement.anime === 'tva' ||
                            amusement.anime === 'ova') && (
                            <>
                              {amusement.rating === 'all' ? (
                                <>
                                  <i className={`${styles.drama} ${styles.all} number`}>
                                    {RatingsDrama(amusement.rating)}
                                  </i>
                                  <span>전체 이용가</span>
                                </>
                              ) : (
                                <>
                                  {amusement.rating === 'd19' ? (
                                    <>
                                      <i className={`${styles.drama} ${styles.d19} number`}>
                                        {RatingsDrama(amusement.rating)}
                                      </i>
                                      <span>세 미만 이용불가</span>
                                    </>
                                  ) : (
                                    <>
                                      <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                                      <span>세 이상 이용가</span>
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                          {(amusement.category === 'film' ||
                            amusement.category === 'ott_anime_film' ||
                            amusement.category === 'ott_film' ||
                            amusement.anime === 'film') && (
                            <>
                              {amusement.rating === 'all' && (
                                <>
                                  <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                                </>
                              )}
                              {amusement.rating === 'b12' && (
                                <>
                                  <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                                </>
                              )}
                              {amusement.rating === 'c15' && (
                                <>
                                  <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                                </>
                              )}
                              {amusement.rating === 'd19' && (
                                <>
                                  <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                                </>
                              )}
                            </>
                          )}
                          {amusement.category === 'game' && (
                            <>
                              {amusement.rating === 'all' && (
                                <>
                                  <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                                </>
                              )}
                              {amusement.rating === 'b12' && (
                                <>
                                  <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                                </>
                              )}
                              {amusement.rating === 'c15' && (
                                <>
                                  <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                                </>
                              )}
                              {amusement.rating === 'd19' && (
                                <>
                                  <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                                </>
                              )}
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
          )}
          <Pagination
            currentPage={currentPage}
            pageCount={categoryData.pageCount}
            category={category}
            sorting={'amusement'}
          />
        </div>
      )}
    </main>
  );
}

export default Amusement;

export async function getServerSideProps(context: any) {
  return {
    props: {
      categoryQuery: context.query.category || '',
    },
  };
}
