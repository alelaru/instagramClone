import usePhotos from "../hooks/use-photos";

import Skeleton from "react-loading-skeleton";


const Timeline = () => {

    // We need to get the logged in user's photos hooks
    const { photos } = usePhotos();

    console.log("photos", photos);
    // On loading the phtoos we need to use skeleton
    // IF we have photos , render them /create post component
    // If the user has no photos tell them to create some content

    return (
        <div className="container col-span-2">
            {!photos ? (
                <>
                {[...new Array(4)].map((_, index) =>
                    <Skeleton key={index} count={4} width={640} height={500} className="mb-5"></Skeleton>
                )}
                </>
            )
            : photos.length > 0 ? (
                photos.map((content) =><p key={content.docId}>{content.imageSrc}</p>)
            ) : (
                <p className="text-center text-2xl">Follow people to see more photos</p>
            )}
        </div>
    )
}
 
export default Timeline;