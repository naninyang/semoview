import { VercelRequest, VercelResponse } from '@vercel/node';
import { JSDOM } from 'jsdom';

async function fetchOwnerAvatar(ownerUrl: string) {
  const response = await fetch(ownerUrl as string);
  const html = await response.text();
  const dom = new JSDOM(html);
  const ownerAvatar = dom.window.document.querySelector('meta[property="og:image"]')?.getAttribute('content');
  return ownerAvatar;
}

async function fetchOpenGraphData(url: string) {
  const response = await fetch(url as string);
  const html = await response.text();
  const dom = new JSDOM(html);
  const ogUrl = dom.window.document.querySelector('meta[property="og:url"]')?.getAttribute('content');
  const ogTitle =
    dom.window.document.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
    dom.window.document.querySelector('title')?.textContent;
  const ogDescription = dom.window.document.querySelector('meta[property="og:description"]')?.getAttribute('content');
  const ogImage = dom.window.document.querySelector('meta[property="og:image"]')?.getAttribute('content');
  const ogSiteName = dom.window.document.querySelector('meta[property="og:site_name"]')?.getAttribute('content');
  const datePublished = dom.window.document.querySelector('meta[itemprop="datePublished"]')?.getAttribute('content');
  const ownerName = dom.window.document.querySelector('link[itemprop="name"]')?.getAttribute('content');
  const duration = dom.window.document.querySelector('meta[itemprop="duration"]')?.getAttribute('content');
  const dateTime = dom.window.document
    .querySelector('span.media_end_head_info_datestamp_time')
    ?.getAttribute('data-date-time');
  const ownerUrl = dom.window.document
    .querySelector('link[itemprop="url"][href^="http://www.youtube.com/@"]')
    ?.getAttribute('href');

  let ownerAvatar = null;

  if (ownerUrl) {
    ownerAvatar = await fetchOwnerAvatar(ownerUrl);
  }

  const dateObject = dateTime && new Date(dateTime + 'Z');
  let isoDateTime = dateObject && dateObject.toISOString();
  const koreaOffset = 9;
  let koreaTime = dateObject && new Date(dateObject.getTime() + koreaOffset * 60 * 60 * 1000);
  isoDateTime = koreaTime && koreaTime.toISOString().replace('.000', '');
  const pressPublished = isoDateTime;

  return {
    ogUrl,
    ogTitle,
    ogDescription,
    ogImage,
    ogSiteName,
    datePublished,
    ownerUrl,
    ownerName,
    ownerAvatar,
    pressPublished,
    duration,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;
  try {
    const rawData = await fetchOpenGraphData(url as string);
    const filteredData = {
      ogTitle: rawData.ogTitle,
      ogDescription: rawData.ogDescription,
      ogUrl: rawData.ogUrl,
      ogImage: rawData.ogImage,
      ogSiteName: rawData.ogSiteName,
      datePublished: rawData.datePublished,
      ownerUrl: rawData.ownerUrl,
      ownerName: rawData.ownerName,
      ownerAvatar: rawData.ownerAvatar,
      pressPublished: rawData.pressPublished,
      duration: rawData.duration,
    };
    return res.status(200).json(filteredData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}
