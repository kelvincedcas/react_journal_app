import { PhotoIcon } from "@heroicons/react/20/solid"
import { useMemo } from "react"
import { shortenArray } from "../../helpers"


export const FileListItem = ({file}) => {

    const newName = useMemo(() => {
        return shortenArray(file.name, 30)
    }, [file.name])

  return (
    <div className='border-1 border-gray-200 bg-gray-100 py-3 px-5 rounded-lg animate__animated animate__bounceInLeft animate__faster'>
        <div className="flex gap-3 items-center justify-between">
            <div className="flex gap-3 items-center">
                <PhotoIcon className="size-4 text-indigo-600"/>
                <p className="text-sm text-gray-500">{newName}</p>
            </div>
            {/* Icono para eliminar el archivo de la lista */}
            {/* <div
                className="hover:bg-gray-200 p-1 rounded-md text-gray-500 hover:text-gray-800"
            >
                <CloseIcon
                    className=""
                />
            </div> */}
        </div>
    </div>
  )
}
