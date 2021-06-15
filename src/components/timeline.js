import usePhotos from "../hooks/use-photos";



const Timeline = () => {

    // We need to get the logged in user's photos hooks
    const { photos } = usePhotos();

    console.log("photos", photos);
    // On loading the phtoos we need to use skeleton
    // IF we have photos , render them /create post component
    // If the user has no photos tell them to create some content

    return ( <div className="col-span-2">
        <p>Im the timeline</p>
    </div> );
}
 
export default Timeline;