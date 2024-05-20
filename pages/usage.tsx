import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { isSafari } from 'react-device-detect';
import Seo, { originTitle } from '@/components/Seo';
import { BackButton } from '@/components/Icons';
import styles from '@/styles/Usage.module.sass';

function Usage() {
  const [deviceSafari, setDeviceSafari] = useState<string>();

  useEffect(() => {
    if (isSafari) {
      setDeviceSafari('isSafari');
    }
  }, []);

  const router = useRouter();
  const previousPageHandler = () => {
    const previousPage = sessionStorage.getItem('backhistory');
    if (previousPage) {
      router.push(`${previousPage}`);
    } else {
      router.push('/');
    }
  };

  const timestamp = Date.now();

  return (
    <main className={styles.usage}>
      <Seo
        pageTitles={`이용안내 - ${originTitle}`}
        pageTitle="이용안내"
        pageDescription="이용 안내"
        pageImg={`https://semo.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <div className="top-link">
        <button onClick={previousPageHandler} type="button">
          <BackButton />
          <span>뒤로가기</span>
        </button>
      </div>
      <div className={styles.content}>
        <h1>
          <span className={`${isSafari ? 'April16thPromise' : 'April16thLife'}`}>이용안내</span>
          <em className={`${isSafari ? 'April16thPromise' : 'April16thSafety'}`}>semoview.usage</em>
        </h1>
        <div className={styles.container}>
          <article>
            <h2>세모뷰?</h2>
            <section>
              <p>
                평소에 리뷰 유튜버들이 작품정보를 <span>영상 제목이나 썸네일에 넣지 않아</span> 정보를 알 수 없어
                불편하셨나요?
              </p>
              <p>
                &apos;세모뷰&apos;에서는 그런 리뷰 영상들을 모아서{' '}
                <span>눌러보기 전에 어떤 영상인지 알려드립니다!</span>
              </p>
            </section>
          </article>
          <article>
            <h2>심의등급 안내</h2>
            <section>
              <p>
                한국 내에서 심의를 받은 콘텐츠는 공식 심의등급이 표시가 되며 그렇지 않은 경우에는 세모뷰 임의로 등급을
                정합니다.
              </p>
              <p>세모뷰 자체 심의등급은 법적 구속력이 없습니다.</p>
            </section>
          </article>
          <article>
            <h2>베리어프리 콘텐츠 이용 안내</h2>
            <section>
              <p>베리어프리 영상은 2024년 2분기 기준으로 판권 등록된 OTT 기준으로 링크를 제공하고 있습니다.</p>
              <p>웨이브와 Apple TV+의 이용방법은 각 링크 하단에 첨부된 내용을 확인해 주세요.</p>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}

export default Usage;
