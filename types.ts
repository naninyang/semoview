export interface JejeupData {
  pageCount: number;
  id: string;
  idx: number;
  subject: string;
  video: string;
  ownerAvatar: string;
  comment: string;
  title: string;
  worst: boolean;
  isAmusements: boolean;
  amusements: string;
  createdAt: string;
  error: string;
  ogTitle: string;
  originalTitle: string;
  jejeups: {
    id: string;
    idx: string;
    subject: string;
    video: string;
    ownerAvatar: string;
    comment: string;
    title: string;
    worst: boolean;
    createdAt: string;
  };
  jejeupMetaData: {
    error: string;
    ogTitle: string;
    originalTitle: string;
    ogUrl: string;
    ogImage: string;
    ogDescription: string;
    ogSiteName?: string;
    twitterSite?: string;
    twitterCreator?: string;
    datePublished?: string;
    ownerAvatar?: string;
    ownerName?: string;
    pressPublished?: string;
    pressAvatar?: string;
    duration: string;
  };
  amusementData: {
    title: string;
    lang: string;
    titleKorean: string;
    titleOther: string;
    etc: string;
    release: string;
    original: string;
    originalAuthor: string;
    originTitle: string;
    rating: string;
    ratingCustom: string;
    country: string;
    category: string;
    isMobile: boolean;
    genre: string;
    anime: string;
    animeBroadcast1: string;
    animeBroadcast2: string;
    ott: string;
    ottAddr: string;
    broadcast: string;
    publisher: string;
    creator: string;
    cast: string;
    synopsys: string;
    posterDefault: string;
    posterOther: string;
    relations: string;
  };
}

export interface JejeupMetaData {
  error: string;
  ogTitle: string;
  originalTitle: string;
  ogUrl: string;
  ogImage: string;
  ogDescription: string;
  ogSiteName?: string;
  twitterSite?: string;
  twitterCreator?: string;
  datePublished?: string;
  ownerUrl?: string;
  ownerAvatar?: string;
  ownerName?: string;
  pressPublished?: string;
  pressAvatar?: string;
  duration: string;
}

export interface JejeupPermalinkData {
  attributes: {
    idx: string;
    subject: string;
    video: string;
    ownerAvatar: string;
    comment: string;
    review: any;
    title: string;
    worst: boolean;
    amusements: string;
    relations: string;
    embeddingOff: boolean;
    createdAt: string;
    publishedAt: string;
  };
  jejeupMetaData: {
    error: string;
    ogTitle: string;
    originalTitle: string;
    ogUrl: string;
    ogImage: string;
    ogDescription: string;
    ogSiteName?: string;
    twitterSite?: string;
    twitterCreator?: string;
    datePublished?: string;
    ownerAvatar?: string;
    ownerName?: string;
    pressPublished?: string;
    pressAvatar?: string;
    duration: string;
    ownerUrl: string;
  };
  amusementData: {
    title: string;
    lang: string;
    titleOther: string;
    titleKorean: string;
    etc: string;
    release: string;
    original: string;
    originalAuthor: string;
    originTitle: string;
    rating: string;
    ratingCustom: string;
    country: string;
    category: string;
    isMobile: boolean;
    genre: string;
    anime: string;
    animeBroadcast1: string;
    animeBroadcast2: string;
    ott: string;
    ottAddr: string;
    broadcast: string;
    publisher: string;
    creator: string;
    cast: string;
    synopsys: string;
    posterDefault: string;
    posterOther: string;
    relations: string;
  };
  amusementData2: {
    title: string;
    lang: string;
    titleOther: string;
    titleKorean: string;
    etc: string;
    release: string;
    original: string;
    originalAuthor: string;
    originTitle: string;
    rating: string;
    ratingCustom: string;
    country: string;
    category: string;
    isMobile: boolean;
    genre: string;
    anime: string;
    animeBroadcast1: string;
    animeBroadcast2: string;
    ott: string;
    ottAddr: string;
    broadcast: string;
    publisher: string;
    creator: string;
    cast: string;
    posterDefault: string;
    posterOther: string;
    relations: string;
  };
}

export interface JejeupResponse {
  data: JejeupPermalinkData;
}

export interface AmusementData {
  id: string;
  idx: string;
  title: string;
  lang: string;
  titleKorean: string;
  titleOther: string;
  etc: string;
  release: string;
  original: string;
  originalAuthor: string;
  originTitle: string;
  rating: string;
  ratingCustom: string;
  country: string;
  category: string;
  isMobile: boolean;
  genre: string;
  anime: string;
  animeBroadcast1: string;
  animeBroadcast2: string;
  ott: string;
  ottAddr: string;
  broadcast: string;
  publisher: string;
  creator: string;
  cast: string;
  dubbing: string;
  dubbingLang: string;
  characters: string;
  posterDefault: string;
  posterOther: string;
  relations: string;
  order: string;
  related: string;
  tags: any;
  supportLang: any;
  runningTime: number;
}

export interface AmusementPermalinkData {
  id: string;
  attributes: {
    title: string;
    lang: string;
    titleKorean: string;
    titleOther: string;
    etc: string;
    release: string;
    original: string;
    originalAuthor: string;
    originTitle: string;
    rating: string;
    ratingCustom: string;
    country: string;
    category: string;
    isMobile: boolean;
    genre: string;
    anime: string;
    animeBroadcast1: string;
    animeBroadcast2: string;
    ott: string;
    ottAddr: string;
    broadcast: string;
    publisher: string;
    creator: string;
    cast: string;
    characters: string;
    dubbing: string;
    dubbingLang: string;
    synopsys: string;
    posterDefault: string;
    posterOther: string;
    relations: string;
    related: string;
    tags: any;
    createdAt: string;
    supportLang: any;
    comment: string;
    runningTime: number;
  };
}

export interface JejeupAmusementData {
  data: {
    id: string;
    idx: string;
    title: string;
    lang: string;
    titleKorean: string;
    titleOther: string;
    etc: string;
    release: string;
    original: string;
    originalAuthor: string;
    originTitle: string;
    rating: string;
    country: string;
    category: string;
    isMobile: boolean;
    genre: string;
    anime: string;
    ott: string;
    ottAddr: string;
    broadcast: string;
    publisher: string;
    creator: string;
    cast: string;
    posterDefault: string;
    posterOther: string;
  };
}

export type Category =
  | 'ott_film'
  | 'ott_anime'
  | 'ott_drama'
  | 'ott_anime_film'
  | 'ott_documentary_film'
  | 'documentary_film'
  | 'anime_film'
  | 'game'
  | 'game_fan';

export type Platform =
  | 'amazonOriginal'
  | 'appleOriginal'
  | 'appleFilm'
  | 'disneyOriginal'
  | 'disneyStar'
  | 'netflixSeries'
  | 'netflixPresents'
  | 'netflixOriginal'
  | 'netflixFilm'
  | 'netflixAnime'
  | 'netflixAnimeFilm'
  | 'netflixDocumentary'
  | 'tvingOriginal'
  | 'tvingOnly'
  | 'watchaOriginal'
  | 'watchaExclusive'
  | 'wavveOriginal'
  | 'wavveOnly'
  | 'paramount';

export interface NoticeData {
  id: string;
  idx: string;
  platform: string;
  subject: string;
  description: string;
  created: string;
}

export interface NoticePermalinkData {
  attributes: {
    idx: string;
    platform: string;
    subject: string;
    description: string;
    content: string;
    created: string;
    createdAt: string;
  };
}

export interface Counts {
  jejeup: number;
  amusement: number;
}

export interface License {
  filename: string;
  content: string;
}
