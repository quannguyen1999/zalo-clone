'use client'

import { Smile } from "lucide-react";
import Picker from '@emoji-mart/react';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import data from '@emoji-mart/data'

interface EmojiPickerProps {
    onChange: (value: string) => void;
}
export const EmojiPicker = ({
    onChange
}: EmojiPickerProps) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Smile className="text-zinc-500 dark:Text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"/>

            </PopoverTrigger>
            <PopoverContent side="right" sideOffset={40}
                className="bg-transparent border-none shadow-none drop-shadow-none mb-12"
            >
                <Picker 
                    
                    className="bg-white"
                    data={data}
                    onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                />

            </PopoverContent>
        </Popover>
    )
}

