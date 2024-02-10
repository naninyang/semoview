import { GetStaticPaths, GetStaticProps } from 'next';
import styled from '@emotion/styled';
import { NoticeParalinkData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import { vectors } from '@/components/vectors';
import styles from '@/styles/Notice.module.sass';

const BackButton = styled.i({
  display: 'block',
  background: `url(${vectors.backward}) no-repeat 50% 50%/contain`,
});

const Notice = ({ notice }: { notice: NoticeParalinkData | null }) => {
  const timestamp = Date.now();
  return (
    <main className={styles.notice}>
      {!notice ? (
        <p className={styles.loading}>
          <span>안내사항 불러오는 중</span>
          <i />
        </p>
      ) : (
        <>
          <Seo
            pageTitles={`${notice.attributes.subject} - ${originTitle}`}
            pageTitle={`${notice.attributes.subject}`}
            pageDescription={`${notice.attributes.description}`}
            pageImg={`https://jejeup.dev1stud.io/og-image.webp?ts=${timestamp}`}
          />
          <div className="top-link">
            <Anchor href="/notices">
              <BackButton />
              <span>뒤로가기</span>
            </Anchor>
          </div>
          <div className={styles.content}>
            <article>
              <header>
                <h2>{notice.attributes.subject}</h2>
                <time dateTime={notice.attributes.createdAt}>{notice.attributes.created}</time>
              </header>
              <div className={styles.description}>
                <p dangerouslySetInnerHTML={{ __html: notice.attributes.description.replace(/\n/g, '<br />') }} />
              </div>
              <div className={styles.button}>
                <Anchor href="/notices">
                  <BackButton />
                  <span>뒤로가기</span>
                </Anchor>
              </div>
            </article>
          </div>
        </>
      )}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const noticeId = context.params?.noticeId;
  let notice = null;

  if (noticeId && typeof noticeId === 'string') {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices/?id=${noticeId.substring(14)}`);
    const data = (await response.json()) as { data: NoticeParalinkData[] };
    notice = data.data;
  }

  if (!notice) {
    return {
      props: {
        notice: null,
      },
    };
  }

  return {
    props: {
      notice,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default Notice;
