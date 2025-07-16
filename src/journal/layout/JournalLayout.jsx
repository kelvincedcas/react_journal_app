import { useState } from "react";
import { NavBar, SideBar } from "../components";


export const JournalLayout = ({children}) => {

    const [isOpen, setIsOpen] = useState(false);

    return ( 
        <div className="animate__animated animate__fadeIn animate__faster">
            {/* navbar */}
            <NavBar isOpen={isOpen} setIsOpen={setIsOpen}/>

            {/* sidebar */}

            <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>

            <main className="p-6 md:ml-60 mt-15 relative">

                {/* toolbar */}

                {children}

            </main>
        
        </div>
     );
}