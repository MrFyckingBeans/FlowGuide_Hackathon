'use client'

import { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Camera, Trash, Upload } from "lucide-react"
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Help({ uploadImage }: { uploadImage: (formData: FormData) => Promise<string> }) {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi there, I'm here to save you from endless headaches. How can I help?"
        }
    ])

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);


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

            Promise.any(newImages).then((result) => {
                handleUploadImage(result.file);
            });
        }
    };

    const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                handleUploadImage(file)
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        const text = await uploadImage(formData)
        setMessages([...messages, { role: 'assistant', content: text }])
    }



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const input = form.elements.namedItem('message') as HTMLInputElement
        const message = input.value.trim()

        if (message) {
            setMessages([...messages, { role: 'user', content: message }])
            input.value = ''
        }
    }

    return (
        <div className="flex flex-col min-h-screen p-4 sm:py-8 max-w-xl mx-auto">
            <div className="space-y-2 mb-6">
                <h1 className="text-3xl font-bold">
                    <span className="text-blue-500">Are you lost?</span>
                    <br />
                    Don't worry.
                </h1>
                <p className="text-muted-foreground">
                    Upload or take a picture of your current state and let us tell you how to move on.
                </p>
            </div>

            <div className="space-y-3 mb-6">
                <input
                    type="file"
                    accept="image/*"
                    multiple // Allow multiple files to be selected
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    className="hidden"
                />
                <Button className="w-full bg-blue-500 hover:bg-blue-600" size="lg" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
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
                    className="w-full bg-blue-500 hover:bg-blue-600" size="lg"
                    onClick={() => cameraInputRef.current?.click()}
                >
                    <Camera className="mr-2 h-4 w-4" />
                    Take Picture
                </Button>
            </div>

            <Card className="flex-1 p-4 mb-6 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`rounded-lg px-4 py-2 max-w-[80%] ${message.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-muted'
                                        }`}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="font-semibold mb-1">Your saviour</div>
                                    )}
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="relative mt-auto">
                    <Input
                        name="message"
                        placeholder="Ask your question..."
                        className="w-full"
                    />
                </form>
            </Card>

            <div className="flex justify-between mb-4">
                <Link href={`${pathname?.split('/').slice(0, -1).join('/')}?step=${searchParams?.get('step')}`}><Button variant="outline" size="lg">Back</Button></Link>
                <Link href={`${pathname?.split('/').slice(0, -1).join('/')}?step=${searchParams?.get('next')}`}><Button size="lg">Next</Button></Link>
            </div>

            <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-1/3"
                    style={{ width: `${searchParams?.get('progress')}%` }}
                ></div>
            </div>
        </div>
    )
}