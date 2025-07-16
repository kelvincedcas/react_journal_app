
import { BookmarkIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Badge, Dropdown, DropdownItem } from "flowbite-react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice";
import { useMemo } from "react";
import { shortenArray } from "../../helpers/shortenArray";


export const SideBarItemNote = ({id, title, body, date, imagesURLs = [], setIsOpen}) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        setIsOpen(false);
        dispatch(setActiveNote({id, title, body, date, imagesURLs}));
    }

    const titleFormated = useMemo(() => {
        return shortenArray(title, 13)
    }, [title]);

    const bodyFormated = useMemo(() => {
        return shortenArray(body, 50)
    }, [body]);

  return (
    <div 
        className="hover:cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200"
        onClick={onClickNote}
    >
        <div className="flex items-center  text-sm">
            <BookmarkIcon className="size-5 mr-2"/>
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-wrap gap-2 justify-between">
                    <h5 className="font-semibold text-base">{titleFormated}</h5>
                    <Badge color="purple">New</Badge>
                </div>
                <p className="text-sm text-neutral-600">{bodyFormated}</p>
            </div>
        </div>
    </div>
  )
}
