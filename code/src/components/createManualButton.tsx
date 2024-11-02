// src/components/ui/createManualButton.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreateManualButton() {
    return (
        <div className="mt-auto flex justify-center">
            <Link href="/create" className="w-full max-w-md">
                <Button size="lg" className="w-full bg-blue-500 hover:bg-blue-600">
                    Create Manual
                </Button>
            </Link>
        </div>
    );
}
