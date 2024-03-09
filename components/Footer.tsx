import styles from '@/styles/Footer.module.sass';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          &copy; Copyrights <strong>DEV1.studio</strong> <span>All rights reserved.</span>
        </p>
        <p className={styles.copyrights}>
          모든 영상은 YouTube 및 각 영상 제작자에게 저작권이 있으며,{' '}
          <span>영상에서 사용된 원본 소스는 원본 소스 제작사에게 저작권이 있습니다.</span>
        </p>
        <p className={styles.scp}>
          SCP 재단 로고를 포함한 SCP 재단 관련 콘텐츠는 Creative Commons Sharelike 3.0에 따라 라이선스가 부여되며, 모든
          콘셉트의 출처는 https://scpwiki.com/ 및 해당 저자에서 비롯됩니다.{' '}
          <span>이 콘텐츠들에서 파생된 영상은 이에 따라 Creative Commons Sharealike 3.0에 따라 배포됩니다.</span>
        </p>
      </div>
    </footer>
  );
}
