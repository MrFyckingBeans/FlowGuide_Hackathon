// src/types/index.ts

export interface Manual {
    id: string;
    title: string;
    description: string;  // Add description field
    created_at: Date;     // Set to Date to match Prisma output
    updated_at: Date;     // Set to Date to match Prisma output
}

export interface Report {
  id: string;           // BigInt converted to string for JSON serialization
  name: string;         // Manual title
  reportCount: number;  // Count of feedback reports for the manual
}
  