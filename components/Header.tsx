import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Anchor from './Anchor';
import { vectors } from './vectors';
import styles from '@/styles/Header.module.sass';

const SemoviewLogo = styled.i({
  background: `url(${vectors.semoview}) no-repeat 50% 50%/contain`,
});

const SemoviewDark = styled.i({
  background: `url(${vectors.semoviewDark}) no-repeat 50% 50%/contain`,
});

const SemoviewDefault = styled.i({
  background: `url(${vectors.semoviewDefault}) no-repeat 50% 50%/contain`,
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
    <header
      className={`${styles.header} ${router.pathname === '/amusement/[amusementId]' || router.pathname === '/open-sources' ? styles.dark : ''}`}
    >
      <div className={styles.container}>
        {router.pathname === '/' ||
        router.pathname === '/categories' ||
        router.pathname === '/tags' ||
        router.pathname === '/platforms' ||
        router.pathname === '/hanguk' ||
        router.pathname === '/subdub' ||
        router.pathname === '/barrier-free' ? undefined : (
          <s />
        )}
        <h1>
          <Anchor href="/">
            {router.pathname === '/amusement/[amusementId]' || router.pathname === '/open-sources' ? (
              <SemoviewDark />
            ) : router.pathname === '/' ||
              router.pathname === '/categories' ||
              router.pathname === '/tags' ||
              router.pathname === '/platforms' ||
              router.pathname === '/hanguk' ||
              router.pathname === '/subdub' ||
              router.pathname === '/barrier-free' ? (
              <SemoviewDefault />
            ) : (
              <SemoviewLogo />
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
        router.pathname === '/platforms' ||
        router.pathname === '/hanguk' ||
        router.pathname === '/subdub' ||
        router.pathname === '/barrier-free') && (
        <div className={styles.tab}>
          <nav>
            <ol>
              <li className={router.pathname === '/' ? styles.current : ''}>
                <Anchor href="/">
                  <span>리뷰보기</span>
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
                  <span>장르보기</span>
                </Anchor>
              </li>
              <li
                className={
                  router.pathname === '/hanguk' || router.pathname === '/subdub' || router.pathname === '/barrier-free'
                    ? styles.current
                    : ''
                }
              >
                <Anchor href="/hanguk">
                  <span>베리어프리</span>
                </Anchor>
              </li>
            </ol>
          </nav>
        </div>
      )}
    </header>
  );
}
