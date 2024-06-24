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

function Hanguk({ subtitleData, subtitleError }: { subtitleData: any; subtitleError: string }) {
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
    sessionStorage.removeItem('subdub');
    sessionStorage.removeItem('bfree');

    sessionStorage.removeItem('ai');
    sessionStorage.removeItem('works');

    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem('semoview', router.asPath);
    sessionStorage.setItem('hanguk', router.asPath);
  }, [router.asPath]);

  const [subtitleGameData, setSubtitleGameData] = useState<JejeupAmusementData | null>(null);
  const [dubbingData, setDubbingData] = useState<JejeupAmusementData | null>(null);
  const [unofficialGameData, setUnofficialGameData] = useState<JejeupAmusementData | null>(null);
  const [ccData, setCcData] = useState<JejeupAmusementData | null>(null);
  const [descriptionData, setDescriptionData] = useState<JejeupAmusementData | null>(null);

  const [subtitleGameLoading, setSubtitleGameLoading] = useState(true);
  const [dubbingLoading, setDubbingLoading] = useState(true);
  const [unofficialGameLoading, setUnofficialGameLoading] = useState(true);
  const [ccLoading, setCcLoading] = useState(true);
  const [descriptionLoading, setDescriptionLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('/api/hanguk?page=1&pageSize=5&hangukName=subtitle&categoryName=game');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        setSubtitleGameData(data);
        setSubtitleGameLoading(false);

        response = await fetch('/api/hanguk?page=1&pageSize=7&hangukName=dubbing');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setDubbingData(data);
        setDubbingLoading(false);

        response = await fetch('/api/hanguk?page=1&pageSize=5&hangukName=unofficial&categoryName=game');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setUnofficialGameData(data);
        setUnofficialGameLoading(false);

        response = await fetch('/api/hanguk?page=1&pageSize=7&hangukName=cc');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setCcData(data);
        setCcLoading(false);

        response = await fetch('/api/hanguk?page=1&pageSize=7&hangukName=description');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setDescriptionData(data);
        setDescriptionLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('알 수 없는 오류');
        }
        setSubtitleGameLoading(false);
        setDubbingLoading(false);
        setUnofficialGameLoading(false);
        setCcLoading(false);
        setDescriptionLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className={styles.categories}>
      <Seo
        pageTitles={`자막/더빙/베리어프리 지원 여부 확인하기 - ${originTitle}`}
        pageTitle={`자막/더빙/베리어프리 지원 여부 확인하기`}
        pageDescription="한글 자막, 한국어 더빙, 베리어프리(CC/AD)"
        pageImg={`https://semo.dev1stud.io/og-hanguk.webp?ts=${timestamp}`}
      />
      <ChoiceBarrierFree />
      <div className="headline">
        <h1 className="April16thPromise">
          <em dangerouslySetInnerHTML={{ __html: '자막/더빙/베리어프리<br />지원 작품!' }} />
        </h1>
      </div>
      {subtitleError ||
        (error && (
          <div className={styles.error}>
            <p>데이터를 불러오는데 실패했습니다.</p>
            <button type="button" onClick={() => window.location.reload()}>
              다시 시도
            </button>
          </div>
        ))}
      <div className={styles.content}>
        {!subtitleError && subtitleData && (
          <>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?hanguk=subtitle&page=1">한글 자막 공식 지원!</Anchor>
                {process.env.NODE_ENV === 'development' && ` ${subtitleData.total}개`}
              </h2>
              <Anchor href="/amusement?hanguk=subtitle&page=1">
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
              {Array.isArray(subtitleData.data) &&
                subtitleData.data.map((amusement: AmusementData, index: number) => (
                  <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                    <AmusementItem amusement={amusement} supportLanguage={'subtitle'} />
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
                <Anchor href="/amusement?hanguk=subtitle&category=game&page=1">
                  한글 UI 또는 자막 공식 지원 게임!
                </Anchor>
                {process.env.NODE_ENV === 'development' && subtitleGameData && ` ${subtitleGameData.total}개`}
              </h2>
              <Anchor href="/amusement?hanguk=subtitle&category=game&page=1">
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
              {!subtitleGameLoading ? (
                <>
                  {subtitleGameData &&
                    Array.isArray(subtitleGameData.data) &&
                    subtitleGameData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} supportLanguage={'subtitle'} isGame={true} />
                        <strong>
                          <span className="seed">
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
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
                <Anchor href="/amusement?hanguk=dubbing&page=1">한국어 더빙 공식 지원!</Anchor>
                {process.env.NODE_ENV === 'development' && dubbingData && ` ${dubbingData.total}개`}
              </h2>
              <Anchor href="/amusement?hanguk=dubbing&page=1">
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
              {!dubbingLoading ? (
                <>
                  {dubbingData &&
                    Array.isArray(dubbingData.data) &&
                    dubbingData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} supportLanguage={'dubbing'} />
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
                <Anchor href="/amusement?hanguk=unofficial&category=game&page=1">비공식 한글 자막 지원 게임!</Anchor>
                {process.env.NODE_ENV === 'development' && unofficialGameData && ` ${unofficialGameData.total}개`}
              </h2>
              <Anchor href="/amusement?hanguk=unofficial&category=game&page=1">
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
              {!unofficialGameLoading ? (
                <>
                  {unofficialGameData &&
                    Array.isArray(unofficialGameData.data) &&
                    unofficialGameData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} supportLanguage={'unofficial'} isGame={true} />
                        <strong>
                          <span className="seed">
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
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
                <Anchor href="/amusement?hanguk=cc&page=1">청각 장애인용 자막 지원!</Anchor>
                {process.env.NODE_ENV === 'development' && ccData && ` ${ccData.total}개`}
              </h2>
              <Anchor href="/amusement?hanguk=cc&page=1">
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
              {!ccLoading ? (
                <>
                  {ccData &&
                    Array.isArray(ccData.data) &&
                    ccData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} supportLanguage={'cc'} />
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
                <Anchor href="/amusement?hanguk=description&page=1">화면 해설 지원!</Anchor>
                {process.env.NODE_ENV === 'development' && descriptionData && ` ${descriptionData.total}개`}
              </h2>
              <Anchor href="/amusement?hanguk=description&page=1">
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
              {!descriptionLoading ? (
                <>
                  {descriptionData &&
                    Array.isArray(descriptionData.data) &&
                    descriptionData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} supportLanguage={'description'} />
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
          </>
        )}
        <div className={styles.asides}>
          <HangukBackground />
          <aside>
            <p>한눈에 모든 작품 보기! (게임 제외)</p>
            <p className="April16thPromise">
              <Anchor href="/amusement?hanguk=anything&page=1">작품 확인하기!</Anchor>
            </p>
          </aside>
          <hr />
          <aside>
            <p>한눈에 모든 게임 보기!</p>
            <p className="April16thPromise">
              <Anchor href="/amusement?hanguk=anything&category=game&page=1">게임 확인하기!</Anchor>
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Hanguk;

export const getServerSideProps: GetServerSideProps = async () => {
  let subtitleData = null;
  let subtitleError = null;

  try {
    const subtitle = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hanguk?page=1&pageSize=7&hangukName=subtitle`);
    if (!subtitle.ok) {
      throw new Error('Network response was not ok');
    }
    subtitleData = await subtitle.json();
  } catch (err) {
    subtitleError = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      subtitleData,
      subtitleError,
    },
  };
};
