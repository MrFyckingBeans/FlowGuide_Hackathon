import { prisma } from "@/lib/prisma";

export const addGuidToDatabase = async (
    manualName: string,
    description: string | null,
    steps: { title: string; description: string; url: string }[]
) => {
    const data: any = {
        title: manualName,
        steps: {
            create: steps,
        },
    };

    if (description) {
        data.description = description;
    }
    const newManual = await prisma.manual.create({ data });
    for (const step of steps) {
        console.log("uuuuuuuuuuuuuuuuuuuu");
        await addStepToDatabase(newManual.id, steps.indexOf(step) + 1, step);
    }
    console.log("afdkjsaöldkjföl");
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
