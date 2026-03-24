'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2, FolderTree } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

import { ImageUpload } from '@/components/ImageUpload'

interface Category {
  id: string
  name: string
  image?: string
  _count?: {
    products: number
  }
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [newImage, setNewImage] = useState('')
  const [creating, setCreating] = useState(false)

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      if (res.ok) {
        setCategories(data)
      } else {
        toast.error(data.error || 'Connection failed')
      }
    } catch (error) {
      toast.error('Connection error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id))
        toast.success('Category removed')
      } else {
        toast.error(data.error || 'Failed to remove')
      }
    } catch (error) {
      toast.error('Connection error')
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    
    setCreating(true)
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: newName.trim(),
          image: newImage 
        })
      })
      const data = await res.json()
      if (res.ok) {
        setCategories([data, ...categories])
        setNewName('')
        setNewImage('')
        toast.success('Category added')
      } else {
        toast.error(data.error || 'Failed to add')
      }
    } catch (error) {
      toast.error('Connection error')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-secondary pb-6">
        <h1 className="text-xl font-bold tracking-tight text-foreground uppercase">
          Categories<span className="text-accent">.</span>
        </h1>
        <p className="mt-1 text-zinc-400 font-medium text-[10px] uppercase tracking-widest">
          Manage Inventory Structure
        </p>
      </header>

      {/* Simplified Add Form */}
      <div className="bg-white border border-secondary rounded-xl p-6 subtle-shadow space-y-6 max-w-xl">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Category Image</label>
          <ImageUpload 
            value={newImage ? [newImage] : []}
            onChange={(url) => setNewImage(url)}
            onRemove={() => setNewImage('')}
          />
        </div>

        <form onSubmit={handleCreate} className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Category name..."
            className="flex-grow bg-white border border-secondary rounded-lg px-4 py-2 text-xs outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-zinc-300"
          />
          <button
            disabled={creating}
            className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent/90 active:scale-95 disabled:opacity-50"
          >
            {creating ? <Loader2 className="animate-spin" size={12} /> : <Plus size={12} />}
            Add Category
          </button>
        </form>
      </div>

      {/* Minimalist Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="col-span-full py-12 flex flex-col items-center justify-center gap-2 text-zinc-300">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Awaiting Gear Data...</span>
            </div>
          ) : categories.length === 0 ? (
            <div className="col-span-full py-12 border border-dashed border-secondary rounded-xl flex flex-col items-center justify-center gap-2 text-zinc-300">
              <FolderTree size={24} className="opacity-20" />
              <span className="text-[9px] font-bold uppercase tracking-widest">No categories found</span>
            </div>
          ) : (
            categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-secondary p-4 rounded-xl flex items-center gap-4 group hover:border-accent/30 transition-all subtle-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center overflow-hidden border border-secondary/50">
                  {category.image ? (
                    <img src={category.image} className="w-full h-full object-cover" />
                  ) : (
                    <FolderTree size={16} className="text-zinc-300" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground">
                    {category.name}
                  </h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mt-0.5">
                    {category._count?.products || 0} Products
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 rounded-md hover:bg-red-50 text-zinc-300 hover:text-red-500 transition-all duration-200"
                >
                  <Trash2 size={12} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
