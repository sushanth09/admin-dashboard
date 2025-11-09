# Admin Dashboard

A modern React admin dashboard with interactive charts, filters, and real-time data updates.

## Features

- 📊 Interactive charts (Line, Bar, Pie charts)
- 🔍 Advanced filtering system
- 📱 Fully responsive design
- ⚡ Real-time data updates
- 🎨 Modern UI with Tailwind CSS
- 📈 Multiple dashboard pages (Dashboard, Analytics, Users, Orders, Settings)

## Tech Stack

- React 19
- Vite
- React Router
- Recharts
- Tailwind CSS
- Lucide React Icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Deploy to Netlify

1. **Option 1: Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy
   netlify deploy --prod
   ```

2. **Option 2: Git Integration**
   - Push your code to GitHub/GitLab/Bitbucket
   - Go to [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Option 3: Drag & Drop**
   - Run `npm run build` locally
   - Drag the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

### Deploy to Vercel

1. **Option 1: Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   vercel --prod
   ```

2. **Option 2: Git Integration**
   - Push your code to GitHub/GitLab/Bitbucket
   - Go to [Vercel](https://vercel.com/)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Option 3: Vercel Dashboard**
   - Run `npm run build` locally
   - Go to Vercel dashboard
   - Click "Add New Project"
   - Upload the `dist` folder

## Project Structure

```
admin-dashboard/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions and data
│   └── main.jsx        # Entry point
├── public/             # Static assets
└── dist/               # Build output (generated)
```

## License

MIT
