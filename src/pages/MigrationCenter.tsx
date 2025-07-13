
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import RedirectTestTool from '../components/migration/RedirectTestTool';
import GSCMigrationGuide from '../components/migration/GSCMigrationGuide';
import IndexingAccelerator from '../components/migration/IndexingAccelerator';
import SEOAudit from '../components/migration/SEOAudit';
import PageMetadata from '../components/page/PageMetadata';
import { Breadcrumb } from '../components/ui/breadcrumb';

const MigrationCenter = () => {
  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <PageMetadata
        title="Migration Center | Domain Migration Tools | Popri.cz"
        description="Komplexné nástroje pre migráciu domény z pripojeni-poda.cz na www.popri.cz"
        currentPath="/migration-center"
      />
      
      <div className="container-custom section-padding">
        <Breadcrumb 
          items={[
            { title: 'Úvod', href: '/' },
            { title: 'Migration Center' }
          ]}
          className="mb-8"
        />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Migration Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Komplexné nástroje na riadenie migrácie domény z pripojeni-poda.cz na www.popri.cz
          </p>
        </div>

        <Tabs defaultValue="redirect-test" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="redirect-test">Redirect Test</TabsTrigger>
            <TabsTrigger value="gsc-guide">GSC Migration</TabsTrigger>
            <TabsTrigger value="indexing">Indexing</TabsTrigger>
            <TabsTrigger value="seo-audit">SEO Audit</TabsTrigger>
          </TabsList>
          
          <TabsContent value="redirect-test">
            <RedirectTestTool />
          </TabsContent>
          
          <TabsContent value="gsc-guide">
            <GSCMigrationGuide />
          </TabsContent>
          
          <TabsContent value="indexing">
            <IndexingAccelerator />
          </TabsContent>
          
          <TabsContent value="seo-audit">
            <SEOAudit />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MigrationCenter;
