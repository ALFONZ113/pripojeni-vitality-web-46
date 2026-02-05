 import { useEffect, useState } from "react";
 import { useNavigate, useLocation } from "react-router-dom";
 import { supabase } from "@/integrations/supabase/client";
 import { toast } from "sonner";
import { Loader2, Menu } from "lucide-react";
 import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
 
 interface AdminLayoutProps {
   children: React.ReactNode;
   title: string;
   description?: string;
 }
 
// Add noindex meta tag and hide main navbar on mount
 const useNoIndex = () => {
   useEffect(() => {
     const metaRobots = document.createElement('meta');
     metaRobots.name = 'robots';
     metaRobots.content = 'noindex, nofollow';
     document.head.appendChild(metaRobots);
    
    // Hide main navbar when in admin
    document.body.classList.add('admin-mode');
    
     return () => {
       document.head.removeChild(metaRobots);
      document.body.classList.remove('admin-mode');
     };
   }, []);
 };
 
 export function AdminLayout({ children, title, description }: AdminLayoutProps) {
   useNoIndex();
   const [isLoading, setIsLoading] = useState(true);
   const [isAdmin, setIsAdmin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
   const navigate = useNavigate();
  const isMobile = useIsMobile();
 
   useEffect(() => {
     checkAuth();
   }, []);
 
   const checkAuth = async () => {
     try {
       const { data: { user } } = await supabase.auth.getUser();
       if (!user) {
         navigate("/admin-login-poda-2024");
         return;
       }
 
       // Server-side admin role check
       const { data: roleData, error: roleError } = await supabase
         .from('user_roles')
         .select('role')
         .eq('user_id', user.id)
         .eq('role', 'admin')
         .maybeSingle();
 
       if (roleError || !roleData) {
         toast.error('Nedostatečná oprávnění', {
           description: 'Nemáte přístup do administrace.',
         });
         await supabase.auth.signOut();
         navigate("/");
         return;
       }
 
       setIsAdmin(true);
     } catch (error) {
       console.error('Auth error:', error);
       navigate("/admin-login-poda-2024");
     } finally {
       setIsLoading(false);
     }
   };
 
   if (isLoading) {
     return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-[9999]">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
       </div>
     );
   }
 
   if (!isAdmin) {
     return null;
   }
 
   return (
    <div className="fixed inset-0 z-[9999] bg-background">
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex h-full w-full">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <AdminSidebar />
          </div>
          
          {/* Mobile Sidebar Sheet */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent side="left" className="p-0 w-[280px]">
              <AdminSidebar onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Header */}
            <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
              
              {/* Desktop sidebar trigger */}
              <SidebarTrigger className="hidden lg:flex -ml-1" />
              
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-lg font-semibold truncate">{title}</h1>
                {description && (
                  <p className="text-xs sm:text-sm text-muted-foreground truncate hidden sm:block">{description}</p>
                )}
              </div>
            </header>
            
            {/* Main Content Area */}
            <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
   );
 }