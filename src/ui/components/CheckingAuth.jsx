import { Spinner } from "flowbite-react"


export const CheckingAuth = () => {
  return (
    <div className="fixed inset-0">
      <div className="h-full flex gap-2 flex-col justify-center items-center">
        <Spinner color="default"/>
        <p className="text-neutral-600 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
