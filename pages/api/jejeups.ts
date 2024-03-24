import type { NextApiRequest, NextApiResponse } from 'next';
import { getAmusementData, getJejeupData } from '@/utils/strapi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    try {
      const page = Number(req.query.page) || 1;
      const data = await getJejeupData(page);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    try {
      const response = await fetch(`${process.env.STRAPI_URL}/api/jejeup-jejeups/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch article data');
      }
      const jejeupResponse = await response.json();
      const jejeupMetaResponse = await fetch(
        `${process.env.PREVIEW_OLD_API_URL}?url=https://youtu.be/${encodeURIComponent(jejeupResponse.data.attributes.video)}`,
      );
      const jejeupMetaData = await jejeupMetaResponse.json();
      const amusementSource = jejeupResponse.data.attributes.isAmusements
        ? jejeupResponse.data.attributes.amusements
        : jejeupResponse.data.attributes.title;
      const amusementTitles: string[] = amusementSource
        .split(',')
        .map((title: string) => title.trim().replace(/'/g, ''));
      const amusementMap = amusementTitles.map((title) => getAmusementData(title));
      const amusementData = await Promise.all(amusementMap);

      const jejeups = {
        ...jejeupResponse.data,
        jejeupMetaData,
        amusementData,
      };

      res.status(200).json(jejeups);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}
