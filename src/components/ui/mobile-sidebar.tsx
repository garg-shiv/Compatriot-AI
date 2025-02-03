import { Menu } from "lucide-react"; 
// `Menu` icon import kar rahe hain jo hamburger menu dikhane ke liye use hoga

import { Sidebar } from "./sidebar"; 
// Sidebar component import kar rahe hain jo mobile menu ke andar dikhayenge

import { Sheet, SheetContent, SheetTrigger } from "./sheet"; 
// `Sheet` ek modal-like sidebar component hai jo open/close ho sakta hai
// `SheetTrigger` button ya icon hota hai jo `Sheet` ko open karne ke liye use hota hai
// `SheetContent` ke andar actual sidebar content hota hai

const MobileSidebar = () => {
    return (
        <Sheet> 
        {/* `Sheet` component wrap karega pura sidebar modal ka logic */}
        
            <SheetTrigger className="md:hidden pr-4"> 
            {/* 
                - `SheetTrigger`: Button ya element jo sidebar ko open karega
                - `md:hidden`: Medium (md) aur usse bade screens pe ye hidden rahega
                - `pr-4`: Right padding 4 units
            */}
                <Menu /> 
                {/* Hamburger menu icon jo click karne par sidebar open karega */}
            </SheetTrigger>

            <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
            {/* 
                - `SheetContent`: Sidebar ka actual content jo `Sheet` ke andar dikhayenge
                - `side="left"`: Sidebar left side se open hoga
                - `p-0`: Padding 0 rakhi hai
                - `bg-secondary`: Background color secondary theme ke hisaab se set hoga
                - `pt-10`: Top padding 10 units taaki content neeche rahe
                - `w-32`: Width 32 units ki rakhi hai (kaafi chhoti sidebar)
            */}
                <Sidebar /> 
                {/* `Sidebar` component jo is mobile sidebar ke andar dikhega */}
            </SheetContent>

        </Sheet>
    );
}

export default MobileSidebar;
