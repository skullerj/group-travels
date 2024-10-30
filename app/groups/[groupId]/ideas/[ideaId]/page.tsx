"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGroups } from "@/hooks/use-groups";
import { format } from "date-fns";

export default function IdeaDetailsPage({
  params,
}: {
  params: { groupId: string; ideaId: string };
}) {
  const router = useRouter();
  const { getGroup, getIdea } = useGroups();
  const group = getGroup(params.groupId);
  const idea = getIdea(params.groupId, params.ideaId);

  if (!group || !idea) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => router.push(`/groups/${params.groupId}`)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Group
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{idea.destinationCity}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Destination City</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Start Date</span>
                </div>
                <p className="text-lg font-medium">
                  {format(new Date(idea.startDate), "PPP")}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>End Date</span>
                </div>
                <p className="text-lg font-medium">
                  {format(new Date(idea.endDate), "PPP")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}