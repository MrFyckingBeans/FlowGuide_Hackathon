// src/pages/api/manuals/with-images.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const manuals = await prisma.manual.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        created_at: true,
        updated_at: true,
        images: {
          select: {
            image_url: true, // Only select the `image_url` field from `images`
          },
        },
      },
    });

    // Convert BigInt IDs to strings and ensure `images` is an array of strings
    const formattedManuals = manuals.map((manual) => ({
      ...manual,
      id: manual.id.toString(),
      created_at: manual.created_at.toISOString(),
      updated_at: manual.updated_at.toISOString(),
      images: manual.images
        .map((image) => image.image_url) // Extract `image_url` as string
        .filter((url) => url.startsWith("http://") || url.startsWith("https://")), // Only include valid URLs
    }));

    res.status(200).json(formattedManuals);
  } catch (error) {
    console.error("Error fetching manuals with images:", error);
    res.status(500).json({ error: "Failed to fetch manuals with images" });
  }
}
