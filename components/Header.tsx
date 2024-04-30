import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Anchor from './Anchor';
import { vectors } from './vectors';
import styles from '@/styles/Header.module.sass';

const JejeupLogo = styled.i({
  background: `url(${vectors.jejeup}) no-repeat 50% 50%/contain`,
});

const JejeupAmuse = styled.i({
  background: `url(${vectors.jejeupAmuse}) no-repeat 50% 50%/contain`,
});

const JejeupDefault = styled.i({
  background: `url(${vectors.jejeupDefault}) no-repeat 50% 50%/contain`,
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
    <header className={`${styles.header} ${router.pathname === '/amusement/[amusementId]' ? styles.amusement : ''}`}>
      <div className={styles.container}>
        {router.pathname === '/' ||
        router.pathname === '/categories' ||
        router.pathname === '/tags' ||
        router.pathname === '/platforms' ? undefined : (
          <s />
        )}
        <h1>
          <Anchor href="/">
            {router.pathname === '/amusement/[amusementId]' ? (
              <JejeupAmuse />
            ) : router.pathname === '/' ||
              router.pathname === '/categories' ||
              router.pathname === '/tags' ||
              router.pathname === '/platforms' ? (
              <JejeupDefault />
            ) : (
              <JejeupLogo />
            )}
            <span>세상의 모든 리뷰</span>
          </Anchor>
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
      {(router.pathname === '/' ||
        router.pathname === '/categories' ||
        router.pathname === '/tags' ||
        router.pathname === '/platforms') && (
        <div className={styles.tab}>
          <nav>
            <ol>
              <li className={router.pathname === '/' ? styles.current : ''}>
                <Anchor href="/">
                  <span>영상 기준 정렬</span>
                </Anchor>
              </li>
              <li
                className={
                  router.pathname === '/categories' || router.pathname === '/tags' || router.pathname === '/platforms'
                    ? styles.current
                    : ''
                }
              >
                <Anchor href="/categories">
                  <span>작품 기준 정렬</span>
                </Anchor>
              </li>
            </ol>
          </nav>
        </div>
      )}
    </header>
  );
}
