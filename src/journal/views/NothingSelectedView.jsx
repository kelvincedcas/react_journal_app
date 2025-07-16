import { CursorArrowRippleIcon } from "@heroicons/react/24/outline";

export const NothingSelectedView = () => {

    return ( 
        <div className="bg-neutral-100 rounded-lg flex justify-center items-center flex-col gap-2 min-h-150">
            <CursorArrowRippleIcon className="size-8"/>
            <h4 className="text-neutral-600">Select or create a <span className="font-semibold text-indigo-600">new entry</span></h4>
        </div>
     );
}