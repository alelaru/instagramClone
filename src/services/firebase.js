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

export const updateLoginUserFollowingArrray = async (loggedInUserDocId, sgProfileId, isFollowingProfile) => {

    const result = await firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
        following: isFollowingProfile 
        ? FieldValue.arrayRemove(sgProfileId)
        : FieldValue.arrayUnion(sgProfileId)
    })

    return result;
}

//update the followers array of the person begin followed

export const updateLoginUserFollowersArrray = async (sgProfileId, userId, isFollowingProfile) => {

    const result = await firebase
    .firestore()
    .collection("users")
    .doc(sgProfileId)
    .update({
        followers: isFollowingProfile 
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId)
    })

    return result;
}
