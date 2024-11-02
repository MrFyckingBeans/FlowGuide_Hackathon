// src/types/index.ts

export interface Manual {
    id: string;
    title: string;
    description: string;  // Add description field
    created_at: Date;     // Set to Date to match Prisma output
    updated_at: Date;     // Set to Date to match Prisma output
  }
  