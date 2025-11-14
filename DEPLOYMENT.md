# Deployment Guide for Alstonville Clinic Website

## Prerequisites

- nginx server
- Node.js installed on your local machine (for building)
- SSH access to your server
- Domain configured (alstonville.clinic)

## Build Process

### 1. Build the Static Site

On your local machine, in the project directory:

```bash
npm run build
```

This creates a `dist/` directory with all static files.

### 2. Upload to Server

Upload the contents of the `dist/` directory to your server:

```bash
# Using rsync (recommended)
rsync -avz --delete dist/ user@your-server:/var/www/alstonville.clinic/

# Or using scp
scp -r dist/* user@your-server:/var/www/alstonville.clinic/
```

## nginx Configuration

### Basic Configuration

Create/edit your nginx site configuration:

```nginx
server {
    listen 80;
    server_name alstonville.clinic www.alstonville.clinic;

    root /var/www/alstonville.clinic;
    index index.html;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Main location
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Save this to `/etc/nginx/sites-available/alstonville.clinic`

### Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/alstonville.clinic /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## SSL/HTTPS Setup (Recommended)

### Using Let's Encrypt (Certbot)

```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d alstonville.clinic -d www.alstonville.clinic

# Certbot will automatically update your nginx config for HTTPS
```

### Updated nginx Configuration with SSL

After certbot, your config will look like:

```nginx
server {
    listen 80;
    server_name alstonville.clinic www.alstonville.clinic;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name alstonville.clinic www.alstonville.clinic;

    ssl_certificate /etc/letsencrypt/live/alstonville.clinic/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/alstonville.clinic/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    root /var/www/alstonville.clinic;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

## Deployment Script (Optional)

Create a `deploy.sh` script for easy updates:

```bash
#!/bin/bash

# Build the site
echo "Building site..."
npm run build

# Upload to server
echo "Uploading to server..."
rsync -avz --delete dist/ user@your-server:/var/www/alstonville.clinic/

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Then deploy with:
```bash
./deploy.sh
```

## File Permissions

Ensure proper permissions on the server:

```bash
# Set ownership
sudo chown -R www-data:www-data /var/www/alstonville.clinic

# Set permissions
sudo find /var/www/alstonville.clinic -type d -exec chmod 755 {} \;
sudo find /var/www/alstonville.clinic -type f -exec chmod 644 {} \;
```

## Updating Content

### Blog Posts
1. Add new `.md` files to `src/content/blog/`
2. Run `npm run build`
3. Upload the new `dist/` to server

### Team Members / Services
1. Edit YAML files in `src/data/`
2. Update team photos in `public/images/team/` if needed
3. Run `npm run build`
4. Upload the new `dist/` to server

## Troubleshooting

### Site not loading
- Check nginx is running: `sudo systemctl status nginx`
- Check nginx error log: `sudo tail -f /var/log/nginx/error.log`
- Verify file permissions

### 404 errors on routes
- Ensure `try_files $uri $uri/ /index.html;` is in your nginx config
- This is needed for the single-page app routing

### Styles not loading
- Clear browser cache
- Check file permissions
- Verify gzip compression is working

## Performance Optimization

The site is already optimized with:
- Static generation (pre-rendered HTML)
- Minimal JavaScript
- Optimized CSS with Tailwind
- Lazy loading where appropriate

Additional optimizations:
- Enable HTTP/2 in nginx (shown in SSL config)
- Use a CDN for static assets (optional)
- Enable nginx caching for even better performance

## Monitoring

Consider setting up:
- Uptime monitoring (e.g., UptimeRobot)
- SSL certificate expiry monitoring (certbot auto-renews)
- nginx access logs: `/var/log/nginx/access.log`
- nginx error logs: `/var/log/nginx/error.log`

## Support

For questions or issues:
- Check the README.md
- Review Astro documentation: https://docs.astro.build
- Check nginx documentation: https://nginx.org/en/docs/
