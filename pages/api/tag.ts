import type { NextApiRequest, NextApiResponse } from 'next';
import { getTagData } from '@/utils/strapi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 7;
    const tagName = req.query.tagName as string;
    const data = await getTagData(page, pageSize, tagName);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
