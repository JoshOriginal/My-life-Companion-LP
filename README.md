# My Life Companion

Welcome to the official repository powering **My Life Companion**, the personal assistance website designed to help users manage schedules, set reminders, track habits, and access useful tools all from one place.

## About the Website

My Life Companion is built as a modern, responsive web application that runs entirely in the browser. It provides:

- 📅 Daily planning and calendar integration
- ⏰ Reminder and notification system
- ✅ Habit tracking with progress visualization
- 📊 Analytics dashboard for personal statistics
- 🔒 Secure user authentication and settings

This repo contains the source code for the frontend, implemented with React and TypeScript, and styled using Tailwind CSS and shadcn-ui components.

## Getting Started Locally

To run the website on your machine, make sure you have Node.js and npm installed. Then follow these steps:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd "My Life Companion LP"

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Editing the Code

You can modify the source using any editor or IDE. Changes made locally can be committed and pushed to the repository. The codebase is structured under `src/` with components, hooks, and pages clearly organized.

## Technology Stack

This project uses:

- Vite for fast build and development
- React with TypeScript for UI logic
- shadcn-ui for reusable UI components
- Tailwind CSS for utility-first styling

## Deployment

Deployment is handled via the CI/CD pipeline configured in the repository. Pushing to the `main` branch will trigger a build and publish the latest version of the site. If you're using a platform like Vercel or Netlify, ensure the build command is `npm run build` and the output directory is `dist`.

## Custom Domain

To use a custom domain, configure DNS records with your hosting provider and update the domain settings in the deployment platform. Refer to your host's documentation for specifics.

---

Feel free to explore the code, experiment with new features, and contribute!

