"use client";

import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
    value: string;
    onChange: (src: string) => void;
    disabled?: boolean;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="space-y-4 w-full flex flex-col justify-center items-center">
            <CldUploadButton
                onSuccess={(result: CloudinaryUploadWidgetResults) => {
                    if (typeof result.info === "object" && result.info !== null && "secure_url" in result.info) {
                        onChange(result.info.secure_url as string);
                    }
                }}
                options={{
                    maxFiles: 1,
                }}
                uploadPreset="ai-companion"
            >
                <div className="p-4 border-4 border-dashed rounded-lg border-primary/10 hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
                    <div className="relative h-40 w-40">
                        <Image
                            fill
                            alt="Upload"
                            src={value || "/placeholder.svg"}
                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>
            </CldUploadButton>
        </div>
    );
};
