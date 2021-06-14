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

    // console.log("users found for you",users);
    return users;

}

 