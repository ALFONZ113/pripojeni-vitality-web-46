
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force clear cache before mounting
if ('caches' in window) {
  caches.keys().then((names) => {
    names.forEach(name => {
      caches.delete(name);
    });
  });
}

// Add timestamp to force browser to re-download assets
const cacheBuster = new Date().getTime();
document.documentElement.dataset.cacheBuster = cacheBuster.toString();

// Force reload if version mismatch detected
const lastVersion = localStorage.getItem('site-version');
const currentVersion = '2025041504'; // Update this when making significant changes
localStorage.setItem('site-version', currentVersion);

if (lastVersion && lastVersion !== currentVersion) {
  console.log('New version detected, forcing reload');
  window.location.reload();
}

createRoot(document.getElementById("root")!).render(<App />);
