// Next Types
import type { NextApiRequest, NextApiResponse } from 'next';

// AirTable Helpers
import { table, getMinifiedRecords } from './utils/Airtable';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const records = await table.select({}).firstPage();
  const minifiedRecords = getMinifiedRecords(records);
  res.statusCode = 200;
  res.json(minifiedRecords);
};
