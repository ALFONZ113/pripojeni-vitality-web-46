import React from 'react';
import PageMetadata from '../components/page/PageMetadata';
import Breadcrumb from '../components/common/Breadcrumb';
import { SEODashboard as SEODashboardComponent } from '../components/seo/SEODashboard';

const SEODashboard: React.FC = () => {
  const breadcrumbItems = [
    { title: 'Úvod', href: '/' },
    { title: 'SEO Dashboard', href: '/seo-dashboard' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMetadata
        title="SEO Dashboard - Monitoring a optimalizace indexování | PODA"
        description="Komplexní SEO dashboard pro monitoring indexování webu, analýzu výkonnosti a optimalizaci vyhledávačů. Sledujte SEO metriky v reálném čase."
        canonicalUrl="https://www.popri.cz/seo-dashboard"
      />

      <div className="max-w-6xl mx-auto py-8 px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">SEO Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Komplexní monitoring a optimalizace SEO výkonnosti webu
          </p>
        </div>

        <SEODashboardComponent />
      </div>
    </div>
  );
};

export default SEODashboard;