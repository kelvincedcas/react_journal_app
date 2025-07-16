import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react"


export const ModalSuccess = ({messageSaved, openModal, setOpenModal, setOpenModalUploadImages}) => {
  return (
    <Modal 
        position="center" 
        show={openModal} 
        size="md" 
        onClose={() => setOpenModal(false)} 
        dismissible
        popup
        className="animate__animated animate__fadeIn animate__faster"
    >
        <ModalHeader/>
        <ModalBody>
            <div className="text-center">
                <div className="mb-5 mt-1">
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                </div>
                <h5 className="text-lg font-semibold text-neutral-800">Note updated!</h5>
                <p className="text-neutral-600 text-md my-2">{messageSaved}</p>
                <div className="flex justify-center gap-4 mt-2">
                    <Button 
                        color='green'
                        className="w-32 my-4 transition-colors duration-200"
                        onClick={() => {
                            setOpenModal(false)
                            setOpenModalUploadImages(false);
                        }}
                    >
                        Accept
                    </Button>
                </div>
            </div>
        </ModalBody>
    </Modal>
  )
}
