// Next Types
import type { NextApiRequest, NextApiResponse } from 'next';

// AirTable Helpers
import { table, getMinifiedRecord } from './utils/Airtable';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, fields } = req.body;
  try {
    const updatedRecords = await table.update([{ id, fields }]);
    res.statusCode = 200;
    const adjustedCompleted =
      updatedRecords[0]._rawJson.fields.completed === undefined
        ? (updatedRecords[0]._rawJson.fields.completed = false)
        : updatedRecords[0]._rawJson.fields.completed;
    const finalRecords = {
      id: updatedRecords[0]._rawJson.id,
      fields: {
        description: updatedRecords[0]._rawJson.fields.description,
        completed: adjustedCompleted,
      },
    };
    res.json(finalRecords);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: 'Something went Wrong' });
  }
};
