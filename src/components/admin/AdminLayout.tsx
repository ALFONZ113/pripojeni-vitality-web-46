 import { useEffect, useState } from "react";
 import { useNavigate, useLocation } from "react-router-dom";
 import { supabase } from "@/integrations/supabase/client";
 import { toast } from "sonner";
 import { Loader2 } from "lucide-react";
 import { AdminSidebar } from "./AdminSidebar";
 import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
 
 interface AdminLayoutProps {
   children: React.ReactNode;
   title: string;
   description?: string;
 }
 
 // Add noindex meta tag on mount
 const useNoIndex = () => {
   useEffect(() => {
     const metaRobots = document.createElement('meta');
     metaRobots.name = 'robots';
     metaRobots.content = 'noindex, nofollow';
     document.head.appendChild(metaRobots);
     return () => {
       document.head.removeChild(metaRobots);
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
       <div className="min-h-screen flex items-center justify-center bg-background">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
       </div>
     );
   }
 
   if (!isAdmin) {
     return null;
   }
 
   return (
     <SidebarProvider defaultOpen={true}>
       <div className="min-h-screen flex w-full">
         <AdminSidebar />
         <SidebarInset className="flex-1">
           <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
             <SidebarTrigger className="-ml-1" />
             <div className="flex-1">
               <h1 className="text-lg font-semibold">{title}</h1>
               {description && (
                 <p className="text-sm text-muted-foreground">{description}</p>
               )}
             </div>
           </header>
           <main className="flex-1 p-4 lg:p-6">
             {children}
           </main>
         </SidebarInset>
       </div>
     </SidebarProvider>
   );
 }