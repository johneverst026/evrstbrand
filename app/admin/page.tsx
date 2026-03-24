'use client'

import { useEffect, useState } from 'react'
import { Package, FolderTree, TrendingUp, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, c] = await Promise.all([
          fetch('/api/products').then(res => res.json()),
          fetch('/api/categories').then(res => res.json())
        ])
        setStats({
          products: Array.isArray(p) ? p.length : 0,
          categories: Array.isArray(c) ? c.length : 0
        })
      } catch (e) {
        console.error(e)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { 
      name: 'Total Catalog', 
      value: stats.products, 
      icon: Package, 
      href: '/admin/products',
      color: 'text-accent' 
    },
    { 
      name: 'Categories', 
      value: stats.categories, 
      icon: FolderTree, 
      href: '/admin/categories',
      color: 'text-zinc-400' 
    },
    { 
      name: 'Active Growth', 
      value: '+12%', 
      icon: TrendingUp, 
      href: '#',
      color: 'text-zinc-400' 
    },
    { 
      name: 'User Reach', 
      value: '1.2k', 
      icon: Users, 
      href: '#',
      color: 'text-zinc-400' 
    },
  ]

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="border-b border-secondary pb-6">
        <h1 className="text-xl font-bold tracking-tight text-foreground uppercase">
          Command Center<span className="text-accent">.</span>
        </h1>
        <p className="mt-1 text-zinc-400 font-medium text-[10px] uppercase tracking-widest">
          EVRST Administration Overview
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative bg-white border border-secondary p-6 rounded-xl subtle-shadow hover:border-accent/30 transition-all duration-300"
          >
            <Link href={card.href} className="block">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-secondary/50 ${card.color}`}>
                  <card.icon size={16} />
                </div>
                <span className="text-[8px] font-black tracking-widest text-zinc-300 uppercase">Live Metrics</span>
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-foreground transition-colors">
                {card.name}
              </h3>
              <p className="text-2xl font-bold tracking-tight text-foreground mt-1">
                {card.value}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary/30 border border-secondary p-8 rounded-2xl flex flex-col justify-center">
          <h2 className="text-sm font-bold text-foreground mb-2">
            Catalog Integrity
          </h2>
          <p className="text-[11px] text-zinc-500 leading-relaxed mb-6">
            Everything is looking precise. Ensure your new product entries follow the minimalist 
            copy standards of the EVRST brand.
          </p>
          <div>
            <Link 
              href="/admin/products" 
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent hover:gap-3 transition-all"
            >
              Update Inventory <ArrowRight size={12} />
            </Link>
          </div>
        </div>
        
        <div className="bg-white border border-secondary p-8 rounded-2xl flex flex-col justify-center subtle-shadow">
          <h2 className="text-sm font-bold text-foreground mb-2">
            System Status
          </h2>
          <p className="text-[11px] text-zinc-500 leading-relaxed mb-6">
            Database synchronization is active. Product and category relationships are 
            maintained at the summit level.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Node Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Prisma Sync</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
