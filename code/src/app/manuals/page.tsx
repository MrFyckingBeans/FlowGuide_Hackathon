"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MoreVertical, Edit2, Trash2, Copy } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ManualWithImages } from "@/types";
import CreateManualButton from "@/components/createManualButton";
import Logo from "@/components/logo";
import SkeletonManualCard from "@/components/skeletonManualCard";

export default function ManualsOverview() {
    const [manuals, setManuals] = useState<ManualWithImages[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter(); // Initialize useRouter

    useEffect(() => {
        async function fetchManuals() {
            try {
                const response = await fetch("/api/manuals/with-images");
                if (!response.ok) throw new Error("Failed to fetch manuals with images");

                const data = await response.json();
                setManuals(data);
            } catch (error) {
                console.error("Failed to load manuals:", error);
                setError("Failed to load manuals.");
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        }

        fetchManuals();
    }, []);

    // Function to delete a manual
    async function handleDelete(manualId: string) {
        try {
            const response = await fetch(`/api/manuals/${manualId}/delete`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete manual");

            // Remove the deleted manual from state
            setManuals(manuals.filter((manual) => manual.id !== manualId));
        } catch (error) {
            console.error("Error deleting manual:", error);
            setError("Failed to delete manual.");
        }
    }

    // Function to handle the edit navigation
    const handleEditClick = (manualId: string) => {
        router.push(`/${manualId}/edit`); // Navigate to the edit page
    };

    const handleCopyToClipboard = (manualId: string) => {
        const url = `${window.location.origin}/${manualId}`;
        navigator.clipboard.writeText(url); // Copy the URL to the clipboard
    }

    return (
        <div className="container mx-auto p-2 pt-4 min-h-screen flex flex-col max-w-xl">
            <Logo />

            <div className="w-full max-w-xl">
                <Card className="border-none shadow-none w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Manuals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {loading ? (
                            // Display 1 skeletons while loading
                            Array.from({ length: 1 }).map((_, index) => (
                                <SkeletonManualCard key={index} />
                            ))
                        ) : manuals.length > 0 ? (
                            manuals.map((manual) => (
                                <div key={manual.id} className="space-y-4 p-4 rounded-lg border bg-card cursor-pointer hover:shadow-md transition-shadow relative">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="absolute bottom-2 right-2 p-2 rounded-full hover:bg-gray-200">
                                                <MoreVertical className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleCopyToClipboard(manual.id)}>
                                                <Copy className="mr-2 h-4 w-4 text-blue-500" /> Copy URL
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEditClick(manual.id)}>
                                                <Edit2 className="mr-2 h-4 w-4 text-blue-500" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(manual.id)} className="text-red-500">
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <ScrollArea className="w-full whitespace-nowrap rounded-md">
                                        <div className="flex w-max space-x-4">
                                            {manual.images.map((image, index) => (
                                                <Link
                                                    key={index}
                                                    href={{
                                                        pathname: `/${manual.id}`,
                                                        query: { step: index + 1 }
                                                    }}
                                                    className="block"
                                                >
                                                    <div className="overflow-hidden rounded-md border bg-muted">
                                                        <Image
                                                            src={image} // Ensure image is a string URL
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
                                            <span>Created: {new Date(manual.updated_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8 text-center space-y-2">
                                <p className="text-muted-foreground">No manuals generated yet.</p>
                                <p className="text-sm text-muted-foreground">
                                    Manuals will appear here once they are generated.
                                </p>
                            </div>
                        )}
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </CardContent>
                </Card>
            </div>

            <CreateManualButton className="p-6" />
        </div>
    );
}

