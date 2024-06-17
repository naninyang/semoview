import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { RecommendData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import styles from '@/styles/Categories.module.sass';

function Recommends({ aiData, error }: { aiData: any; error: string }) {
  const router = useRouter();
  const timestamp = Date.now();

  useEffect(() => {
    sessionStorage.setItem('ai', router.asPath);
  }, [router.asPath]);

  return (
    <main className={styles.ai}>
      <Seo
        pageTitles={`AI가 추천해주는 작품 - ${originTitle}`}
        pageTitle={`AI가 추천해주는 작품`}
        pageDescription="AI(ChatGPT 4o)가 골라준 작품"
        pageImg={`https://semo.dev1stud.io/og-ai.webp?ts=${timestamp}`}
      />
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
          {aiData && (
            <>
              <div className="headline">
                <h1 className="April16thPromise">
                  <em>AI가 추천해주는 작품</em>
                </h1>
              </div>
              {Array.isArray(aiData.data) && (
                <section>
                  {aiData.data
                    .filter((ai: RecommendData) => {
                      if (process.env.NODE_ENV === 'production') {
                        return ai.isPublish;
                      } else return true;
                    })
                    .map((ai: RecommendData, index: number) => (
                      <div className={styles.thumbnail} key={index}>
                        <Link href={`/recommend/${ai.idx}`} scroll={true} shallow={true}>
                          <Image
                            src={`https://cdn.dev1stud.io/semoview/ai/ai-${ai.id}.webp`}
                            alt={ai.subject}
                            width="1858"
                            height="1080"
                            unoptimized
                            priority
                          />
                        </Link>
                      </div>
                    ))}
                </section>
              )}
            </>
          )}
        </div>
      )}
    </main>
  );
}

export default Recommends;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query.page) || 1;
  let aiData = null;
  let error = null;

  try {
    const ai = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recommend?page=1&pageSize=48`);
    if (!ai.ok) {
      throw new Error('Network response was not ok');
    }
    aiData = await ai.json();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      aiData,
      error,
      currentPage,
    },
  };
};
