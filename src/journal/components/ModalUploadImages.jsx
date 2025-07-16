import { Button, FileInput, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'flowbite-react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startUpdateNote, startUploadingFiles } from '../../store/journal';
import { FileListItem } from './FileListItem';

export const ModalUploadImages = ({openModalUploadImages, setOpenModalUploadImages}) => {

    const {isSaving} = useSelector(state => state.journal);

    const dispatch = useDispatch();

    const [files, setFiles] = useState(null);
    const [filesArray, setFilesArray] = useState([]);

    const onFileInputChange = ({target}) => {
        if (target.files === 0) return;

        setFiles(target.files);

        const newFiles = Array.from(target.files);
        setFilesArray(newFiles);
    }

    const onClickUpload = () => {
        
        dispatch(startUploadingFiles(files));

        setFilesArray([]);
    }

    const onClickCloseModal = () => {
        setOpenModalUploadImages(false);
        setFilesArray([]);
    }
  return (
    <Modal
        className='animate__animated animate__fadeIn animate__faster'
        dismissible
        popup
        show={openModalUploadImages}
        size='lg'
        onClose={onClickCloseModal}
    >
        <ModalHeader className='m-4'>
            Upload files
        </ModalHeader>
        <ModalBody>
            
            <div className="flex flex-col w-full items-center justify-center">
                {
                    isSaving
                    ? <div className='h-64 flex flex-col gap-3 justify-center items-center'>
                        <Spinner/>
                        <p className='text-sm text-gray-500 animate-pulse'>Uploading files...</p>
                    </div>
                    : <Label
                    htmlFor="dropzone-file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> the files
                    </p>
                    </div>
                    <FileInput
                        accept='.jpg, .png, .jpeg, .gif'
                        id="dropzone-file" 
                        className="hidden" 
                        multiple
                        onChange={onFileInputChange}
                        disabled={isSaving}
                        />
                </Label>
                }
                <div className='flex justify-between w-full my-2'>
                    <p className="text-sm text-gray-500 dark:text-gray-400"><span className='text-gray-700 font-semibold'>Supported formats:</span> SVG, PNG, JPG, JPEG or GIF.</p>
                    {/* <p className="text-xs text-gray-500 dark:text-gray-400"><span className='text-gray-700 font-semibold'>Maximum sizes:</span> 25MB</p> */}
                </div>
            </div>
            {
                filesArray.length > 0
                ? <div className='flex flex-col gap-2 bg-gray-50 px-4 py-4 rounded-lg mt-2'>
                    <h4 className='text-md text-gray-800 font-semibold'>Selected files</h4>
                    <div className='border-b-1 border-b-gray-300 mb-1'></div>
                    {
                        filesArray?.map(file => (
                            <FileListItem 
                                file={file}
                                key={file.name}
                            />
                        ))
                    }
                    </div>
                : null
            }
            
        </ModalBody>
        <ModalFooter>
            <div className='flex gap-2 justify-end w-full'>
                <Button
                    color='alternative'
                    className='transition-colors duration-200'
                    onClick={onClickCloseModal}
                    disabled={isSaving}
                >
                    Cancel
                </Button>
                <Button
                    className='transition-colors duration-200'
                    disabled={filesArray.length < 1 || isSaving}
                    onClick={onClickUpload}
                >
                    Upload
                </Button>
            </div>
        </ModalFooter>
    </Modal>
  )
}
