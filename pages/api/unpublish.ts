import { NextApiRequest, NextApiResponse } from 'next';

interface PostData {
  jejeupVideo: string;
  jejeupID: string;
  jejeupAmusement: string;
  site: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { jejeupVideo, jejeupID, jejeupAmusement } = req.body as PostData;
    const isDevelopment = process.env.NODE_ENV === 'development';
    const endpoint = isDevelopment
      ? `${process.env.STRAPI_URL}/api/jejeup-jejeups/${jejeupID}`
      : `${process.env.STRAPI_URL}/api/unpublish-jejeups`;

    const fetchOptions = isDevelopment
      ? {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              publishedAt: null,
            },
          }),
        }
      : {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              videoId: jejeupVideo,
              reviewId: jejeupID,
              amusementId: jejeupAmusement,
              site: 'semoview',
            },
          }),
        };

    try {
      const response = await fetch(endpoint, fetchOptions);

      if (!response.ok) {
        throw new Error('API Error');
      }

      const unpublishResponse = await response.json();
      res.status(200).json(unpublishResponse);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
