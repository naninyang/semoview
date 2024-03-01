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
      console.log('Unsupported method');
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
        `${process.env.PREVIEW_API_URL}?url=https://youtu.be/${encodeURIComponent(jejeupResponse.data.attributes.video)}`,
      );
      const jejeupMetaData = await jejeupMetaResponse.json();
      if (jejeupResponse.data.attributes.title2 === null) {
        const amusementData = await getAmusementData(jejeupResponse.data.attributes.title);
        const jejeups = {
          ...jejeupResponse.data,
          jejeupMetaData,
          amusementData,
        };
        res.status(200).json(jejeups);
      } else {
        const amusementData = await getAmusementData(jejeupResponse.data.attributes.title);
        const amusementData2 = await getAmusementData(jejeupResponse.data.attributes.title2);
        const jejeups = {
          ...jejeupResponse.data,
          jejeupMetaData,
          amusementData,
          amusementData2,
        };
        res.status(200).json(jejeups);
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}
