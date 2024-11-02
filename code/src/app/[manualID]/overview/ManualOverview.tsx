"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Manual, Step } from "@/types"
import { Pencil, Trash2, AlertCircle, ChevronLeft } from "lucide-react"
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
        <div className="container max-w-xl mx-auto p-4 space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">{manual.title}</h1>
                <p className="text-muted-foreground">
                    {manual.description}
                </p>
            </div>

            <div className="space-y-4">
                <Reorder.Group axis="y" values={steps} onReorder={reorderSteps} className="list-none">
                    {steps.map((step) => (
                        <Reorder.Item key={step.id} value={step} className="mb-2">
                            <Card key={step.step_number} className="overflow-hidden">
                                <CardContent className="p-0 flex flex-col flex-row">
                                    <div className="relative w-full !w-1/4">
                                        <Link href={`/${manual.id}?step=${step.step_number}`}>
                                            <img
                                                src={step.image?.image_url}
                                                alt={`Step ${step.step_number}`}
                                                className="h-full object-cover"
                                            />
                                        </Link>
                                    </div>
                                    <div className="w-full !w-2/3 p-4 flex flex-col justify-between">
                                        <Link href={`/${manual.id}?step=${step.step_number}`} className="w-fit">
                                            <h2 className="text-3xl font-bold hover:underline text-blue-500 w-fit">Step {step.step_number}</h2>
                                        </Link>
                                        <p className="text-sm text-muted-foreground limited-text">
                                            {removeHtmlTags(step.description)}
                                        </p>
                                        <div className="flex justify-between items-center mb-4 sm:mb-0">
                                            <div className={`flex items-center ${step.feedback?.length || 0 > 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                <span>{step.feedback?.length || 0} {(step.feedback?.length || 0) === 1 ? 'issue' : 'issues'}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/${manual.id}/edit?step=${step.step_number}`}>
                                                    <Button variant="ghost" size="icon">
                                                        <Pencil className="w-4 h-4" />
                                                        <span className="sr-only">Edit step</span>
                                                    </Button>
                                                </Link>

                                                <Button variant="ghost" size="icon" onClick={() => {
                                                    deleteStep(step.id)
                                                }}>
                                                    <Trash2 className="w-4 h-4" />
                                                    <span className="sr-only">Delete step</span>
                                                </Button>
                                            </div>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>

            <Link href={`/`}>
                <Button variant="outline" className="w-full mt-4">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Overview
                </Button>
            </Link>
        </div>
    )
}

function removeHtmlTags(input: string) {
    return input.replace(/<[^>]*>/g, '');
}