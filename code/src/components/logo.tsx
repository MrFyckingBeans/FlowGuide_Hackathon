// src/components/ui/Logo.tsx

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex justify-center mb-8">
            <Image
                src="/assets/fg-logo.svg"
                alt="FlowGuide Logo"
                width={200}
                height={50}
                priority
                className="cursor-pointer"
            />
        </Link>
    );
}
