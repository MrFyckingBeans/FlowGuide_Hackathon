import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchAllManuals } from "@/services/manualService"
import { ManualWithImages } from "@/types";
import CreateManualButton from "@/components/createManualButton"
import Logo from "@/components/logo"


export default async function ManualsOverview() {
    let manuals: ManualWithImages[] = [];

    try {
        manuals = await fetchAllManuals();
    } catch (error) {
        console.error("Failed to load manuals:", error);
    }

    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col max-w-xl">
            <Logo />

            <Card className="border-none shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Manuals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {manuals.map((manual) => (
                        <div key={manual.id} className="space-y-4 p-4 rounded-lg border bg-card cursor-pointer hover:shadow-md transition-shadow">
                            <ScrollArea className="w-full whitespace-nowrap rounded-md">
                                <div className="flex w-max space-x-4">
                                    {manual.images.map((image, index) => (
                                        <Link
                                            key={index}
                                            href={{
                                                pathname: `/${manual.id}`,
                                                query: { step: index + 1 } // Pass the step number as query parameter
                                            }}
                                            className="block"
                                        >
                                            <div className="overflow-hidden rounded-md border bg-muted">
                                                <Image
                                                    src={image}
                                                    alt={`Manual ${manual.id} image ${index + 1}`}
                                                    width={100}
                                                    height={100}
                                                    className="object-cover aspect-square"
                                                />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>

                            <div className="space-y-2">
                                <Link href={`/${manual.id}`}>
                                    <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                                        {manual.title}
                                    </h3>
                                </Link>
                                <p className="text-muted-foreground">
                                    {manual.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Created: {manual.updated_at.toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {manuals.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-8 text-center space-y-2">
                            <p className="text-muted-foreground">No manuals generated yet.</p>
                            <p className="text-sm text-muted-foreground">
                                Manuals will appear here once they are generated.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <CreateManualButton />
        </div>

    );
}

function LoadingSkeleton() {
    return (
        <div className="space-y-6">
            {[1, 2].map((i) => (
                <div key={i} className="space-y-4">
                    <div className="flex space-x-4">
                        {[1, 2, 3].map((j) => (
                            <Skeleton key={j} className="w-[200px] h-[200px]" />
                        ))}
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-[150px]" />
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[120px]" />
                    </div>
                </div>
            ))}
        </div>
    )
}