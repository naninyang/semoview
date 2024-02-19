import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const jejeupAPI = `${process.env.STRAPI_URL}/api/jejeup-jejeups`;
    const jejeupResponse = await fetch(jejeupAPI, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const jejeupData = await jejeupResponse.json();

    const jejeupCount = jejeupData.meta.pagination.total;

    res.status(200).send({ jejeup: jejeupCount });
  } else {
    console.log('Unsupported method');
  }
}
