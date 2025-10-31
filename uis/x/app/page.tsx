import { Feed } from "@/components/feed"

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-border flex-col pt-4 px-4 sticky top-0">
        <div className="text-2xl font-bold mb-8 text-primary">𝕏</div>
        <nav className="space-y-4 flex-1">
          <div className="text-foreground hover:bg-secondary/50 p-3 rounded-full cursor-pointer transition">Home</div>
          <div className="text-foreground hover:bg-secondary/50 p-3 rounded-full cursor-pointer transition">
            Explore
          </div>
          <div className="text-foreground hover:bg-secondary/50 p-3 rounded-full cursor-pointer transition">
            Notifications
          </div>
          <div className="text-foreground hover:bg-secondary/50 p-3 rounded-full cursor-pointer transition">
            Messages
          </div>
        </nav>
        <button className="w-full bg-primary text-primary-foreground rounded-full py-3 font-bold text-lg mb-4">
          Post
        </button>
      </aside>

      {/* Main Feed */}
      <main className="flex-1 max-w-2xl border-r border-border">
        <Feed />
      </main>

      {/* Right Sidebar (optional) */}
      <aside className="hidden lg:flex w-72 p-4">
        <div className="bg-secondary text-secondary-foreground rounded-2xl p-4 w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-input text-foreground placeholder:text-muted-foreground rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </aside>
    </div>
  )
}
