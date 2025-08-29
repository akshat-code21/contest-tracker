"use client"

import { z } from "zod"
import { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dispatch, SetStateAction } from "react"
import { Flag, X } from "lucide-react"
import { SelectedContest } from "./ContestCard"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email()
})

type FormData = z.infer<typeof formSchema>

interface EmailPopoverProps {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    form: UseFormReturn<FormData>;
    onSubmit: (values: FormData) => void;
    setContestSelected: Dispatch<SetStateAction<SelectedContest | undefined>>
}

export default function EmailPopover({
    isModalOpen,
    setIsModalOpen,
    form,
    onSubmit,
    setContestSelected
}: EmailPopoverProps) {
    const handleSubmit = async (values: FormData) => {
        await onSubmit(values);
        setIsModalOpen(false);
        form.reset();
        setContestSelected({
            contestName: "",
            duration: "",
            contestLink: "",
            platformName: "",
            startTime: ""
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96 relative">
                <div className="text-lg font-semibold mb-4">
                    <div className="flex items-center justify-between">
                        Set Email Reminder
                        <Button variant={"ghost"} onClick={() => setIsModalOpen(false)}>
                            <X size={20} />
                        </Button>
                    </div>
                </div>
                <div className="space-y-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}