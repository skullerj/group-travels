import GroupsManager from "@/components/groups/groups-manager";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="mx-auto max-w-7xl">
        <GroupsManager />
      </div>
    </main>
  );
}