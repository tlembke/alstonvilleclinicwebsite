# Admin Panel Setup Guide

Your Alstonville Clinic website now has a Content Management System (CMS) accessible at `/admin`.

## What You Can Manage

✅ **Team Members** - Add, edit, remove doctors, nurses, admin staff, and allied health
✅ **Blog Posts** - Create and publish news articles and announcements
✅ **Clinic Information** - Update contact details, hours, services
✅ **Services** - Manage the list of medical services offered

## Setup Instructions

### Option 1: Deploy to Netlify (Recommended - Easiest)

Netlify provides free hosting for static sites and has built-in authentication that works perfectly with Decap CMS.

#### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit with Decap CMS"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/alstonvilleclinicwebsite.git
git push -u origin main
```

#### Step 2: Deploy to Netlify

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click "Deploy site"

#### Step 3: Enable Netlify Identity

1. In your Netlify site dashboard, go to **Site settings** → **Identity**
2. Click "Enable Identity"
3. Under **Registration preferences**, select "Invite only"
4. Under **External providers**, you can optionally enable Google/GitHub login
5. Go to **Services** → **Git Gateway** and click "Enable Git Gateway"

#### Step 4: Invite Users

1. Go to the **Identity** tab in your Netlify dashboard
2. Click "Invite users"
3. Enter email addresses (start with `tony@alstonvilleclinic.com.au`)
4. Users will receive an email invitation to set their password

#### Step 5: Access Admin Panel

1. Go to `https://your-site-name.netlify.app/admin/`
2. Click "Login with Netlify Identity"
3. Use the invitation email to set up your password
4. You're in! Start managing content.

### Option 2: Self-Hosted on Your nginx Server

If you want to host on your own server, you'll need to set up authentication differently.

#### Using GitHub as Authentication Provider

1. **Create a GitHub OAuth App**:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - **Application name**: Alstonville Clinic CMS
   - **Homepage URL**: `https://alstonville.clinic`
   - **Authorization callback URL**: `https://alstonville.clinic/admin/`
   - Save the Client ID and Client Secret

2. **Set up Git Gateway Proxy**:
   You'll need a small Node.js service to act as a proxy for GitHub authentication.

   ```bash
   npm install -g netlify-git-api
   ```

   Or use Netlify's Git Gateway service (simpler).

3. **Update config.yml**:
   ```yaml
   backend:
     name: github
     repo: YOUR_USERNAME/alstonvilleclinicwebsite
     branch: main
   ```

4. **Build and deploy**:
   ```bash
   npm run build
   rsync -avz dist/ user@server:/var/www/alstonville.clinic/
   ```

### Option 3: Local Development/Testing

For testing the CMS locally:

1. **Uncomment local backend in config.yml**:
   ```yaml
   # In public/admin/config.yml
   local_backend: true
   ```

2. **Install and run proxy server**:
   ```bash
   npx decap-server
   ```

3. **In another terminal, run your site**:
   ```bash
   npm run dev
   ```

4. **Access admin**:
   Go to `http://localhost:4321/admin/`
   Login with any email (no password needed in local mode)

## Managing Content

### Adding a Team Member

1. Go to `/admin/`
2. Click "Team Members" in the sidebar
3. Click "Edit"
4. Scroll down and click "Add Team Members +"
5. Fill in:
   - Name
   - Title/Role
   - Upload photo
   - Write biography
   - Add specialties (optional)
   - Select roles (doctor, nurse, allied-health, admin)
6. Click "Save"
7. Click "Publish" → "Publish now"

### Creating a Blog Post

1. Go to `/admin/`
2. Click "Blog Posts" in the sidebar
3. Click "New Blog Posts"
4. Fill in:
   - Title
   - Description
   - Publish date
   - Author name
   - Featured image (optional)
   - Write content using the rich text editor
5. Click "Save"
6. Click "Publish" → "Publish now"

### Editing Clinic Information

1. Go to `/admin/`
2. Click "Clinic Settings" → "Clinic Information"
3. Edit any fields (phone, hours, address, etc.)
4. Click "Save" then "Publish"

## User Management

### With Netlify Identity:
- Go to Netlify dashboard → Identity tab
- Invite new users by email
- Remove users by deleting them from the list
- All users have admin access (edit anything)

### Self-hosted:
- User management depends on your authentication provider
- With GitHub: Manage via GitHub organization/repository access
- Consider using role-based access if needed

## How It Works

1. **Content Storage**: All content is stored in your Git repository (YAML files for team/clinic, Markdown for blog)
2. **Editing**: Changes made in the CMS create git commits
3. **Publishing**: When you hit "Publish", changes are committed to your repository
4. **Deployment**: Your hosting service detects the commit and rebuilds the site automatically

## Security Notes

- ✅ Admin panel is protected by authentication
- ✅ Only invited users can access `/admin/`
- ✅ All changes are tracked in git history
- ✅ You can roll back any changes via git
- ✅ No database to secure - everything is files

## Support

- **Decap CMS Docs**: https://decapcms.org/docs/
- **Netlify Identity Docs**: https://docs.netlify.com/visitor-access/identity/
- **Issues**: Check the DEPLOYMENT.md for general deployment help

## Next Steps

1. Choose your hosting/authentication option
2. Set up according to the instructions above
3. Invite `tony@alstonvilleclinic.com.au` as the first admin
4. Tony can then invite other team members to manage content
5. Start adding real content!

---

**Recommendation**: Use Netlify (Option 1) - it's free, simple, and handles everything automatically. You can always migrate to self-hosting later if needed.
