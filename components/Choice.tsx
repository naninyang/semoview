import { useRouter } from 'next/router';
import Anchor from './Anchor';
import styles from '@/styles/Categories.module.sass';

export default function Choice() {
  const router = useRouter();
  return (
    <div className={styles.choice}>
      <ul>
        <li className={router.pathname === '/categories' ? styles.current : ''}>
          <Anchor href="/categories">카테고리 골라보기</Anchor>
        </li>
        <li className={router.pathname === '/tags' ? styles.current : ''}>
          <Anchor href="/tags">태그 골라보기</Anchor>
        </li>
        <li className={router.pathname === '/platform' ? styles.current : ''}>
          <Anchor href="/platform">OTT & 방송사 골라보기</Anchor>
        </li>
      </ul>
    </div>
  );
}
