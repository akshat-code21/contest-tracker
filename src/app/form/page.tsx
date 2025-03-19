"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Youtube,
  Link,
  CalendarDays,
  User,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, Toaster } from "sonner";

const formSchema = z.object({
  youtubeUrl: z
    .string()
    .min(1, { message: "YouTube URL is required" })
    .refine(
      (value) => value.includes("youtube.com/") || value.includes("youtu.be/"),
      { message: "Please enter a valid YouTube URL" }
    ),
  title: z.string().min(1, { message: "Video title is required" }),
  description: z.string().optional(),
  author: z.string().min(1, { message: "Author name is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  tags: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const UploadForm = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      youtubeUrl: "",
      title: "",
      description: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      tags: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast("YouTube Link Submitted");
    router.replace("/");
  };

  return (
    <div className="bg-gradient-to-b from-background to-secondary/20">
      <main className="container px-4 md:px-6 py-8 max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.replace("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Contests
        </Button>

        <Card className="border-2 border-primary/10 shadow-md">
          <CardHeader className="bg-gradient-to-r from-red-500/10 to-red-600/10 pb-8 py-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
              <Youtube className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">
              Upload YouTube Video
            </CardTitle>           
          </CardHeader>

          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="youtubeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            <Link className="h-4 w-4" />
                          </div>
                          <Input
                            className="pl-10"
                            placeholder="https://youtube.com/watch?v=..."
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter the full URL of the YouTube video
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CardFooter className="px-0 pt-4 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.replace("/")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  >
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default UploadForm;
