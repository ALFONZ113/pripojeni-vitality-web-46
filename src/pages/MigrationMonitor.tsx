
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import MigrationDashboard from '../components/migration/MigrationDashboard';
import SEOAudit from '../components/migration/SEOAudit';
import RedirectTester from '../components/migration/RedirectTester';
import PageMetadata from '../components/page/PageMetadata';

const MigrationMonitor = () => {
  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <PageMetadata
        title="Migration Monitor | PODA - Popri.cz"
        description="Monitoring nástroj pre migráciu domény z pripojeni-poda.cz na www.popri.cz"
        currentPath="/migration-monitor"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Migration Monitor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kompletnỳ nástroj na sledovanie a správu migrácie domény z pripojeni-poda.cz na www.popri.cz
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="seo-audit">SEO Audit</TabsTrigger>
            <TabsTrigger value="redirect-test">Redirect Test</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <MigrationDashboard />
          </TabsContent>
          
          <TabsContent value="seo-audit">
            <SEOAudit />
          </TabsContent>
          
          <TabsContent value="redirect-test">
            <RedirectTester />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MigrationMonitor;
