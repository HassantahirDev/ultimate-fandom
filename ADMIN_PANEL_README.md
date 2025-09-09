# ScreenRant Admin Panel

A comprehensive Content Management System (CMS) for managing ScreenRant content, built with Next.js and TypeScript.

## Overview

The admin panel provides a complete interface for managing all aspects of the ScreenRant website, including articles, categories, tags, users, comments, and media. It's designed to replace static frontend pages with a dynamic, database-driven CMS structure.

## Features

### 🎯 Core Modules

- **Dashboard** - Overview statistics and recent activity
- **Articles** - Full CRUD operations for content management
- **Categories** - Hierarchical category management
- **Tags** - Tag creation and management
- **Users** - User roles and permissions management
- **Comments** - Comment moderation and management
- **Media** - File upload and media library
- **Analytics** - Performance metrics and insights

### 🔐 Authentication & Authorization

- Role-based access control (Admin, Editor, Author, User)
- Secure authentication with JWT tokens
- Protected routes and middleware
- User status management (Active, Inactive, Suspended)

### 📝 Article Management

- Rich text editing with markdown support
- Multiple article types (News, Review, Feature, Interview, Opinion, List)
- Status management (Draft, Published, Scheduled, Archived)
- SEO optimization fields
- Featured images and captions
- Tag and category assignment
- Publishing workflow

### 🗂️ Content Organization

- **Categories**: Hierarchical structure with parent/child relationships
- **Tags**: Flexible tagging system with usage tracking
- **Media Library**: Organized file management with metadata

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **State Management**: React Hooks, Context API
- **API Integration**: Custom API service layer
- **Backend**: NestJS (separate API)

## Project Structure

```
screen-rant-clone/
├── app/
│   ├── (admin)/                 # Admin panel routes
│   │   ├── layout.tsx          # Admin layout with sidebar
│   │   ├── page.tsx            # Dashboard
│   │   ├── articles/           # Article management
│   │   ├── categories/         # Category management
│   │   ├── tags/              # Tag management
│   │   ├── users/             # User management
│   │   ├── comments/          # Comment management
│   │   ├── media/             # Media management
│   │   └── settings/          # System settings
│   └── layout.tsx             # Root layout
├── components/
│   ├── admin/                 # Admin-specific components
│   │   ├── admin-sidebar.tsx  # Navigation sidebar
│   │   └── admin-header.tsx   # Header with user menu
│   ├── auth/                  # Authentication components
│   │   └── auth-provider.tsx  # Auth context provider
│   └── ui/                    # Reusable UI components
├── lib/
│   ├── api.ts                 # API service layer
│   └── utils.ts               # Utility functions
└── types/                     # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (screen-rant-api)
- Database configured (PostgreSQL)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Environment Setup**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access Admin Panel**
   Navigate to `http://localhost:3000/admin`

### First Time Setup

1. Ensure your backend API is running
2. Log in with admin credentials
3. Start creating categories and tags
4. Begin adding content

## API Integration

The admin panel connects to the backend API through a service layer (`lib/api.ts`) that handles:

- Authentication and token management
- CRUD operations for all entities
- Error handling and response formatting
- Request/response type safety

### Example API Usage

```typescript
import ApiService from '@/lib/api'

// Fetch articles
const articles = await ApiService.getArticles({
  status: 'published',
  limit: 10
})

// Create new article
const newArticle = await ApiService.createArticle({
  title: 'Article Title',
  content: 'Article content...',
  categoryId: 'category-id',
  status: 'draft'
})
```

## Features in Detail

### Dashboard
- Real-time statistics
- Recent activity feed
- Quick action buttons
- Performance metrics

### Article Management
- **Create/Edit**: Rich form with all necessary fields
- **Bulk Operations**: Multi-select actions
- **Filtering**: By status, type, category, author
- **Search**: Full-text search across articles
- **Publishing**: Draft → Published workflow

### Category Management
- **Hierarchical Structure**: Parent/child categories
- **Visual Organization**: Tree view with icons
- **Bulk Management**: Create, edit, delete multiple
- **Usage Tracking**: Article count per category

### User Management
- **Role Assignment**: Admin, Editor, Author, User
- **Status Control**: Active, Inactive, Suspended
- **Profile Management**: Edit user details
- **Activity Tracking**: Last login, article count

### Media Library
- **File Upload**: Drag & drop interface
- **Organization**: Folders and filtering
- **Metadata**: Alt text, captions, descriptions
- **Integration**: Easy insertion into articles

## Security Features

- **Authentication**: JWT-based with refresh tokens
- **Authorization**: Role-based access control
- **CSRF Protection**: Built-in Next.js protection
- **Input Validation**: Client and server-side validation
- **XSS Prevention**: Sanitized content rendering

## Performance Optimizations

- **Code Splitting**: Route-based splitting
- **Lazy Loading**: Component and image lazy loading
- **Caching**: API response caching
- **Pagination**: Large dataset handling
- **Search Debouncing**: Optimized search requests

## Customization

### Adding New Modules

1. Create route folder in `app/(admin)/`
2. Add navigation item in `admin-sidebar.tsx`
3. Create API methods in `lib/api.ts`
4. Implement CRUD components

### Styling

The admin panel uses Tailwind CSS with a custom design system:
- Colors: Blue primary, gray neutrals
- Typography: Inter font family
- Spacing: Consistent 4px grid
- Components: shadcn/ui components

### Theme Customization

Modify `tailwind.config.js` to customize:
- Colors and branding
- Typography scales
- Spacing system
- Component styles

## Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

Required for production:
```env
NEXT_PUBLIC_API_URL=https://api.screenrant.com
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Maintenance

### Regular Tasks
- Monitor error logs
- Update dependencies
- Backup user data
- Performance monitoring

### Updates
- Follow semantic versioning
- Test in staging environment
- Document breaking changes
- Migrate user data if needed

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check backend service status
   - Verify API_URL environment variable
   - Check network connectivity

2. **Authentication Issues**
   - Clear localStorage
   - Check token expiration
   - Verify user credentials

3. **UI Components Not Loading**
   - Check component imports
   - Verify UI library installation
   - Check CSS/Tailwind configuration

### Getting Help

- Check browser console for errors
- Review API response in Network tab
- Verify backend logs
- Check database connectivity

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Update documentation

## License

This project is proprietary to ScreenRant.

---

**Note**: This admin panel is designed to work with the ScreenRant API backend. Ensure the backend is properly configured and running before using the admin panel. 