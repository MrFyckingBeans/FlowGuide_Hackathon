import { PrismaClient } from '@prisma/client';
import { Report } from '@/types';

const prisma = new PrismaClient();

export async function fetchReportCounts(): Promise<Report[]> {
  try {
    const reports = await prisma.manual.findMany({
      where: {
        feedback: {
          some: {}, // Only include manuals that have at least one related feedback item
        },
      },
      select: {
        id: true,
        title: true,
        _count: {
          select: { feedback: true },
        },
      },
    });

    return reports.map(report => ({
      id: report.id.toString(),         // Convert BigInt to string
      name: report.title,
      reportCount: report._count.feedback,
    }));
  } catch (error) {
    console.error("Error fetching report counts:", error);
    throw error;
  }
}
