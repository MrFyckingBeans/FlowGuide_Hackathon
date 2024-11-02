// src/app/create/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload } from "lucide-react";

export default function Component() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container max-w-md px-4 py-6">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Manual 116 <span className="text-muted-foreground">(Draft)</span>
                        </h1>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="device-name">Enter the name of the device*</Label>
                            <Input
                                id="device-name"
                                placeholder="Enter device name..."
                                className="h-14 bg-gray-100 w-full border border-grey rounded-lg pl-2"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Enter a short description*</Label>
                            <Input
                                id="description"
                                placeholder="Enter description..."
                                className="h-14 bg-gray-100 w-full border border-grey rounded-lg pl-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label>Choose your pictures</Label>
                        <div className="grid gap-4">
                            <Button className="h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                                Upload Image
                            </Button>
                            <Button className="h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                                Take Picture
                            </Button>
                        </div>
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
                        <div className="container max-w-md flex justify-between gap-4">
                            <Button className="w-full border border-blue-500 text-blue-500">Back</Button>
                            <Button className="w-full border border-blue-500 text-blue-500">Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
