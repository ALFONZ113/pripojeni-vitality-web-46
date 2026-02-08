import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 import { supabase } from "@/integrations/supabase/client";
 import { toast } from "sonner";
import { Loader2 } from "lucide-react";
 import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
 
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
   const navigate = useNavigate();
 
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
    <div className="fixed inset-0 bg-background admin-panel-root">
      <SidebarProvider defaultOpen={true} className="h-full">
        <div className="flex h-full w-full">
          <AdminSidebar />
          
          <div className="flex-1 flex flex-col min-w-0 h-full w-full overflow-hidden">
            <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
              <SidebarTrigger className="-ml-1" />
              
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-lg font-semibold truncate">{title}</h1>
                {description && (
                  <p className="text-xs sm:text-sm text-muted-foreground truncate hidden sm:block">{description}</p>
                )}
              </div>
            </header>
            
            <main className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 lg:p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
   );
 }