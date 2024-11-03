import { prisma } from "@/lib/prisma";

export const addGuidToDatabase = async (
    manualName: string | null,
    description: string | null,
    steps: { title: string; description: string; url: string }[]
) => {
    const data = {
        title: manualName || "no title",
        description: description || "no description",
        steps: {
            create: steps.map((step, index) => ({
                step_number: index + 1,
                title: step.title,
                description: step.description,
                image_url: step.url,  // Match schema field name
            })),
        },
    };

    try {
        const newManual = await prisma.manual.create({ data });
        console.log("Manual created successfully:", newManual);
    } catch (error) {
        console.error("Error creating manual:", error);
    }
};



const addStepToDatabase = async (
    manualId: bigint,
    stepNumber: number,
    step: { title: string; description: string; url: string }
) => {
    console.log("im here");
    console.log(step, manualId)
    const data = {
        step_number: stepNumber,
        title: step.title,
        description: step.description,
        image_url: step.url,
        manual: { connect: { id: manualId } },
    };
    console.log("afdkjsaöldkjföl");

    await prisma.manualStep.create({ data });
};
