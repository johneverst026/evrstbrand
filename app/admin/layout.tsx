import { Sidebar } from '@/components/Sidebar'
import { Toaster } from 'sonner'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      <Sidebar />
      <main className="flex-1 ml-56 p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
      <Toaster theme="light" position="top-center" richColors />
    </div>
  )
}
