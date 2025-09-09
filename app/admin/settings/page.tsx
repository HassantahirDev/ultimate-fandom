'use client'

import React, { useEffect, useState } from 'react'
import { AdminApiService } from '@/lib/admin-api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Save,
  Globe,
  Search,
  Mail,
  Shield,
  Palette,
  Bell,
  Database,
  Settings as SettingsIcon
} from 'lucide-react'

interface SiteSettings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    adminEmail: string
    language: string
    timezone: string
    enableComments: boolean
    enableRegistration: boolean
    enableNewsletterSignup: boolean
  }
  seo: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string
    ogTitle: string
    ogDescription: string
    ogImage: string
    twitterHandle: string
    enableSitemap: boolean
    enableRobotsTxt: boolean
    googleAnalyticsId: string
    googleSearchConsoleId: string
  }
  appearance: {
    theme: 'light' | 'dark' | 'auto'
    primaryColor: string
    logoUrl: string
    faviconUrl: string
    enableDarkMode: boolean
    customCSS: string
  }
  email: {
    smtpHost: string
    smtpPort: string
    smtpUsername: string
    smtpPassword: string
    fromEmail: string
    fromName: string
    enableEmailNotifications: boolean
  }
  security: {
    enableTwoFactor: boolean
    passwordMinLength: number
    passwordRequireSpecialChars: boolean
    sessionTimeout: number
    enableBruteForceProtection: boolean
    maxLoginAttempts: number
    enableCaptcha: boolean
  }
  performance: {
    enableCaching: boolean
    cacheTimeout: number
    enableImageOptimization: boolean
    enableLazyLoading: boolean
    enableMinification: boolean
    enableGzip: boolean
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    general: {
      siteName: 'Screen Rant',
      siteDescription: 'The latest in entertainment news, movie reviews, TV shows, and more',
      siteUrl: 'https://screenrant.com',
      adminEmail: 'admin@screenrant.com',
      language: 'en',
      timezone: 'America/New_York',
      enableComments: true,
      enableRegistration: true,
      enableNewsletterSignup: true
    },
    seo: {
      metaTitle: 'Screen Rant - Entertainment News',
      metaDescription: 'Your source for entertainment news, movie reviews, TV shows, and pop culture content',
      metaKeywords: 'movies, TV shows, entertainment, reviews, news',
      ogTitle: 'Screen Rant - Entertainment News',
      ogDescription: 'Your source for entertainment news, movie reviews, TV shows, and pop culture content',
      ogImage: 'https://screenrant.com/og-image.jpg',
      twitterHandle: '@screenrant',
      enableSitemap: true,
      enableRobotsTxt: true,
      googleAnalyticsId: '',
      googleSearchConsoleId: ''
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3B82F6',
      logoUrl: '',
      faviconUrl: '',
      enableDarkMode: true,
      customCSS: ''
    },
    email: {
      smtpHost: '',
      smtpPort: '587',
      smtpUsername: '',
      smtpPassword: '',
      fromEmail: 'noreply@screenrant.com',
      fromName: 'Screen Rant',
      enableEmailNotifications: true
    },
    security: {
      enableTwoFactor: false,
      passwordMinLength: 8,
      passwordRequireSpecialChars: true,
      sessionTimeout: 60,
      enableBruteForceProtection: true,
      maxLoginAttempts: 5,
      enableCaptcha: true
    },
    performance: {
      enableCaching: true,
      cacheTimeout: 3600,
      enableImageOptimization: true,
      enableLazyLoading: true,
      enableMinification: true,
      enableGzip: true
    }
  })

  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      // Note: Settings API would need to be implemented in the backend
      // For now, we'll keep the default settings
      console.log('Settings loaded from defaults (backend settings API not yet implemented)')
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const handleInputChange = (section: keyof SiteSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // Note: Settings save API would need to be implemented in the backend
      console.log('Saving settings:', settings)
      
      // For now, just simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Settings saved successfully (simulated - backend settings API not yet implemented)')
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center space-x-1">
            <Globe className="w-4 h-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center space-x-1">
            <Search className="w-4 h-4" />
            <span>SEO</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-1">
            <Palette className="w-4 h-4" />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center space-x-1">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-1">
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center space-x-1">
            <Database className="w-4 h-4" />
            <span>Performance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={settings.general.siteUrl}
                    onChange={(e) => handleInputChange('general', 'siteUrl', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) => handleInputChange('general', 'adminEmail', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={settings.general.language} 
                    onValueChange={(value) => handleInputChange('general', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  value={settings.general.timezone} 
                  onValueChange={(value) => handleInputChange('general', 'timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Comments</Label>
                    <p className="text-sm text-gray-500">Allow users to comment on articles</p>
                  </div>
                  <Switch
                    checked={settings.general.enableComments}
                    onCheckedChange={(checked) => handleInputChange('general', 'enableComments', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable User Registration</Label>
                    <p className="text-sm text-gray-500">Allow new users to register</p>
                  </div>
                  <Switch
                    checked={settings.general.enableRegistration}
                    onCheckedChange={(checked) => handleInputChange('general', 'enableRegistration', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Newsletter Signup</Label>
                    <p className="text-sm text-gray-500">Show newsletter subscription forms</p>
                  </div>
                  <Switch
                    checked={settings.general.enableNewsletterSignup}
                    onCheckedChange={(checked) => handleInputChange('general', 'enableNewsletterSignup', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={settings.seo.metaTitle}
                  onChange={(e) => handleInputChange('seo', 'metaTitle', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.seo.metaDescription}
                  onChange={(e) => handleInputChange('seo', 'metaDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={settings.seo.metaKeywords}
                  onChange={(e) => handleInputChange('seo', 'metaKeywords', e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ogTitle">Open Graph Title</Label>
                  <Input
                    id="ogTitle"
                    value={settings.seo.ogTitle}
                    onChange={(e) => handleInputChange('seo', 'ogTitle', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="twitterHandle">Twitter Handle</Label>
                  <Input
                    id="twitterHandle"
                    value={settings.seo.twitterHandle}
                    onChange={(e) => handleInputChange('seo', 'twitterHandle', e.target.value)}
                    placeholder="@screenrant"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ogDescription">Open Graph Description</Label>
                <Textarea
                  id="ogDescription"
                  value={settings.seo.ogDescription}
                  onChange={(e) => handleInputChange('seo', 'ogDescription', e.target.value)}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="ogImage">Open Graph Image URL</Label>
                <Input
                  id="ogImage"
                  value={settings.seo.ogImage}
                  onChange={(e) => handleInputChange('seo', 'ogImage', e.target.value)}
                  placeholder="https://example.com/og-image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    value={settings.seo.googleAnalyticsId}
                    onChange={(e) => handleInputChange('seo', 'googleAnalyticsId', e.target.value)}
                    placeholder="GA-XXXXXXXXX-X"
                  />
                </div>
                <div>
                  <Label htmlFor="googleSearchConsoleId">Google Search Console ID</Label>
                  <Input
                    id="googleSearchConsoleId"
                    value={settings.seo.googleSearchConsoleId}
                    onChange={(e) => handleInputChange('seo', 'googleSearchConsoleId', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable XML Sitemap</Label>
                    <p className="text-sm text-gray-500">Generate sitemap.xml for search engines</p>
                  </div>
                  <Switch
                    checked={settings.seo.enableSitemap}
                    onCheckedChange={(checked) => handleInputChange('seo', 'enableSitemap', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Robots.txt</Label>
                    <p className="text-sm text-gray-500">Generate robots.txt file</p>
                  </div>
                  <Switch
                    checked={settings.seo.enableRobotsTxt}
                    onCheckedChange={(checked) => handleInputChange('seo', 'enableRobotsTxt', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select 
                  value={settings.appearance.theme} 
                  onValueChange={(value) => handleInputChange('appearance', 'theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto (System)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex space-x-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                    className="w-20"
                  />
                  <Input
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                    placeholder="#3B82F6"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    value={settings.appearance.logoUrl}
                    onChange={(e) => handleInputChange('appearance', 'logoUrl', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <Label htmlFor="faviconUrl">Favicon URL</Label>
                  <Input
                    id="faviconUrl"
                    value={settings.appearance.faviconUrl}
                    onChange={(e) => handleInputChange('appearance', 'faviconUrl', e.target.value)}
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="customCSS">Custom CSS</Label>
                <Textarea
                  id="customCSS"
                  value={settings.appearance.customCSS}
                  onChange={(e) => handleInputChange('appearance', 'customCSS', e.target.value)}
                  rows={6}
                  placeholder="/* Custom CSS styles */"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Dark Mode</Label>
                  <p className="text-sm text-gray-500">Allow users to switch to dark mode</p>
                </div>
                <Switch
                  checked={settings.appearance.enableDarkMode}
                  onCheckedChange={(checked) => handleInputChange('appearance', 'enableDarkMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.email.smtpHost}
                    onChange={(e) => handleInputChange('email', 'smtpHost', e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={settings.email.smtpPort}
                    onChange={(e) => handleInputChange('email', 'smtpPort', e.target.value)}
                    placeholder="587"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={settings.email.smtpUsername}
                    onChange={(e) => handleInputChange('email', 'smtpUsername', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.email.smtpPassword}
                    onChange={(e) => handleInputChange('email', 'smtpPassword', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={settings.email.fromEmail}
                    onChange={(e) => handleInputChange('email', 'fromEmail', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={settings.email.fromName}
                    onChange={(e) => handleInputChange('email', 'fromName', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Email Notifications</Label>
                  <p className="text-sm text-gray-500">Send email notifications for various events</p>
                </div>
                <Switch
                  checked={settings.email.enableEmailNotifications}
                  onCheckedChange={(checked) => handleInputChange('email', 'enableEmailNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) => handleInputChange('security', 'passwordMinLength', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Require 2FA for admin users</p>
                  </div>
                  <Switch
                    checked={settings.security.enableTwoFactor}
                    onCheckedChange={(checked) => handleInputChange('security', 'enableTwoFactor', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Special Characters in Passwords</Label>
                    <p className="text-sm text-gray-500">Force users to include special characters</p>
                  </div>
                  <Switch
                    checked={settings.security.passwordRequireSpecialChars}
                    onCheckedChange={(checked) => handleInputChange('security', 'passwordRequireSpecialChars', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Brute Force Protection</Label>
                    <p className="text-sm text-gray-500">Block IPs after failed login attempts</p>
                  </div>
                  <Switch
                    checked={settings.security.enableBruteForceProtection}
                    onCheckedChange={(checked) => handleInputChange('security', 'enableBruteForceProtection', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable CAPTCHA</Label>
                    <p className="text-sm text-gray-500">Show CAPTCHA on login forms</p>
                  </div>
                  <Switch
                    checked={settings.security.enableCaptcha}
                    onCheckedChange={(checked) => handleInputChange('security', 'enableCaptcha', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cacheTimeout">Cache Timeout (seconds)</Label>
                <Input
                  id="cacheTimeout"
                  type="number"
                  value={settings.performance.cacheTimeout}
                  onChange={(e) => handleInputChange('performance', 'cacheTimeout', parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Caching</Label>
                    <p className="text-sm text-gray-500">Cache pages and API responses</p>
                  </div>
                  <Switch
                    checked={settings.performance.enableCaching}
                    onCheckedChange={(checked) => handleInputChange('performance', 'enableCaching', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Image Optimization</Label>
                    <p className="text-sm text-gray-500">Automatically optimize images</p>
                  </div>
                  <Switch
                    checked={settings.performance.enableImageOptimization}
                    onCheckedChange={(checked) => handleInputChange('performance', 'enableImageOptimization', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Lazy Loading</Label>
                    <p className="text-sm text-gray-500">Lazy load images and content</p>
                  </div>
                  <Switch
                    checked={settings.performance.enableLazyLoading}
                    onCheckedChange={(checked) => handleInputChange('performance', 'enableLazyLoading', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Minification</Label>
                    <p className="text-sm text-gray-500">Minify CSS and JavaScript</p>
                  </div>
                  <Switch
                    checked={settings.performance.enableMinification}
                    onCheckedChange={(checked) => handleInputChange('performance', 'enableMinification', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable GZIP Compression</Label>
                    <p className="text-sm text-gray-500">Compress responses with GZIP</p>
                  </div>
                  <Switch
                    checked={settings.performance.enableGzip}
                    onCheckedChange={(checked) => handleInputChange('performance', 'enableGzip', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 