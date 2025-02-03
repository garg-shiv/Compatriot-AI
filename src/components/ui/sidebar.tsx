"use client"; 
// Next.js 13+ ke liye useClient directive, jo batata hai ki ye component client-side pe run karega

import React from "react"; 
// React library import kar rahe hain

import { Home, Plus, Settings } from "lucide-react"; 
// Sidebar ke liye icons import kiye hain (Home, Plus, Settings)

import { usePathname, useRouter } from "next/navigation"; 
// `usePathname`: Current URL ka path fetch karne ke liye
// `useRouter`: Navigation handle karne ke liye

import { cn } from "@/lib/utils"; 
// Classnames ko conditionally join karne ke liye utility function import kar rahe hain

export const Sidebar = () => { 
  const pathname = usePathname(); 
  // `pathname` current route ka path store karega

  const router = useRouter();  
  // `router` se hum navigation (`router.push()`) kar sakte hain

  const routes = [ 
  // Routes ka array define kar rahe hain jo sidebar me dikhai denge
    {
      icon: Home, // Home icon
      href: "/", // Home route
      label: "Home", // Home label
      pro: false // Pro access required hai ya nahi
    },
    {
      icon: Plus, // Plus icon (new create page ke liye)
      href: "/companion/new", 
      label: "Create", 
      pro: true // Isko pro access chahiye
    },
    {
      icon: Settings, // Settings icon
      href: "/settings",
      label: "Settings",
      pro: false
    }
  ];

  const onNavigate = (url: string, pro: boolean) => { 
  // Function jo navigation handle karega (abhi pro check nahi kiya)
    return router.push(url);  
  };

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
    {/* 
        - `space-y-4`: Routes ke beech spacing add karega
        - `flex flex-col`: Sidebar vertically arranged hoga
        - `h-full`: Full height lega
        - `text-primary`: Text primary color ka hoga
        - `bg-secondary`: Background color secondary theme ka hoga
    */}
      <div className="p-3 flex-1 flex justify-center">
      {/* 
          - `p-3`: Padding add kar raha hai
          - `flex-1`: Full height le raha hai
          - `justify-center`: Center align karega
      */}
        <div className="space-y-2">
        {/* Routes ke beech vertical spacing maintain karega */}
          {routes.map((route) => ( 
          // `routes` array ko loop karke har ek item render karega
            <div
              onClick={() => onNavigate(route.href, route.pro)} 
              // Route pe click hone par `onNavigate()` call hoga
              key={route.href}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-primary" 
                // Agar current path `pathname` se match kare to active state ka styling dega
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
              {/* Icon aur label ko vertically align karega */}
                <route.icon className="h-5 w-5" />
                {/* Sidebar item ka icon render karega */}
                {route.label}
                {/* Sidebar item ka label render karega */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
