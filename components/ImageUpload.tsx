'use client'

import { useState, useRef } from 'react'
import { Plus, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface ImageUploadProps {
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
  disabled?: boolean
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  disabled
}) => {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large (max 10MB)')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      
      if (res.ok) {
        onChange(data.secure_url)
        toast.success('Image uploaded')
      } else {
        toast.error(data.error || 'Upload failed')
      }
    } catch (error) {
      toast.error('Connection error during upload')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        {value.map((url) => (
          <div key={url} className="relative w-24 h-24 rounded-lg overflow-hidden border border-secondary group transition-all hover:border-accent/30">
            <div className="z-10 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition shadow-sm"
              >
                <Trash2 size={12} />
              </button>
            </div>
            <img src={url} alt="Upload" className="object-cover w-full h-full" />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={disabled || uploading}
        />
        <button
          type="button"
          disabled={disabled || uploading}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-3 rounded-lg border border-dashed border-secondary px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:border-accent hover:text-accent transition-all active:scale-95 disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="animate-spin" size={14} />
              Uploading...
            </>
          ) : (
            <>
              <Plus size={14} />
              Add Image
            </>
          )}
        </button>
        {uploading && (
          <p className="text-[9px] font-bold uppercase tracking-widest text-accent animate-pulse">
            Syncing Gear to Cloud...
          </p>
        )}
      </div>
    </div>
  )
}
