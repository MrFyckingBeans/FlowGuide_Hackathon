'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import "./styles.css"

interface Step {
  description: string
  imageUrl: string
}

interface UserGuideViewProps {
  steps?: Step[]
}

export default function Component({
  steps = [
    { description: "This is step 1", imageUrl: "/placeholder.svg?height=400&width=800" },
    { description: "This is step 2", imageUrl: "/placeholder.svg?height=400&width=800" },
    { description: "This is step 3", imageUrl: "/placeholder.svg?height=400&width=800" },
  ],
}: UserGuideViewProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const totalSteps = steps.length

  const [currentStep, setCurrentStep] = useState(() => {
    const stepParam = searchParams?.get('step')
    const parsedStep = stepParam ? parseInt(stepParam, 10) : 1
    return isNaN(parsedStep) || parsedStep < 1 || parsedStep > totalSteps ? 1 : parsedStep
  })

  useEffect(() => {
    router.push(`?step=${currentStep}`, { scroll: false })
  }, [currentStep])

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
    router.push(`/`)
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push(`/`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow flex flex-col items-center justify-between p-4 sm:py-8 max-w-lg mx-auto w-full">
        <div className="w-full space-y-6">
          <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
            <img
              src={steps[currentStep - 1].imageUrl}
              alt={`Step ${currentStep} illustration`}
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-500">Step {currentStep}</h2>
            <div dangerouslySetInnerHTML={{ __html: steps[currentStep - 1].description }} />
          </div>
        </div>
        <div className="w-full space-y-4 mt-8">

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={goToPreviousStep} size="lg">
              Back
            </Button>
            <Button onClick={goToNextStep} size="lg">
              {currentStep === totalSteps ? "Finish" : "Next"}
            </Button>
          </div>
          <div className="text-center text-muted-foreground underline">
            <Link href={`${pathname}/help?step=${currentStep}&next=${steps.length > currentStep ? currentStep + 1 : currentStep}`}>
              I'm Lost, help me!
            </Link>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </main>
    </div>
  )
}