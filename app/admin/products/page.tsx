'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2, Package, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageUpload } from '@/components/ImageUpload'

interface Category {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: {
    name: string
  }
  images: {
    id: string
    url: string
  }[]
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    imageUrls: [] as string[]
  })

  const loadData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories')
      ])
      const prods = await prodRes.json()
      const cats = await catRes.json()
      
      if (prodRes.ok) setProducts(prods)
      if (catRes.ok) setCategories(cats)
    } catch (error) {
      toast.error('Connection error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.price || !formData.categoryId) {
      toast.error('Required fields missing')
      return
    }
    
    setCreating(true)
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (res.ok) {
        setProducts([data, ...products])
        setFormData({ name: '', description: '', price: '', categoryId: '', imageUrls: [] })
        toast.success('Product cataloged')
      } else {
        toast.error(data.error || 'Failed to add')
      }
    } catch (error) {
      toast.error('Connection error')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Discard item?')) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id))
        toast.success('Product removed')
      } else {
        toast.error('Failed to remove')
      }
    } catch (error) {
      toast.error('Connection error')
    }
  }

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      <header className="border-b border-secondary pb-6">
        <h1 className="text-xl font-bold tracking-tight text-foreground uppercase">
          Products<span className="text-accent">.</span>
        </h1>
        <p className="mt-1 text-zinc-400 font-medium text-[10px] uppercase tracking-widest">
          The EVRST Gear Inventory
        </p>
      </header>

      {/* Precise Add Product Form */}
      <section className="bg-white border border-secondary rounded-xl p-6 subtle-shadow overflow-hidden">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
          New Product Entry
        </h2>
        <form onSubmit={handleCreate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 px-1">Product Images</label>
            <ImageUpload 
              value={formData.imageUrls}
              onChange={(url) => setFormData({ ...formData, imageUrls: [...formData.imageUrls, url] })}
              onRemove={(url) => setFormData({ ...formData, imageUrls: formData.imageUrls.filter(u => u !== url) })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 space-y-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 px-1">Product Name *</span>
              <input
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Apex Filtration Tube"
                className="w-full bg-secondary/50 border border-secondary rounded-lg px-4 py-2.5 text-xs outline-none focus:border-accent/40 transition-all placeholder:text-zinc-300"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 px-1">Category *</span>
              <select
                value={formData.categoryId}
                onChange={e => setFormData({...formData, categoryId: e.target.value})}
                className="w-full bg-secondary/50 border border-secondary rounded-lg px-4 py-2.5 text-xs outline-none focus:border-accent/40 transition-all text-zinc-600 appearance-none"
              >
                <option value="">Select...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 px-1">Price (USD) *</span>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                placeholder="0.00"
                className="w-full bg-secondary/50 border border-secondary rounded-lg px-4 py-2.5 text-xs outline-none focus:border-accent/40 transition-all placeholder:text-zinc-300"
              />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 px-1">Description</span>
              <input
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Brief details or specifications..."
                className="w-full bg-secondary/50 border border-secondary rounded-lg px-4 py-2.5 text-xs outline-none focus:border-accent/40 transition-all placeholder:text-zinc-300"
              />
            </div>
            <div className="flex items-end">
              <button
                disabled={creating}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent active:scale-95 disabled:opacity-50"
              >
                {creating ? <Loader2 className="animate-spin" size={12} /> : <Plus size={12} />}
                Catalog Item
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence>
          {loading ? (
             <div className="col-span-full py-20 flex flex-col items-center justify-center gap-2 text-zinc-300">
              <Loader2 className="animate-spin" size={24} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Updating Gear list...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full py-20 border border-dashed border-secondary rounded-2xl flex flex-col items-center justify-center gap-2 text-zinc-300">
              <Package size={24} className="opacity-20" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Catalog Empty</span>
            </div>
          ) : (
            products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white border border-secondary rounded-xl overflow-hidden hover:border-accent/20 transition-all pb-4 subtle-shadow h-full flex flex-col"
              >
                <div className="aspect-square bg-secondary/30 flex items-center justify-center border-b border-secondary relative group">
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[0].url} className="w-full h-full object-cover" alt={product.name} />
                  ) : (
                    <ImageIcon size={20} className="text-zinc-200" strokeWidth={1} />
                  )}
                  {product.images && product.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest text-zinc-500 shadow-sm">
                      +{product.images.length - 1} Images
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div className="min-w-0 pr-2">
                      <span className="text-[8px] font-black uppercase tracking-widest text-accent mb-0.5 block truncate">
                        {product.category?.name}
                      </span>
                      <h3 className="text-xs font-bold text-foreground leading-tight truncate">
                        {product.name}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {product.description || 'N/A'}
                  </p>
                  <div className="mt-auto flex justify-end">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-[8px] font-black uppercase tracking-widest text-zinc-300 hover:text-red-500 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
