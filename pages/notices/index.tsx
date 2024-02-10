import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import styled from '@emotion/styled';
import { NoticeData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import { vectors } from '@/components/vectors';
import styles from '@/styles/Notice.module.sass';

interface NoticeProps {
  notices: NoticeData[];
}

const BackButton = styled.i({
  display: 'block',
  background: `url(${vectors.backward}) no-repeat 50% 50%/contain`,
});

const Notices: NextPage<NoticeProps> = ({ notices }) => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    setCurrentPage(storedPage);
  }, []);

  const [noticesData, setNoticesData] = useState<NoticeData[]>([]);
  useEffect(() => {
    setNoticesData(notices);
  }, [notices]);

  const timestamp = Date.now();

  return (
    <main className={styles.notice}>
      <Seo
        pageTitles={`문의 및 공지 - ${originTitle}`}
        pageTitle="문의 및 공지"
        pageDescription="제제없 문의 및 공지를 확인하세요"
        pageImg={`https://jejeup.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <div className="top-link">
        {currentPage ? (
          <Anchor href={`/${currentPage}`}>
            <BackButton />
            <span>뒤로가기</span>
          </Anchor>
        ) : (
          <Anchor href="/">
            <BackButton />
            <span>뒤로가기</span>
          </Anchor>
        )}
      </div>
      <div className={styles.content}>
        <h1>
          <span>문의 및 공지</span>
          <em>JEJEUP.NOTICES</em>
        </h1>
        <div className={styles.summary}>
          <p>
            평소에 유튜버들이 <span>영화/드라마/게임의 타이틀을</span> 영상 제목에 넣지 않아 불쾌하셨나요?
          </p>
          <p>
            ~제제없~에서는 그런 영상들을 모아서 <span>눌러보기 전에 어떤 영상인지 알려드립니다!</span>
          </p>
          <p>시간 낭비하지 맙시다! 😎</p>
          <div className={styles.contact}>
            <Anchor href="/notices/contact-us" target="_blank">
              문의하기
            </Anchor>
          </div>
        </div>
        <div className={styles.notices}>
          <hr />
          <ul>
            {noticesData
              .filter((notice) => notice.platform === 'jejeup')
              .map((notice) => (
                <li key={notice.idx}>
                  <Anchor key={notice.idx} href={`/notices/${notice.idx}`} scroll={false} shallow={true}>
                    <strong>
                      <span>{notice.subject}</span>
                    </strong>
                    <time>{notice.created}</time>
                  </Anchor>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices`);
  const data = await response.json();

  return {
    props: { notices: data },
  };
};

export default Notices;
