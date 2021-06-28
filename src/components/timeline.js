import usePhotos from "../hooks/use-photos";

import Skeleton from "react-loading-skeleton";
import Post from "./post";
import { useContext } from "react";
import LoggedInUserContext from "../context/logged-in-user";


const Timeline = () => {

    const { user } = useContext(LoggedInUserContext)
    // We need to get the logged in user's photos hooks
    const { photos } = usePhotos(user);
    // IF we have photos , render them /create post component
    // If the user has no photos tell them to create some content

    return (
        <div className="container col-span-2">
            {!photos ? (
                // On loading the phtoos we need to use skeleton
                    <Skeleton count={4} width={640} height={500} className="mb-5"></Skeleton>

            ): (
                photos.map((content) =><Post key={content.docId} content={content}></Post>)
            )}
        </div>
    )
}
 
export default Timeline;