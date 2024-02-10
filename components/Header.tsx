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
        <button type="button" onClick={onInstallPWA} style={{ display: 'none' }} />
        {router.pathname === '/' || router.pathname === '/jejeup' ? undefined : <s />}
        <h1>
          <Anchor href="/">
            <JejeupLogo />
            <span>제목에 제목이 없어서 짜증나서 만든 사이트</span>
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
    </header>
  );
}
