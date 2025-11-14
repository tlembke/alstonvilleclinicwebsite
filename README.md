# Alstonville Clinic Website

A modern, fast, static website built with Astro, TypeScript, and Tailwind CSS. This replaces the previous WordPress/Divi site with a lightweight, maintainable solution.

## Features

- **One-page design** with smooth scrolling navigation
- **Fast performance** - 10x faster than WordPress
- **Easy content management** via YAML files and Markdown
- **Responsive design** - works perfectly on all devices
- **Modern professional aesthetic** with subtle animations
- **Blog system** for news and announcements
- **SEO optimized** with proper meta tags

## Project Structure

```
/
├── public/              # Static assets (images, favicon)
├── src/
│   ├── components/      # Reusable UI components
│   ├── content/
│   │   └── blog/       # Blog posts (Markdown)
│   ├── data/           # Content data (YAML)
│   │   ├── clinic-info.yaml    # Contact, hours, philosophy
│   │   ├── services.yaml       # Medical services
│   │   └── team.yaml          # Staff profiles
│   ├── layouts/        # Page layouts
│   ├── pages/          # Routes and pages
│   └── styles/         # Global styles
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open http://localhost:4321 in your browser.

### Build for Production

```bash
npm run build
```

The static site will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Content Management

### 🎉 NEW: Admin Panel (Recommended)

Access the visual admin interface at `/admin/` to manage all content through a user-friendly CMS:

- ✅ **Team Members** - Add, edit, remove staff with photos
- ✅ **Blog Posts** - Create and publish news articles
- ✅ **Clinic Information** - Update contact details, hours, services
- ✅ **Services** - Manage medical services offered

**See ADMIN_SETUP.md for complete setup instructions.**

### Manual Editing (Alternative)

You can still edit files directly if preferred:

#### Updating Clinic Information

Edit `src/data/clinic-info.yaml` to update:
- Contact details (phone, email, address)
- Opening hours
- Practice philosophy
- Fee information

#### Managing Services

Edit `src/data/services.yaml` to add, remove, or modify medical services.

#### Team Members

Edit `src/data/team.yaml` to manage staff profiles:
- Add photos to `public/images/team/`
- Update bios, roles, and specialties

#### Blog Posts

Create new blog posts in `src/content/blog/`:
1. Create a new `.md` file (e.g., `my-post.md`)
2. Add frontmatter:
   ```yaml
   ---
   title: "Post Title"
   description: "Brief description"
   pubDate: 2024-01-15
   author: "Author Name"
   ---
   ```
3. Write content in Markdown below the frontmatter

## Deployment

### For nginx Server

1. Build the site: `npm run build`
2. Upload the `dist/` directory contents to your server
3. Configure nginx to serve the static files:

```nginx
server {
    listen 80;
    server_name alstonville.clinic;
    root /var/www/alstonville.clinic;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. Set up SSL with Let's Encrypt (recommended)

## Technologies Used

- **Astro** - Static site generator
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Montserrat Font** - Professional typography

## License

Copyright © 2024 Alstonville Clinic. All rights reserved.
