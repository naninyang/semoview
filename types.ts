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
  createdAt: string;
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
    country: string;
    category: string;
    genre: string;
    anime: string;
    ott: string;
    publisher: string;
    creator: string;
    cast: string;
    synopsys: string;
    posterDefault: string;
    posterOther: string;
  };
}

export interface JejeupPermalinkData {
  attributes: {
    idx: string;
    subject: string;
    video: string;
    ownerAvatar: string;
    comment: string;
    title: string;
    title2: string;
    title3?: string;
    worst: boolean;
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
    country: string;
    category: string;
    genre: string;
    anime: string;
    ott: string;
    publisher: string;
    creator: string;
    cast: string;
    synopsys: string;
    posterDefault: string;
    posterOther: string;
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
    country: string;
    category: string;
    genre: string;
    anime: string;
    ott: string;
    publisher: string;
    creator: string;
    cast: string;
    posterDefault: string;
    posterOther: string;
  };
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
  country: string;
  category: string;
  genre: string;
  anime: string;
  ott: string;
  publisher: string;
  creator: string;
  cast: string;
  posterDefault: string;
  posterOther: string;
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
    country: string;
    category: string;
    genre: string;
    anime: string;
    ott: string;
    publisher: string;
    creator: string;
    cast: string;
    synopsys: string;
    posterDefault: string;
    posterOther: string;
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
    genre: string;
    anime: string;
    ott: string;
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
