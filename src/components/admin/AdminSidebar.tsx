 import { useNavigate, useLocation, Link } from "react-router-dom";
 import { supabase } from "@/integrations/supabase/client";
 import {
   FileText,
   Share2,
   Download,
   BookOpen,
   FlaskConical,
   Bot,
   LogOut,
   LayoutDashboard,
  Home,
 } from "lucide-react";
 import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarFooter,
   SidebarHeader,
 } from "@/components/ui/sidebar";
 import { Button } from "@/components/ui/button";
 
 const adminNavItems = [
   {
     group: "Správa",
     items: [
       { label: "Formuláře", href: "/admin/dashboard", icon: FileText },
     ],
   },
   {
     group: "Social Media",
     items: [
       { label: "Generátor", href: "/admin/social-generator", icon: Share2 },
       { label: "Export", href: "/admin/social-export", icon: Download },
     ],
   },
   {
     group: "Blog",
     items: [
       { label: "Manager", href: "/admin/ai-blog-manager", icon: BookOpen },
       { label: "Test", href: "/admin/ai-blog-test", icon: FlaskConical },
     ],
   },
   {
     group: "Automatizace",
     items: [
       { label: "AI Automácie", href: "/admin/ai-automation", icon: Bot },
     ],
   },
 ];
 
interface AdminSidebarProps {
  onNavigate?: () => void;
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
   const navigate = useNavigate();
   const location = useLocation();
 
   const handleLogout = async () => {
     await supabase.auth.signOut();
     navigate("/admin-login-poda-2024");
   };
 
   const isActive = (href: string) => location.pathname === href;
 
  const handleNavClick = () => {
    onNavigate?.();
  };

   return (
    <Sidebar collapsible="icon" className="border-r h-full">
      <SidebarHeader className="p-3 sm:p-4 border-b">
        <div className="flex items-center gap-2">
           <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="font-semibold group-data-[collapsible=icon]:hidden">Admin Panel</span>
        </div>
       </SidebarHeader>
 
      <SidebarContent className="p-2">
         {adminNavItems.map((group) => (
           <SidebarGroup key={group.group}>
             <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
             <SidebarGroupContent>
               <SidebarMenu>
                 {group.items.map((item) => (
                   <SidebarMenuItem key={item.href}>
                     <SidebarMenuButton
                       asChild
                       isActive={isActive(item.href)}
                       tooltip={item.label}
                     >
                      <Link to={item.href} onClick={handleNavClick}>
                         <item.icon className="h-4 w-4" />
                         <span>{item.label}</span>
                       </Link>
                     </SidebarMenuButton>
                   </SidebarMenuItem>
                 ))}
               </SidebarMenu>
             </SidebarGroupContent>
           </SidebarGroup>
         ))}
       </SidebarContent>
 
      <SidebarFooter className="p-3 sm:p-4 border-t space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => {
            handleNavClick();
            navigate("/");
          }}
        >
          <Home className="h-4 w-4" />
          <span className="group-data-[collapsible=icon]:hidden">Zpět na web</span>
        </Button>
         <Button
           variant="ghost"
           className="w-full justify-start gap-2"
           onClick={handleLogout}
         >
           <LogOut className="h-4 w-4" />
          <span className="group-data-[collapsible=icon]:hidden">Odhlásit se</span>
         </Button>
       </SidebarFooter>
     </Sidebar>
   );
 }