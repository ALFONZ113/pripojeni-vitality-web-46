import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { Toaster } from '@/components/ui/toaster'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Import pages
import Index from './pages/Index'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Tarify from './pages/Tarify'
import InternetOstrava from './pages/InternetOstrava'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/tarify" element={<Tarify />} />
            <Route path="/internet-ostrava" element={<InternetOstrava />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  </React.StrictMode>,
)