import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FirebaseContext from '../../context/firebase';
import Login from "../../pages/login"

const mockHistory = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistory
    })
}));

describe("Login Page", () => {
    it("renders the loginPage with a form submission and logs a username", () => {


        const succeedToLogin = jest.fn(() => Promise.resolve("I am signed in"));
        const firebase = {
            auth: jest.fn(() => ({
                signInWithEmailAndPassword: succeedToLogin
            })),
        }

        const { getByTestId, getByPlaceholderText, queryByTestId} = render(
            <Router>
                <FirebaseContext.Provider value={{ firebase }}>
                    <Login></Login>
                </FirebaseContext.Provider>
            </Router>
        );

        expect(document.title).toEqual('Login - Instagram');

        fireEvent.change(getByPlaceholderText("Email address"), {
            target: { value: "karl@gmail.com"}
        })
        fireEvent.change(getByPlaceholderText("Password"), {
            target: { value: "test-password"}
        })
        fireEvent.submit(getByTestId("login"))

        expect(succeedToLogin).toHaveBeenCalled();
        expect(succeedToLogin).toHaveBeenCalledWith("alelaru@gmail.com", "test-password")

    })
})
