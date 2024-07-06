import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const zip = req.query.zip as string;
  const live = req.query.live as string;
  if (req.method === 'GET') {
    let filterQuery = `${process.env.STRAPI_URL}/api/jejeup-jejeups`;
    const totalResponse = `${process.env.STRAPI_URL}/api/jejeup-jejeups`;
    const totalData = await fetch(totalResponse, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const totalJson = await totalData.json();
    const totalCount = totalJson.meta.pagination.total;

    if (zip === 'true') {
      filterQuery += '?filters[isZip]=true';
    } else if (live === 'true') {
      filterQuery += '?filters[isLive]=true';
    }
    const typeData = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const typeJson = await typeData.json();
    const typeCount = typeJson.meta.pagination.total;

    const amusementAPI = `${process.env.STRAPI_URL}/api/amusement-jejeups`;
    const amusementResponse = await fetch(amusementAPI, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const amusementData = await amusementResponse.json();
    const amusementCount = amusementData.meta.pagination.total;

    res.status(200).send({ total: totalCount, count: typeCount, amusement: amusementCount });
  } else {
    console.log('Unsupported method');
  }
}
