import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Seo, { originTitle } from '@/components/Seo';
import { vectors } from '@/components/vectors';
import styles from '@/styles/Notice.module.sass';

const BackButton = styled.i({
  display: 'block',
  background: `url(${vectors.backward}) no-repeat 50% 50%/contain`,
});

function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    subject: '',
    guestName: '',
    guestEmail: '',
    content: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('제출 완료되었어요. 감사합니다.');
        router.push('/');
      } else {
        const errorData = await response.json();
        console.log(errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      window.close();
    }
  };

  const timestamp = Date.now();

  return (
    <main className={styles.notice}>
      <Seo
        pageTitles={`문의사항 - ${originTitle}`}
        pageTitle="문의사항"
        pageDescription="무엇이든 물어보세요"
        pageImg={`https://jejeup.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <div className="top-link">
        <button onClick={handleClose} type="button">
          <BackButton />
          <span>뒤로가기</span>
        </button>
      </div>
      <div className={styles.content}>
        <h1>
          <span>문의하기</span>
          <em>JEJEUP.CONTACT</em>
        </h1>
        <div className={styles.summary}>
          <p>오타, 탈자, 버그 등 발견시 수정 요청해 주세요</p>
          <p>광고 제안도 받습니다.</p>
          <p>도움을 주시는 모든 분들께 감사의 말씀을 올립니다. 🥰</p>
          <p>
            <span>모든 항목은 필수 입력입니다.</span> 이름과 이메일은 답변 목적으로만 사용됩니다.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>문의 질의</legend>
            <input
              required
              type="hidden"
              value={formData.createdAt}
              onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })}
            />
            <input
              required
              type="hidden"
              value={formData.updatedAt}
              onChange={(e) => setFormData({ ...formData, updatedAt: e.target.value })}
            />
            <input
              required
              type="hidden"
              value={formData.publishedAt}
              onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
            />
            <div className={styles['field-group']}>
              <label htmlFor="subject">제목</label>
              <input
                required
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div className={styles['field-group']}>
              <label htmlFor="guestName">이름</label>
              <input
                required
                type="text"
                id="guestName"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              />
            </div>
            <div className={styles['field-group']}>
              <label htmlFor="guestEmail">이메일</label>
              <input
                required
                type="email"
                id="guestEmail"
                value={formData.guestEmail}
                onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
              />
            </div>
            <div className={styles['field-group']}>
              <label htmlFor="content">내용</label>
              <textarea
                required
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
            <div className={styles['button-group']}>
              <button type="submit">문의하기</button>
              <div className={styles.cancel}>
                <button onClick={handleClose} type="button">
                  <BackButton />
                  <span>뒤로가기</span>
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
}

export default ContactForm;
