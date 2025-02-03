import React from "react"; 
// React ko import kar rahe hain taaki functional components ka use kar sakein

import Link from "next/link"; 
// Next.js ka `Link` component use kar rahe hain taaki bina full page reload ke navigation ho

import { Poppins } from "next/font/google"; 
// Google font `Poppins` import kar rahe hain (ye assume kar rahe hain ki ye correct tarike se import ho raha hai)

import { Sparkles } from "lucide-react"; 
// `lucide-react` se ek icon (`Sparkles`) import kar rahe hain jo UI me dikhayenge

import { UserButton } from "@clerk/nextjs"; 
// `Clerk` ka `UserButton` import kar rahe hain jo authentication ke liye use hota hai

import { cn } from "@/lib/utils"; 
// `cn` ek utility function hai jo class names ko dynamically handle karta hoga

import { Button } from "../components/ui/button"; 
// Custom Button component import kar rahe hain jo UI me use hoga

import { ModeToggle } from "./ui/theme-toggle"; 
// Dark mode ya light mode toggle ke liye `ModeToggle` component import kar rahe hain

import MobileSidebar from "./ui/mobile-sidebar"; 
// Mobile devices ke liye ek sidebar menu import kar rahe hain

const font = Poppins({
  weight: "600", 
  subsets: ["latin"]
}); 
// `Poppins` font ka configuration set kar rahe hain, jisme weight `600` (semi-bold) hoga

export default function Navbar() { 
// Navbar component define kar rahe hain

  return (
    <div className="fixed w-screen z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      {/* 
        - `fixed`: Navbar screen ke top pe fixed rahega 
        - `w-screen`: Pura width cover karega
        - `z-50`: High z-index taaki aur elements ke peeche na chhup jaye
        - `flex justify-between items-center`: Navbar ke elements ko left aur right me space distribute karega
        - `border-b border-primary/10`: Neeche ek halki border hogi
        - `bg-secondary`: Background color set karega
        - `h-16`: Height 16 units (approx. 64px)
      */}

      <div className="flex items-center">
        <MobileSidebar />
        {/* Mobile Sidebar component jo chhoti screens par menu toggle karega */}

        <Link href="/">
          <h1
            className={cn(
              "md:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
        {/* 
          - `companion.ai` brand name ko clickable banaya gaya hai jo home page pe le jayega
          - `md:block`: Medium screens par ye dikhega
          - `text-xl md:text-3xl`: Chhoti screens pe chhota aur badi screens pe bada text hoga
          - `font-bold text-primary`: Bold aur primary color ka text hoga
        */}
      </div>

      <div className="flex items-center gap-x-3">
        {/* Right side ke buttons aur user authentication ka section */}

        <Button size="sm" variant="premium">
          Upgrade
          <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
        </Button>
        {/* 
          - `Upgrade` button premium feature ke liye
          - Sparkles icon ke saath jo dikhata hai ki ye ek special feature hai
        */}

        <ModeToggle />
        {/* Dark mode/light mode toggle karne ka button */}

        <UserButton afterSignOutUrl="/" />
        {/* `UserButton` component jo user authentication ke liye Clerk ka use karega */}
      </div>
    </div>
  );
}
