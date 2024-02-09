import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PullToRefresh from 'react-simple-pull-to-refresh';
import useSWRInfinite from 'swr/infinite';
import { Masonry } from 'masonic';
import { JejeupData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import { CategoryName } from '@/components/CategoryName';
import { FormatDate } from '@/components/FormatDate';
import styles from '@/styles/Home.module.sass';
import Image from 'next/image';
import Link from 'next/link';

export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  });

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${process.env.NEXT_PUBLIC_API_URL}/api/jejeups?page=${pageIndex + 1}`;
};

export default function Home() {
  const timestamp = Date.now();

  useEffect(() => {
    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', 'home');
  }, []);

  const router = useRouter();

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const itemId = Array.isArray(router.query.itemId) ? router.query.itemId[0] : router.query.itemId;

  const jejeups = data ? [].concat(...data) : [];
  const isLoading = !data && !error;
  const isReachingEnd = data && data[data.length - 1]?.length < 20;

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting && !isReachingEnd && !isLoading && (size === 0 || size === 1)) {
      setSize((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(onIntersect);
    observer.observe(target);
    return () => observer && observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!target || isLoading) return;
  }, [target, isLoading]);

  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (itemId !== undefined) {
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    }

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [itemId]);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 671) setColumnCount(1);
    else if (width >= 671 && width <= 922) setColumnCount(2);
    else if (width >= 922 && width <= 1396) setColumnCount(3);
    else setColumnCount(4);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderCard = ({ data }: { data: JejeupData }) => (
    <div className={styles.item}>
      <figure>
        {data.jejeupMetaData && !data.jejeupMetaData.error && (
          <div className={`${styles.preview} preview`}>
            <div className={styles['preview-container']}>
              <Image src={data.jejeupMetaData.ogImage} width="1920" height="1080" alt="" unoptimized />
              <div className={styles['preview-info']}>
                <div className={styles.detail}>
                  <Image src={`${data.jejeupMetaData.ownerAvatar}`} width="36" height="36" alt="" unoptimized />
                  <div className={`${styles['user-info']}`}>
                    <strong>{data.jejeupMetaData.ogTitle}</strong>{' '}
                    <div className={styles.user}>
                      <cite>{data.jejeupMetaData.ownerName}</cite>
                      <time dateTime={data.jejeupMetaData.datePublished}>
                        {FormatDate(`${data.jejeupMetaData.datePublished}`)}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <figcaption>
          <Link key={data.idx} href={`/jejeup/${data.idx}`} scroll={false} shallow={true}>
            <dl className={styles.summary}>
              <dt>
                <em>{CategoryName(data.category)}</em>
              </dt>
              <dd>
                <strong>
                  {data.description} ({data.release})
                </strong>
              </dd>
            </dl>
          </Link>
          <dl className={styles.info}>
            <div>
              <dt>퍼블리셔</dt>
              <dd>{data.publisher}</dd>
            </div>
            <div>
              <dt>주요 제작자</dt>
              <dd>{data.creator}</dd>
            </div>
          </dl>
        </figcaption>
      </figure>
    </div>
  );

  const handleRefresh = async () => {
    window.location.reload();
  };
  const [columnCount, setColumnCount] = useState(1);

  return (
    <main className={styles.main}>
      <Seo
        pageTitles={`노클노플 - ${originTitle}`}
        pageTitle="노클노플"
        pageDescription="노 클릭, 노 플레이"
        pageImg={`https://nol2tr.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <h1>
        <i className="preview" />
        클릭하지 않아도 제목과 정보를 알 수 있게 도와드려요 💃
      </h1>
      <div className={styles.list}>
        {isLoading && <div className={styles.loading}>이것저것 불러오는 중</div>}
        {error && (
          <div className={styles.error}>
            <p>데이터를 불러오는데 실패했습니다.</p>
            <button onClick={() => window.location.reload()}>다시 시도</button>
          </div>
        )}
        {!isLoading && !error && (
          <div className={styles['jejeup-content']}>
            <PullToRefresh onRefresh={handleRefresh}>
              <Masonry
                items={jejeups || []}
                columnCount={columnCount}
                render={renderCard}
                key={jejeups.length}
                data-index={jejeups.length}
              />
            </PullToRefresh>
            {isReachingEnd !== undefined && (
              <div ref={setTarget} className={styles.ref}>
                {isReachingEnd === false && <p>이것저것 불러오는 중</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
