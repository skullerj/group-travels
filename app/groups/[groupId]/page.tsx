"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGroups } from "@/hooks/use-groups";
import GroupIdeas from "@/components/ideas/group-ideas";
import CreateIdeaDialog from "@/components/ideas/create-idea-dialog";
import { useState } from "react";

export default function GroupDetailsPage({
  params,
}: {
  params: { groupId: string };
}) {
  const router = useRouter();
  const { getGroup } = useGroups();
  const group = getGroup(params.groupId);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  if (!group) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
            <p className="text-muted-foreground">
              {group.members.length} member{group.members.length !== 1 && "s"}
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Idea
          </Button>
        </div>

        <GroupIdeas groupId={params.groupId} />

        <CreateIdeaDialog
          groupId={params.groupId}
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </div>
    </main>
  );
}