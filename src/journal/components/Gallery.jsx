export const Gallery = ({imagesUrls}) => {
    return ( 
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-85 overflow-y-auto">
            {
                imagesUrls.map(url =>(
                <div key={url}>
                    <img 
                        className="h-auto max-w-full rounded-lg hover:scale-97 transition-transform duration-200 border-1 border-gray-200" 
                        src={url} 
                        alt='img'
                        loading="lazy"
                        />
                </div>  
                ))
            }
        </div>
     );
}