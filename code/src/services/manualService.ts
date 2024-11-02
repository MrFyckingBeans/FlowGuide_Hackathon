// src/services/manualService.ts

import { PrismaClient } from '@prisma/client';
import { Manual, ManualWithImages } from '@/types';

const prisma = new PrismaClient();

export async function fetchLatestManuals(limit: number = 5): Promise<Manual[]> {
  try {
    const manuals = await prisma.manual.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: limit,
      select: {
        id: true,
        title: true,
        description: true, // Include description in the select clause
        created_at: true,
        updated_at: true,
      },
    });

    // Ensure that returned data matches the Manual type
    return manuals.map((manual) => ({
      id: manual.id.toString(),           // Convert BigInt to string
      title: manual.title,
      description: manual.description ?? "No description available", // Fallback if description is null
      created_at: manual.created_at,
      updated_at: manual.updated_at,
    }));
  } catch (error) {
    console.error('Error fetching latest manuals:', error);
    throw error;
  }
}

export async function fetchManualWithSteps(manualID: string) {
  return await prisma.manual.findUnique({
    where: {
      id: parseInt(manualID),
    },
    include: {
      steps: {
        include: {
          image: true,
        },
      },
    },
  });
}


// Adjust fetchAllManuals in manualService to provide correct types
export async function fetchAllManuals(): Promise<ManualWithImages[]> {
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
            image_url: true,
          },
        },
      },
    });

    return manuals.map(manual => ({
      id: manual.id.toString(),
      title: manual.title,
      description: manual.description,
      created_at: manual.created_at,
      updated_at: manual.updated_at,
      images: manual.images.map(image => image.image_url),
    }));
  } catch (error) {
    console.error("Error fetching manuals:", error);
    throw error;
  }
}

