'use client'
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RichTextEditor({ initialValue, submit }: { initialValue: string, submit: (value: string) => void }) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <Button onClick={() => submit(value)} variant="outline">Save</Button>
    </>;
}

export default RichTextEditor
