import { CalendarDateRangeIcon, LockClosedIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Dropdown, DropdownItem, FileInput, FloatingLabel, HelperText, Label, Spinner, Textarea } from "flowbite-react";
import { Gallery, ModalDelete, ModalSuccess, ModalUploadImages } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment/moment";

import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { setActiveNote, startUpdateNote, startUploadingFiles } from "../../store/journal";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

// const imagesData = [
//     {
//         src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg', 
//         alt: 'image-1'
//     },
//     {
//         src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
//         alt: 'image-2'
//     },{
//         src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
//         alt: 'image-3'
//     },{
//         src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
//         alt: 'image-4'
//     },{
//         src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
//         alt: 'image-5'
//     },{
//         src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
//         alt: 'image-6'
//     },{
//         src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
//         alt: 'image-7'
//     },{
//         src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
//         alt: 'image-8'
//     },{
//         src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
//         alt: 'image-9'
//     },{
//         src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
//         alt: 'image-10'
//     },{
//         src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
//         alt: 'image-11'
//     }
// ];

export const NoteView = () => {

    const {isSaving, activeNote, messageSaved} = useSelector(state => state.journal);

    const [openModal, setOpenModal] = useState(false);
    const [openModalUploadImages, setOpenModalUploadImages] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    
    const dispatch = useDispatch();
    
    const {title, body, date, formState, onInputChange} = useForm(activeNote);
    
    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);
    
    useEffect(() => {
        if(messageSaved.length > 1) {
            setOpenModal(true);
            console.log('el mensaje de exito cambio');
        };
    }, [messageSaved]);
    
    
    const dateFormated = useMemo(() => {
        const dateToMoment = moment(date);
        return dateToMoment.format('dddd, MMMM DD YYYY');
    }, [date]);
    
    const onClickSaveNote = () => {
        dispatch(startUpdateNote());
    }

    const onClickDeleteButton = () => {
        setOpenModalDelete(true);
    }

    return ( 
        <>
        
        <div className="flex justify-between z-0 flex-col md:flex-row gap-2">
            <div className="flex items-center justify-between gap-2 mb-2 md:mb-0 w-full">
                <div className="flex gap-2 items-center">
                    <CalendarDateRangeIcon className="size-4 text-indigo-600"/>
                    <p className="text-neutral-600">{dateFormated}</p>
                </div>
                <Dropdown 
                    placement="bottom-end"
                    inline 
                    className="rounded-lg py-1 px-2"
                    arrowIcon={false}
                    label={<EllipsisVerticalIcon className="size-7 hover:bg-gray-100 rounded-full p-1 transition-colors duration-200"/>}
                >
                    <DropdownItem
                        className="hover:rounded-md gap-2 group/item transition-colors duration-200 hover:bg-red-100"
                        onClick={onClickDeleteButton}
                    >
                        <p className="text-red-500">Delete note</p>
                        <div className="group-hover/item:bg-red-600 group-hover/item:translate-x-1 rounded-full p-1 transition-all duration-200 bg-red-500 text-white">
                            <TrashIcon className="size-4  group-hover/item:visible"/>
                        </div>
                    </DropdownItem>
                </Dropdown>
            </div>
            <div className="flex gap-2">
                <Button
                    color='dark'
                    className="transition-colors duration-200 w-full md:min-w-36"
                    disabled={isSaving}
                    onClick={() => setOpenModalUploadImages(true)}
                >
                    <CloudArrowUpIcon className="size-5 mr-1"/>
                    Upload files
                </Button>
                
                <Button
                    color={"default"}
                    className="transition-colors duration-200 w-full md:min-w-32"
                    onClick={onClickSaveNote}
                    disabled={isSaving}
                >
                    {
                        isSaving
                        ?   <div className="flex items-center gap-2"><Spinner size="md" className=""/>Loading...</div>
                        :   <><LockClosedIcon className="size-4 mr-1"/>
                            Save note </>
                    }
                </Button>
            </div>
        </div>

        <div className="border-b-1 border-b-gray-300 my-4"></div>

        <div>
            <FloatingLabel 
                variant="outlined" 
                label="Title" 
                type="text" 
                color="default"
                name='title'
                value={title}
                onChange={onInputChange}
            />
            <HelperText hidden color="failure">The title is required</HelperText>
        </div>

        <div className="mt-3">
            <div className="mb-2 block">
                <Label htmlFor="comment">Description</Label>
            </div>

            <Textarea 
                id="body" 
                placeholder="What happened today?" 
                required 
                rows={4} 
                className="focus:ring-0"
                name='body'
                value={body}
                onChange={onInputChange}
            />

        </div>

        <div className="mt-3">
            {
                activeNote.imagesURLs.length > 0
                ?   <Gallery imagesUrls={activeNote.imagesURLs} />
                :   <>
                        <div className="border-b-1 border-b-gray-300 w-full my-4"></div>
                        <div className="flex flex-col justify-center items-center gap-4 bg-gray-50 p-6 rounded-lg border-1  border-gray-300">
                            <img src="https://res.cloudinary.com/ditplyhgn/image/upload/v1752674440/undraw_notify_rnwe_1_nxrris.svg" alt="img-url" loading="lazy" className="w-5/10 md:w-3/10"/>
                            <p className="font-ligth text-sm text-neutral-600 mb-3 flex flex-col items-center gap-1">No images uploaded. <span className="text-neutral-800 font-semibold text-md">Please, select some files and upload them.</span></p>
                        </div>  
                    </>
            }
            {/* Modals */}
            <ModalSuccess 
                messageSaved={messageSaved} 
                openModal={openModal} 
                setOpenModal={setOpenModal}
                setOpenModalUploadImages={setOpenModalUploadImages}
            />
            <ModalUploadImages
                openModalUploadImages={openModalUploadImages}
                setOpenModalUploadImages={setOpenModalUploadImages}
            />
            <ModalDelete
                openModalDelete={openModalDelete}
                setOpenModalDelete={setOpenModalDelete}
                noteTitle={activeNote.title}
            />
        </div>
        </>
     );
}