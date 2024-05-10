import { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { isSafari } from 'react-device-detect';
import { useMediaQuery } from 'react-responsive';
import { vectors } from './vectors';
import YouTubeController from './YouTubeController';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Related.module.sass';
import amuses from '@/styles/Amusement.module.sass';
import jejeus from '@/styles/Jejeup.module.sass';

interface Props {
  videoId: string;
  videoDescription: string;
  sorting?: string;
  title: string;
  key: string;
}

const CloseLightIcon = styled.i({
  background: `url(${vectors.crossLight}) no-repeat 50% 50%/contain`,
});

const CloseDarkIcon = styled.i({
  background: `url(${vectors.crossDark}) no-repeat 50% 50%/contain`,
});

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: `(max-width: ${rem(575)}` });
  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  return isMobile;
}

const Related = ({ videoId, videoDescription, title, sorting, key }: Props) => {
  const [selectedRelated, setSelectedRelated] = useState<boolean>(false);

  const handleButtonClick = () => {
    setSelectedRelated(true);
  };

  const handleCloseRelatedDetail = () => {
    setSelectedRelated(false);
  };

  const isMobile = useMobile();

  useEffect(() => {
    const isAmusement = sorting === 'amusement' ? true : false;
    const body = document.body;
    if (isAmusement) {
      if (selectedRelated) {
        body.classList.add(styles.open);
        body.classList.add(amuses.open);
      } else {
        body.classList.remove(styles.open);
        body.classList.remove(amuses.open);
      }
    } else {
      if (selectedRelated) {
        body.classList.add(styles.open);
        body.classList.add(jejeus.open);
      } else {
        body.classList.remove(styles.open);
        body.classList.remove(jejeus.open);
      }
    }
    const preventScroll = (e: Event): void => {
      e.preventDefault();
    };
    const preventScrollKeys = (e: KeyboardEvent): void => {
      if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };
    if (selectedRelated) {
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventScrollKeys, { passive: false });
    } else {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
    }
    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
    };
  }, [selectedRelated]);

  return (
    <div
      className={`${styles.item} ${selectedRelated ? styles.current : ''} ${sorting === 'amusement' ? styles['item-amusement'] : ''}`}
      key={key}
    >
      {isMobile ? (
        <div className={styles.item}>
          <YouTubeController videoId={videoId} videoImage={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} />
          <span className="lang">
            <strong>[{title}]</strong> {videoDescription}
          </span>
        </div>
      ) : (
        <button type="button" onClick={() => handleButtonClick()}>
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            width={640}
            height={480}
            unoptimized
            priority
            alt=""
          />
          <span className="lang">
            <strong>[{title}]</strong> {videoDescription}
          </span>
        </button>
      )}
      {selectedRelated && (
        <dialog className={`${styles.dialog} ${sorting === 'amusement' ? styles['dialog-amusement'] : ''}`}>
          <div className={styles.container}>
            <button type="button" onClick={() => handleCloseRelatedDetail()}>
              {sorting === 'amusement' ? <CloseLightIcon /> : <CloseDarkIcon />}
              <span>닫기</span>
            </button>
            <h3 className="lang">
              <span className={`${isSafari || sorting !== 'amusement' ? 'April16thPromise' : 'April16thSafety'}`}>
                [{title}]
              </span>{' '}
              {videoDescription}
            </h3>
            <YouTubeController videoId={videoId} videoImage={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} />
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Related;
