"use client";

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Manual, Report } from "@/types"
import Logo from "@/components/logo";
import CreateManualButton from "@/components/createManualButton";

export default function Page() {
  const [manuals, setManuals] = useState<Manual[] | null>(null); // Set null initially
  const [error, setError] = useState<string | null>(null)

  const [reports, setReports] = useState<Report[] | null>(null); // Set null initially
  const [reportError, setReportError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLatestManuals() {
      try {
        const response = await fetch("/api/manuals");
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

  useEffect(() => {
    async function loadReports() {
      try {
        const response = await fetch("/api/report");
        if (!response.ok) throw new Error("Failed to load reports");

        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Failed to load reports:", error);
        setReportError("Failed to load the reports.");
      }
    }

    loadReports();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">

      <Logo />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Reports</CardTitle>
          <Link href="/reports" className="text-sm text-blue-500 hover:underline">
            See All
          </Link>
        </CardHeader>
        <CardContent className="grid gap-4">
          {reports === null ? (
            // Skeleton Structure for Reports
            Array(1).fill(0).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <Skeleton className="w-1/2 h-4 rounded" />
                <Skeleton className="w-1/4 h-4 rounded" />
              </div>
            ))
          ) : reportError ? (
            <p className="text-red-500">{reportError}</p>
          ) : (
            reports.map((report) => (
              <Link href={`/${report.id}/overview`} key={report.id}>
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:cursor-pointer">
                  <span className="font-medium">{report.name}</span>
                  <span
                    className={`text-sm ${report.reportCount === 4
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
              </Link>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manuals</CardTitle>
          <Link href="/manuals" className="text-sm text-blue-500 hover:underline">
            See All
          </Link>
        </CardHeader>
        <CardContent className="grid gap-4">
          {manuals === null ? (
            // Skeleton Structure for Manuals
            Array(1).fill(0).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <Skeleton className="w-2/3 h-5 rounded" />
                <Skeleton className="w-full h-4 rounded" />
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Skeleton className="w-1/3 h-4 rounded" />
                </div>
              </div>
            ))
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            manuals.map((manual) => (
              <Link href={`/${manual.id.toString()}`} key={manual.id.toString()}>
                <div
                  key={manual.id.toString()}
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
              </Link>
            ))
          )}
        </CardContent>
      </Card>

      <CreateManualButton />
    </div>
  );
}
