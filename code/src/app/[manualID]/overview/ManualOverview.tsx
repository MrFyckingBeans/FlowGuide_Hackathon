"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Manual } from "@/types"
import { Pencil, Trash2, AlertCircle, ChevronLeft } from "lucide-react"
import Link from "next/link"
import "./styles.css"


export default function ManualOverview({ manual, deleteStep }: { manual: Manual, deleteStep: (stepId: number) => void }) {

    const steps = manual?.steps?.sort((a, b) => a.step_number - b.step_number) || []

    return (
        <div className="container max-w-lg mx-auto p-4 space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">{manual.title}</h1>
                <p className="text-muted-foreground">
                    {manual.description}
                </p>
            </div>

            <div className="space-y-4">
                {steps.map((step) => (
                    <Card key={step.step_number}>
                        <CardContent className="p-0 flex flex-col sm:flex-row">
                            <div className="relative w-full sm:w-1/4">
                                <Link href={`/${manual.id}?step=${step.step_number}`}>
                                    <img
                                        src={step.image?.image_url}
                                        alt={`Step ${step.step_number}`}
                                        className="w-full object-cover"
                                    />
                                </Link>
                            </div>
                            <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
                                <h2 className="text-3xl font-bold">Step {step.step_number}</h2>
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


                ))}
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