import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData, JejeupAmusementData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import ChoiceBarrierFree from '@/components/ChoiceBarrierFree';
import { vectors } from '@/components/vectors';
import { AmusementItem } from '@/components/AmusementItem';
import styles from '@/styles/Categories.module.sass';

const HangukBackground = styled.div({
  background: `url(${vectors.supportLang}) no-repeat 50% 50%/cover`,
});

const fetchSequentially = async (urls: any) => {
  const results = [];
  for (const url of urls) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    results.push(data);
  }
  return results;
};

const LoadingIndicator = () => {
  const loadingBlocks = Array.from({ length: 7 }, (_, index) => index);
  return (
    <>
      {loadingBlocks.map((_, index) => (
        <div key={index} className={styles['loading-indicator']} aria-hidden="true">
          <i />
          <strong />
        </div>
      ))}
    </>
  );
};

function BarrierFree({ ccData, ccError }: { ccData: any; ccError: string }) {
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
    sessionStorage.removeItem('tag');
    sessionStorage.removeItem('platform');
    sessionStorage.removeItem('hanguk');
    sessionStorage.removeItem('subdub');

    sessionStorage.removeItem('ai');
    sessionStorage.removeItem('works');

    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem('semoview', router.asPath);
    sessionStorage.setItem('bfree', router.asPath);
  }, [router.asPath]);

  const [descriptionData, setDescriptionData] = useState<JejeupAmusementData | null>(null);
  const [bfreeData, setBfreeData] = useState<JejeupAmusementData | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urls = [
      `/api/subdub?page=1&pageSize=7&subdubName=description`,
      `/api/subdub?page=1&pageSize=7&subdubName=bfree`,
    ];

    fetchSequentially(urls)
      .then((results) => {
        setDescriptionData(results[0]);
        setBfreeData(results[1]);
      })
      .catch((error) => setError(error.message));
  }, []);

  return (
    <main className={styles.categories}>
      <Seo
        pageTitles={`베리어프리 지원 여부 확인하기 - ${originTitle}`}
        pageTitle={`베리어프리 지원 여부 확인하기`}
        pageDescription="청각 장애인용 자막 (CC), 화면 해설 (AD)"
        pageImg={`https://semo.dev1stud.io/og-barrier-free.webp?ts=${timestamp}`}
      />
      <ChoiceBarrierFree />
      <div className="headline">
        <h1 className="April16thPromise">
          <em dangerouslySetInnerHTML={{ __html: '베리어프리<br />지원 작품!' }} />
        </h1>
      </div>
      {ccError && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      <div className={styles.content}>
        {!ccError && ccData && (
          <>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?bfree=cc&page=1">청각 장애인용 자막 지원!</Anchor>
                {process.env.NODE_ENV === 'development' && ` ${ccData.total}개`}
              </h2>
              <Anchor href="/amusement?bfree=cc&page=1">
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
              {Array.isArray(ccData.data) &&
                ccData.data.map((amusement: AmusementData, index: number) => (
                  <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                    <AmusementItem amusement={amusement} supportLanguage={'cc'} />
                    <strong>
                      <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                    </strong>
                  </Link>
                ))}
            </section>
          </>
        )}
        <div className={styles.headline}>
          <h2 className="April16thPromise">
            <Anchor href="/amusement?bfree=description&page=1">화면 해설 지원!</Anchor>
            {process.env.NODE_ENV === 'development' && descriptionData && ` ${descriptionData.total}개`}
          </h2>
          <Anchor href="/amusement?bfree=description&page=1">
            <span>더보기</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z" fill="black" />
            </svg>
          </Anchor>
        </div>
        <section>
          {!error && descriptionData ? (
            <>
              {Array.isArray(descriptionData.data) &&
                descriptionData.data.map((amusement: AmusementData, index: number) => (
                  <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                    <AmusementItem amusement={amusement} supportLanguage={'description'} />
                    <strong>
                      <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                    </strong>
                  </Link>
                ))}
            </>
          ) : (
            <LoadingIndicator />
          )}
        </section>
        <div className={styles.headline}>
          <h2 className="April16thPromise">
            <Anchor href="/amusement?bfree=bfree&page=1">CC(SDH)S/AD 둘다 지원하는 작품!</Anchor>
            {process.env.NODE_ENV === 'development' && bfreeData && ` ${bfreeData.total}개`}
          </h2>
          <Anchor href="/amusement?bfree=bfree&page=1">
            <span>더보기</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z" fill="black" />
            </svg>
          </Anchor>
        </div>
        <section>
          {!error && bfreeData ? (
            <>
              {Array.isArray(bfreeData.data) &&
                bfreeData.data.map((amusement: AmusementData, index: number) => (
                  <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                    <AmusementItem amusement={amusement} supportLanguage={'bfree'} />
                    <strong>
                      <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                    </strong>
                  </Link>
                ))}
            </>
          ) : (
            <LoadingIndicator />
          )}
        </section>
        <aside className={styles.hanguk}>
          <HangukBackground />
          <p>자막/더빙 작품 확인!</p>
          <p className="April16thPromise">
            <Anchor href="/subdub">작품 확인하기!</Anchor>
          </p>
        </aside>
      </div>
    </main>
  );
}

export default BarrierFree;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let ccData = null;
  let ccError = null;

  try {
    const cc = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bfree?page=1&pageSize=7&bfreeName=cc`);
    if (!cc.ok) {
      throw new Error('Network response was not ok');
    }
    ccData = await cc.json();
  } catch (err) {
    ccError = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      ccData,
      ccError,
    },
  };
};
