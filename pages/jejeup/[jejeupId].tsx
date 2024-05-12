import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from '@emotion/styled';
import { AmusementData, JejeupData, JejeupMetaData, JejeupPermalinkData } from 'types';
import { formatDateDetail } from '@/utils/strapi';
import Seo, { originTitle } from '@/components/Seo';
import YouTubeController from '@/components/YouTubeController';
import Anchor from '@/components/Anchor';
import { vectors } from '@/components/vectors';
import { CategoryName } from '@/components/CategoryName';
import { TagCategoryName } from '@/components/TagCategory';
import { TagName } from '@/components/TagName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { formatDuration } from '@/components/FormatDuration';
import { formatDate } from '@/components/FormatDate';
import { formatTime } from '@/components/FormatTime';
import { SupportLang } from '@/components/SupportLang';
import AmusementDetail from '@/components/AmusementDetail';
import Related from '@/components/Related';
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

const StarOriginal = styled.i({
  width: rem(43),
  background: `url(${vectors.ott.star}) no-repeat 50% 50%/contain`,
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

const Abc = styled.i({
  width: rem(34),
  background: `url(${vectors.broadcast.abc}) no-repeat 0 50%/contain`,
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

const RelatedList = ({ related }: { related: any }) => {
  const validData = related.filter((data: any) => data.related !== null && Array.isArray(data.related));
  if (validData.length > 0) {
    return (
      <PerfectScrollbar className={styles['scrollbar-container']}>
        <aside className={validData.length > 1 ? styles['items-aside'] : ''}>
          <h2>관련 영상</h2>
          <div className={styles.list}>
            {validData.map((data: any, index: number) => (
              <React.Fragment key={index}>
                {data.related.flatMap((item: any) =>
                  Object.entries(item).map(([key, value]) => (
                    <Related
                      videoId={String(value)}
                      videoDescription={key}
                      key={key}
                      title={data.titleKorean ? data.titleKorean : data.title}
                    />
                  )),
                )}
              </React.Fragment>
            ))}
          </div>
        </aside>
      </PerfectScrollbar>
    );
  } else {
    return null;
  }
};

const ReviewList = ({ review, current }: { review: string; current: number }) => {
  const [amusementData, setAmusementData] = useState<JejeupData[] | null>(null);

  useEffect(() => {
    async function fetchAmusementData() {
      const amusementIds = review.match(/\d+/g);

      if (amusementIds) {
        Promise.all(
          amusementIds.map((id: string) =>
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jejeupAmusement?page=1&amusementId=${id}`).then((response) =>
              response.json(),
            ),
          ),
        )
          .then((data: JejeupData[]) => {
            setAmusementData(data);
          })
          .catch((error) => {
            console.error('Failed to fetch amusement data:', error);
          });
      }
    }

    fetchAmusementData();
  }, []);

  const validItems: JejeupData[] = [];

  amusementData?.forEach((data: any) => {
    data.jejeups?.forEach((item: any) => {
      if (item.idx !== current && !validItems.some((v) => v.idx === item.idx)) {
        validItems.push(item);
      }
    });
  });

  if (validItems.length > 0) {
    return (
      <aside className={styles['items-related']}>
        <h2>작품의 다른 리뷰</h2>
        <div className={styles.list}>
          {validItems.map((item, index) => (
            <div className={styles.item} key={index}>
              <Anchor href={`/jejeup/${item.idx}`}>
                <Image
                  src={`https://i.ytimg.com/vi/${item.video}/hqdefault.jpg`}
                  width={640}
                  height={480}
                  unoptimized
                  priority
                  alt={item.subject}
                />
                <span>
                  [{item.amusementData.titleKorean ? item.amusementData.titleKorean : item.amusementData.title}]{' '}
                  {item.subject}
                </span>
              </Anchor>
            </div>
          ))}
        </div>
      </aside>
    );
  } else {
    return null;
  }
};

const GameList = ({ game, current, creator }: { game: number; current: number; creator: string }) => {
  const [amusementData, setAmusementData] = useState<AmusementData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAmusementData() {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/jejeupAmusement?page=1&amusementId=${game}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAmusementData(data.jejeups);
      } catch (e) {
        if (e instanceof Error) {
          console.error('Error fetching data: ', e.message);
        } else {
          console.error('Error fetching data: ', e);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAmusementData();
  }, []);

  if (!loading && amusementData && Object.keys(amusementData).length > 1) {
    return (
      <aside className={styles['items-related']}>
        <h2>{creator}의 다른 팬게임 영상</h2>
        <div className={styles.list}>
          {amusementData &&
            Array.isArray(amusementData) &&
            amusementData.map((data: JejeupData, index: number) => (
              <>
                {data.idx !== current && (
                  <div className={styles.item} key={index}>
                    <Anchor href={`/jejeup/${data.idx}`} key={index}>
                      <Image
                        src={`https://i.ytimg.com/vi/${data.video}/hqdefault.jpg`}
                        width={640}
                        height={480}
                        unoptimized
                        priority
                        alt=""
                      />
                      <span>{data.subject}</span>
                    </Anchor>
                  </div>
                )}
              </>
            ))}
        </div>
      </aside>
    );
  } else {
    return null;
  }
};

const ReviewContent = ({ data }: { data: any }) => {
  const renderChildren = (children: any) => {
    return children.map((child: any, index: number) => {
      if (child.type === 'text') {
        if (child.bold) {
          return <strong key={index}>{child.text}</strong>;
        }
        if (child.strikethrough) {
          return <s key={index}>{child.text}</s>;
        }
        if (child.bold === undefined && child.strikethrough === undefined) {
          return (
            <span
              key={index}
              dangerouslySetInnerHTML={{
                __html: child.text.replace(/\n/g, '<br />'),
              }}
            />
          );
        }
      } else if (child.type === 'link') {
        return (
          <Anchor key={index} href={child.url}>
            {renderChildren(child.children)}
          </Anchor>
        );
      }
    });
  };

  const renderContent = (content: any) => {
    return content.map((item: any, index: number) => {
      if (item.type === 'paragraph') {
        return <p key={index}>{renderChildren(item.children)}</p>;
      } else if (item.type === 'list') {
        const ListComponent = item.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListComponent key={index}>
            {item.children.map((listItem: any, listItemIndex: number) => (
              <li key={listItemIndex}>{renderChildren(listItem.children)}</li>
            ))}
          </ListComponent>
        );
      }
    });
  };

  return <div className={styles['review-comment']}>{renderContent(data)}</div>;
};

export function TagsItem({ items, type }: { items: any; type: string }) {
  const excludeTags = ['game', 'anime', 'film', 'drama'];
  const filteredTags = items.tags && items.tags.filter((items: any) => !excludeTags.includes(items));

  if (!filteredTags) {
    return null;
  }

  if (type === 'tag') {
    return (
      <div className={styles.tags}>
        <dt>장르</dt>
        <dd className="seed">
          {filteredTags.map((tag: string, index: number) => (
            <span key={index}>{`#${TagName(tag, 'tag')}`} </span>
          ))}
          {items.category && <span> #{TagCategoryName(items.category)}</span>}
        </dd>
      </div>
    );
  } else if (type === 'genre') {
    return (
      <div>
        <dt>장르</dt>
        <dd className="seed">
          {items.genre},{' '}
          {filteredTags.map((tag: string, index: number) => (
            <React.Fragment key={index}>
              {TagName(tag, 'genre')}
              {index < filteredTags.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </dd>
      </div>
    );
  }
}

function ADCC({ items }: { items: any }) {
  const adcc = items && items.filter((items: any) => items);

  if (!adcc) {
    return null;
  }

  return (
    <div className={styles['ad-cc']}>
      <dt>자막/더빙</dt>
      <dd className="seed">
        {adcc.map((item: string, index: number) => (
          <span key={index}>{SupportLang(item)}</span>
        ))}
      </dd>
    </div>
  );
}

export default function JejeupDetail({
  jejeupData,
  jejeupId,
}: {
  jejeupData: JejeupPermalinkData | null;
  jejeupId: number;
}) {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem('backhistory', router.asPath);
  }, [router.asPath]);

  const previousPageHandler = () => {
    const previousPage = sessionStorage.getItem('semoview');
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
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const [selectedAmusementId, setSelectedAmusementId] = useState<string | null>(null);

  const handleButtonClick = (id: string) => {
    setSelectedAmusementId(id);
  };

  const handleCloseAmusementDetail = () => {
    setSelectedAmusementId(null);
  };

  const selectedAmusement = jejeupData?.amusementData.find((amusement) => amusement.id === selectedAmusementId);
  useEffect(() => {
    const preventScroll = (e: Event): void => {
      e.preventDefault();
    };

    const preventScrollKeys = (e: KeyboardEvent): void => {
      if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };

    if (selectedAmusement !== undefined) {
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventScrollKeys, { passive: false });
    } else {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
    }
    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
    };
  }, [selectedAmusement]);

  if (!jejeupData) {
    if (timeoutReached) {
      return (
        <main className={styles.jejeup}>
          <div className="top-link">
            <Anchor href="/">
              <BackButton />
              <span>뒤로가기</span>
            </Anchor>
          </div>
          <article className={styles['article-jejeup']}>
            <div className={`${styles.preview} preview`}>
              <div className={styles.video}>
                <YouTubeController
                  videoId={'ARJ5bXkof30'}
                  videoImage={'https://i.ytimg.com/vi/ARJ5bXkof30/hqdefault.jpg'}
                />
              </div>
              <div className={styles.youtube}>
                <h1>없는 페이지이므로 체념하고 돌아가세요! 404 NOT FOUND PAGE!</h1>
              </div>
            </div>
          </article>
        </main>
      );
    } else {
      return (
        <main className={`${styles.jejeup} ${styles['jejeup-loading']}`}>
          <Seo
            pageTitles={`404 NOT FOUND - ${originTitle}`}
            pageTitle={`404 NOT FOUND`}
            pageDescription={`서버 에러 또는 삭제/비공개된 영상`}
            pageImg={`https://semo.dev1stud.io/missing.webp`}
            pageOgType={'video.other'}
            pageImgWidth={1920}
            pageImgHeight={1080}
          />
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

  const handleReport = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const jejeupVideo = event.currentTarget.getAttribute('data-video');

    try {
      const response = await fetch('/api/unpublish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jejeupVideo: jejeupVideo }),
      });

      if (response.ok) {
        alert('제보 성공! 감사합니다 ☺️');
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

  function JejeupMeta({ jejeupData }: { jejeupData: any }) {
    const [jejeupMetaData, setJejeupMetaData] = useState<JejeupMetaData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [relations, setRelations] = useState<JejeupData | null>(null);
    const [error, setError] = useState(null);
    const maxRetries = 7;

    const fetchMetadata = async (currentRetryCount = 0) => {
      try {
        const jejeupMeta = await fetch(`/api/jejeup?url=https://youtu.be/${jejeupData.attributes.video}`);
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

    const [isRelationsLoading, setIsRelationsLoading] = useState(false);

    const loadRelations = async () => {
      if (jejeupData) {
        if (jejeupData.attributes && jejeupData.attributes.relations) {
          setIsRelationsLoading(true);
          setError(null);
          try {
            const response = await fetch(`/api/relations?relations=${jejeupData.attributes.relations}&type=jejeup`);
            const relationsResponse = await response.json();
            setRelations(relationsResponse);
          } catch (err) {
            console.error(err);
          } finally {
            setIsRelationsLoading(false);
          }
        }
      }
    };

    useEffect(() => {
      loadRelations();
    }, [jejeupData]);

    const [isMore, setIsMore] = useState(false);
    const moreToggle = () => {
      setIsMore(!isMore);
    };

    return (
      <>
        {!isLoading && !error && jejeupData && jejeupMetaData ? (
          <>
            {Object.keys(jejeupMetaData).length > 0 ? (
              <>
                {jejeupMetaData.error === 'Failed to fetch data' || jejeupMetaData.originalTitle === ' - YouTube' ? (
                  <div className={`${styles.preview} ${styles.more} ${styles['preview-dummy']}`}>
                    <div className={`${styles.dummy} ${styles.skeleton}`} />
                    <div className={`${styles.youtube} ${styles.more}`}>
                      <h1>
                        유튜버가 영상을 삭제했거나 비공개 처리한 영상입니다. 관리자에게{' '}
                        <button type="button" data-video={jejeupData.attributes.video} onClick={handleReport}>
                          세모뷰 운영자에게 제보
                        </button>
                        해 주세요.
                      </h1>
                      <div className={styles.detail}>
                        <div className={`${styles.avatar} ${styles.skeleton}`} />
                        <div className={styles.user}>
                          <cite className={styles.skeleton} />
                          <time className={styles.skeleton} />
                        </div>
                      </div>
                      <div className={`${styles.learnmore} ${styles.skeleton}`} />
                    </div>
                  </div>
                ) : jejeupMetaData.duration === undefined ? (
                  <div className={`${styles.preview} ${styles['preview-dummy']}`}>
                    <div className={`${styles.dummy} ${styles.skeleton}`} />
                    <div className={`${styles.youtube} ${styles.more}`}>
                      <h1>
                        알 수 없는 사유로 불러오지 못했습니다.{' '}
                        <button type="button" data-video={jejeupData.attributes.video} onClick={handleRetry}>
                          새로고침
                        </button>
                        해 주세요.
                      </h1>
                      <div className={styles.detail} aria-hidden="true">
                        <div className={`${styles.avatar} ${styles.skeleton}`} />
                        <div className={styles.user}>
                          <cite className={styles.skeleton} />
                          <time className={styles.skeleton} />
                        </div>
                      </div>
                      <div className={`${styles.learnmore} ${styles.skeleton}`} />
                    </div>
                  </div>
                ) : (
                  <div className={`${styles.preview} preview`}>
                    <div className={styles.video}>
                      {jejeupData.attributes.embeddingOff ? (
                        <div className={styles.embeddingOff}>
                          <Image src={jejeupMetaData.ogImage} width={1920} height={1080} alt="" unoptimized priority />
                          <div>
                            <p>유튜버 또는 원 저작권자가 유튜브에서만 재생할 수 있도록 설정한 콘텐츠 입니다.</p>
                            <p>
                              <Anchor href={`https://youtu.be/${jejeupData.attributes.video}`}>여기</Anchor>를 누르시면
                              유튜브 해당 영상으로 이동합니다.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <YouTubeController videoId={jejeupData.attributes.video} videoImage={jejeupMetaData.ogImage} />
                      )}
                    </div>
                    <div className={`${styles.youtube} ${isMore ? styles.more : ''}`}>
                      <h1>{jejeupMetaData.ogTitle}</h1>
                      <div className={styles.detail}>
                        <Image
                          src={`${jejeupMetaData.ownerAvatar === undefined ? 'https://cdn.dev1stud.io/jejeup/-/' + jejeupMetaData.ownerUrl?.split('@')[1] + '.webp' : jejeupMetaData.ownerAvatar}`}
                          width="36"
                          height="36"
                          alt=""
                          unoptimized
                        />
                        <div className={styles.user}>
                          <cite>{jejeupMetaData.ownerName}</cite>
                          <time dateTime={jejeupMetaData.datePublished}>
                            {formatDate(`${jejeupMetaData.datePublished}`)}
                          </time>
                        </div>
                        <button type="button" onClick={moreToggle}>
                          {isMore ? '닫기' : '더 보기'}
                        </button>
                      </div>
                      {jejeupMetaData.ogDescription ? (
                        <div className={styles.learnmore}>
                          <em>{formatDuration(jejeupMetaData.duration)}</em>
                          {jejeupMetaData.ogDescription}
                          {jejeupData.attributes.relations && relations && !isRelationsLoading && (
                            <dl>
                              <dt>관련 영상</dt>
                              {isRelationsLoading ? (
                                <dd>관련 영상 불러오는 중</dd>
                              ) : (
                                Array.isArray(relations) &&
                                relations
                                  .filter((relation) => relation.idx !== jejeupId)
                                  .map((relation) => (
                                    <dd key={relation.idx}>
                                      <Anchor href={`/jejeup/${relation.idx}`}>{relation.subject}</Anchor>
                                    </dd>
                                  ))
                              )}
                            </dl>
                          )}
                        </div>
                      ) : (
                        <div className={styles.learnmore}>
                          <strong>유튜버가 더보기 정보를 등록하지 않았습니다.</strong>
                        </div>
                      )}
                      {jejeupData.attributes.worst && (
                        <div className={styles.worst} aria-label="Worst 영상">
                          <strong className="number">Worst</strong>
                        </div>
                      )}
                      {(jejeupData.attributes.embeddingOff === null ||
                        jejeupData.attributes.embeddingOff === false) && (
                        <div className={styles.embed}>
                          <p>
                            🚫 이 영상이 유튜브에서만 볼 수 있게 설정된 영상이라면 관리자에게{' '}
                            <button type="button" data-video={jejeupData.attributes.video} onClick={handleReport}>
                              세모뷰 운영자에게 제보해
                            </button>
                            주세요.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={`${styles.preview} ${styles.more} ${styles['preview-dummy']}`}>
                <div className={styles.notice}>
                  <p>알 수 없는 사유로 불러오지 못했습니다.</p>
                  <p>
                    <button type="button" data-video={jejeupData.video} onClick={handleRetry}>
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
                    <div className={`${styles.learnmore} ${styles.skeleton}`} />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={`${styles.preview} ${styles.more} ${styles['preview-dummy']}`}>
            <div className={styles.notice} hidden>
              <p>불러오는 중</p>
            </div>
            <div className={styles.video}>
              <div className={`${styles.dummy} ${styles.skeleton}`} />
            </div>
            <div className={`${styles.youtube} ${styles.more}`} aria-hidden="true">
              <h1 className={styles.skeleton} />
              <div className={styles.detail}>
                <div className={`${styles.avatar} ${styles.skeleton}`} />
                <div className={styles.user}>
                  <cite className={styles.skeleton} />
                  <time className={styles.skeleton} />
                </div>
              </div>
              <div className={`${styles.learnmore} ${styles.skeleton}`} />
            </div>
          </div>
        )}
      </>
    );
  }

  const validData = Array.isArray(jejeupData.amusementData)
    ? jejeupData.amusementData.filter((data: any) => data.related !== null && Array.isArray(data.related))
    : [];

  return (
    <main className={styles.jejeup}>
      <Seo
        pageTitles={`${jejeupData.attributes ? jejeupData.attributes.subject : '없는 페이지'} - ${originTitle}`}
        pageTitle={`${jejeupData.attributes ? jejeupData.attributes.subject : '없는 페이지'}`}
        pageDescription={
          Array.isArray(jejeupData.amusementData) && jejeupData.amusementData.length > 0
            ? `${jejeupData.amusementData[0].titleKorean ? jejeupData.amusementData[0].titleKorean : jejeupData.amusementData[0].title} (${jejeupData.amusementData[0].release})`
            : '서버 에러 또는 삭제/비공개된 영상'
        }
        pageImg={
          jejeupData.attributes
            ? `https://i.ytimg.com/vi/${jejeupData.attributes.video}/hqdefault.jpg`
            : 'https://semo.dev1stud.io/missing.webp'
        }
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
      <article className={validData.length > 0 ? styles['article-jejeup'] : ''}>
        <div className={styles.article}>
          {jejeupData.attributes ? (
            <>
              {jejeupData.attributes.publishedAt !== null ? (
                <>
                  <JejeupMeta jejeupData={jejeupData} />
                  <div className={styles.figcaption}>
                    {jejeupData.attributes.worst && (
                      <dl className={styles.worst}>
                        <dt>Worst 경고!</dt>
                        <dd>이 영상은 영상과 더보기에 그 어떤 정보도 존재하지 않는 최악의 영상입니다.</dd>
                      </dl>
                    )}
                    {jejeupData.attributes.review && (
                      <div className={styles.comment}>
                        <h2 className="April16thPromise">큐레이터의 영상/작품 리뷰</h2>
                        <ReviewContent data={jejeupData.attributes.review} />
                      </div>
                    )}
                    {Array.isArray(jejeupData.amusementData) && jejeupData.amusementData[0].category !== 'game_fan' ? (
                      <>
                        <div className={styles.title}>
                          <h2 className="April16thPromise">작품 정보</h2>
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
                                        <div
                                          className={`${styles.poster} ${data.category === 'game' ? styles['posters-game'] : styles['posters-other']}`}
                                        >
                                          <Image
                                            src={data.posterDefault}
                                            alt=""
                                            width={data.category === 'game' ? 460 : 390}
                                            height={data.category === 'game' ? 215 : 560}
                                            unoptimized
                                          />
                                        </div>
                                        <div className={styles['info-container']}>
                                          <dl className={styles.summary}>
                                            <dt>
                                              {data.category !== 'anime_film' ? (
                                                <>
                                                  {(data.category === 'drama' ||
                                                    data.category === 'film' ||
                                                    data.category === 'game' ||
                                                    data.category === 'anime' ||
                                                    data.category === 'ott_drama' ||
                                                    data.category === 'ott_film' ||
                                                    data.category === 'ott_anime') && (
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
                                                      {data.broadcast === 'ABC' && (
                                                        <>
                                                          <Abc /> <span>ABC</span>
                                                        </>
                                                      )}
                                                      {(data.animeBroadcast1 !== null ||
                                                        data.animeBroadcast2 !== null) && (
                                                        <>
                                                          {data.animeBroadcast1 === 'tokyomx' && (
                                                            <>
                                                              <Tokyomx /> <span>도쿄MX</span>
                                                            </>
                                                          )}
                                                          {data.animeBroadcast1 === 'tvtokyo' && (
                                                            <>
                                                              <Tvtokyo /> <span>테레토</span>
                                                            </>
                                                          )}
                                                          {data.animeBroadcast1 === 'fujitv' && (
                                                            <>
                                                              <Fujitv /> <span>후지테레비</span>
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
                                                              <Nippontv /> <span>닛테레</span>
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
                                                      {data.category === 'game' && data.isMobile && '모바일 '}
                                                      {CategoryName(data.category)}
                                                      {data.ott === null && data.ottAddr !== null && ' | 단편영화'}
                                                    </em>
                                                  )}
                                                  {data.category === 'ott_anime_film' && (
                                                    <>
                                                      <em>애니메이션</em>
                                                      <em>영화</em>
                                                    </>
                                                  )}
                                                  {data.category === 'ott_documentary_film' && (
                                                    <>
                                                      <em>다큐멘터리</em>
                                                      <em>영화</em>
                                                    </>
                                                  )}
                                                </>
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
                                                  {data.category === 'anime_film' && (
                                                    <>
                                                      <em>애니메이션</em>
                                                      <em>영화</em>
                                                    </>
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
                                                  <AppleOriginal /> Apple Original Films
                                                </cite>
                                              )}
                                              {data.ott === 'disneyOriginal' && (
                                                <cite>
                                                  <DisneyOriginal /> Disney Original
                                                </cite>
                                              )}
                                              {data.ott === 'disneyStar' && (
                                                <cite>
                                                  <StarOriginal /> Star Original
                                                </cite>
                                              )}
                                              {(data.ott === 'netflixSeries' ||
                                                data.ott === 'netflixOriginal' ||
                                                data.ott === 'netflixAnime') && (
                                                <cite>
                                                  <NetflixOriginal /> A NETFLIX Series
                                                </cite>
                                              )}
                                              {(data.ott === 'netflixPresents' ||
                                                data.ott === 'netflixFilm' ||
                                                data.ott === 'netflixAnimeFilm') && (
                                                <cite>
                                                  <NetflixOriginal /> NETFLIX Presents
                                                </cite>
                                              )}
                                              {data.ott === 'netflixDocumentary' && (
                                                <cite>
                                                  <NetflixOriginal /> A NETFLIX Documentary
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
                                                  <Paramount /> Paramaount+
                                                </cite>
                                              )}
                                              {data.ott === 'amazonOriginal' ? (
                                                <i
                                                  className={`${styles['rating-amazon']} number`}
                                                  aria-label="시청 가능 연령"
                                                >
                                                  {data.rating === 'all' && 'All'}
                                                  {data.rating === 'a7' && '7+'}
                                                  {data.rating === 'b12' && '13+'}
                                                  {data.rating === 'c15' && '16+'}
                                                  {data.rating === 'd19' && '18+'}
                                                </i>
                                              ) : (
                                                <>
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
                                                              <i className={`${styles.drama} number`}>
                                                                {RatingsDrama(data.rating)}
                                                              </i>
                                                              <span>세 이상 이용가</span>
                                                            </>
                                                          )}
                                                        </>
                                                      )}
                                                    </>
                                                  )}
                                                  {(data.category === 'film' ||
                                                    data.category === 'anime_film' ||
                                                    data.category === 'ott_anime_film' ||
                                                    data.category === 'ott_film' ||
                                                    data.category === 'ott_documentary_film' ||
                                                    data.anime === 'film') && (
                                                    <>
                                                      {data.rating === 'all' && (
                                                        <>
                                                          <RatingFilmAll className={styles.rating} />{' '}
                                                          <span>전체 이용가</span>
                                                        </>
                                                      )}
                                                      {data.rating === 'b12' && (
                                                        <>
                                                          <RatingFilmB12 className={styles.rating} />{' '}
                                                          <span>12세 이용가</span>
                                                        </>
                                                      )}
                                                      {data.rating === 'c15' && (
                                                        <>
                                                          <RatingFilmC15 className={styles.rating} />{' '}
                                                          <span>15세 이용가</span>
                                                        </>
                                                      )}
                                                      {data.rating === 'd19' && (
                                                        <>
                                                          <RatingFilmD18 className={styles.rating} />{' '}
                                                          <span>청소년 이용불가</span>
                                                        </>
                                                      )}
                                                    </>
                                                  )}
                                                </>
                                              )}
                                              {data.category === 'game' && (
                                                <>
                                                  {data.rating === 'all' && (
                                                    <>
                                                      <RatingGameAll className={styles.rating} />{' '}
                                                      <span>전체 이용가</span>
                                                    </>
                                                  )}
                                                  {data.rating === 'b12' && (
                                                    <>
                                                      <RatingGameB12 className={styles.rating} />{' '}
                                                      <span>12세 이용가</span>
                                                    </>
                                                  )}
                                                  {data.rating === 'c15' && (
                                                    <>
                                                      <RatingGameC15 className={styles.rating} />{' '}
                                                      <span>15세 이용가</span>
                                                    </>
                                                  )}
                                                  {data.rating === 'd19' && (
                                                    <>
                                                      <RatingGameD19 className={styles.rating} />{' '}
                                                      <span>청소년 이용불가</span>
                                                    </>
                                                  )}
                                                </>
                                              )}
                                              {data.ratingCustom && (
                                                <div className={styles.custom}>
                                                  {data.ott === 'amazonOriginal' && !data.ratingCustom && (
                                                    <button type="button" onClick={amazonRatingHandler}>
                                                      <i />
                                                      <span>아마존 자체 심의등급 작품</span>
                                                    </button>
                                                  )}
                                                  {data.ott === 'amazonOriginal' && data.ratingCustom && (
                                                    <button type="button" onClick={regionRatingHandler}>
                                                      <i />
                                                      <span>한국 리전 아마존 시청 불가 작품</span>
                                                    </button>
                                                  )}
                                                  {data.ott !== 'amazonOriginal' && data.ratingCustom && (
                                                    <button type="button" onClick={customRatingHandler}>
                                                      <i />
                                                      <span>세모뷰 자체설정 심의등급 안내</span>
                                                    </button>
                                                  )}
                                                </div>
                                              )}
                                              {data.ott !== null && data.ottAddr !== null && (
                                                <Anchor href={data.ottAddr}>
                                                  {data.ott === 'amazonOriginal' && 'Prime Video'}
                                                  {(data.ott === 'appleOriginal' || data.ott === 'appleFilm') &&
                                                    'Apple TV+'}
                                                  {(data.ott === 'disneyOriginal' || data.ott === 'disneyStar') &&
                                                    'Disney+'}
                                                  {(data.ott === 'netflixOriginal' ||
                                                    data.ott === 'netflixFilm' ||
                                                    data.ott === 'netflixAnime' ||
                                                    data.ott === 'netflixAnimeFilm' ||
                                                    data.ott === 'netflixDocumentary') &&
                                                    'NETFLIX'}
                                                  {(data.ott === 'tvingOriginal' ||
                                                    data.ott === 'tvingOnly' ||
                                                    data.ott === 'paramount') &&
                                                    'TVING'}
                                                  {(data.ott === 'watchaOriginal' || data.ott === 'watchaExclusive') &&
                                                    'WATCHA'}
                                                  {(data.ott === 'wavveOriginal' || data.ott === 'wavveOnly') &&
                                                    'Wavve'}
                                                  에서 시청하기
                                                </Anchor>
                                              )}
                                              {data.ott === null && data.ottAddr !== null && (
                                                <Anchor href={data.ottAddr}>
                                                  단편영화 &apos;{data.titleKorean ? data.titleKorean : data.title}
                                                  &apos; 보러가기
                                                </Anchor>
                                              )}
                                            </dt>
                                            <dd>
                                              <strong>
                                                <span className={`${styles.title} seed`} aria-label="작품명">
                                                  {data.titleKorean ? data.titleKorean : data.title}
                                                </span>
                                                {data.lang === 'chineseBeonche' && (
                                                  <span lang="zh-Hant">{data.title} </span>
                                                )}
                                                {data.lang === 'chineseGanche' && (
                                                  <span lang="zh-Hans">{data.title} </span>
                                                )}
                                                {data.lang === 'europe' && <span lang="en">{data.title}</span>}
                                                {data.lang === 'english' && <span lang="en-US">{data.title}</span>}
                                                {data.lang === 'japanese' && <span lang="ja">{data.title}</span>}
                                                {data.lang === 'thai' && <span lang="th">{data.title}</span>}
                                              </strong>
                                            </dd>
                                          </dl>
                                          <dl className={styles.info}>
                                            {data.country !== '?' && (
                                              <div>
                                                <dt>제작국가</dt>
                                                <dd className="seed">{data.country}</dd>
                                              </div>
                                            )}
                                            {data.release !== '?' && (
                                              <div>
                                                <dt>
                                                  {(data.category === 'drama' ||
                                                    data.category === 'ott_drama' ||
                                                    data.category === 'ott_anime' ||
                                                    data.anime === 'tva' ||
                                                    data.anime === 'ova') &&
                                                    '방영년도'}
                                                  {(data.category === 'film' ||
                                                    data.category === 'anime_film' ||
                                                    data.category === 'ott_anime_film' ||
                                                    data.category === 'ott_film' ||
                                                    data.anime === 'film') &&
                                                    '상영년도'}
                                                  {data.category === 'game' && '출시년도'}
                                                </dt>
                                                <dd className="seed">{data.release}년</dd>
                                              </div>
                                            )}
                                            {data.runningTime && (
                                              <div>
                                                <dt>재생시간</dt>
                                                <dd>
                                                  {data.runningTime}분{formatTime(data.runningTime)}
                                                </dd>
                                              </div>
                                            )}
                                            {data.supportLang !== null && <ADCC items={data.supportLang} />}
                                            {data.genre !== '?' && data.tags === null && (
                                              <div>
                                                <dt>장르</dt>
                                                <dd className="seed">{data.genre}</dd>
                                              </div>
                                            )}
                                            {data.genre !== '?' && data.tags !== null && (
                                              <TagsItem items={data} type="genre" />
                                            )}
                                            {data.studio && (
                                              <div>
                                                <dt>스튜디오</dt>
                                                <dd className="seed">{data.studio}</dd>
                                              </div>
                                            )}
                                            {data.distributor ? (
                                              data.publisher !== '?' && (
                                                <>
                                                  <div>
                                                    <dt>제작</dt>
                                                    <dd className="seed">{data.distributor}</dd>
                                                  </div>
                                                  <div>
                                                    <dt>제작참여</dt>
                                                    <dd className="seed">{data.publisher}</dd>
                                                  </div>
                                                </>
                                              )
                                            ) : (
                                              <div>
                                                <dt>{data.category === 'game' ? '유통/배급' : '제작/배급'}</dt>
                                                <dd className="seed">{data.publisher}</dd>
                                              </div>
                                            )}
                                            {data.director && (
                                              <div>
                                                <dt>감독/연출</dt>
                                                <dd className="seed">{data.director}</dd>
                                              </div>
                                            )}
                                            {data.creator !== '?' && (
                                              <div>
                                                <dt>{data.category === 'game' ? '개발' : '주요 제작자'}</dt>
                                                <dd className="seed">{data.creator}</dd>
                                              </div>
                                            )}
                                            {data.cast !== null && (
                                              <div>
                                                {data.category !== 'anime' &&
                                                data.category !== 'anime_film' &&
                                                data.category !== 'ott_anime' &&
                                                data.category !== 'ott_anime_film' &&
                                                data.category !== 'game' ? (
                                                  <dt>주요 출연자</dt>
                                                ) : (
                                                  <dt>주요 성우</dt>
                                                )}
                                                <dd className="seed">{data.cast}</dd>
                                              </div>
                                            )}
                                          </dl>
                                          <div className={styles.more}>
                                            ...{' '}
                                            <button type="button" onClick={() => handleButtonClick(String(data.id))}>
                                              <span>더보기</span>
                                            </button>
                                          </div>
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
                                        {data.category !== 'anime_film' ? (
                                          <>
                                            {(data.category === 'drama' ||
                                              data.category === 'film' ||
                                              data.category === 'game' ||
                                              data.category === 'anime' ||
                                              data.category === 'ott_drama' ||
                                              data.category === 'ott_film' ||
                                              data.category === 'ott_anime') && (
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
                                                {data.broadcast === 'ABC' && (
                                                  <>
                                                    <Abc /> <span>ABC</span>
                                                  </>
                                                )}
                                                {(data.animeBroadcast1 !== null || data.animeBroadcast2 !== null) && (
                                                  <>
                                                    {data.animeBroadcast1 === 'tokyomx' && (
                                                      <>
                                                        <Tokyomx /> <span>도쿄MX</span>
                                                      </>
                                                    )}
                                                    {data.animeBroadcast1 === 'tvtokyo' && (
                                                      <>
                                                        <Tvtokyo /> <span>테레토</span>
                                                      </>
                                                    )}
                                                    {data.animeBroadcast1 === 'fujitv' && (
                                                      <>
                                                        <Fujitv /> <span>후지테레비</span>
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
                                                        <Nippontv /> <span>닛테레</span>
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
                                                {data.category === 'game' && data.isMobile && '모바일 '}
                                                {CategoryName(data.category)}
                                                {data.ott === null && data.ottAddr !== null && ' | 단편영화'}
                                              </em>
                                            )}
                                            {data.category === 'ott_anime_film' && (
                                              <>
                                                <em>애니메이션</em>
                                                <em>영화</em>
                                              </>
                                            )}
                                            {data.category === 'ott_documentary_film' && (
                                              <>
                                                <em>다큐멘터리</em>
                                                <em>영화</em>
                                              </>
                                            )}
                                          </>
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
                                            {data.category === 'anime_film' && (
                                              <>
                                                <em>애니메이션</em>
                                                <em>영화</em>
                                              </>
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
                                            <AppleOriginal /> Apple Original Films
                                          </cite>
                                        )}
                                        {data.ott === 'disneyOriginal' && (
                                          <cite>
                                            <DisneyOriginal /> Disney Original
                                          </cite>
                                        )}
                                        {data.ott === 'disneyStar' && (
                                          <cite>
                                            <StarOriginal /> Star Original
                                          </cite>
                                        )}
                                        {(data.ott === 'netflixSeries' ||
                                          data.ott === 'netflixOriginal' ||
                                          data.ott === 'netflixAnime') && (
                                          <cite>
                                            <NetflixOriginal /> A NETFLIX Series
                                          </cite>
                                        )}
                                        {(data.ott === 'netflixPresents' ||
                                          data.ott === 'netflixFilm' ||
                                          data.ott === 'netflixAnimeFilm') && (
                                          <cite>
                                            <NetflixOriginal /> NETFLIX Presents
                                          </cite>
                                        )}
                                        {data.ott === 'netflixDocumentary' && (
                                          <cite>
                                            <NetflixOriginal /> A NETFLIX Documentary
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
                                            <Paramount /> Paramaount+
                                          </cite>
                                        )}
                                        {data.ott === 'amazonOriginal' ? (
                                          <i
                                            className={`${styles['rating-amazon']} number`}
                                            aria-label="시청 가능 연령"
                                          >
                                            {data.rating === 'all' && 'All'}
                                            {data.rating === 'a7' && '7+'}
                                            {data.rating === 'b12' && '13+'}
                                            {data.rating === 'c15' && '16+'}
                                            {data.rating === 'd19' && '18+'}
                                          </i>
                                        ) : (
                                          <>
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
                                                        <i className={`${styles.drama} number`}>
                                                          {RatingsDrama(data.rating)}
                                                        </i>
                                                        <span>세 이상 이용가</span>
                                                      </>
                                                    )}
                                                  </>
                                                )}
                                              </>
                                            )}
                                            {(data.category === 'film' ||
                                              data.category === 'anime_film' ||
                                              data.category === 'ott_anime_film' ||
                                              data.category === 'ott_film' ||
                                              data.category === 'ott_documentary_film' ||
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
                                                    <RatingFilmD18 className={styles.rating} />{' '}
                                                    <span>청소년 이용불가</span>
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                        {data.category === 'game' && (
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
                                            {data.ott === 'amazonOriginal' && !data.ratingCustom && (
                                              <button type="button" onClick={amazonRatingHandler}>
                                                <i />
                                                <span>아마존 자체 심의등급 작품</span>
                                              </button>
                                            )}
                                            {data.ott === 'amazonOriginal' && data.ratingCustom && (
                                              <button type="button" onClick={regionRatingHandler}>
                                                <i />
                                                <span>한국 리전 아마존 시청 불가 작품</span>
                                              </button>
                                            )}
                                            {data.ott !== 'amazonOriginal' && data.ratingCustom && (
                                              <button type="button" onClick={customRatingHandler}>
                                                <i />
                                                <span>세모뷰 자체설정 심의등급 안내</span>
                                              </button>
                                            )}
                                          </div>
                                        )}
                                        {data.ott !== null && data.ottAddr !== null && (
                                          <Anchor href={data.ottAddr}>
                                            {data.ott === 'amazonOriginal' && 'Prime Video'}
                                            {(data.ott === 'appleOriginal' || data.ott === 'appleFilm') && 'Apple TV+'}
                                            {(data.ott === 'disneyOriginal' || data.ott === 'disneyStar') && 'Disney+'}
                                            {(data.ott === 'netflixOriginal' ||
                                              data.ott === 'netflixFilm' ||
                                              data.ott === 'netflixAnime' ||
                                              data.ott === 'netflixAnimeFilm' ||
                                              data.ott === 'netflixDocumentary') &&
                                              'NETFLIX'}
                                            {(data.ott === 'tvingOriginal' ||
                                              data.ott === 'tvingOnly' ||
                                              data.ott === 'paramount') &&
                                              'TVING'}
                                            {(data.ott === 'watchaOriginal' || data.ott === 'watchaExclusive') &&
                                              'WATCHA'}
                                            {(data.ott === 'wavveOriginal' || data.ott === 'wavveOnly') && 'Wavve'}
                                            에서 시청하기
                                          </Anchor>
                                        )}
                                        {data.ott === null && data.ottAddr !== null && (
                                          <Anchor href={data.ottAddr}>
                                            단편영화 &apos;{data.titleKorean ? data.titleKorean : data.title}
                                            &apos; 보러가기
                                          </Anchor>
                                        )}
                                      </dt>
                                      <dd>
                                        <strong>
                                          <span className={`${styles.title} seed`} aria-label="작품명">
                                            {data.titleKorean ? data.titleKorean : data.title}
                                          </span>
                                          {data.lang === 'chineseBeonche' && <span lang="zh-Hant">{data.title} </span>}
                                          {data.lang === 'chineseGanche' && <span lang="zh-Hans">{data.title} </span>}
                                          {data.lang === 'europe' && <span lang="en">{data.title}</span>}
                                          {data.lang === 'english' && <span lang="en-US">{data.title}</span>}
                                          {data.lang === 'japanese' && <span lang="ja">{data.title}</span>}
                                          {data.lang === 'thai' && <span lang="th">{data.title}</span>}
                                        </strong>
                                      </dd>
                                    </dl>
                                    <dl className={styles.info}>
                                      {data.country !== '?' && (
                                        <div>
                                          <dt>제작국가</dt>
                                          <dd className="seed">{data.country}</dd>
                                        </div>
                                      )}
                                      {data.release !== '?' && (
                                        <div>
                                          <dt>
                                            {(data.category === 'drama' ||
                                              data.category === 'ott_drama' ||
                                              data.category === 'ott_anime' ||
                                              data.anime === 'tva' ||
                                              data.anime === 'ova') &&
                                              '방영년도'}
                                            {(data.category === 'film' ||
                                              data.category === 'anime_film' ||
                                              data.category === 'ott_anime_film' ||
                                              data.category === 'ott_film' ||
                                              data.anime === 'film') &&
                                              '상영년도'}
                                            {data.category === 'game' && '출시년도'}
                                          </dt>
                                          <dd className="seed">{data.release}년</dd>
                                        </div>
                                      )}
                                      {data.runningTime && (
                                        <div>
                                          <dt>재생시간</dt>
                                          <dd>
                                            {data.runningTime}분{formatTime(data.runningTime)}
                                          </dd>
                                        </div>
                                      )}
                                      {data.supportLang !== null && <ADCC items={data.supportLang} />}
                                      {data.genre !== '?' && data.tags === null && (
                                        <div>
                                          <dt>장르</dt>
                                          <dd className="seed">{data.genre}</dd>
                                        </div>
                                      )}
                                      {data.genre !== '?' && data.tags !== null && (
                                        <TagsItem items={data} type="genre" />
                                      )}
                                      {data.studio && (
                                        <div>
                                          <dt>스튜디오</dt>
                                          <dd className="seed">{data.studio}</dd>
                                        </div>
                                      )}
                                      {data.distributor ? (
                                        data.publisher !== '?' && (
                                          <>
                                            <div>
                                              <dt>제작</dt>
                                              <dd className="seed">{data.distributor}</dd>
                                            </div>
                                            <div>
                                              <dt>제작참여</dt>
                                              <dd className="seed">{data.publisher}</dd>
                                            </div>
                                          </>
                                        )
                                      ) : (
                                        <div>
                                          <dt>{data.category === 'game' ? '유통/배급' : '제작/배급'}</dt>
                                          <dd className="seed">{data.publisher}</dd>
                                        </div>
                                      )}
                                      {data.director && (
                                        <div>
                                          <dt>감독/연출</dt>
                                          <dd className="seed">{data.director}</dd>
                                        </div>
                                      )}
                                      {data.creator !== '?' && (
                                        <div>
                                          <dt>{data.category === 'game' ? '개발' : '주요 제작자'}</dt>
                                          <dd className="seed">{data.creator}</dd>
                                        </div>
                                      )}
                                      {data.cast !== null && (
                                        <div>
                                          {data.category !== 'anime' &&
                                          data.category !== 'anime_film' &&
                                          data.category !== 'ott_anime' &&
                                          data.category !== 'ott_anime_film' &&
                                          data.category !== 'game' ? (
                                            <dt>주요 출연자</dt>
                                          ) : (
                                            <dt>주요 성우</dt>
                                          )}
                                          <dd className="seed">{data.cast}</dd>
                                        </div>
                                      )}
                                    </dl>
                                    <div className={styles.more}>
                                      ...{' '}
                                      <button type="button" onClick={() => handleButtonClick(String(data.id))}>
                                        <span>더보기</span>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                        </div>
                        {Array.isArray(jejeupData.amusementData) && jejeupData.amusementData.length == 1 && (
                          <div className={styles.posters}>
                            <h2 className="April16thPromise">
                              {jejeupData.amusementData[0].category === 'game' ? '배너/썸네일' : '비주얼/포스터'}
                            </h2>
                            <div
                              className={`${styles['poster-list']} ${jejeupData.amusementData[0].category === 'game' ? styles['posters-game'] : styles['posters-other']}`}
                            >
                              <div className={styles.poster}>
                                <Image
                                  src={jejeupData.amusementData[0].posterDefault}
                                  alt=""
                                  width={jejeupData.amusementData[0].category === 'game' ? 460 : 390}
                                  height={jejeupData.amusementData[0].category === 'game' ? 215 : 560}
                                  unoptimized
                                />
                              </div>
                              {jejeupData.amusementData[0].posterOther && (
                                <div className={styles.poster}>
                                  <Image
                                    src={jejeupData.amusementData[0].posterOther}
                                    alt=""
                                    width={jejeupData.amusementData[0].category === 'game' ? 460 : 390}
                                    height={jejeupData.amusementData[0].category === 'game' ? 215 : 560}
                                    unoptimized
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={styles.title}>
                        <div className={styles.function}>
                          <button onClick={copyToClipboard}>
                            <ClipboardIcon /> <span>URL 복사</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className={`${styles.preview} preview`}>
                  <div className={styles.video}>
                    <YouTubeController
                      videoId={'erONHczFnGA'}
                      videoImage={'https://i.ytimg.com/vi/erONHczFnGA/hqdefault.jpg'}
                    />
                  </div>
                  <div className={styles.youtube}>
                    <h1>영상 재생에 문제가 있다는 제보가 들어와 삭제 처리된 페이지입니다. 뒤로 돌아가세요.</h1>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={`${styles.preview} preview`}>
              <div className={styles.video}>
                <YouTubeController
                  videoId={'ARJ5bXkof30'}
                  videoImage={'https://i.ytimg.com/vi/ARJ5bXkof30/hqdefault.jpg'}
                />
              </div>
              <div className={styles.youtube}>
                <h1>없는 페이지이므로 체념하고 돌아가세요! 404 NOT FOUND PAGE!</h1>
              </div>
            </div>
          )}
        </div>
        {jejeupData.attributes && jejeupData.attributes.publishedAt !== null && (
          <>
            {Array.isArray(jejeupData.amusementData) &&
              jejeupData.amusementData[0].category === 'game_fan' &&
              jejeupData.attributes.title !== null && (
                <GameList
                  game={Number(jejeupData.attributes.title)}
                  current={jejeupId}
                  creator={jejeupData.amusementData[0].title}
                />
              )}
            {Array.isArray(jejeupData.amusementData) && (
              <ReviewList review={jejeupData.attributes.amusements} current={jejeupId} />
            )}
            {Array.isArray(jejeupData.amusementData) && <RelatedList related={jejeupData.amusementData} />}
          </>
        )}
      </article>
      {selectedAmusementId && selectedAmusement && (
        <AmusementDetail amusement={selectedAmusement} sorting="review" onClose={handleCloseAmusementDetail} />
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const jejeupId = context.params?.jejeupId;
  let jejeupData = null;
  let amusementData = null;

  if (jejeupId && typeof jejeupId === 'string') {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jejeups?id=${jejeupId.substring(14)}`);
    const jejeupResponse = await response.json();
    let createdAt = jejeupResponse.attributes?.createdAt;

    if (createdAt && formatDateDetail(createdAt) === jejeupId.substring(0, 14)) {
      jejeupData = jejeupResponse;
    }
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
