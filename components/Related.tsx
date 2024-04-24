import { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { vectors } from './vectors';
import YouTubeController from './YouTubeController';
import styles from '@/styles/Related.module.sass';
import amuses from '@/styles/Amusement.module.sass';

interface Props {
  videoId: string;
  videoDescription: string;
  key: string;
}

const CloseIcon = styled.i({
  background: `url(${vectors.crossLight}) no-repeat 50% 50%/contain`,
});

const Related = ({ videoId, videoDescription, key }: Props) => {
  const [selectedRelated, setSelectedRelated] = useState<boolean>(false);

  const handleButtonClick = () => {
    setSelectedRelated(true);
  };

  const handleCloseRelatedDetail = () => {
    setSelectedRelated(false);
  };

  useEffect(() => {
    const body = document.body;
    const isAmusement = sessionStorage.getItem('amusementDetail');
    if (isAmusement) {
      if (selectedRelated) {
        body.classList.add(styles.open);
        body.classList.add(amuses.open);
      } else {
        body.classList.remove(styles.open);
        body.classList.remove(amuses.open);
      }
    }
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };
    if (selectedRelated) {
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    }
    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [selectedRelated]);
  return (
    <div className={`${styles.item} ${selectedRelated ? styles.current : ''}`} key={key}>
      <button type="button" onClick={() => handleButtonClick()}>
        <Image
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          width={640}
          height={480}
          unoptimized
          priority
          alt=""
        />
        <span>{videoDescription}</span>
      </button>
      {selectedRelated && (
        <dialog className={styles.dialog}>
          <div className={styles.container}>
            <button type="button" onClick={() => handleCloseRelatedDetail()}>
              <CloseIcon />
              <span>닫기</span>
            </button>
            <h3>{videoDescription}</h3>
            <YouTubeController videoId={videoId} videoImage={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} />
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Related;
