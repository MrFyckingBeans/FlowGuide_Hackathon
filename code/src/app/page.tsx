"use client";

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Manual } from "@/types" // Import the Manual type

interface Report {
  id: string
  name: string
  reportCount: number
}

const reports: Report[] = [
  { id: "102", name: "Manual 102", reportCount: 4 },
  { id: "006", name: "Manual 006", reportCount: 3 },
  { id: "051", name: "Manual 051", reportCount: 2 },
]

export default function Page() {
  const [manuals, setManuals] = useState<Manual[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadLatestManuals() {
      try {
        const response = await fetch("/api/manuals/latest"); // Use the API route
        if (!response.ok) throw new Error("Failed to load manuals");
  
        const data = await response.json();
        setManuals(data);
      } catch (error) {
        console.error("Failed to load manuals:", error);
        setError("Failed to load the latest manuals.");
      }
    }
  
    loadLatestManuals();
  }, []);
  

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-center mb-4">
        <Image
          src="/assets/fg-logo.svg"
          alt="FlowGuide Logo"
          width={200}
          height={50}
          priority
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Reports</CardTitle>
          <Link href="#" className="text-sm text-blue-500 hover:underline">
            See All
          </Link>
        </CardHeader>
        <CardContent className="grid gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <span className="font-medium">{report.name}</span>
              <span
                className={`text-sm ${
                  report.reportCount === 4
                    ? "text-red-500"
                    : report.reportCount === 3
                    ? "text-orange-500"
                    : report.reportCount === 2
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {report.reportCount} Reports
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Last generated Manuals</CardTitle>
          <Link href="#" className="text-sm text-blue-500 hover:underline">
            See All
          </Link>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            manuals.map((manual) => (
              <div
                key={manual.id.toString()} // Convert BigInt to string for React key
                className="flex flex-col gap-2 p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <h3 className="font-medium">{manual.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {manual.description || "No description available."}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Created: {new Date(manual.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button size="lg" className="w-full max-w-md bg-blue-500 hover:bg-blue-600">
          Create Manual
        </Button>
      </div>
    </div>
  )
}
