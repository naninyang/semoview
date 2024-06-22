import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const zip = req.query.zip as string;
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

    if (zip === 'false') {
      filterQuery += '?filters[$or][0][isZip]=false';
      filterQuery += '&filters[$or][1][isZip][$null]=true';
    } else if (zip === 'true') {
      filterQuery += '?filters[isZip]=true';
    }
    const zipData = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const zipJson = await zipData.json();
    const zipCount = zipJson.meta.pagination.total;

    const amusementAPI = `${process.env.STRAPI_URL}/api/amusement-jejeups`;
    const amusementResponse = await fetch(amusementAPI, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const amusementData = await amusementResponse.json();
    const amusementCount = amusementData.meta.pagination.total;

    res.status(200).send({ total: totalCount, zip: zipCount, amusement: amusementCount });
  } else {
    console.log('Unsupported method');
  }
}
