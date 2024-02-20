import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const amusementId = req.query.musicId as string;
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/amusement-jejeups/${amusementId}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch amusement data');
    }
    const musicData = await response.json();
    res.status(200).json(musicData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
