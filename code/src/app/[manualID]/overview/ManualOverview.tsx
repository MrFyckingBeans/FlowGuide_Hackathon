"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Manual, Step } from "@/types"
import { Trash2, AlertCircle, ChevronLeft, Edit2 } from "lucide-react"
import Link from "next/link"
import { Reorder } from "framer-motion"
import { useState } from "react"
import "./styles.css"


export default function ManualOverview({ manual, deleteStep, reorderStepsInDb }: { manual: Manual, deleteStep: (stepId: number) => void, reorderStepsInDb: (newSteps: Step[]) => void }) {

    const [steps, setSteps] = useState(manual?.steps?.sort((a, b) => a.step_number - b.step_number) || [])

    const reorderSteps = (newSteps: Step[]) => {
        newSteps.forEach((step, index) => {
            step.step_number = index + 1
        })

        reorderStepsInDb(newSteps)
        setSteps(newSteps)

    }

    return (
        <div className="container max-w-3xl mx-auto p-4 space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">{manual.title}</h1>
                <p className="text-muted-foreground">
                    {manual.description}
                </p>
            </div>

            <Reorder.Group axis="y" values={steps} onReorder={reorderSteps} className="space-y-4">
                {steps.map((step) => (
                    <Reorder.Item key={step.id} value={step}>
                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex">
                                    <div className="w-1/3 relative">
                                        <Link href={`/${manual.id}?step=${step.step_number}`}>
                                            <img
                                                src={step.image?.image_url || '/placeholder.svg'}
                                                alt={`Step ${step.step_number}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </Link>
                                    </div>
                                    <div className="w-2/3 p-4 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <Link href={`/${manual.id}?step=${step.step_number}`} className="group">
                                                <h2 className="text-2xl font-bold text-blue-500 group-hover:underline">Step {step.step_number}</h2>
                                            </Link>

                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4 flex-grow">
                                            {removeHtmlTags(step.description)}
                                        </p>
                                        <div className={`flex items-center justify-between ${step.feedback?.length ? 'text-red-500' : 'text-muted-foreground'}`}>
                                            {/* Alert Circle and Feedback Count */}
                                            <div className="flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                <span>{step.feedback?.length || 0} {step.feedback?.length === 1 ? 'issue' : 'issues'}</span>
                                            </div>

                                            {/* Edit and Delete Buttons */}
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/${manual.id}/edit?step=${step.step_number}`}>
                                                        <Edit2 className="h-4 w-4 text-blue-500" />
                                                        <span className="sr-only">Edit step</span>
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => deleteStep(step.id)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                    <span className="sr-only">Delete step</span>
                                                </Button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <Button variant="outline" className="w-full" asChild>
                <Link href="/">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Overview
                </Link>
            </Button>
        </div>
    )

}

function removeHtmlTags(input: string) {
    return input.replace(/<[^>]*>/g, '');
}