'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Camera, Upload } from "lucide-react"
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Help() {
    const pathname = usePathname()
    const searchParams = useSearchParams()



    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi there, I'm here to save you from endless headaches. How can I help?"
        }
    ])

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
                <Button className="w-full bg-blue-500 hover:bg-blue-600" size="lg">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                </Button>
                <Button className="w-full bg-blue-500 hover:bg-blue-600" size="lg">
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