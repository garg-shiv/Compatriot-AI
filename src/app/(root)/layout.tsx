import Navbar from "@/components/navbar"; 
// Navbar component ko import kar rahe hain jo top navigation ke liye use hoga

import { Sidebar } from "@/components/ui/sidebar"; 
// Sidebar component ko import kar rahe hain jo side navigation ke liye use hoga

const RootLayout = ({
    children // is component ke andar jo bhi content aayega use `children` prop ke through accept kar rahe hain
}: {
    children: React.ReactNode // TypeScript type define kar raha hai ki `children` ek React component ya element hoga
}) => {
    return ( 
        <div className="h-full"> 
            {/* Full height ka ek wrapper div jo poore layout ko wrap karega */}

            <Navbar /> 
            {/* Navbar component ko render kar rahe hain jo page ke top par dikhega */}

            {/* Sidebar component ko sirf medium (md) aur usse bade screens par dikhayenge */}
            <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0"> 
                <Sidebar />
            </div>

            <main className="md:pl-20 pt-16 h-full"> 
                {/* Main content area, jisme `children` render hoga */}
                {/* md screen par left side me jagah (padding-left 20) chod rahe hain taaki sidebar overlap na kare */}
                {/* pt-16 ka matlab hai navbar ke neeche space chhodna */}
                {children}
            </main> 
        </div>
    );
}

export default RootLayout; 
// Component ko export kar rahe hain taaki doosre files me use kar sakein
