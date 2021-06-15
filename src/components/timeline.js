import usePhotos from "../hooks/use-photos";

import Skeleton from "react-loading-skeleton";
import Post from "./post";


const Timeline = () => {

    // We need to get the logged in user's photos hooks
    const { photos } = usePhotos();
    // IF we have photos , render them /create post component
    // If the user has no photos tell them to create some content

    return (
        <div className="container col-span-2">
            {!photos ? (
                // On loading the phtoos we need to use skeleton
                <>
                {[...new Array(4)].map((_, index) =>
                    <Skeleton key={index} count={4} width={640} height={500} className="mb-5"></Skeleton>
                )}
                </>
            )
            : photos.length > 0 ? (
                photos.map((content) =><Post key={content.docId} content={content}></Post>)
            ) : (
                <p className="text-center text-2xl">Follow people to see more photos</p>
            )}
        </div>
    )
}
 
export default Timeline;