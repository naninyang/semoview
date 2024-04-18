import { AmusementData, JejeupData, NoticeData } from 'types';

export const formatDate = (datetime: string) => {
  const date = new Date(datetime);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

export const formatDateDetail = (datetime: string) => {
  const date = new Date(datetime);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

export async function getRenew(page?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/jejeup-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=24`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const jejeupResponse = await response.json();
  const jejeupsData = jejeupResponse.data;
  const jejeupsRenew = jejeupsData[0].attributes.createdAt;
  return { renew: jejeupsRenew };
}

export async function getJejeupData(page?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/jejeup-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=12`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const jejeupResponse = await response.json();
  const jejeupsData = jejeupResponse.data;
  const rowsData: JejeupData[] = jejeupsData.map((data: any) => ({
    id: `${data.id}`,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    createdAt: data.attributes.createdAt,
    subject: data.attributes.subject,
    video: data.attributes.video,
    ownerAvatar: data.attributes.ownerAvatar,
    comment: data.attributes.comment,
    title: data.attributes.title,
    worst: data.attributes.worst,
    isAmusements: data.attributes.isAmusements,
    amusements: data.attributes.amusements,
    embeddingOff: data.attributes.embeddingOff,
  }));
  const pageCount = jejeupResponse.meta.pagination.pageCount;
  const jejeups = await Promise.all(
    rowsData.map(async (preview) => {
      const amusementData = await getAmusementData(preview.title);
      return {
        ...preview,
        amusementData,
      };
    }),
  );
  return { jejeups, pageCount: pageCount };
}

export async function getCategoryData(page?: number, pageSize?: number, categoryName?: string) {
  if (
    categoryName === 'ott_drama' ||
    categoryName === 'ott_film' ||
    categoryName === 'ott_anime' ||
    categoryName === 'ott_anime_film' ||
    categoryName === 'ott_documentary' ||
    categoryName === 'ott_documentary_film'
  ) {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[ott][$null]=false`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      },
    );
    const categoryResponse = await response.json();
    const categoryResponseData = categoryResponse.data;
    const data: AmusementData = categoryResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
    }));
    const pageCount = categoryResponse.meta.pagination.pageCount;
    const total = categoryResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[category][$contains]=${categoryName}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      },
    );
    const categoryResponse = await response.json();
    const categoryResponseData = categoryResponse.data;
    const data: AmusementData = categoryResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      relations: data.attributes.relations,
    }));
    const pageCount = categoryResponse.meta.pagination.pageCount;
    const total = categoryResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  }
}

export async function getTagData(page?: number, pageSize?: number, tagName?: string) {
  if (tagName === 'isHealing') {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isHealing][$eq]=true`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      },
    );
    const tagResponse = await response.json();
    const tagResponseData = tagResponse.data;
    const data: AmusementData = tagResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
    }));
    const pageCount = tagResponse.meta.pagination.pageCount;
    const total = tagResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else if (tagName === 'isGL') {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isGL][$eq]=true`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      },
    );
    const tagResponse = await response.json();
    const tagResponseData = tagResponse.data;
    const data: AmusementData = tagResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
    }));
    const pageCount = tagResponse.meta.pagination.pageCount;
    const total = tagResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else if (tagName === 'isQueer') {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isQueer][$eq]=true`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      },
    );
    const tagResponse = await response.json();
    const tagResponseData = tagResponse.data;
    const data: AmusementData = tagResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
    }));
    const pageCount = tagResponse.meta.pagination.pageCount;
    const total = tagResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else if (tagName === 'isMobile') {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[isMobile][$eq]=true`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      },
    );
    const tagResponse = await response.json();
    const tagResponseData = tagResponse.data;
    const data: AmusementData = tagResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
    }));
    const pageCount = tagResponse.meta.pagination.pageCount;
    const total = tagResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[tag][$contains]=${tagName}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      },
    );
    const tagResponse = await response.json();
    const tagResponseData = tagResponse.data;
    const data: AmusementData = tagResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      relations: data.attributes.relations,
    }));
    const pageCount = tagResponse.meta.pagination.pageCount;
    const total = tagResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  }
}

export async function getRenewAmusement(page?: number, pageSize?: number, amusementId?: string) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/jejeup-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[title][$eq]=${amusementId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const jejeupAmusementResponse = await response.json();
  const jejeupAmusementData = jejeupAmusementResponse.data;
  const jejeupAmusementRenew = jejeupAmusementData;
  return { renew: jejeupAmusementRenew };
}

export async function getJejeupAmusementData(page?: number, pageSize?: number, amusementId?: string) {
  const amusementNumber = `'${amusementId}'`;
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/jejeup-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[amusements][$contains]=${amusementNumber}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const jejeupAmusementResponse = await response.json();
  const jejeupAmusementData = jejeupAmusementResponse.data;
  const rowsData: JejeupData[] = jejeupAmusementData.map((data: any) => ({
    id: `${data.id}`,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    createdAt: data.attributes.createdAt,
    subject: data.attributes.subject,
    video: data.attributes.video,
    ownerAvatar: data.attributes.ownerAvatar,
    comment: data.attributes.comment,
    title: data.attributes.title,
    worst: data.attributes.worst,
    embeddingOff: data.attributes.embeddingOff,
  }));
  const pageCount = jejeupAmusementResponse.meta.pagination.pageCount;
  const jejeups = await Promise.all(
    rowsData.map(async (preview) => {
      const amusementData = await getAmusementData(preview.title);
      return {
        ...preview,
        amusementData,
      };
    }),
  );
  return { jejeups, pageCount: pageCount };
}

export async function getNoticeData() {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/notice-nol2trs?sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=100`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const noticeResponse = await response.json();
  const noticesData = noticeResponse.data;
  const notices: NoticeData[] = noticesData.map((data: any) => ({
    id: data.id,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    platform: data.attributes.platform,
    subject: data.attributes.subject,
    description: data.attributes.description,
    created: data.attributes.created,
  }));

  return notices;
}

export async function fetchMetadata(url: string) {
  try {
    const response = await fetch(`${process.env.PREVIEW_NEW_API_URL}?url=${encodeURIComponent(url)}`);
    const previewResponse = await response.json();
    return previewResponse;
  } catch (error) {
    console.error('Failed to fetch article metadata', error);
    return {};
  }
}

export async function fetchMetaItemdata(url: string) {
  try {
    const response = await fetch(`${process.env.PREVIEW_OLD_API_URL}?url=${encodeURIComponent(url)}`);
    const previewResponse = await response.json();
    return previewResponse;
  } catch (error) {
    console.error('Failed to fetch article metadata', error);
    return {};
  }
}

export async function getAmusementData(amusement: string) {
  const response = await fetch(`${process.env.STRAPI_URL}/api/amusement-jejeups/${amusement}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
    },
  });
  const amusementResponse = await response.json();
  const amusementData = amusementResponse.data;
  const rowsData: AmusementData = {
    id: `${amusementData.id}`,
    idx: `${formatDate(amusementData.attributes.createdAt)}${amusementData.id}`,
    title: amusementData.attributes.title,
    lang: amusementData.attributes.lang,
    titleKorean: amusementData.attributes.titleKorean,
    titleOther: amusementData.attributes.titleOther,
    etc: amusementData.attributes.etc,
    release: amusementData.attributes.release,
    original: amusementData.attributes.original,
    originalAuthor: amusementData.attributes.originalAuthor,
    originTitle: amusementData.attributes.originTitle,
    rating: amusementData.attributes.rating,
    ratingCustom: amusementData.attributes.ratingCustom,
    country: amusementData.attributes.country,
    category: amusementData.attributes.category,
    isMobile: amusementData.attributes.isMobile,
    genre: amusementData.attributes.genre,
    anime: amusementData.attributes.anime,
    animeBroadcast1: amusementData.attributes.animeBroadcast1,
    animeBroadcast2: amusementData.attributes.animeBroadcast2,
    ott: amusementData.attributes.ott,
    ottAddr: amusementData.attributes.ottAddr,
    broadcast: amusementData.attributes.broadcast,
    publisher: amusementData.attributes.publisher,
    creator: amusementData.attributes.creator,
    cast: amusementData.attributes.cast,
    posterDefault: amusementData.attributes.posterDefault,
    posterOther: amusementData.attributes.posterOther,
    relations: amusementData.attributes.relations,
    order: amusementData.attributes.order,
  };

  return rowsData;
}

export async function getRelationsData(relations: string, type: string) {
  if (type === 'jejeup') {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/jejeup-jejeups/?sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=100&filters[relations][$contains]=${relations}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      },
    );
    const relationsResponse = await response.json();
    const relationsData = relationsResponse.data;
    const rowsData: JejeupData[] = relationsData.map((data: any) => ({
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      createdAt: data.attributes.createdAt,
      subject: data.attributes.subject,
      video: data.attributes.video,
      ownerAvatar: data.attributes.ownerAvatar,
      comment: data.attributes.comment,
      title: data.attributes.title,
      relations: data.attributes.relations,
    }));

    return rowsData;
  } else {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/amusement-jejeups/?sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=100&filters[relations][$contains]=${relations}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      },
    );
    const relationsResponse = await response.json();
    const relationsData = relationsResponse.data;
    const rowsData: AmusementData[] = relationsData.map((data: any) => ({
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      ratingCustom: data.attributes.ratingCustom,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      ottAddr: data.attributes.ottAddr,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      relations: data.attributes.relations,
      order: data.attributes.order,
    }));

    return rowsData;
  }
}
