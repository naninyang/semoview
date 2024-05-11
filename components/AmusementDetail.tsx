import styled from '@emotion/styled';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { isSafari } from 'react-device-detect';
import { AmusementPermalinkData, Category } from 'types';
import { vectors } from './vectors';
import { OriginalName } from './OriginalName';
import { CategoryName } from './CategoryName';
import { AnimeName } from './AnimeName';
import { formatTime } from './FormatTime';
import { ADCC, TagsItem } from '@/pages/amusement/[amusementId]';
import { RatingsDrama } from './RatingsDrama';
import { TagName } from './TagName';
import styles from '@/styles/AmusementDetail.module.sass';
import { useEffect } from 'react';

type AmusementDetailProps = {
  amusement: AmusementPermalinkData;
  onClose: () => void;
};

const CloseLightIcon = styled.i({
  background: `url(${vectors.crossLight}) no-repeat 50% 50%/contain`,
});

const AmusementDetail: React.FC<AmusementDetailProps> = ({ amusement, onClose }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  return (
    <dialog className={styles.modal}>
      <div className={styles.container}>
        <button type="button" onClick={onClose}>
          <CloseLightIcon />
          <span>닫기</span>
        </button>
        <h3>
          {amusement.attributes.titleKorean !== null ? (
            amusement.attributes.titleKorean.length >= 18 ? (
              <span className={`${styles.long} ${isSafari ? 'April16thPromise' : 'April16thLife'}`}>
                {amusement.attributes.titleKorean}
              </span>
            ) : (
              <span className={`${isSafari ? 'April16thPromise' : 'April16thLife'}`}>
                {amusement.attributes.titleKorean}
              </span>
            )
          ) : amusement.attributes.title.length >= 18 ? (
            <span className={`${styles.long} ${isSafari ? 'April16thPromise' : 'April16thLife'}`}>
              {amusement.attributes.title}
            </span>
          ) : (
            <span className={`${isSafari ? 'April16thPromise' : 'April16thLife'}`}>
              {amusement.attributes.category === 'game_fan'
                ? `'${amusement.attributes.title}' 팬 게임 콜렉션`
                : amusement.attributes.title}
            </span>
          )}
        </h3>
        <div className={styles.contents}>
          <PerfectScrollbar className={styles['scrollbar-container']}>
            <div className={styles.content}>
              <dl className={styles.title}>
                {amusement.attributes.titleKorean !== null && (
                  <div className={styles['origin-title']}>
                    <dt>원제</dt>
                    {amusement.attributes.lang === 'chineseBeonche' && (
                      <dd lang="zh-Hant">{amusement.attributes.title}</dd>
                    )}
                    {amusement.attributes.lang === 'chineseGanche' && (
                      <dd lang="zh-Hans">{amusement.attributes.title}</dd>
                    )}
                    {amusement.attributes.lang === 'europe' && <dd lang="en">{amusement.attributes.title}</dd>}
                    {amusement.attributes.lang === 'english' && (
                      <dd className="seed" lang="en-US">
                        {amusement.attributes.title}
                      </dd>
                    )}
                    {amusement.attributes.lang === 'japanese' && <dd lang="ja">{amusement.attributes.title}</dd>}
                    {amusement.attributes.lang === 'thai' && <dd lang="th">{amusement.attributes.title}</dd>}
                    {amusement.attributes.lang === null && (
                      <dd className="seed" lang="ko">
                        {amusement.attributes.title}
                      </dd>
                    )}
                  </div>
                )}
                {amusement.attributes.titleOther && (
                  <div className={amusement.attributes.lang === null ? styles['origin-title'] : ''}>
                    <dt>작품의 다른 언어 제목</dt>
                    <dd className="lang">
                      {amusement.attributes.lang !== null && '('}
                      {amusement.attributes.titleOther}
                      {amusement.attributes.lang !== null && ')'}
                    </dd>
                  </div>
                )}
                {amusement.attributes.etc && (
                  <div className={styles.accent}>
                    <dt>작품 추가설명</dt>
                    <dd className="lang">{amusement.attributes.etc}</dd>
                  </div>
                )}
                {amusement.attributes.originalAuthor &&
                  amusement.attributes.original &&
                  amusement.attributes.originTitle && (
                    <div className={styles.accent}>
                      <dt>원작</dt>
                      <dd>
                        &apos;{amusement.attributes.originalAuthor}&apos;의{' '}
                        {OriginalName(amusement.attributes.original)} &apos;
                        {amusement.attributes.originTitle}&apos; 원작
                      </dd>
                    </div>
                  )}
                {amusement.attributes.original !== null &&
                  amusement.attributes.originTitle === null &&
                  amusement.attributes.originalAuthor !== null && (
                    <div className={styles.accent}>
                      <dt>원작</dt>
                      <dd>동명의 {OriginalName(amusement.attributes.original)} 원작</dd>
                    </div>
                  )}
              </dl>
              <dl className={styles.summary}>
                <div className={styles.item}>
                  {amusement.attributes.ott !== null && (
                    <div className={styles.platform}>
                      <dt>OTT 플랫폼</dt>
                      <dd className="seed">
                        {amusement.attributes.ott === 'amazonOriginal' && 'AMAZON ORIGINAL'}
                        {amusement.attributes.ott === 'appleOriginal' && 'An Apple Original'}
                        {amusement.attributes.ott === 'appleFilm' && 'Apple Original Films'}
                        {amusement.attributes.ott === 'disneyOriginal' && 'Disney Original'}
                        {amusement.attributes.ott === 'disneyStar' && 'Star Original'}
                        {(amusement.attributes.ott === 'netflixSeries' ||
                          amusement.attributes.ott === 'netflixOriginal' ||
                          amusement.attributes.ott === 'netflixAnime') &&
                          'A NETFLIX Series'}
                        {(amusement.attributes.ott === 'netflixPresents' ||
                          amusement.attributes.ott === 'netflixFilm' ||
                          amusement.attributes.ott === 'netflixAnimeFilm') &&
                          'NETFLIX Presents'}
                        {amusement.attributes.ott === 'netflixDocumentary' && 'A NETFLIX Documentary'}
                        {amusement.attributes.ott === 'tvingOriginal' && '티빙 오리지널'}
                        {amusement.attributes.ott === 'tvingOnly' && '오직 티빙에서'}
                        {amusement.attributes.ott === 'watchaOriginal' && '왓챠 오리지널'}
                        {amusement.attributes.ott === 'watchaExclusive' && '오직 왓챠에서'}
                        {amusement.attributes.ott === 'wavveOriginal' && '웨이브 오리지널'}
                        {amusement.attributes.ott === 'wavveOnly' && '오직 웨이브에서'}
                        {amusement.attributes.ott === 'paramount' && 'Paramount+'}
                      </dd>
                    </div>
                  )}
                  <div className={styles.category}>
                    <dt>카테고리</dt>
                    <dd className="seed">
                      {amusement.attributes.category !== 'anime_film' ? (
                        <>
                          {(amusement.attributes.category === 'drama' ||
                            amusement.attributes.category === 'film' ||
                            amusement.attributes.category === 'game' ||
                            amusement.attributes.category === 'anime' ||
                            amusement.attributes.category === 'ott_drama' ||
                            amusement.attributes.category === 'ott_film' ||
                            amusement.attributes.category === 'ott_anime') && (
                            <em>
                              {amusement.attributes.broadcast
                                ? amusement.attributes.broadcast === 'KBS2'
                                  ? 'KBS 2TV'
                                  : amusement.attributes.broadcast
                                : ''}
                              {(amusement.attributes.animeBroadcast1 !== null ||
                                amusement.attributes.animeBroadcast2 !== null) && (
                                <>
                                  {amusement.attributes.animeBroadcast1 === 'tokyomx' && <span>도쿄MX</span>}
                                  {amusement.attributes.animeBroadcast1 === 'tvtokyo' && <span>테레토</span>}
                                  {amusement.attributes.animeBroadcast1 === 'fujitv' && <span>후지테레비</span>}
                                  {amusement.attributes.animeBroadcast1 === 'mbs' && <span>MBS</span>}
                                  {amusement.attributes.animeBroadcast1 === 'tbs' && <span>TBS</span>}
                                  {amusement.attributes.animeBroadcast1 === 'atx' && <span>AT-X</span>}
                                  {amusement.attributes.animeBroadcast1 === 'nippontv' && <span>닛테레</span>}
                                  {amusement.attributes.animeBroadcast1 === 'wowow' && <span>WOWOW</span>}
                                  {amusement.attributes.animeBroadcast2 === 'aniplus' && (
                                    <>
                                      {amusement.attributes.animeBroadcast1 !== null && '& '}
                                      <span>애니플러스</span> 방영{' '}
                                    </>
                                  )}
                                  {amusement.attributes.animeBroadcast2 === 'daewon' && (
                                    <>
                                      {amusement.attributes.animeBroadcast1 !== null && '& '}
                                      <span>애니원</span> 방영{' '}
                                    </>
                                  )}
                                  {amusement.attributes.animeBroadcast2 === 'anibox' && (
                                    <>
                                      {amusement.attributes.animeBroadcast1 !== null && '& '}
                                      <span>애니박스</span> 방영{' '}
                                    </>
                                  )}
                                  {amusement.attributes.animeBroadcast2 === 'tooniverse' && (
                                    <>
                                      {amusement.attributes.animeBroadcast1 !== null && '& '}
                                      <span>투니버스</span> 방영{' '}
                                    </>
                                  )}
                                  {amusement.attributes.animeBroadcast2 === 'animax' && (
                                    <>
                                      {amusement.attributes.animeBroadcast1 !== null && '& '}
                                      <span>애니맥스</span> 방영{' '}
                                    </>
                                  )}
                                </>
                              )}
                              {((amusement.attributes.category as Category) === 'game' ||
                                (amusement.attributes.category as Category) === 'game_fan') &&
                                amusement.attributes.isMobile &&
                                '모바일 '}
                              {CategoryName(amusement.attributes.category)}
                            </em>
                          )}
                          {amusement.attributes.category === 'ott_anime_film' && (
                            <>
                              <em>애니메이션</em>
                              <em>영화</em>
                            </>
                          )}
                          {amusement.attributes.category === 'ott_documentary_film' && (
                            <>
                              <em>다큐멘터리</em>
                              <em>영화</em>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {(amusement.attributes.category as Category) === 'anime_film' && (
                            <>
                              <em>애니메이션</em>
                              <em>영화</em>
                            </>
                          )}
                          {(amusement.attributes.category as Category) === 'documentary_film' && (
                            <>
                              <em>다큐멘터리</em>
                              <em>영화</em>
                            </>
                          )}
                          {(amusement.attributes.category as Category) !== 'anime_film' &&
                            (amusement.attributes.category as Category) !== 'documentary_film' && (
                              <em>{CategoryName(amusement.attributes.category)}</em>
                            )}
                        </>
                      )}
                      {amusement.attributes.ott === null &&
                        amusement.attributes.category !== 'game_fan' &&
                        amusement.attributes.ottAddr !== null && <em>단편영화</em>}
                      {amusement.attributes.anime !== null && <em>{AnimeName(amusement.attributes.anime)}</em>}
                    </dd>
                  </div>
                  {amusement.attributes.runningTime && (
                    <div className={styles.country}>
                      <dt>재생시간</dt>
                      <dd className="seed">
                        {amusement.attributes.runningTime}분{formatTime(amusement.attributes.runningTime)}
                      </dd>
                    </div>
                  )}
                  {amusement.attributes.country !== '?' && (
                    <div className={styles.country}>
                      <dt>제작국가</dt>
                      <dd className="seed">{amusement.attributes.country}</dd>
                    </div>
                  )}
                </div>
                <div className={styles.item}>
                  {amusement.attributes.supportLang !== null && <ADCC items={amusement.attributes.supportLang} />}
                  {amusement.attributes.release !== '?' && (
                    <div className={styles.release}>
                      <dt>
                        {(amusement.attributes.category === 'drama' ||
                          amusement.attributes.category === 'ott_drama' ||
                          amusement.attributes.category === 'ott_anime' ||
                          amusement.attributes.anime === 'tva') &&
                          '방영'}
                        {(amusement.attributes.category === 'film' ||
                          amusement.attributes.category === 'anime_film' ||
                          amusement.attributes.category === 'ott_anime_film' ||
                          amusement.attributes.category === 'ott_film' ||
                          amusement.attributes.anime === 'film') &&
                          '상영'}
                        {(amusement.attributes.category === 'game' || amusement.attributes.anime === 'ova') && '출시'}
                        년도
                      </dt>
                      <dd className="seed">{amusement.attributes.release}년</dd>
                    </div>
                  )}
                  {amusement.attributes.category !== 'game_fan' && (
                    <div className={styles.rating}>
                      <dt>{amusement.attributes.category === 'game' ? '심의등급' : '시청등급'}</dt>
                      <dd className="seed">
                        {amusement.attributes.ott === 'amazonOriginal' ? (
                          <i className={`${styles['rating-amazon']} number`} aria-label="시청 가능 연령">
                            {amusement.attributes.rating === 'all' && 'All'}
                            {amusement.attributes.rating === 'a7' && '7+'}
                            {amusement.attributes.rating === 'b12' && '13+'}
                            {amusement.attributes.rating === 'c15' && '16+'}
                            {amusement.attributes.rating === 'd19' && '18+'}
                          </i>
                        ) : (
                          <>
                            {(amusement.attributes.category === 'drama' ||
                              amusement.attributes.category === 'ott_drama' ||
                              amusement.attributes.category === 'ott_anime' ||
                              amusement.attributes.anime === 'tva' ||
                              amusement.attributes.anime === 'ova') && (
                              <>
                                {amusement.attributes.rating === 'all' ? (
                                  <span>전체 이용가</span>
                                ) : (
                                  <span>
                                    {RatingsDrama(amusement.attributes.rating)}
                                    {amusement.attributes.rating === 'd19' ? '세 미만 이용불가' : '세 이상 이용가'}
                                  </span>
                                )}
                              </>
                            )}
                            {(amusement.attributes.category === 'film' ||
                              amusement.attributes.category === 'anime_film' ||
                              amusement.attributes.category === 'ott_anime_film' ||
                              amusement.attributes.category === 'ott_film' ||
                              amusement.attributes.category === 'ott_documentary_film' ||
                              amusement.attributes.anime === 'film') && (
                              <>
                                {amusement.attributes.rating === 'all' && <span>전체 이용가</span>}
                                {amusement.attributes.rating === 'b12' && <span>12세 이용가</span>}
                                {amusement.attributes.rating === 'c15' && <span>15세 이용가</span>}
                                {amusement.attributes.rating === 'd19' && <span>청소년 이용불가</span>}
                              </>
                            )}
                          </>
                        )}
                        {amusement.attributes.category === 'game' && (
                          <>
                            {amusement.attributes.rating === 'all' && <span>전체 이용가</span>}
                            {amusement.attributes.rating === 'b12' && <span>12세 이용가</span>}
                            {amusement.attributes.rating === 'c15' && <span>15세 이용가</span>}
                            {amusement.attributes.rating === 'd19' && <span>청소년 이용불가</span>}
                          </>
                        )}
                        {(amusement.attributes.ott === 'amazonOriginal' || amusement.attributes.ratingCustom) && (
                          <div className={styles.custom}>
                            (
                            {amusement.attributes.ott === 'amazonOriginal' &&
                              !amusement.attributes.ratingCustom &&
                              '아마존 자체 심의등급'}
                            {amusement.attributes.ott === 'amazonOriginal' &&
                              amusement.attributes.ratingCustom &&
                              '한국 리전 아마존 시청 불가'}
                            {amusement.attributes.ott !== 'amazonOriginal' &&
                              amusement.attributes.ratingCustom &&
                              '세모뷰 자체설정 심의등급'}
                            )
                          </div>
                        )}
                      </dd>
                    </div>
                  )}
                </div>
              </dl>
              <dl className={styles.staff}>
                {amusement.attributes.original !== null &&
                  amusement.attributes.originTitle === null &&
                  amusement.attributes.originalAuthor !== null && (
                    <div>
                      <dt>원작자</dt>
                      <dd className="seed">{amusement.attributes.originalAuthor}</dd>
                    </div>
                  )}
                {amusement.attributes.genre !== '?' && amusement.attributes.tags === null && (
                  <div>
                    <dt>장르</dt>
                    <dd className="seed">
                      {amusement.attributes.genre}
                      {amusement.attributes.tags !== null && `, ${TagName(amusement.attributes.tags, 'genre')}`}
                    </dd>
                  </div>
                )}
                {amusement.attributes.genre !== '?' && amusement.attributes.tags !== null && (
                  <TagsItem items={amusement.attributes} type="genre" />
                )}
                {amusement.attributes.publisher !== '?' && (
                  <div>
                    <dt>{amusement.attributes.category === 'game' ? '유통/배급' : '제작/배급'}</dt>
                    <dd className="seed">{amusement.attributes.publisher}</dd>
                  </div>
                )}
                {amusement.attributes.creator !== '?' && (
                  <div>
                    <dt>{amusement.attributes.category === 'game' ? '개발' : '주요 제작자'}</dt>
                    <dd className="seed">{amusement.attributes.creator}</dd>
                  </div>
                )}
                {amusement.attributes.cast !== '?' && (
                  <>
                    {amusement.attributes.cast !== null && (
                      <div>
                        {amusement.attributes.category !== 'anime' &&
                        amusement.attributes.category !== 'anime_film' &&
                        amusement.attributes.category !== 'ott_anime' &&
                        amusement.attributes.category !== 'ott_anime_film' &&
                        amusement.attributes.category !== 'game' ? (
                          <dt>주요 출연자</dt>
                        ) : amusement.attributes.dubbing !== null ? (
                          <dt>원어 성우</dt>
                        ) : (
                          <dt>주요 성우</dt>
                        )}
                        <dd className="seed">{amusement.attributes.cast}</dd>
                      </div>
                    )}
                  </>
                )}
                {amusement.attributes.dubbing && (
                  <div>
                    <dt>
                      {amusement.attributes.dubbingLang === 'japanese' && '일본'}
                      {amusement.attributes.dubbingLang === 'english' && '미국'}
                      {amusement.attributes.dubbingLang === null && '한국'} 성우
                    </dt>
                    <dd className="seed">{amusement.attributes.dubbing}</dd>
                  </div>
                )}
                {amusement.attributes.characters && (
                  <div>
                    <dt>캐릭터</dt>
                    <dd className="seed">{amusement.attributes.characters}</dd>
                  </div>
                )}
                {amusement.attributes.comment && (
                  <div className={styles.comment}>
                    <dt>작품 추가 정보</dt>
                    <dd
                      className="seed"
                      dangerouslySetInnerHTML={{
                        __html: amusement.attributes.comment.replace(/\n/g, '<br />'),
                      }}
                    />
                  </div>
                )}
              </dl>
              {amusement.attributes.synopsys && (
                <div className={styles.synopsys}>
                  <dt>시놉시스</dt>
                  <dd
                    className="lang"
                    dangerouslySetInnerHTML={{
                      __html: amusement.attributes.synopsys.replace(/\n/g, '<br />'),
                    }}
                  />
                </div>
              )}
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </dialog>
  );
};

export default AmusementDetail;
