export interface JejeupData {
  id: string;
  idx: string;
  subject: string;
  video: string;
  ownerAvatar: string;
  description: string;
  country: string;
  rating: string;
  category: string;
  anime: string;
  ott: string;
  genre: string;
  release: string;
  cast: string;
  publisher: string;
  creator: string;
  posterDefault: string;
  posterOther: string;
  comment: string;
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
  };
}

export interface JejeupPamalinkData {
  attributes: {
    idx: string;
    subject: string;
    video: string;
    ownerAvatar: string;
    description: string;
    country: string;
    rating: string;
    category: string;
    anime: string;
    ott: string;
    genre: string;
    release: string;
    cast: string;
    publisher: string;
    creator: string;
    posterDefault: string;
    posterOther: string;
    comment: string;
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

export interface NoticeParalinkData {
  attributes: {
    idx: string;
    platform: string;
    subject: string;
    description: string;
    created: string;
    createdAt: string;
  };
}
