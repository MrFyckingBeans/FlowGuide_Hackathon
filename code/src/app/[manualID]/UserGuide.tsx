'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow flex flex-col items-center justify-between p-4 sm:py-8 max-w-lg mx-auto w-full">
        <div className="w-full space-y-6">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <Image
              src={steps[currentStep - 1].imageUrl}
              alt={`Step ${currentStep} illustration`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Step {currentStep}</h2>
            <p className="text-lg">{steps[currentStep - 1].description}</p>
          </div>
        </div>
        <div className="w-full space-y-4 mt-8">

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={goToPreviousStep} disabled={currentStep === 1} size="lg">
              Back
            </Button>
            <Button onClick={goToNextStep} disabled={currentStep === totalSteps} size="lg">
              {currentStep === totalSteps ? "Finish" : "Next"}
            </Button>
          </div>
          <div className="text-center text-muted-foreground underline">
            <Link href={`${pathname}/help?step=${currentStep}&next=${steps.length > currentStep ? currentStep + 1 : currentStep}&progress=${currentStep / totalSteps * 100}`}>
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