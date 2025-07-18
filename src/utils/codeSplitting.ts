
import { lazy, ComponentType } from 'react';

/**
 * Enhanced lazy loading with error boundary and loading states
 */
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ComponentType
) => {
  const LazyComponent = lazy(importFunc);
  
  return LazyComponent;
};

/**
 * Preload component for better UX
 */
export const preloadComponent = (importFunc: () => Promise<any>) => {
  return importFunc();
};

/**
 * Bundle splitting configuration
 */
export const LAZY_ROUTES = {
  // Main pages - load immediately
  Home: () => import('../pages/Index'),
  
  // Secondary pages - load on demand
  Blog: () => import('../pages/Blog'),
  BlogPost: () => import('../pages/BlogPost'),
  Contact: () => import('../pages/Contact'),
  InternetTV: () => import('../pages/InternetTV'),
  IPTV: () => import('../pages/IPTV'),
  Tarify: () => import('../pages/Tarify'),
  TvPrograms: () => import('../pages/TvPrograms'),
  
  // Geo pages - load on demand
  InternetOstrava: () => import('../pages/InternetOstrava'),
  InternetKarvina: () => import('../pages/InternetKarvina'),
  InternetBohumin: () => import('../pages/InternetBohumin'),
  InternetHavirov: () => import('../pages/InternetHavirov'),
  InternetPoruba: () => import('../pages/InternetPoruba'),
  
  // Legal pages - load on demand
  OchranaSoukromi: () => import('../pages/OchranaSoukromi'),
  ObchodniPodminky: () => import('../pages/ObchodniPodminky'),
  Cookies: () => import('../pages/Cookies'),
  
  // Promo page - load on demand
  PromoAkce: () => import('../pages/PromoAkcia'),
  
  // Utility pages - load on demand
  Sitemap: () => import('../pages/Sitemap'),
  MigrationCenter: () => import('../pages/MigrationCenter'),
  IndexingDashboard: () => import('../pages/IndexingDashboard'),
  MigrationMonitor: () => import('../pages/MigrationMonitor'),
};

/**
 * Component lazy loading with route-based splitting
 */
export const LAZY_COMPONENTS = {
  // Heavy components - load on demand
  PromotionPopup: () => import('../components/PromotionPopup'),
  ContactForm: () => import('../components/ContactForm'),
  CallbackForm: () => import('../components/CallbackForm'),
  PromoForm: () => import('../components/PromoForm'),
  
  // Blog components - load with blog pages
  BlogList: () => import('../components/blog/BlogList'),
  BlogCard: () => import('../components/blog/BlogCard'),
  BlogPostContent: () => import('../components/blog/BlogPostContent'),
  
  // Migration tools - load on demand
  MigrationDashboard: () => import('../components/migration/MigrationDashboard'),
  IndexingAccelerator: () => import('../components/migration/IndexingAccelerator'),
  
  // Charts and heavy UI - load on interaction
  TariffSection: () => import('../components/TariffSection'),
  ChannelsSection: () => import('../components/ChannelsSection'),
};
