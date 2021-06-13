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

 