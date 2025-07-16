export const AuthLayout = ({children}) => {
    return ( 
        <div className="bg-neutral-100 min-h-screen flex justify-center items-center px-4 md:px-0">
            {children}
        </div>
     );
}