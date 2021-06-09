// Next Types
import type { NextApiRequest, NextApiResponse } from 'next';

// AirTable Helpers
import { table, getMinifiedRecord } from './utils/Airtable';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, fields } = req.body;
  try {
    const updatedRecords = await table.update([{ id, fields }]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(updatedRecords[0]));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: 'Something went Wrong' });
  }
};
