import { firebase, FieldValue } from "../lib/firebase"

export const doesUserNameExist = async(username) => {
    
    const result = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();

    //  console.log(result);

    return result.docs.map((user) => user.data().length > 0);
}

export const getUserByUserName = async(username) => {
    
    const result = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();

    //   console.log(result);
    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
}


//Take photos with the username
export const getUserPhotosByUsername = async(userId) => {

    const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

    const photos =  result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));
    // console.log("PHOTOSSSSS IN FIREBASE", photos);
    return photos
}

//Get user from the firestore where the userid is equal to userid passed from the the auth in use-user
export const getUserbyUserId = async(userId) => {
    const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

    const user =  result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

//Get suggested profiles from the database and show it to the person
export const getSuggestedProfiles = async(userId, following) => {
    const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "!=", userId)
    .limit(10) 
    .get();

    // Here it checks if the user is not i my following list 
    const users =  result.docs
                            .filter(item => !following.includes(item.id))
                            .map(item => ({ 
                                ...item.data(),
                                docId: item.id
                            }))
    return users;
}

//update the following array of the following user

export const updateLoginUserFollowingArrray = async (loggedInUserDocId, profileId, isFollowingProfile) => {

    const result = await firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
        following: isFollowingProfile 
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    })

    return result;
}

//update the followers array of the person begin followed

export const updateLoginUserFollowersArrray = async (
    profileDocId, // current logged in user document Id
    loggedInUserDocId, //The user that alelaru request to follow
    isFollowingProfile //True or false if im actually following
    ) => {

    console.log("Entré");
    const result = await firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
        followers: isFollowingProfile 
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    })

    return result;
}


export const getPhotos = async (userId, following) => {

    const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get()
    

    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }))

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if(photo.likes.includes(userId)){
                userLikedPhoto = true;
            }
            //We get the number 2
            const user = await getUserbyUserId(photo.userId);
            //Then we get the name that is raphael
            const {username} = user[0]
            return {username, ...photo, userLikedPhoto};
        })
    )

    return photosWithUserDetails;
}

export const addCommentToDatabase = async (comment, photoId) => {

    const result = await firebase
    .firestore()
    .collection('photos')
    .doc(photoId)
    .update({
        comments: FieldValue.arrayUnion(comment)
    });


    // .update({
    //     followers: isFollowingProfile 
    //     ? FieldValue.arrayRemove(userId)
    //     : FieldValue.arrayUnion(userId)
    // })

    return result;
}

export const isUserFollowingProfile = async (LoggedInUsername, profileUserId) => {

    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', LoggedInUsername) //User loggedin
    .where('following', 'array-contains',  profileUserId) //User that we are checking the profile
    .get()

    const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.docId
    }))

    // console.log("is following",response);
    return response.userId
}

//Toggle the button follow / unfollow
// loggedUserId is the user logged into the app
// profileUserId is the user we are checking the profile the want we want to toggle into their profile
export const toggleFollow = async (
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
) => {

    console.log("Follower array updated");
    console.log("alelaru",activeUserDocId);
    console.log("raphael",profileUserId);
    console.log("IsFollowing?", isFollowingProfile);    
  // 1st param: alelaru's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await updateLoginUserFollowingArrray(activeUserDocId, profileUserId, isFollowingProfile);

    console.log("Following array updated");
  // 1st param: alelaru's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await updateLoginUserFollowersArrray(profileDocId , followingUserId, isFollowingProfile);

}
