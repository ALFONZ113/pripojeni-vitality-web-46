
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

createRoot(document.getElementById("root")!).render(<App />);
