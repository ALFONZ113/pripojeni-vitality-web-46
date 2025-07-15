
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import { Toaster } from './components/Toaster'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Import pages
import Index from './pages/Index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
)
