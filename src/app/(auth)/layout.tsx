import React from "react"; // React ko import kar rahe hain taaki JSX aur types ka use kar sakein

const AuthLayout = ({ 
    children // is component ke andar jo bhi content aayega use `children` prop ke through accept kar rahe hain
}: { 
    children: React.ReactNode // TypeScript type define kar raha hai ki `children` ek React component ya element hoga
})  => { 
    return ( 
        <div className="flex items-center justify-center h-full"> 
            {/* Ek div jo pura screen cover karega (`h-full`) aur uske andar ka content center me align hoga */}
            {children} 
            {/* Ye `children` render karega jo bhi `AuthLayout` ke andar pass kiya gaya hoga */}
        </div>
     );
}
 
export default AuthLayout; // Component ko export kar rahe hain taaki doosre files me use kar sakein
