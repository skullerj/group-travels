"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Eye, Trash2, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Group } from "@/lib/types";
import EditGroupDialog from "./edit-group-dialog";
import AddMemberDialog from "./add-member-dialog";

interface GroupCardProps {
  group: Group;
  onUpdate: (group: Group) => void;
  onDelete: (groupId: string) => void;
}

export default function GroupCard({ group, onUpdate, onDelete }: GroupCardProps) {
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteMember = (memberIndex: number) => {
    const updatedMembers = [...group.members];
    updatedMembers.splice(memberIndex, 1);
    onUpdate({ ...group, members: updatedMembers });
  };

  return (
    <>
      <Card className="relative overflow-hidden">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{group.name}</CardTitle>
              <CardDescription>
                {group.members.length} member{group.members.length !== 1 && "s"}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/groups/${group.id}`)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {group.members.length > 0 ? (
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-4">
                {group.members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.city}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeleteMember(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
              <Users className="h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No members yet</p>
            </div>
          )}
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => setIsAddMemberDialogOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </CardContent>
      </Card>

      <EditGroupDialog
        group={group}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={onUpdate}
      />

      <AddMemberDialog
        open={isAddMemberDialogOpen}
        onOpenChange={setIsAddMemberDialogOpen}
        onSubmit={(member) =>
          onUpdate({ ...group, members: [...group.members, member] })
        }
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Group</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this group? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => onDelete(group.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}