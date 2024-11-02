import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

interface CreateManualButtonProps {
    className?: string;
}

const CreateManualButton: React.FC<CreateManualButtonProps> = ({ className }) => {
    return (
        <div className={clsx("flex justify-center", className)}>
            <Link href="/create" className="w-full max-w-md">
                <Button size="lg" className="w-full bg-blue-500 hover:bg-blue-600">
                    Create Manual
                </Button>
            </Link>
        </div>
    );
};

export default CreateManualButton;
