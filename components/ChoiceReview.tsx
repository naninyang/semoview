import { useRouter } from 'next/router';
import Anchor from './Anchor';
import styled from '@emotion/styled';
import { vectors } from './vectors';
import styles from '@/styles/Reviews.module.sass';

const WarningIcon = styled.i({
  background: `url(${vectors.warning}) no-repeat 50% 50%/contain`,
});

export default function ChoiceReview() {
  const router = useRouter();
  return (
    <div className={styles.choice}>
      <p>
        <WarningIcon /> 모아보기 링크를 누른 뒤 잠시만 기다려 주세요! 속도가 다소 느립니다.
      </p>
      <ul>
        <li className={router.pathname === '/reviews' ? styles.current : ''}>
          <Anchor href="/reviews">리뷰 모아보기</Anchor>
        </li>
        <li className={router.pathname === '/live' ? styles.current : ''}>
          <Anchor href="/live">게임실황 모아보기</Anchor>
        </li>
        <li className={router.pathname === '/zip' ? styles.current : ''}>
          <Anchor href="/zip">요약 모아보기</Anchor>
        </li>
      </ul>
    </div>
  );
}
