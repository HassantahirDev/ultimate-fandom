# Screen Rant Route Structure

## Overview
The application uses a catch-all route `[...slug]` to handle all category-based pages. Categories are organized hierarchically with root categories and their subcategories.

## Route Categories

### Root Categories (Handled by `[...slug]`)
These categories don't have subcategories and are handled directly by the catch-all route:

- `/sr-originals` - Screen Rant original content
- `/interviews` - Celebrity and industry interviews  
- `/videos` - Video content and trailers
- `/podcasts` - Podcast episodes and discussions
- `/lists` - Top lists and rankings
- `/newsletter` - Newsletter signup and content
- `/threads` - Discussion threads and forums

### Root Categories with Subcategories
These categories have their own subcategory structure:

#### Movies (`/movies`)
- `/movie-news` - Latest movie industry news
- `/movie-reviews` - Professional movie reviews
- `/movie-features` - In-depth movie analysis and features
- `/movie-lists` - Movie rankings and top lists
- `/movie-trailers` - Latest movie trailers and teasers
- `/streaming-movies-and-tv-guide` - Streaming platform guides
- `/summer-movie-preview` - Summer movie previews
- `/ballerina-cover-story-preview-ana-de-armas` - Ballerina movie preview

#### TV Shows (`/tv`)
- `/tv-news` - Television industry news
- `/tv-reviews` - TV show reviews and ratings
- `/tv-features` - TV show analysis and deep dives
- `/tv-lists` - TV show rankings and recommendations

#### Gaming (`/gaming`)
- `/game-news` - Video game industry news
- `/game-reviews` - Video game reviews and scores
- `/game-features` - Gaming analysis and features
- `/game-lists` - Gaming rankings and guides
- `/game-trailers` - Video game trailers and gameplay

#### Anime (`/anime`)
- `/anime-news` - Anime industry news and updates
- `/anime-features` - Anime analysis and deep dives
- `/anime-lists` - Anime rankings and recommendations

#### Comics (`/comics`)
- `/comics-news` - Comic book industry news
- `/comics-reviews` - Comic book reviews
- `/comics-features` - Comic book analysis and features
- `/comics-lists` - Comic book rankings and guides

#### Music (`/music`)
- `/music-features` - Music industry features and analysis
- `/music-lists` - Music rankings and recommendations

#### WWE (`/wwe`)
- `/wwe-news` - WWE and wrestling news
- `/wwe-features` - Wrestling analysis and features
- `/wwe-lists` - Wrestling rankings and lists

#### Reality TV (`/reality-tv`)
- `/reality-tv-news` - Reality TV show news
- `/reality-tv-features` - Reality TV analysis
- `/reality-tv-reviews` - Reality TV show reviews

## Technical Implementation

### Slug Handling
- All routes are handled by `app/[...slug]/page.tsx`
- Slugs are automatically prefixed with `/` to match database format
- URL segments are decoded to handle special characters
- Examples:
  - URL: `/sr-originals` → Database slug: `/sr-originals`
  - URL: `/movie-news` → Database slug: `/movie-news`

### Database Structure
- Categories are stored in the `categories` table
- Root categories have `parent = null`
- Subcategories reference their parent via `parent_id`
- All slugs include leading slash for consistency

### Content Association
Articles are associated with categories through:
- `category_id` field in articles table
- Articles can belong to either root categories or subcategories
- Category hierarchy is maintained in the database

## Admin Management
Categories can be managed through the admin interface at `/admin/categories` where you can:
- Create new categories and subcategories
- Edit existing category properties
- Set parent-child relationships
- Manage category colors and descriptions
- Toggle category active status 