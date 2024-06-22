import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchMetadata, getAmusementData, getJejeupData } from '@/utils/strapi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const page = Number(req.query.page) || 1;
  const main = req.query.main as string;
  const zip = req.query.zip as string;

  if (!id && !main) {
    try {
      const data = await getJejeupData(page, 12, zip);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (!id && main) {
    try {
      const data = await getJejeupData(1, 4);
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

      const amusementSource = jejeupResponse.data.attributes.isAmusements
        ? jejeupResponse.data.attributes.amusements
        : jejeupResponse.data.attributes.title;
      const amusementTitles: string[] = amusementSource
        .split(',')
        .map((title: string) => title.trim().replace(/'/g, ''));
      const amusementMap = amusementTitles.map((title) => getAmusementData(title));
      const amusementData = await Promise.all(amusementMap);

      const reviewData = await fetchMetadata(jejeupResponse.data.attributes.video);

      const jejeups = {
        ...jejeupResponse.data,
        amusementData,
        reviewData,
      };

      res.status(200).json(jejeups);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}
