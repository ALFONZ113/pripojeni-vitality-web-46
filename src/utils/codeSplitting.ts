
import { lazy } from 'react';

// Define all lazy routes with proper paths
export const LAZY_ROUTES = {
  Home: () => import('../pages/Index'),
  Blog: () => import('../pages/Blog'),
  BlogPost: () => import('../pages/BlogPost'),
  Contact: () => import('../pages/Contact'),
  InternetTV: () => import('../pages/InternetTV'),
  IPTV: () => import('../pages/IPTV'),
  Tarify: () => import('../pages/Tarify'),
  TvPrograms: () => import('../pages/TvPrograms'),
  InternetOstrava: () => import('../pages/InternetOstrava'),
  InternetKarvina: () => import('../pages/InternetKarvina'),
  InternetBohumin: () => import('../pages/InternetBohumin'),
  InternetHavirov: () => import('../pages/InternetHavirov'),
  InternetPoruba: () => import('../pages/InternetPoruba'),
  OchranaSoukromi: () => import('../pages/OchranaSoukromi'),
  ObchodniPodminky: () => import('../pages/ObchodniPodminky'),
  Cookies: () => import('../pages/Cookies'),
  PromoAkce: () => import('../pages/PromoAkcia'),
  Sitemap: () => import('../pages/Sitemap'),
  MigrationCenter: () => import('../pages/MigrationCenter'),
  IndexingDashboard: () => import('../pages/IndexingDashboard'),
  MigrationMonitor: () => import('../pages/MigrationMonitor')
};

// Create lazy component helper
export const createLazyComponent = (importFn: () => Promise<any>) => {
  return lazy(importFn);
};

/**
 * Optimize bundle loading based on priority
 */
export const optimizeChunkLoading = () => {
  if (typeof document === 'undefined') return;

  // Preload high-priority chunks
  const highPriorityChunks = [
    'vendor',
    'ui',
    'utils'
  ];

  highPriorityChunks.forEach(chunk => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = `/assets/${chunk}.js`;
    document.head.appendChild(link);
  });
};

/**
 * Preload critical routes and components
 */
export const preloadCriticalRoutes = () => {
  if (typeof document === 'undefined') return;

  // Preload critical route bundles
  const criticalRoutes = [
    '/blog',
    '/kontakt',
    '/tarify'
  ];

  criticalRoutes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
};

export default {
  LAZY_ROUTES,
  createLazyComponent,
  preloadCriticalRoutes,
  optimizeChunkLoading
};
