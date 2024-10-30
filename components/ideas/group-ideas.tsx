"use client";

import { Calendar, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGroups } from "@/hooks/use-groups";

interface GroupIdeasProps {
  groupId: string;
}

export default function GroupIdeas({ groupId }: GroupIdeasProps) {
  const router = useRouter();
  const { getGroupIdeas } = useGroups();
  const ideas = getGroupIdeas(groupId);

  if (ideas.length === 0) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
        <MapPin className="h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-semibold">No ideas yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Create your first travel idea to get started.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] rounded-lg border bg-card p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <Card
            key={idea.id}
            className="cursor-pointer transition-colors hover:bg-muted/50"
            onClick={() => router.push(`/groups/${groupId}/ideas/${idea.id}`)}
          >
            <CardHeader>
              <CardTitle>{idea.destinationCity}</CardTitle>
              <CardDescription>Travel Idea</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(idea.startDate), "PP")} -{" "}
                    {format(new Date(idea.endDate), "PP")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}