// src/types/index.ts

export interface Manual {
    id: string;
    title: string;
    description: string;  // Add description field
    created_at: Date;     // Set to Date to match Prisma output
    updated_at: Date;     // Set to Date to match Prisma output
    steps?: Step[];
}

// New ManualWithImages type
export interface ManualWithImages extends Manual {
  images: string[];  // Array of image URLs
}

export interface Report {
  id: string;           // BigInt converted to string for JSON serialization
  name: string;         // Manual title
  reportCount: number;  // Count of feedback reports for the manual
}
  
export interface Step {
  id: number;
  step_number: number;
  description: string;
  image?: Image;
  feedback?: Feedback[];
}

export interface Image {
  id: string;
  image_url: string;
}

export interface Feedback {
  id: number;
  image_url: string;
}
