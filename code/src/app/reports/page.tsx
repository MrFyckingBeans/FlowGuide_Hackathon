import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchReportCounts } from "@/services/reportService"
import { Report } from "@/types"
import Logo from "@/components/logo"

export default async function ReportsOverview() {
    let reports: Report[] = []
    let error: string | null = null

    try {
        reports = await fetchReportCounts()
    } catch (e) {
        console.error("Failed to fetch reports:", e)
        error = "Failed to load reports. Please try again later."
    }

    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col max-w-xl">
            <Logo />

            <Card className="flex-grow border-none shadow-lg">
                <CardHeader>
                    <CardTitle>Reported Issues</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                    {error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : reports.length > 0 ? (
                        reports.map((report) => (
                            <Link href={`/${report.id.toString()}`} key={report.id.toString()}>
                                <div
                                    key={report.id}
                                    className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors"
                                >
                                    <span className="font-medium">{report.name}</span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${report.reportCount >= 4
                                            ? "bg-red-100 text-red-700"
                                            : report.reportCount === 3
                                                ? "bg-orange-100 text-orange-700"
                                                : report.reportCount === 2
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {report.reportCount} {report.reportCount === 1 ? "Issue" : "Issues"}
                                    </span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground">No issues reported.</div>
                    )}

                </CardContent>
            </Card>

            <div className="mt-6">
                <Link href="/">
                    <Button
                        variant="outline"
                        className="w-full text-blue-500 border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                    >
                        Back to Overview
                    </Button>
                </Link>
            </div>
        </div>
    )
}