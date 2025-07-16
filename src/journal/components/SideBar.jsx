import { Button, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, Tooltip } from "flowbite-react";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { SideBarItemNote } from "./SideBarItemNote";


export const SideBar = ({isOpen, setIsOpen}) => {

    const {notes} = useSelector(state => state.journal);

    const myRef = useRef(null);

    const handleClickOutside = () => {
        setIsOpen(false);
    };

    useClickOutside(myRef, handleClickOutside);

    return ( 
        <>
        <Sidebar className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} ' w-60 inset-0 fixed md:translate-x-0 transition-all duration-200 z-30`} ref={myRef}>
            <SidebarItems>
                <SidebarItemGroup>
                    <div className="flex justify-between items-center">
                        <h5 className="ml-4">Journal <span className="text-indigo-700 font-bold">App</span></h5>
                        <Tooltip 
                            className="translate-x-3 hidden md:block"
                            placement="left" 
                            content="Close menu"
                        >
                        <Button 
                            color={"purple"} 
                            className="p-3 rounded-r-none translate-x-3 pr-7 md:hidden transition-colors duration-100"
                            onClick={() => setIsOpen(false)}
                        ><ArrowLeftStartOnRectangleIcon className="size-5"/>
                        </Button>
                        </Tooltip>
                    </div>
                </SidebarItemGroup>
                <SidebarItemGroup>
                {
                    notes.map(note => (
                        <SideBarItemNote 
                            key={note.id}
                            setIsOpen={setIsOpen}
                            {...note}
                        />
                    ))
                }
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>

        {/* Fondo obscuro cuando se abre el sidebar */}
        {
            isOpen
            ?
            <div className="bg-neutral-700/40 w-full fixed inset-0 z-20 md:hidden"></div>
            :
            null
        }
        </>
     );
}