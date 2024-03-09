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

    const amusementAPI = `${process.env.STRAPI_URL}/api/amusement-jejeups`;
    const amusementResponse = await fetch(amusementAPI, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const amusementData = await amusementResponse.json();
    const amusementCount = amusementData.meta.pagination.total;

    res.status(200).send({ jejeup: jejeupCount, amusement: amusementCount });
  } else {
    console.log('Unsupported method');
  }
}
