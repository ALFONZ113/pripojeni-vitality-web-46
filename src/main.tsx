
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Render the application
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Simple function to add 'loaded' class once DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('loaded');
  document.documentElement.classList.add('fonts-loaded');
});
