// Next Types
import type { NextApiRequest, NextApiResponse } from 'next';

// AirTable Helpers
import { table, getMinifiedRecord } from './utils/Airtable';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  try {
    const deletedRecords = await table.destroy([id]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(deletedRecords[0]));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: 'Something went Wrong' });
  }
};
