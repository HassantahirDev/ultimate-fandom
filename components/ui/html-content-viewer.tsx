'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface HtmlContentViewerProps {
  content: string
  className?: string
}

export function HtmlContentViewer({ content, className }: HtmlContentViewerProps) {
  return (
    <div 
      className={cn(
        // Add ProseMirror class to ensure all our custom CSS styles apply
        'ProseMirror w-full overflow-x-auto',
        className
      )}
      style={{
        // Ensure content is editable-looking but not actually editable
        outline: 'none',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
} 