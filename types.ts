export interface JejeupData {
  pageCount: number;
  id: string;
  idx: string;
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
  posterDefault: string;
  posterOther: string;
  relations: string;
  order: string;
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
    synopsys: string;
    posterDefault: string;
    posterOther: string;
    relations: string;
    createdAt: string;
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
    created: string;
    createdAt: string;
  };
}

export interface Counts {
  jejeup: number;
  amusement: number;
}
