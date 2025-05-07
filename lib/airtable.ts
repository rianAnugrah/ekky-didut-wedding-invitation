// lib/airtable.ts
import Airtable from "airtable";

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID as string);

const table = base(process.env.AIRTABLE_TABLE_NAME as string);

// Get all records from a table
export const getAllRecords = async (): Promise<any[]> => {
  const records = await table.select({}).all();
  return records.map((record) => ({
    id: record.id,
    ...record.fields,
  }));
};

// Get a single record by ID
export const getRecordById = async (id: string): Promise<any> => {
  const record = await table.find(id);
  return {
    id: record.id,
    ...record.fields,
  };
};

// Create a new record
export const createRecord = async (fields: any): Promise<any> => {
  const record = await table.create([{ fields }]);
  return {
    id: record[0].id,
    ...record[0].fields,
  };
};

// Update a record
export const updateRecord = async (id: string, fields: any): Promise<any> => {
  const record = await table.update([
    {
      id,
      fields,
    },
  ]);
  return {
    id: record[0].id,
    ...record[0].fields,
  };
};

// Delete a record
export const deleteRecord = async (id: string): Promise<any> => {
  const record = await table.destroy(id);
  return {
    id: record.id,
    ...record.fields,
  };
};
