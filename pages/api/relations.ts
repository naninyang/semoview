import type { NextApiRequest, NextApiResponse } from 'next';
import { getRelationsData } from '@/utils/strapi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const relations = req.query.relations as string;
  try {
    const data = await getRelationsData(relations);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
