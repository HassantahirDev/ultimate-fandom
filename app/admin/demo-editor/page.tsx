'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { HtmlContentViewer } from '@/components/ui/html-content-viewer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Copy, Eye, Code2 } from 'lucide-react'

export default function DemoEditorPage() {
  const [content, setContent] = useState(`
    <h1>Welcome to the Rich Text Editor!</h1>
    <p>This is a demonstration of our HTML-enabled rich text editor. You can:</p>
    
    <ul>
      <li><strong>Format text</strong> with <em>various styles</em></li>
      <li>Add <span style="color: #ef4444">colorful text</span> and <span style="background-color: #fef08a">highlights</span></li>
      <li>Add <a href="https://example.com">links</a></li>
      <li>Insert images and videos</li>
      <li>Create lists and quotes</li>
      <li>Add code blocks</li>
    </ul>

    <h2>Text Wrapping with Images</h2>
    <p>This is a demonstration of how images can now have text flowing around them. <img src="https://picsum.photos/150/100" alt="Inline image" class="image inline" style="width: 150px;" /> As you can see, this inline image allows text to flow naturally around it, making your content more visually appealing and space-efficient.</p>
    
    <p>Here's an example of a left-floated image that allows text to wrap around it on the right side: <img src="https://picsum.photos/200/150" alt="Left floated image" class="image float-left" style="width: 200px;" /> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    
        <p>And here's a right-floated image where text wraps on the left: <img src="https://picsum.photos/180/120" alt="Right floated image" class="image float-right" style="width: 180px;" /> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>

    <h2>Tables</h2>
    <p>You can create tables with or without borders. Use the table button to insert a table, and the grid button to toggle borders on/off.</p>
    
    <h3>Regular Table (with borders)</h3>
    <table>
      <tr>
        <th>Feature</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
      <tr>
        <td>Rich Text Editing</td>
        <td>Full WYSIWYG editor with formatting options</td>
        <td>✅ Complete</td>
      </tr>
      <tr>
        <td>Image Support</td>
        <td>Resizable images with alignment options</td>
        <td>✅ Complete</td>
      </tr>
      <tr>
        <td>Table Support</td>
        <td>Tables with optional borders</td>
        <td>✅ Complete</td>
      </tr>
    </table>
    
    <h3>Borderless Table</h3>
    <table class="borderless">
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Department</th>
      </tr>
      <tr>
        <td>John Doe</td>
        <td>Senior Editor</td>
        <td>Editorial</td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>Content Manager</td>
        <td>Marketing</td>
      </tr>
      <tr>
        <td>Mike Johnson</td>
        <td>Technical Writer</td>
        <td>Engineering</td>
      </tr>
    </table>

    <h3>Code Example</h3>
    <pre>
const greeting = "Hello, World!";
console.log(greeting);
    </pre>

    <blockquote>
      "This is a blockquote example. Perfect for highlighting important information or quotes from articles."
    </blockquote>

    <h4>Features Supported:</h4>
    <ol>
      <li>Headers (H1-H6)</li>
      <li>Paragraphs with formatting</li>
      <li>Lists (ordered and unordered)</li>
      <li>Images and media</li>
      <li>Links</li>
      <li>Code blocks</li>
      <li>Blockquotes</li>
      <li>Text alignment</li>
      <li>Colors and backgrounds</li>
    </ol>
  `)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('HTML copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const getContentStats = () => {
    const textContent = content.replace(/<[^>]*>/g, '')
    const wordCount = textContent.trim().split(/\s+/).length
    const charCount = textContent.length
    const htmlSize = new Blob([content]).size

    return { wordCount, charCount, htmlSize }
  }

  const stats = getContentStats()

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rich Text Editor Demo</h1>
          <p className="text-gray-600 mt-2">Test the HTML-enabled rich text editor with images and formatting</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline">
            {stats.wordCount} words
          </Badge>
          <Badge variant="outline">
            {stats.charCount} characters
          </Badge>
          <Badge variant="outline">
            {stats.htmlSize} bytes
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code2 className="w-5 h-5 mr-2" />
              Rich Text Editor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Start writing your HTML content here..."
            />
            <div className="mt-4 flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(content)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy HTML
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setContent('')}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Live Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Rendered</TabsTrigger>
                <TabsTrigger value="html">HTML Source</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="mt-4">
                <div className="border rounded-md p-4 min-h-[400px] bg-white max-h-[600px] overflow-y-auto">
                  <HtmlContentViewer content={content} />
                </div>
              </TabsContent>
              <TabsContent value="html" className="mt-4">
                <div className="border rounded-md p-4 min-h-[400px] bg-gray-50 max-h-[600px] overflow-y-auto">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                    {content}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Basic Formatting</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Use the toolbar to apply bold, italic, strikethrough</li>
                <li>• Select text and choose heading levels (H1-H6)</li>
                <li>• Click palette icon for text colors (red, blue, green, etc.)</li>
                <li>• Click highlighter icon for background colors</li>
                <li>• Create ordered and unordered lists</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Images & Media</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Click the image button in the toolbar</li>
                <li>• Enter image URL to insert image</li>
                <li>• Select image and use alignment buttons:</li>
                <li>&nbsp;&nbsp;◦ Left arrow: Float left (text wraps right)</li>
                <li>&nbsp;&nbsp;◦ Center: Block center alignment</li>
                <li>&nbsp;&nbsp;◦ Right arrow: Float right (text wraps left)</li>
                <li>&nbsp;&nbsp;◦ Move icon: Inline with text</li>
                <li>• Drag corner handles to resize images</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Links & Code</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Select text and click link button</li>
                <li>• Use code-block for formatted code</li>
                <li>• Create blockquotes for emphasis</li>
                <li>• Align text left, center, or right</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Output</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Content is stored as clean HTML</li>
                <li>• Safe for database storage</li>
                <li>• Ready for article publishing</li>
                <li>• Copy HTML to use elsewhere</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 