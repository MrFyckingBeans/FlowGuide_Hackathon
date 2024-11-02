// src/pages/api/manuals/[id]/delete.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteManual } from '@/services/manualService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: "Invalid manual ID" });
  }

  try {
    await deleteManual(id);
    res.status(200).json({ message: "Manual deleted successfully" });
  } catch (error) {
    console.error("Error deleting manual:", error);
    res.status(500).json({ error: "Failed to delete manual" });
  }
}
