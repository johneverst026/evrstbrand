'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, FolderTree, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-56 h-screen border-r border-secondary bg-white flex flex-col p-5 fixed left-0 top-0">
      <div className="mb-8 px-2">
        <Link href="/" className="text-sm font-black tracking-[0.2em] text-foreground uppercase">
          EVRST<span className="text-accent">.</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-[11px] font-bold uppercase tracking-wider",
                isActive 
                  ? "bg-secondary text-accent" 
                  : "text-zinc-400 hover:text-foreground hover:bg-zinc-50"
              )}
            >
              <item.icon size={14} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-secondary">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-3 py-2 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-foreground transition-colors"
        >
          <ArrowLeft size={10} />
          View Store
        </Link>
      </div>
    </div>
  )
}
