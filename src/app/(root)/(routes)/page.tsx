import React from "react";
import { UserButton } from "@clerk/nextjs";
import  SearchInput  from "../../../components/ui/search-input";

const RootPage = () => {
    return ( 
        <div className="h-full p-4 space-y-2">
            <SearchInput />
        </div>
    );
}
 
export default RootPage;