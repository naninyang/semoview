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

  return (
    <header
      className={`${styles.header} ${router.pathname === '/amusement/[amusementId]' || router.pathname === '/recommend/[recommendId]' || router.pathname === '/open-sources' ? styles.dark : router.pathname === '/' ? styles.main : ''}`}
    >
      <div className={styles.container}>
        {router.pathname === '/' ||
        router.pathname === '/reviews' ||
        router.pathname === '/live' ||
        router.pathname === '/zip' ||
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
              router.pathname === '/reviews' ||
              router.pathname === '/live' ||
              router.pathname === '/zip' ||
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
              <Anchor href="/works">작품목록</Anchor>
            </li>
            <li>
              <Anchor href="/contact-us">문의하기</Anchor>
            </li>
          </ol>
        </nav>
      </div>
      {(router.pathname === '/reviews' ||
        router.pathname === '/live' ||
        router.pathname === '/zip' ||
        router.pathname === '/categories' ||
        router.pathname === '/tags' ||
        router.pathname === '/platforms' ||
        router.pathname === '/hanguk' ||
        router.pathname === '/subdub' ||
        router.pathname === '/barrier-free' ||
        router.pathname === '/recommends') && (
        <div className={styles.tab}>
          <nav>
            <ol>
              <li
                className={
                  router.pathname === '/reviews' || router.pathname === '/live' || router.pathname === '/zip'
                    ? styles.current
                    : ''
                }
              >
                <Anchor href="/reviews">
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
                  <span>작품정보</span>
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
              <li className={router.pathname === '/recommends' ? styles.current : ''}>
                <Anchor href="/recommends">
                  <span>AI추천</span>
                </Anchor>
              </li>
            </ol>
          </nav>
        </div>
      )}
    </header>
  );
}
