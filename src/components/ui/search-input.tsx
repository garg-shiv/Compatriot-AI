"use client"; // ye ensure krta hai ki ye component sirf client-side pe chale, server pe nhi.

import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Search } from "lucide-react"; // search icon import kiya hai jo input field ke andar dikhayenge
import { useRouter, useSearchParams } from "next/navigation"; // Next.js ke hooks jo URL se query params nikalne aur navigate krne ke kaam aayenge
import qs from "query-string"; // query params ko sahi format me convert krne ke liye use hoga

import { Input } from "@/components/ui/input"; // ye ek styled input component hai jo UI ke liye use ho raha
import { useDebounce } from "../../hooks/use-debounce"; // debounce hook import kiya hai jo optimization me madad karega

export default function SearchInput() {
  const router = useRouter(); // router hook se dynamically page navigate kar sakte hain
  const searchParams = useSearchParams(); // ye hook current URL se query parameters fetch krta hai

  // URL me agar pehle se koi "categoryId" aur "name" parameter hai toh unko yahan fetch kar rahe hain
  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  // input field ka state maintain kr rahe, agar URL me name pehle se ho toh usko default value de rahe
  const [value, setValue] = useState(name || "");

  // debounce use kr rahe taki search tabhi ho jab user type krke 500ms tak ruk jaye
  const debouncedValue = useDebounce<string>(value, 500);

  /**
   * Debounce Optimization:
   * - Query sirf tabhi change hogi jab user typing band kare aur 500ms tak kuch na likhe
   * - Iska fayda ye hai ki unnecessary database queries hit nahi hongi
   * - Agar debounce na lagaye toh har key press pe query hit hogi jo slow kar sakti hai backend ko
   */

  // jab bhi user input me type kare, ye function call hoga
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value); // state update kr raha input ka
  };

  // jab bhi debouncedValue change hoga tab ye effect chalega
  useEffect(() => {
    // naye query parameters set kar rahe
    const query = {
      name: debouncedValue, // debounced search term add kiya
      categoryId, // agar categoryId pehle se URL me hai toh usko maintain rakh rahe
    };

    // naye query parameters ke sath URL construct kar rahe
    const url = qs.stringifyUrl(
      {
        url: window.location.href, // current URL same rakha
        query, // updated query params add kiye
      },
      { skipEmptyString: true, skipNull: true } // agar koi param empty ya null ho toh usko URL me add nahi karenge
    );

    // naye URL pe navigate kr rahe
    router.push(url);
  }, [debouncedValue, router, categoryId]); // ye effect sirf jab debouncedValue ya categoryId change ho tab chalega

  // search bar return ho raha jo UI me dikhega
  return (
    <div className="relative">
      {/* search icon input field ke andar left side me set kiya */}
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
      
      {/* actual input field jo user type karega */}
      <Input
        onChange={onChange} // jab bhi user type kare, ye function chalega
        value={value} // input field ka value maintain ho raha
        placeholder="Search..." // user ko dikhane ke liye placeholder text
        className="pl-10 bg-primary/10" // styling ke liye left padding di icon ke liye
      />
    </div>
  );
}
