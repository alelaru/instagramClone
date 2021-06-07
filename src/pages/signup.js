import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase"
import * as ROUTES from "../constants/browse"
import doesUserNameExist from "../services/firebase";


const SignUp = () => {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext)

    const [ fullName, setFullName ] = useState("");
    const [ userName, setUserName ] = useState("");
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const isInvalid = password === "" || emailAddress === "";


    const handleSignUp = async (e) => {
        e.preventDefault();

        const userNameExist = await doesUserNameExist(userName);

        if(!userNameExist.length){
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);

                //authentication
                    // -> email and password & username (displayName)
                await createdUserResult.user.updateProfile({
                    displayname: userName,
                });

                //firebase user collection (create a document)
                await firebase.firestore().collection("users").add({
                    userId: createdUserResult.user.uid,
                    username: userName.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                });

                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                setPassword("");
                setUserName("");
                setFullName("");
                setEmailAddress("");
                console.log(error.message);
            }
        }else{
            setError("That username is already taken, try another one");
        }

        
    };

    useEffect(() => {
        document.title = "SignUp - Instagram"
    }, [])
 
    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex flex-col justify-center w-full">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                            <img src="/images/logo.png" alt="instagram" className="mt-2 w6-/12 mb-4"></img>
                    </h1>
                    { error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleSignUp} method="POST">
                        <input 
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        ></input>
                        <input 
                            aria-label="Enter your full name"
                            type="text"
                            placeholder="Full Name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        ></input> 
                        <input 
                            aria-label="Enter your username"
                            type="text"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        ></input>                         <input 
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={
                                `bg-blue-medium text-white w-full rounded h-8 font-bold
                                ${isInvalid && 'opacity-50'}`
                            }
                            onSubmit={handleSignUp}>
                                Sign Up
                        </button>                
                    </form>
                    </div>

                    <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
                        <p className="text-sm">
                            Have an account?
                            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium"> Sign in</Link>
                        </p>
                    </div>
            </div>

        </div>
        );
}

export default SignUp;