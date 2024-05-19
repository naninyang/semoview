import { useState } from 'react';
import { vectors } from './vectors';
import styles from '@/styles/Footer.module.sass';
import styled from '@emotion/styled';
import Anchor from './Anchor';
import { useRouter } from 'next/router';

type SectionKey = 'sourceCopyright' | 'ottRights' | 'ratingInfo' | 'barrierFreeContent' | 'scpLicense';

const StudioDefault = styled.i({
  background: `url(${vectors.studioDefault}) no-repeat 50% 50%/contain`,
});

const StudioDark = styled.i({
  background: `url(${vectors.studioDark}) no-repeat 50% 50%/contain`,
});

const Dev1studioDark = styled.i({
  background: `url(${vectors.dev1studioDark}) no-repeat 50% 50%/contain`,
});

const Dev1studioLight = styled.i({
  background: `url(${vectors.dev1studioLight}) no-repeat 50% 50%/contain`,
});

const GithubDark = styled.i({
  background: `url(${vectors.githubDark}) no-repeat 50% 50%/contain`,
});

const GithubLight = styled.i({
  background: `url(${vectors.githubLight}) no-repeat 50% 50%/contain`,
});

const Footer = () => {
  const router = useRouter();
  const [visibleSections, setVisibleSections] = useState({
    sourceCopyright: false,
    ottRights: false,
    ratingInfo: false,
    barrierFreeContent: false,
    scpLicense: false,
  });

  const toggleVisibility = (section: SectionKey) => {
    setVisibleSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.site}>
          <Anchor href="https://dev1stud.io">
            {router.pathname === '/amusement/[amusementId]' || router.pathname === '/open-sources' ? (
              <Dev1studioLight />
            ) : (
              <Dev1studioDark />
            )}
            <span>데브런닷스튜디오</span>
          </Anchor>
          <Anchor href="https://github.com/naninyang/semoview">
            {router.pathname === '/amusement/[amusementId]' || router.pathname === '/open-sources' ? (
              <GithubLight />
            ) : (
              <GithubDark />
            )}
            <span>세모뷰 깃헙 저장소</span>
          </Anchor>
        </div>
        <div className={styles.content}>
          <div className={styles.law}>
            <dl>
              <div>
                <dt>
                  <button
                    type="button"
                    aria-expanded={visibleSections.sourceCopyright}
                    onClick={() => toggleVisibility('sourceCopyright')}
                  >
                    소스 저작권 안내
                  </button>
                </dt>
                <dd>
                  {visibleSections.sourceCopyright ? (
                    <strong>
                      모든 YouTube 영상은 YouTube 및 각 영상 제작자에게 저작권이 있으며, 영상에서 사용된 원본 소스는
                      원본 소스 제작사에게 저작권이 있습니다.{' '}
                      <span>또한 모든 작품은 각 작품의 이해관계자에게 저작권이 있습니다.</span>
                    </strong>
                  ) : (
                    <i>버튼을 누르시면 상세 내용을 보실 수 있습니다.</i>
                  )}
                </dd>
              </div>
              <div>
                <dt>
                  <button
                    type="button"
                    aria-expanded={visibleSections.ottRights}
                    onClick={() => toggleVisibility('ottRights')}
                  >
                    OTT 서비스 및 방송사의 권리
                  </button>
                </dt>
                <dd>
                  {visibleSections.ottRights ? (
                    <strong>
                      OTT 및 방송국의 브랜드 로고는 각 OTT 플랫폼 서비스 및 방송사에 권리가 있으며,{' '}
                      <span>리뷰에서 언급되는 OTT 작품은 OTT 서비스 구독 이후 시청 가능합니다.</span>
                    </strong>
                  ) : (
                    <i>버튼을 누르시면 상세 내용을 보실 수 있습니다.</i>
                  )}
                </dd>
              </div>
            </dl>
          </div>
          <div className={styles.etc}>
            <dl>
              <div>
                <dt>
                  <button
                    type="button"
                    aria-expanded={visibleSections.ratingInfo}
                    onClick={() => toggleVisibility('ratingInfo')}
                  >
                    심의등급 안내
                  </button>
                </dt>
                <dd>
                  {visibleSections.ratingInfo ? (
                    <strong>
                      한국 내에서 심의를 받은 콘텐츠는 공식 심의등급이 표시가 되며 그렇지 않은 경우에는 세모뷰 임의로
                      등급을 정합니다. <span>세모뷰 자체 심의등급은 법적 구속력이 없습니다.</span>
                    </strong>
                  ) : (
                    <i>버튼을 누르시면 상세 내용을 보실 수 있습니다.</i>
                  )}
                </dd>
              </div>
              <div>
                <dt>
                  <button
                    type="button"
                    aria-expanded={visibleSections.barrierFreeContent}
                    onClick={() => toggleVisibility('barrierFreeContent')}
                  >
                    베리어프리 콘텐츠 표시
                  </button>
                </dt>
                <dd>
                  {visibleSections.barrierFreeContent ? (
                    <strong>
                      베리어프리 영상은 2024년 2분기 기준으로 판권 등록된 OTT 기준으로 링크를 제공하고 있습니다.{' '}
                      <span>웨이브와 Apple TV+의 이용방법은 각 링크 하단에 첨부된 내용을 확인해 주세요.</span>
                    </strong>
                  ) : (
                    <i>버튼을 누르시면 상세 내용을 보실 수 있습니다.</i>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className={styles.scp}>
          <dl>
            <div>
              <dt>
                <button
                  type="button"
                  aria-expanded={visibleSections.scpLicense}
                  onClick={() => toggleVisibility('scpLicense')}
                >
                  SCP 재단 콘텐츠 라이선스
                </button>
              </dt>
              <dd>
                {visibleSections.scpLicense ? (
                  <strong>
                    SCP 재단 로고를 포함한 SCP 재단 관련 콘텐츠는 Creative Commons Sharelike 3.0에 따라 라이선스가
                    부여되며, 모든 콘셉트의 출처는 scpwiki.com 및 해당 저자에서 비롯됩니다.{' '}
                    <span>
                      이 콘텐츠들에서 파생된 영상은 이에 따라 Creative Commons Sharealike 3.0에 따라 배포됩니다.
                    </span>
                  </strong>
                ) : (
                  <i>버튼을 누르시면 상세 내용을 보실 수 있습니다.</i>
                )}
              </dd>
            </div>
          </dl>
        </div>
        <div className={styles.studio}>
          <p className={styles.copyright} lang="en">
            &copy; Copyrights{' '}
            {router.pathname === '/amusement/[amusementId]' || router.pathname === '/open-sources' ? (
              <StudioDark />
            ) : (
              <StudioDefault />
            )}
            <strong>DEV1.studio</strong> <span>All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
