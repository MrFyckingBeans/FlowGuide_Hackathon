// src/pages/api/manuals/latest.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchLatestManuals } from '@/services/manualService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const manuals = await fetchLatestManuals(5)
    res.status(200).json(manuals)
  } catch (error) {
    console.error("Failed to load manuals:", error) // Log the error details here
    res.status(500).json({ error: "Failed to fetch latest manuals" })
  }
}
