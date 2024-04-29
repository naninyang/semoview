import styles from '@/styles/Footer.module.sass';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright} lang="en">
          &copy; Copyrights <strong>DEV1.studio</strong> <span>All rights reserved.</span>
        </p>
        <p className={styles.copyrights}>
          모든 YouTube 영상은 YouTube 및 각 영상 제작자에게 저작권이 있으며, 영상에서 사용된 원본 소스는 원본 소스
          제작사에게 저작권이 있습니다, 또한 모든 작품은 각 작품의 이해관계자에게 저작권이 있습니다.{' '}
          <span>
            OTT 및 방송국의 브랜드 로고는 각 OTT 플랫폼 서비스 및 방송사에 권리가 있으며 리뷰에서 언급되는 OTT 작품은
            OTT 서비스 구독 이후 시청 가능합니다.
          </span>{' '}
          OTT 플랫폼은 Amazon(Prime Video), Apple TV+, Disney+/Star+, NETFLIX, TVING/Paramount+, WATCHA, Wavve 서비스의
          작품을 다루고 있습니다.{' '}
          <span>
            한국에 공식으로 수입이 된 경우에 수집이 되며 시간이 지남에 따라 판권이 만료된 경우도 일부 존재하며 경우에
            따라 수입이 된 적이 없는 작품도 등록되어 있습니다. 한국에서 등급을 받지 않은 경우, 따로 표시를 하여 착오하는
            경우가 없게 장치가 되어있습니다.
          </span>
        </p>
        <p className={styles.scp}>
          SCP 재단 로고를 포함한 SCP 재단 관련 콘텐츠는 Creative Commons Sharelike 3.0에 따라 라이선스가 부여되며, 모든
          콘셉트의 출처는 scpwiki.com 및 해당 저자에서 비롯됩니다.{' '}
          <span>이 콘텐츠들에서 파생된 영상은 이에 따라 Creative Commons Sharealike 3.0에 따라 배포됩니다.</span>
        </p>
      </div>
    </footer>
  );
}
