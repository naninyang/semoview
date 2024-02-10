import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import styled from '@emotion/styled';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import { vectors } from '@/components/vectors';
import styles from '@/styles/Open.module.sass';

const BackButton = styled.i({
  display: 'block',
  background: `url(${vectors.backward}) no-repeat 50% 50%/contain`,
});

function OpenSources({ licenses }: { licenses: string[] }) {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    setCurrentPage(storedPage);
  }, []);

  const timestamp = Date.now();

  return (
    <main className={styles.open}>
      <Seo
        pageTitles={`오픈소스 - ${originTitle}`}
        pageTitle="오픈소스"
        pageDescription="'제제없'에서 사용한 오픈소스"
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
          <span>오픈소스</span>
          <em>JEJEUP.OPENSOURCES</em>
        </h1>
        <dl>
          <div>
            <dt>UX Designer & Developer</dt>
            <dd>클로이 Chloe</dd>
          </div>
          <div>
            <dt>Curator & informator</dt>
            <dd>클로이 Chloe</dd>
          </div>
        </dl>
        <div className={styles.list}>
          <hr />
          {licenses.map((license, index) => (
            <div key={index}>
              <pre>
                <code>{license}</code>
              </pre>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const markdownDir = path.join(process.cwd(), 'pages/licenses');
  const filenames = fs.readdirSync(markdownDir);
  const licenses = filenames.map((filename) => {
    const filePath = path.join(markdownDir, filename);
    return fs.readFileSync(filePath, 'utf8');
  });

  return {
    props: {
      licenses,
    },
  };
}

export default OpenSources;
