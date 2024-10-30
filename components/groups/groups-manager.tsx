"use client";

import { useState } from "react";
import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import GroupCard from "./group-card";
import CreateGroupDialog from "./create-group-dialog";
import { useGroups } from "@/hooks/use-groups";

export default function GroupsManager() {
  const { groups, addGroup, updateGroup, deleteGroup } = useGroups();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Groups Management</h1>
          <p className="text-muted-foreground">
            Create and manage your groups and their members.
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      {groups.length === 0 ? (
        <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
          <Users className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No groups yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first group to get started.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>
      ) : (
        <ScrollArea className="h-[700px] rounded-lg border bg-card p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onUpdate={updateGroup}
                onDelete={deleteGroup}
              />
            ))}
          </div>
        </ScrollArea>
      )}

      <CreateGroupDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={addGroup}
      />
    </div>
  );
}