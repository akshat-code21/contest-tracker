"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, Mail, Trash2, ChevronLeft, Bell, ExternalLink } from "lucide-react";
import { baseUrl } from "@/lib/constant";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Reminder {
  id: string;
  contestId: string;
  contestName: string;
  platformName: string;
  startTime: string;
  startTimeISO: string;
  duration: string;
  contestLink: string;
}

export default function RemindersPage() {
  const [email, setEmail] = useState("");
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchReminders = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`${baseUrl}/reminders?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error("Failed to fetch reminders");
      const data = await res.json();
      setReminders(data);
    } catch {
      toast.error("Failed to fetch reminders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelReminder = async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}/reminders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to cancel reminder");
      setReminders((prev) => prev.filter((r) => r.id !== id));
      toast.success("Reminder cancelled successfully");
    } catch {
      toast.error("Failed to cancel reminder. Please try again.");
    }
  };

  const checkPlatform = (platform: string): string => {
    switch (platform.toLowerCase()) {
      case "codeforces": return "bg-cf-secondary text-cf-primary";
      case "codechef": return "bg-cc-secondary text-cc-primary";
      case "leetcode": return "bg-lc-secondary text-lc-primary";
      case "atcoder": return "bg-ac-secondary text-ac-primary";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen">
      <div className="my-8 sm:my-12">
        <div className="relative max-w-3xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft size={16} />
            Back to contests
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-icon text-icon-foreground">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              My Reminders
            </h1>
          </div>
          <p className="text-sm sm:text-base text-subtitle mb-8">
            Enter your email to view and manage your contest reminders.
          </p>

          <div className="flex gap-2 mb-8">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchReminders()}
              className="flex-1"
            />
            <Button onClick={fetchReminders} disabled={loading}>
              {loading ? "Loading..." : "Find Reminders"}
            </Button>
          </div>

          {loading && (
            <div className="text-center py-12 text-muted-foreground">
              Loading reminders...
            </div>
          )}

          {!loading && searched && reminders.length === 0 && (
            <div className="text-center py-12">
              <Mail className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-1">No reminders found</h3>
              <p className="text-sm text-muted-foreground">
                You haven&apos;t set up any reminders for this email address.
              </p>
            </div>
          )}

          {!loading && reminders.length > 0 && (
            <div className="space-y-3">
              {reminders.map((reminder) => (
                <Card key={reminder.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(checkPlatform(reminder.platformName), "rounded-sm px-2 py-0.5 text-xs font-medium")}>
                        {reminder.platformName}
                      </span>
                    </div>
                    <h3 className="font-medium truncate">{reminder.contestName}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {reminder.startTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {reminder.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={reminder.contestLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-md border border-input hover:bg-accent"
                    >
                      Visit <ExternalLink size={14} />
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cancelReminder(reminder.id)}
                      className="text-red-500 hover:text-red-600 border-red-200 hover:border-red-300"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Cancel
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
