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



export const addStepToDatabase = async (
    manualId: bigint,
    stepNumber: number,
    step: { title: string; description: string; url: string }
) => {
    const data = {
        step_number: stepNumber,
        title: step.title,
        description: step.description,
        image_url: step.url,
        manual: { connect: { id: manualId } },
    };

    await prisma.manualStep.create({ data });
};

export const addFeedbackToDatabase = async (
    manual_id: number,
    step_number: number,
    image_url: string,
) => {
    const step = await prisma.manualStep.findFirst({
        where: {
            manual_id: manual_id,
            step_number: step_number
        }
    })

    const data = {
        image_url: image_url,
        manualStep: { connect: { id: step?.id } },
        manual: { connect: { id: manual_id } },
    };
    await prisma.manualFeedback.create({ data });
}
