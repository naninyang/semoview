import React from 'react';
import Image from 'next/image';
import { AmusementData } from 'types';
import { RatingsDrama } from './RatingsDrama';
import { BadgeLang } from './BadgeLang';
import styles from '@/styles/Categories.module.sass';
import {
  AbcIcon,
  AmazonIcon,
  AniboxIcon,
  AnimaxIcon,
  AniplusIcon,
  AppleIcon,
  AtxIcon,
  BbcIcon,
  DaewonIcon,
  DisneyIcon,
  EnaIcon,
  FujitvIcon,
  HbomaxIcon,
  HuluIcon,
  JtbcIcon,
  Kbs2Icon,
  MbcIcon,
  MbsIcon,
  NetflixIcon,
  NippontvIcon,
  OcnIcon,
  ParamountIcon,
  PeacockIcon,
  RatingFilmAll,
  RatingFilmB12,
  RatingFilmC15,
  RatingFilmD18,
  RatingGameAll,
  RatingGameB12,
  RatingGameC15,
  RatingGameD19,
  SbsIcon,
  SkyIcon,
  StarIcon,
  SyfyIcon,
  TbsIcon,
  TokyomxIcon,
  TooniverseIcon,
  TvingIcon,
  TvnIcon,
  TvtokyoIcon,
  WatchaIcon,
  WavveIcon,
  WavveIcon2,
  WowowIcon,
} from './Icons';

export function AmusementItem({
  amusement,
  isGame,
  platform,
  supportLanguage,
  page,
}: {
  amusement: AmusementData;
  isGame?: boolean;
  platform?: string;
  supportLanguage?: string;
  page?: string;
}) {
  const platformOtt =
    platform === 'apple' ||
    platform === 'paramount' ||
    platform === 'amazon' ||
    platform === 'netflix' ||
    platform === 'disney' ||
    platform === 'tving' ||
    platform === 'watcha' ||
    platform === 'wavve' ||
    platform === 'wave';
  const platformDrama =
    platform === 'ABC' ||
    platform === 'KBS2' ||
    platform === 'MBC' ||
    platform === 'SBS' ||
    platform === 'tvN' ||
    platform === 'OCN' ||
    platform === 'JTBC' ||
    platform === 'ENA';
  const platformAnime1 =
    platform === 'tokyomx' ||
    platform === 'tvtokyo' ||
    platform === 'fujitv' ||
    platform === 'mbs' ||
    platform === 'tbs' ||
    platform === 'atx' ||
    platform === 'nippontv' ||
    platform === 'wowow';
  const platformAnime2 =
    platform === 'aniplus' ||
    platform === 'daewon' ||
    platform === 'anibox' ||
    platform === 'tooniverse' ||
    platform === 'animax';
  return (
    <div className={`${styles.thumbnail} ${isGame ? styles.game : ''} ${page === 'square' ? styles.square : ''}`}>
      <Image
        src={amusement.posterDefault}
        width={isGame ? 460 : 390}
        height={isGame ? 215 : 560}
        alt=""
        unoptimized
        priority
      />
      <div className={page === 'square' ? styles.dummy : ''} />
      {page === 'square' && (
        <Image
          src={amusement.posterDefault}
          width={isGame ? 460 : 390}
          height={isGame ? 215 : 560}
          alt=""
          unoptimized
          priority
        />
      )}
      {amusement.category !== 'game_fan' && (
        <dl>
          {platform ? (
            <>
              {(amusement.broadcast || amusement.wavveSeries) && !platformDrama && (
                <div className={`${styles.broadcast} ${amusement.ott && !platformOtt ? styles.broadcasts : ''}`}>
                  <dt>방송사</dt>
                  <dd>
                    {amusement.broadcast === 'ENA' && (
                      <>
                        <EnaIcon /> <span>ENA</span>
                      </>
                    )}
                    {amusement.broadcast === 'JTBC' && (
                      <>
                        <JtbcIcon /> <span>JTBC</span>
                      </>
                    )}
                    {amusement.broadcast === 'KBS2' && (
                      <>
                        <Kbs2Icon /> <span>KBS 2TV</span>
                      </>
                    )}
                    {amusement.broadcast === 'MBC' && (
                      <>
                        <MbcIcon /> <span>MBC</span>
                      </>
                    )}
                    {amusement.broadcast === 'OCN' && (
                      <>
                        <OcnIcon /> <span>OCN</span>
                      </>
                    )}
                    {amusement.broadcast === 'SBS' && (
                      <>
                        <SbsIcon /> <span>SBS</span>
                      </>
                    )}
                    {amusement.broadcast === 'tvN' && (
                      <>
                        <TvnIcon /> <span>tvN</span>
                      </>
                    )}
                    {amusement.broadcast === 'ABC' && (
                      <>
                        <AbcIcon /> <span>ABC</span>
                      </>
                    )}
                    {amusement.wavveSeries &&
                      amusement.wavveSeries.map((item: string, index: number) => (
                        <React.Fragment key={index}>
                          {item === 'bbc' && (
                            <>
                              <BbcIcon />
                              <span>BBC</span>
                            </>
                          )}
                          {item === 'hbomax' && (
                            <>
                              <HbomaxIcon />
                              <span>HBO맥스</span>
                            </>
                          )}
                          {item === 'hulu' && (
                            <>
                              <HuluIcon />
                              <span>Hulu</span>
                            </>
                          )}
                          {item === 'peacock' && (
                            <>
                              <PeacockIcon />
                              <span>Peacock</span>
                            </>
                          )}
                          {item === 'sky' && (
                            <>
                              <SkyIcon />
                              <span>SKY</span>
                            </>
                          )}
                          {item === 'syfy' && (
                            <>
                              <SyfyIcon />
                              <span>SYFY</span>
                            </>
                          )}
                        </React.Fragment>
                      ))}
                  </dd>
                </div>
              )}
              {amusement.ott && !platformOtt && (
                <div className={styles.platform}>
                  <dt>OTT 플랫폼</dt>
                  <dd>
                    {amusement.ott === 'amazonOriginal' && (
                      <>
                        <AmazonIcon /> <span>아마존 프라임비디오</span>
                      </>
                    )}
                    {amusement.ott === 'appleOriginal' && (
                      <>
                        <AppleIcon /> <span>Apple TV+ 시리즈</span>
                      </>
                    )}
                    {amusement.ott === 'appleFilm' && (
                      <>
                        <AppleIcon /> <span>Apple TV+ 영화</span>
                      </>
                    )}
                    {(amusement.ott === 'netflixSeries' ||
                      amusement.ott === 'netflixPresents' ||
                      amusement.ott === 'netflixOriginal' ||
                      amusement.ott === 'netflixFilm' ||
                      amusement.ott === 'netflixAnimeFilm' ||
                      amusement.ott === 'netflixDocumentary') && (
                      <>
                        <NetflixIcon />
                        <span>
                          {(amusement.ott === 'netflixSeries' || amusement.ott === 'netflixOriginal') &&
                            '넷플릭스 시리즈'}
                          {(amusement.ott === 'netflixPresents' || amusement.ott === 'netflixFilm') && '넷플릭스 영화'}
                          {amusement.ott === 'netflixDocumentary' && '넷플릭스 다큐멘터리'}
                        </span>
                      </>
                    )}
                    {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                      <>
                        <TvingIcon /> <span>티빙</span>
                      </>
                    )}
                    {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                      <>
                        <WatchaIcon /> <span>왓챠</span>
                      </>
                    )}
                    {(amusement.ott === 'wavveOriginal' ||
                      amusement.ott === 'wavveOnly' ||
                      amusement.ott === 'waveOnly') && (
                      <>
                        <WavveIcon /> <span>웨이브</span>
                      </>
                    )}
                    {amusement.ott === 'waveFirstrun' && (
                      <>
                        <WavveIcon2 /> <span>웨이브 해외시리즈</span>
                      </>
                    )}
                    {amusement.ott === 'paramount' && (
                      <>
                        <ParamountIcon /> <span>Paramount+</span>
                      </>
                    )}
                  </dd>
                </div>
              )}
              {platform === 'disney' && (
                <div className={styles.platform}>
                  <dt>OTT 플랫폼</dt>
                  <dd>
                    {amusement.ott === 'disneyOriginal' && (
                      <>
                        <DisneyIcon /> <span>Disney+</span>
                      </>
                    )}
                    {amusement.ott === 'disneyStar' && (
                      <>
                        <StarIcon /> <span>Star+</span>
                      </>
                    )}
                  </dd>
                </div>
              )}
            </>
          ) : (
            <>
              {(amusement.broadcast || amusement.wavveSeries) && (
                <div className={`${styles.broadcast} ${amusement.ott ? styles.broadcasts : ''}`}>
                  <dt>방송사</dt>
                  <dd>
                    {amusement.broadcast === 'ENA' && (
                      <>
                        <EnaIcon /> <span>ENA</span>
                      </>
                    )}
                    {amusement.broadcast === 'JTBC' && (
                      <>
                        <JtbcIcon /> <span>JTBC</span>
                      </>
                    )}
                    {amusement.broadcast === 'KBS2' && (
                      <>
                        <Kbs2Icon /> <span>KBS 2TV</span>
                      </>
                    )}
                    {amusement.broadcast === 'MBC' && (
                      <>
                        <MbcIcon /> <span>MBC</span>
                      </>
                    )}
                    {amusement.broadcast === 'OCN' && (
                      <>
                        <OcnIcon /> <span>OCN</span>
                      </>
                    )}
                    {amusement.broadcast === 'SBS' && (
                      <>
                        <SbsIcon /> <span>SBS</span>
                      </>
                    )}
                    {amusement.broadcast === 'tvN' && (
                      <>
                        <TvnIcon /> <span>tvN</span>
                      </>
                    )}
                    {amusement.broadcast === 'ABC' && (
                      <>
                        <AbcIcon /> <span>ABC</span>
                      </>
                    )}
                    {amusement.wavveSeries &&
                      amusement.wavveSeries.map((item: string, index: number) => (
                        <React.Fragment key={index}>
                          {item === 'bbc' && (
                            <>
                              <BbcIcon />
                              <span>BBC</span>
                            </>
                          )}
                          {item === 'hbomax' && (
                            <>
                              <HbomaxIcon />
                              <span>HBO맥스</span>
                            </>
                          )}
                          {item === 'hulu' && (
                            <>
                              <HuluIcon />
                              <span>Hulu</span>
                            </>
                          )}
                          {item === 'peacock' && (
                            <>
                              <PeacockIcon />
                              <span>Peacock</span>
                            </>
                          )}
                          {item === 'sky' && (
                            <>
                              <SkyIcon />
                              <span>SKY</span>
                            </>
                          )}
                          {item === 'syfy' && (
                            <>
                              <SyfyIcon />
                              <span>SYFY</span>
                            </>
                          )}
                        </React.Fragment>
                      ))}
                  </dd>
                </div>
              )}
              {amusement.ott && (
                <div className={styles.platform}>
                  <dt>OTT 플랫폼</dt>
                  <dd>
                    {amusement.ott === 'amazonOriginal' && (
                      <>
                        <AmazonIcon /> <span>아마존 프라임비디오</span>
                      </>
                    )}
                    {amusement.ott === 'appleOriginal' && (
                      <>
                        <AppleIcon /> <span>Apple TV+ 시리즈</span>
                      </>
                    )}
                    {amusement.ott === 'appleFilm' && (
                      <>
                        <AppleIcon /> <span>Apple TV+ 영화</span>
                      </>
                    )}
                    {amusement.ott === 'disneyOriginal' && (
                      <>
                        <DisneyIcon /> <span>Disney+</span>
                      </>
                    )}
                    {amusement.ott === 'disneyStar' && (
                      <>
                        <StarIcon /> <span>Star+</span>
                      </>
                    )}
                    {(amusement.ott === 'netflixSeries' ||
                      amusement.ott === 'netflixPresents' ||
                      amusement.ott === 'netflixOriginal' ||
                      amusement.ott === 'netflixFilm' ||
                      amusement.ott === 'netflixDocumentary') && (
                      <>
                        <NetflixIcon />
                        <span>
                          {(amusement.ott === 'netflixSeries' || amusement.ott === 'netflixOriginal') &&
                            '넷플릭스 시리즈'}
                          {(amusement.ott === 'netflixPresents' || amusement.ott === 'netflixFilm') && '넷플릭스 영화'}
                          {amusement.ott === 'netflixDocumentary' && '넷플릭스 다큐멘터리'}
                        </span>
                      </>
                    )}
                    {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                      <>
                        <TvingIcon /> <span>티빙</span>
                      </>
                    )}
                    {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                      <>
                        <WatchaIcon /> <span>왓챠</span>
                      </>
                    )}
                    {(amusement.ott === 'wavveOriginal' ||
                      amusement.ott === 'wavveOnly' ||
                      amusement.ott === 'waveOnly') && (
                      <>
                        <WavveIcon /> <span>웨이브</span>
                      </>
                    )}
                    {amusement.ott === 'waveFirstrun' && (
                      <>
                        <WavveIcon2 /> <span>웨이브 해외시리즈</span>
                      </>
                    )}
                    {amusement.ott === 'paramount' && (
                      <>
                        <ParamountIcon /> <span>Paramount+</span>
                      </>
                    )}
                  </dd>
                </div>
              )}
            </>
          )}
          <div className={isGame ? styles.game : ''}>
            <dt>{isGame ? '심의등급' : '시청등급'}</dt>
            <dd>
              {amusement.ott === 'amazonOriginal' ? (
                <i className={`${styles['rating-amazon']} number`} aria-label="시청 가능 연령">
                  {amusement.rating === 'all' && 'All'}
                  {amusement.rating === 'a7' && '7+'}
                  {amusement.rating === 'b12' && '13+'}
                  {amusement.rating === 'c15' && '16+'}
                  {amusement.rating === 'd19' && '18+'}
                </i>
              ) : (
                <>
                  {(amusement.category === 'drama' ||
                    amusement.category === 'ott_drama' ||
                    amusement.category === 'ott_documentary') && (
                    <>
                      {amusement.rating === 'all' ? (
                        <>
                          <i className={`${styles.drama} ${styles.all} number`}>{RatingsDrama(amusement.rating)}</i>
                          <span>전체 이용가</span>
                        </>
                      ) : (
                        <>
                          {amusement.rating === 'd19' ? (
                            <>
                              <i className={`${styles.drama} ${styles.d19} number`}>{RatingsDrama(amusement.rating)}</i>
                              <span>세 미만 이용불가</span>
                            </>
                          ) : (
                            <>
                              <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                              <span>세 이상 이용가</span>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {(amusement.category === 'film' ||
                    amusement.category === 'ott_documentary_film' ||
                    amusement.category === 'ott_film') && (
                    <>
                      {amusement.rating === 'all' && (
                        <>
                          <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                        </>
                      )}
                      {amusement.rating === 'b12' && (
                        <>
                          <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                        </>
                      )}
                      {amusement.rating === 'c15' && (
                        <>
                          <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                        </>
                      )}
                      {amusement.rating === 'd19' && (
                        <>
                          <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
              {(amusement.category === 'game' || amusement.category === 'game_fan') && (
                <>
                  {amusement.rating === 'all' && (
                    <>
                      <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                    </>
                  )}
                  {amusement.rating === 'b12' && (
                    <>
                      <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                    </>
                  )}
                  {amusement.rating === 'c15' && (
                    <>
                      <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                    </>
                  )}
                  {amusement.rating === 'd19' && (
                    <>
                      <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                    </>
                  )}
                </>
              )}
            </dd>
            {amusement.supportLang && (
              <>
                <dt>추가지원</dt>
                <dd>
                  {supportLanguage
                    ? supportLanguage === 'both'
                      ? amusement.supportLang
                          .filter((item: string) => item !== 'subtitle' && item !== 'dubbing')
                          .map((item: string, index: number) => (
                            <i className={styles.supportLang} key={index}>
                              {BadgeLang(item, amusement.country)}
                            </i>
                          ))
                      : supportLanguage === 'bfree'
                        ? amusement.supportLang
                            .filter((item: string) => item !== 'cc' && item !== 'description')
                            .map((item: string, index: number) => (
                              <i className={styles.supportLang} key={index}>
                                {BadgeLang(item, amusement.country)}
                              </i>
                            ))
                        : amusement.supportLang
                            .filter((item: string) => item !== supportLanguage)
                            .map((item: string, index: number) => (
                              <i className={styles.supportLang} key={index}>
                                {BadgeLang(item, amusement.country)}
                              </i>
                            ))
                    : amusement.supportLang.map((item: string, index: number) => (
                        <i className={styles.supportLang} key={index}>
                          {BadgeLang(item, amusement.country)}
                        </i>
                      ))}
                </dd>
              </>
            )}
          </div>
        </dl>
      )}
    </div>
  );
}
