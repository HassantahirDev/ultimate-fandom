'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ResizeImage from 'tiptap-extension-resize-image'
import Link from '@tiptap/extension-link'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import { createLowlight } from 'lowlight'

const lowlight = createLowlight()
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  Code,
  Quote,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Highlighter,
  ChevronDown,
  MoveLeft,
  MoveRight,
  Move,
  Table as TableIcon,
  Grid,
  Heading1,
  Heading2,
  Heading3,
  Type
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  readOnly?: boolean
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your content here...',
  className,
  readOnly = false
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizeImage.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Color,
      TextStyle,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-gray-100 rounded-md p-4 font-mono text-sm',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editable: !readOnly,
  })

  // Update editor content when value prop changes (important for editing existing articles)
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      // Use the ResizeImage extension method
      editor.chain().focus().setImage({
        src: url,
        alt: 'Inserted image',
      }).run()
    }
  }

  const setImageAlignment = (alignment: 'left' | 'center' | 'right' | 'inline') => {
    const { selection } = editor.state
    const node = editor.state.doc.nodeAt(selection.from)
    
    if (node && node.type.name === 'image') {
      // Remove existing alignment classes
      const currentAttrs = node.attrs
      let className = currentAttrs.class || ''
      
      // Remove existing float classes
      className = className.replace(/\b(float-left|float-right|float-none|inline)\b/g, '').trim()
      
      // Add new alignment class
      switch (alignment) {
        case 'left':
          className = `${className} float-left`.trim()
          break
        case 'right':
          className = `${className} float-right`.trim()
          break
        case 'center':
          className = `${className} float-none`.trim()
          break
        case 'inline':
          className = `${className} inline`.trim()
          break
      }
      
      // Update the image node
      editor.chain().focus().updateAttributes('image', {
        ...currentAttrs,
        class: className
      }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt('Enter link URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const MenuButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false,
    children 
  }: { 
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode 
  }) => (
    <Button
      type="button"
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="h-8 w-8 p-0"
    >
      {children}
    </Button>
  )

  const colors = [
    { name: 'Default', value: null },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Gray', value: '#6b7280' },
    { name: 'Black', value: '#000000' },
  ]

  const setColor = (color: string | null) => {
    if (color) {
      editor.chain().focus().setColor(color).run()
    } else {
      editor.chain().focus().unsetColor().run()
    }
  }

  const highlightColors = [
    { name: 'No Highlight', value: null },
    { name: 'Yellow', value: '#fef08a' },
    { name: 'Green', value: '#bbf7d0' },
    { name: 'Blue', value: '#bfdbfe' },
    { name: 'Purple', value: '#e9d5ff' },
    { name: 'Pink', value: '#f9a8d4' },
    { name: 'Red', value: '#fecaca' },
    { name: 'Orange', value: '#fed7aa' },
    { name: 'Gray', value: '#e5e7eb' },
  ]

  const setHighlight = (color: string | null) => {
    if (color) {
      editor.chain().focus().setHighlight({ color }).run()
    } else {
      editor.chain().focus().unsetHighlight().run()
    }
  }

  const insertTable = () => {
    const rows = window.prompt('Number of rows:', '3') || '3'
    const cols = window.prompt('Number of columns:', '3') || '3'
    
    editor.chain().focus().insertTable({ 
      rows: parseInt(rows), 
      cols: parseInt(cols), 
      withHeaderRow: true 
    }).run()
  }

  const toggleTableBorders = () => {
    // Get the current table
    const { selection } = editor.state
    const tableNode = editor.state.doc.nodeAt(selection.from)
    
    if (tableNode && tableNode.type.name === 'table') {
      // Toggle between bordered and borderless
      const currentClass = tableNode.attrs.class || ''
      const newClass = currentClass.includes('borderless') ? '' : 'borderless'
      
      editor.chain().focus().updateAttributes('table', { class: newClass }).run()
    }
  }

  const setTextFormat = (format: 'paragraph' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
    if (format === 'paragraph') {
      editor.chain().focus().setParagraph().run()
    } else {
      const level = parseInt(format.replace('h', '')) as 1 | 2 | 3 | 4 | 5 | 6
      editor.chain().focus().toggleHeading({ level }).run()
    }
  }

  return (
    <div className={cn('rich-text-editor border rounded-md', className)}>
      {!readOnly && (
        <div className="border-b p-2 bg-gray-50 rounded-t-md">
          <div className="flex flex-wrap gap-1">
            {/* Text Formatting */}
            <MenuButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
            >
              <Bold className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
            >
              <Italic className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
            >
              <Strikethrough className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={editor.isActive('code')}
            >
              <Code className="h-4 w-4" />
            </MenuButton>

            {/* Text Color */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Palette className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <div className="grid grid-cols-5 gap-1 p-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setColor(color.value)}
                      className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 flex items-center justify-center"
                      style={{
                        backgroundColor: color.value || '#ffffff',
                        border: color.value === null ? '2px solid #e5e7eb' : `2px solid ${color.value}20`
                      }}
                      title={color.name}
                    >
                      {color.value === null && (
                        <span className="text-xs font-bold text-gray-600">A</span>
                      )}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Highlight Color */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Highlighter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <div className="grid grid-cols-5 gap-1 p-2">
                  {highlightColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setHighlight(color.value)}
                      className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 flex items-center justify-center"
                      style={{
                        backgroundColor: color.value || '#ffffff',
                        border: color.value === null ? '2px solid #e5e7eb' : `2px solid ${color.value}`
                      }}
                      title={color.name}
                    >
                      {color.value === null && (
                        <span className="text-xs font-bold text-gray-600">A</span>
                      )}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Text Format Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs font-semibold min-w-[3rem]"
                >
                  {editor.isActive('heading', { level: 1 }) ? 'H1' :
                   editor.isActive('heading', { level: 2 }) ? 'H2' :
                   editor.isActive('heading', { level: 3 }) ? 'H3' :
                   editor.isActive('heading', { level: 4 }) ? 'H4' :
                   editor.isActive('heading', { level: 5 }) ? 'H5' :
                   editor.isActive('heading', { level: 6 }) ? 'H6' :
                   'P'}
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-36">
                <DropdownMenuItem onClick={() => setTextFormat('paragraph')}>
                  <Type className="w-4 h-4 mr-2" />
                  Paragraph
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTextFormat('h1')}>
                  <Heading1 className="w-4 h-4 mr-2" />
                  Heading 1
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTextFormat('h2')}>
                  <Heading2 className="w-4 h-4 mr-2" />
                  Heading 2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTextFormat('h3')}>
                  <Heading3 className="w-4 h-4 mr-2" />
                  Heading 3
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTextFormat('h4')}>
                  <Type className="w-4 h-4 mr-2" />
                  Heading 4
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTextFormat('h5')}>
                  <Type className="w-4 h-4 mr-2" />
                  Heading 5
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTextFormat('h6')}>
                  <Type className="w-4 h-4 mr-2" />
                  Heading 6
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Lists */}
            <MenuButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
            >
              <List className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
            >
              <ListOrdered className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive('blockquote')}
            >
              <Quote className="h-4 w-4" />
            </MenuButton>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Alignment */}
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              isActive={editor.isActive({ textAlign: 'left' })}
            >
              <AlignLeft className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              isActive={editor.isActive({ textAlign: 'center' })}
            >
              <AlignCenter className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              isActive={editor.isActive({ textAlign: 'right' })}
            >
              <AlignRight className="h-4 w-4" />
            </MenuButton>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Media */}
            <MenuButton onClick={addImage}>
              <ImageIcon className="h-4 w-4" />
            </MenuButton>
            <MenuButton onClick={addLink}>
              <LinkIcon className="h-4 w-4" />
            </MenuButton>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Image Alignment */}
            <MenuButton onClick={() => setImageAlignment('left')}>
              <MoveLeft className="h-4 w-4" />
            </MenuButton>
            <MenuButton onClick={() => setImageAlignment('center')}>
              <AlignCenter className="h-4 w-4" />
            </MenuButton>
            <MenuButton onClick={() => setImageAlignment('right')}>
              <MoveRight className="h-4 w-4" />
            </MenuButton>
            <MenuButton onClick={() => setImageAlignment('inline')}>
              <Move className="h-4 w-4" />
            </MenuButton>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Table Options */}
            <MenuButton onClick={insertTable}>
              <TableIcon className="h-4 w-4" />
            </MenuButton>

            <MenuButton onClick={toggleTableBorders}>
              <Grid className="h-4 w-4" />
            </MenuButton>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Undo/Redo */}
            <MenuButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo className="h-4 w-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo className="h-4 w-4" />
            </MenuButton>
          </div>
        </div>
      )}
      
      <EditorContent 
        editor={editor} 
        className="min-h-[200px] p-4 focus:outline-none w-full overflow-x-auto"
      />
    </div>
  )
} 