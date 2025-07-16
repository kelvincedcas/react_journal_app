
import { useDispatch, useSelector } from "react-redux"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { Button, Spinner, Tooltip } from "flowbite-react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { startNewNote } from "../../store/journal";


export const JournalPage = () => {

  const {activeNote, isSaving} = useSelector(state => state.journal);

  const dispatch = useDispatch();

  const onclickNewNote = () => {
      dispatch(startNewNote());
  }

  return (
    <JournalLayout>
        {
          !!activeNote
            ? <NoteView/>
            : <NothingSelectedView/>
        }  
      <div className="fixed bottom-0 right-0 m-6">
        <Tooltip content='New note' placement="left">
            <Button
            disabled={isSaving}
            className="p-3 transition-colors duration-200" 
            pill 
            color="default"
            onClick={onclickNewNote}
            >   
                {
                    !isSaving
                        ? <PlusIcon className="size-4"/>
                        : <Spinner size="sm" className="-mt-0.5"/>
                }
            </Button>
        </Tooltip>
    </div>       
    </JournalLayout>
  )
}
