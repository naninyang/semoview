import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { isSafari } from 'react-device-detect';
import { NoticeData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import { BackButton } from '@/components/Icons';
import Anchor from '@/components/Anchor';
import styles from '@/styles/Notice.module.sass';

interface NoticeProps {
  notices: NoticeData[];
}

const Notices: NextPage<NoticeProps> = ({ notices }) => {
  const [noticesData, setNoticesData] = useState<NoticeData[]>([]);
  useEffect(() => {
    setNoticesData(notices);
  }, [notices]);

  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [deviceSafari, setDeviceSafari] = useState<string>();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const onInstallPWA = () => {
    if (deferredPrompt) {
      const promptEvent = deferredPrompt as any;
      promptEvent.prompt();
      promptEvent.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };
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
    <main className={styles.notice}>
      <Seo
        pageTitles={`공지사항 - ${originTitle}`}
        pageTitle="공지사항"
        pageDescription="세모뷰 공지를 확인하세요"
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
          <span className={`${isSafari ? 'April16thPromise' : 'April16thLife'}`}>공지사항</span>
          <em className={`${isSafari ? 'April16thPromise' : 'April16thSafety'}`}>semoview.notices</em>
        </h1>
        <div className={styles.summary}>
          <div className={styles['button-group']}>
            <Anchor href="/contact-us">문의하기</Anchor>
            {deviceSafari !== 'isSafari' && (
              <button type="button" onClick={onInstallPWA}>
                앱 내려받기
              </button>
            )}
          </div>
        </div>
        <div className={styles.notices}>
          <hr />
          <ul>
            {noticesData
              .filter((notice) => notice.platform === 'jejeup')
              .map((notice) => (
                <li key={notice.idx}>
                  <Anchor key={notice.idx} href={`/notices/${notice.idx}`} scroll={false} shallow={true}>
                    <strong>
                      <span>{notice.subject}</span>
                    </strong>
                    <time>{notice.created}</time>
                  </Anchor>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices`);
  const data = await response.json();

  return {
    props: { notices: data },
  };
};

export default Notices;
