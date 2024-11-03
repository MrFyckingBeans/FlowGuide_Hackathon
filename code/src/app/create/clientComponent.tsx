"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reorder } from "framer-motion";
import { useQueryState, parseAsInteger } from "nuqs";

export default function ClientComponent() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const [deviceName, setDeviceName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<{ name: string; src: string; file?: File; url?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const newImages = Array.from(files).map((file) => {
        return new Promise<{ name: string; src: string; file: File }>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({ name: file.name, src: reader.result as string, file });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newImages).then((results) => {
        setImages((prev) => [...prev, ...results]);
      });
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, { name: file.name, src: reader.result as string, file }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiUpload = async () => {
    setIsLoading(true);
    try {
      const formattedImages = images.map((image) => ({
        name: image.name,
        fileData: image.src.split(",")[1],
      }));

      const uploadSupaBase = await fetch("/api/uploadImages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: formattedImages }),
      });

      const uploadedImages = await uploadSupaBase.json();
      const imagesUrl = Array.isArray(uploadedImages) ? uploadedImages.map((image: { url: string }) => image.url) : [];
      const response = await fetch("/api/getAiDescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NameOfDevice: deviceName,
          Description: description,
          images: imagesUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Generated guide:", data);
        router.push("/");
      } else {
        console.error("Error generating guide:", response.statusText);
      }
    } catch (error) {
      console.error("Error calling generateGuide API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-background flex">
            <div className="container max-w-md px-4 py-6 mx-auto">
                <h1 className="text-3xl font-bold tracking-tight text-center">
                    Manual<span className="text-muted-foreground"></span>
                </h1>

                {step === 0 && (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="device-name">Name of the Manual</Label>
                                <Input
                                    id="device-name"
                                    placeholder="Enter device name..."
                                    className="h-14 bg-gray-100 w-full border border-grey rounded-lg pl-2"
                                    value={deviceName} // Bind state value
                                    onChange={(e) => setDeviceName(e.target.value)} // Update state on change
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Enter a short description</Label>
                                <Input
                                    id="description"
                                    placeholder="description..."
                                    className="h-14 bg-gray-100 w-full border border-grey rounded-lg pl-2"
                                    value={description} // Bind state value
                                    onChange={(e) => setDescription(e.target.value)} // Update state on change
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label>Choose your pictures</Label>
                            <div className="grid gap-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple // Allow multiple files to be selected
                                    onChange={handleFileUpload}
                                    ref={fileInputRef}
                                    className="hidden"
                                />
                                <Button
                                    className="h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    Upload Images
                                </Button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    onChange={handleCameraCapture}
                                    ref={cameraInputRef}
                                    className="hidden"
                                />
                                <Button
                                    className="h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                    onClick={() => cameraInputRef.current?.click()}
                                >
                                    Take Picture
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label>Uploaded Images</Label>
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-300 p-2 rounded-lg max-w-xs flex justify-between items-center mx-auto"
                                >
                                    <p className="text-gray-700 truncate overflow-hidden">{image.name}</p>
                                    <button
                                        className="text-red-500 bg-transparent border-none cursor-pointer invisible"
                                        onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                                    >
                                        <span className="visible">Delete</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-center">Drag each picture to match the process</h2>
                        <Reorder.Group axis="y" values={images} onReorder={setImages}>
                            {images.map((image, index) => (
                                <Reorder.Item
                                    key={image.name}
                                    value={image}
                                    className="flex items-center space-x-4 mb-4"
                                >
                                    <span className="text-xl font-bold w-6">{index + 1}.</span>
                                    <div className="flex items-center p-2 border border-gray-300 rounded-lg flex-grow max-w-xs">
                                        <img
                                            src={image.src}
                                            alt={image.name}
                                            className="w-12 h-12 rounded-lg object-cover mr-2"
                                        />
                                        <div className="truncate flex-grow">
                                            <Input
                                                defaultValue={image.name}
                                                className="text-blue-500 hover:underline bg-transparent border-none w-full"
                                                readOnly
                                            />
                                        </div>
                                        <Button
                                            className="text-red-500 bg-transparent border-none cursor-pointer invisible"
                                            onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                                        >
                                            <span className="visible">Delete</span>
                                        </Button>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>
                )}

                <div
                    className="fixed bottom-0 left-0 right-0 p-4
                    bg-white shadow-lg"
                >
                    <div className="container max-w-md flex justify-between gap-4 mx-auto">
                        <Button
                            onClick={() => setStep(Math.max(step - 1, 0))}
                            className="h-10 w-1/2 border border-blue-500 text-blue-500 rounded-lg bg-white"
                            disabled={step === 0}
                        >
                            Back
                        </Button>
                        {step === 1 ? (
                            <Button
                                onClick={handleAiUpload}
                                className="h-10 w-1/2 bg-blue-500 text-white rounded-lg flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 border-4 border-t-white border-blue-300 rounded-full animate-spin mr-2"></div>{" "}
                                        Generating...
                                    </div>
                                ) : (
                                    "Generate Guide"
                                )}
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setStep(step + 1)}
                                className={`h-10 w-1/2 border border-blue-500 text-blue-500 rounded-lg bg-white ${
                                    !deviceName ? "hover:bg-gray-200" : ""
                                }`}
                                disabled={!deviceName}
                                title={!deviceName ? "Add name to continue" : ""}
                            >
                                {deviceName ? "Next" : "Add name to continue"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
  );
}
