// Next Types
import type { NextApiRequest, NextApiResponse } from 'next';

// AirTable
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base(process.env.AIRTABLE_TABLE_NAME);

const getMinifiedRecord = (record) => {
  if (!record.fields.completed) {
    record.fields.completed = false;
  }
  return {
    id: record.id,
    fields: record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const records = await table.select({}).firstPage();
  const minifiedRecords = getMinifiedRecords(records);
  res.statusCode = 200;
  res.json(minifiedRecords);
};
