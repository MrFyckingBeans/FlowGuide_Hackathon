"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import RichTextEditor from "./RichTextEditor";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Step {
    id: number;
    step_number: number;
    description: string;
    image_url: string;
}

interface UserGuideViewProps {
    steps: Step[];
    changeStep: (description: string, stepid: number) => void;
}

export default function Edit({ steps, changeStep }: UserGuideViewProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const totalSteps = steps.length;

    const [currentStep, setCurrentStep] = useState(() => {
        const stepParam = searchParams?.get("step");
        const parsedStep = stepParam ? parseInt(stepParam, 10) : 1;
        return isNaN(parsedStep) || parsedStep < 1 || parsedStep > totalSteps ? 1 : parsedStep;
    });

    useEffect(() => {
        router.push(`?step=${currentStep}`, { scroll: false });
    }, [currentStep]);

    const goToNextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            router.push("/");
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const submitStep = (value: string) => {
        console.log(value, currentStep - 1);

        steps[currentStep - 1].description = value;
        changeStep(value, steps[currentStep - 1].id);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <main className="flex-grow flex flex-col items-center justify-between p-4 sm:py-8 max-w-xl mx-auto w-full">
                <div className="w-full space-y-6">
                    <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
                        <img src={steps[currentStep - 1].image_url} alt={`Step ${currentStep} illustration`} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-blue-500">Step {currentStep}</h2>
                        <RichTextEditor initialValue={steps[currentStep - 1].description} submit={submitStep} />
                    </div>
                </div>
                <div className="w-full space-y-4 mt-8">
                    <div className="flex justify-between items-center">
                        <Button variant="outline" onClick={goToPreviousStep} disabled={currentStep === 1} size="lg">
                            Back
                        </Button>
                        <Button onClick={goToNextStep} size="lg">
                            {currentStep === totalSteps ? "Finish" : "Next"}
                        </Button>
                    </div>
                    <Link href={`/`}>
                        <Button variant="outline" className="w-full mt-4">
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back to Overview
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
