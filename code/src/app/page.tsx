// src/app/page.tsx
import Link from "next/link"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Report {
  id: string
  name: string
  reportCount: number
}

interface Manual {
  id: string
  title: string
  description: string
  createdAt: string
}

const reports: Report[] = [
  { id: "102", name: "Manual 102", reportCount: 4 },
  { id: "006", name: "Manual 006", reportCount: 3 },
  { id: "051", name: "Manual 051", reportCount: 2 },
  { id: "019", name: "Manual 019", reportCount: 1 },
]

const manuals: Manual[] = [
  {
    id: "115",
    title: "Manual 115",
    description: "How to install, water machine 3000.",
    createdAt: "29th August 2024",
  },
  {
    id: "114",
    title: "Manual 114",
    description: "Installation of new water purifier.",
    createdAt: "5th August 2024",
  },
]

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Reports</CardTitle>
          <Link
            href="#"
            className="text-sm text-blue-500 hover:underline"
          >
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
          <Link
            href="#"
            className="text-sm text-blue-500 hover:underline"
          >
            See All
          </Link>
        </CardHeader>
        <CardContent className="grid gap-4">
          {manuals.map((manual) => (
            <div
              key={manual.id}
              className="flex flex-col gap-2 p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <h3 className="font-medium">{manual.title}</h3>
              <p className="text-sm text-muted-foreground">
                {manual.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Created: {manual.createdAt}</span>
              </div>
            </div>
          ))}
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
