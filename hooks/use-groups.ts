"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Group, Idea } from "@/lib/types";

interface GroupsState {
  groups: Group[];
  ideas: Record<string, Idea[]>;
  setGroups: (groups: Group[]) => void;
  addGroup: (group: Group) => void;
  updateGroup: (group: Group) => void;
  deleteGroup: (groupId: string) => void;
  getGroup: (groupId: string) => Group | undefined;
  addIdea: (groupId: string, idea: Idea) => void;
  getGroupIdeas: (groupId: string) => Idea[];
  getIdea: (groupId: string, ideaId: string) => Idea | undefined;
}

export const useGroups = create<GroupsState>()(
  persist(
    (set, get) => ({
      groups: [],
      ideas: {},
      setGroups: (groups) => set({ groups }),
      addGroup: (group) =>
        set((state) => ({
          groups: [...state.groups, group],
          ideas: { ...state.ideas, [group.id]: [] },
        })),
      updateGroup: (group) =>
        set((state) => ({
          groups: state.groups.map((g) => (g.id === group.id ? group : g)),
        })),
      deleteGroup: (groupId) =>
        set((state) => ({
          groups: state.groups.filter((g) => g.id !== groupId),
          ideas: Object.fromEntries(
            Object.entries(state.ideas).filter(([id]) => id !== groupId)
          ),
        })),
      getGroup: (groupId) => get().groups.find((g) => g.id === groupId),
      addIdea: (groupId, idea) =>
        set((state) => ({
          ideas: {
            ...state.ideas,
            [groupId]: [...(state.ideas[groupId] || []), idea],
          },
        })),
      getGroupIdeas: (groupId) => get().ideas[groupId] || [],
      getIdea: (groupId, ideaId) =>
        get().ideas[groupId]?.find((idea) => idea.id === ideaId),
    }),
    {
      name: "groups-storage",
    }
  )
);