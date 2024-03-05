import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Anchor from './Anchor';
import { vectors } from './vectors';
import styles from '@/styles/Header.module.sass';

const JejeupLogo = styled.i({
  background: `url(${vectors.jejeup}) no-repeat 50% 50%/contain`,
});

export default function Header() {
  const router = useRouter();
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

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
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {router.pathname === '/' || router.pathname === '/categories' ? undefined : <s />}
        <h1>
          {router.pathname === '/' ? (
            <button
              type="button"
              onClick={() => {
                (window.location.reload as (cache: boolean) => void)(true);
              }}
            >
              <JejeupLogo />
              <span>제목에 제목이 없어서 짜증나서 만든 사이트</span>
            </button>
          ) : (
            <Anchor href="/">
              <JejeupLogo />
              <span>제목에 제목이 없어서 짜증나서 만든 사이트</span>
            </Anchor>
          )}
        </h1>
        <nav>
          <ol>
            <li>
              <Anchor href="/notices">문의&공지</Anchor>
            </li>
            <li>
              <Anchor href="/open-sources">오픈소스</Anchor>
            </li>
          </ol>
        </nav>
      </div>
      {(router.pathname === '/' || router.pathname === '/categories') && (
        <div className={styles.tab}>
          <nav>
            <ol>
              <li className={router.pathname === '/' ? styles.current : ''}>
                <Anchor href="/">
                  <span>영상 기준 정렬</span>
                </Anchor>
              </li>
              <li className={router.pathname === '/categories' ? styles.current : ''}>
                <Anchor href="/categories">
                  <span>타이틀 기준 정렬</span>
                </Anchor>
              </li>
            </ol>
          </nav>
        </div>
      )}
    </header>
  );
}
