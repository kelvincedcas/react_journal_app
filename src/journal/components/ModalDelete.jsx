
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react"
import { useDispatch, useSelector } from "react-redux";
import { startDeleteNote } from "../../store/journal";

export const ModalDelete = ({openModalDelete, setOpenModalDelete, noteTitle}) => {

    const {isSaving} = useSelector(state => state.journal);
    const dispatch = useDispatch();

    const onClickDeleteNote = () => {
        dispatch(startDeleteNote());
    }

  return (
    <Modal 
            position="center" 
            show={openModalDelete} 
            size="md" 
            onClose={() => setOpenModalDelete(false)} 
            dismissible
            popup
            className="animate__animated animate__fadeIn animate__faster"
        >
            <ModalHeader/>
            <ModalBody>
                <div className="text-center flex flex-col items-center">
                    <div className="mb-5 mt-1 bg-red-700 w-fit p-4 rounded-full">
                        <TrashIcon className="size-6 text-white"/>
                    </div>
                    <h5 className="text-lg font-semibold text-neutral-800">Delete note!</h5>
                    <p className="text-neutral-600 text-md my-2">You're going to delete the <span className="font-bold text-neutral-700">"{noteTitle || 'Note'}"</span>. Are you sure?</p>
                    <p className="text-sm text-neutral-500 my-1">This action cannot be undone.</p>
                    <div className="flex gap-2 mt-2">
                        <Button
                            disabled={isSaving}
                            color='light'
                            className='transition-colors duration-200 w-32'
                            onClick={() => setOpenModalDelete(false)}
                            // disabled={isSaving}
                        >
                            No, keep it.
                        </Button>
                        <Button 
                            disabled={isSaving}
                            color='red'
                            className='transition-colors duration-200 w-32'
                            onClick={onClickDeleteNote}
                        >
                            {
                                isSaving
                                ? <div className="flex items-center gap-2 animate-pulse">Loading...</div>
                                : 'Yes, delete!'
                            }
                        </Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
  )
}
