import styled from '@emotion/styled';
import Anchor from './Anchor';
import { vectors } from './vectors';
import styles from '@/styles/Header.module.sass';

const JejeupLogo = styled.i({
  background: `url(${vectors.jejeup}) no-repeat 50% 50%/contain`,
});

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>
          <Anchor href="/">
            <JejeupLogo />
            <span>제목에 제목이 없어서 짜증나서 만든 사이트</span>
          </Anchor>
        </h1>
        <nav>
          <ol>
            <li>
              <Anchor href="/notices">공지사항</Anchor>
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
