import type { NextApiRequest, NextApiResponse } from 'next';
import { getHangukData } from '@/utils/strapi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 7;
    const hangukName = req.query.hangukName as string;
    const categoryName = req.query.categoryName as string;
    const data = await getHangukData(page, pageSize, hangukName, categoryName);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
