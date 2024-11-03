import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchReportCounts } from '@/services/reportService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const reports = await fetchReportCounts();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch report counts" });
  }
}
