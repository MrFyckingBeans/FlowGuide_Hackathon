// src/services/manualService.ts

import { prisma } from '@/lib/prisma';
import { Manual, Step, ManualWithImages } from '@/types';


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

export async function fetchManualWithOnlySteps(manualID: string) {
  return await prisma.manual.findUnique({
    where: {
      id: parseInt(manualID),
    },
    include: {
      steps: true,
    },
  });
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

export async function fetchManualWithStepsWithReports(manualID: string) {
  return await prisma.manual.findUnique({
    where: { id: parseInt(manualID) },
    include: {
      steps: {
        include: {
          image: true,
          feedback: true,
        },
      },
    },
  });
}

export async function updateStep(description: string, stepId: number) {
  console.log(description, stepId)
  await prisma.manualStep.update({
    where: { id: stepId },
    data: { description }
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


export async function deleteStep(stepId: number) {
  await prisma.manualStep.delete({
    where: { id: stepId }
  });
}

export async function reorderSteps(newSteps: Step[]) {
  for (const step of newSteps) {
    await prisma.manualStep.update({
      where: { id: step.id },
      data: { step_number: step.step_number }
    });
  }
}




export async function deleteManual(manualId: string): Promise<void> {
  try {
    await prisma.manual.delete({
      where: { id: BigInt(manualId) }, // Convert manualId to BigInt
    });
  } catch (error) {
    console.error("Error deleting manual:", error);
    throw new Error("Failed to delete manual.");
  }
}
