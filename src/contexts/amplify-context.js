import {createContext, useCallback, useEffect, useReducer} from "react";
import PropTypes from "prop-types";
// import Auth from '@aws-amplify/auth';
import Amplify, {API, Auth} from "aws-amplify";

// import { amplifyConfig } from '../config';
import awsExports from "../aws-exports";
import {UserGroup} from "../utils/global-data";
import {getUser} from "graphql/queries";

Amplify.configure(awsExports);

var ActionType;
(function (ActionType) {
    ActionType["INITIALIZE"] = "INITIALIZE";
    ActionType["LOGIN"] = "LOGIN";
    ActionType["LOGOUT"] = "LOGOUT";
})(ActionType || (ActionType = {}));

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const handlers = {
    INITIALIZE: (state, action) => {
        const {isAuthenticated, user} = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    LOGIN: (state, action) => {
        const {user} = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
    }),
};

const reducer = (state, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
    ...initialState,
    platform: "Amplify",
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve(),
    verifyCode: () => Promise.resolve(),
    resendCode: () => Promise.resolve(),
    passwordRecovery: () => Promise.resolve(),
    passwordReset: () => Promise.resolve(),
    reloadUserInfo: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
    const {children} = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    const getUserInfo = useCallback(async (userId) => {
        const response = await API.graphql({
            query: getUser,
            variables: {
                id: userId,
            },
        });
        return response.data.getUser;
    }, []);

    const initialize = useCallback(async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            console.log("AuthProvider... ", {user});
            const groups =
                user.signInUserSession.idToken.payload["cognito:groups"];
            const userInfo = await getUserInfo(user.username);

            // Here you should extract the complete user profile to make it
            // available in your entire app.
            // The auth state only provides basic information.

            dispatch({
                type: ActionType.INITIALIZE,
                payload: {
                    isAuthenticated: true,
                    user: {
                        id: user.username,
                        group:
                            groups?.length > 0
                                ? groups[0]
                                : UserGroup.agentGrands,
                        // avatar: '/images/mock-images/avatars/avatar-anika_visser.png',
                        email: user.attributes.email,
                        name: userInfo?.name ?? "",
                        nameKana: userInfo?.name_kana ?? "",
                    },
                },
            });
        } catch (error) {
            dispatch({
                type: ActionType.INITIALIZE,
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    }, []);

    useEffect(() => {
        initialize();
    }, []);

    const login = async (email, password) => {
        var user = await Auth.signIn(email, password);

        if (user.challengeName == "NEW_PASSWORD_REQUIRED") {
            await Auth.completeNewPassword(
                user, // the Cognito User Object
                password // the new password
            );
            user = await Auth.signIn(email, password);
        } else if (user.challengeName) {
            console.error(
                `Unable to login, because challenge "${user.challengeName}" is mandated and we did not handle this case.`
            );
            return;
        }
        awsExports.aws_appsync_authenticationType = "AMAZON_COGNITO_USER_POOLS";
        Amplify.configure(awsExports);

        const groups = user.signInUserSession.idToken.payload["cognito:groups"];
        const userInfo = await getUserInfo(user.username);

        dispatch({
            type: ActionType.LOGIN,
            payload: {
                user: {
                    id: user.username,
                    group:
                        groups?.length > 0 ? groups[0] : UserGroup.agentGrands,
                    // avatar: '/images/mock-images/avatars/avatar-anika_visser.png',
                    email: user.attributes.email,
                    name: userInfo?.name ?? "",
                    nameKana: userInfo?.name_kana ?? "",
                },
            },
        });
        return user;
    };

    const logout = async () => {
        await Auth.signOut();
        dispatch({
            type: ActionType.LOGOUT,
        });
    };

    const register = async (email, password) => {
        await Auth.signUp({
            username: email,
            password,
            attributes: {email},
        });
    };

    const verifyCode = async (username, code) => {
        await Auth.confirmSignUp(username, code);
    };

    const resendCode = async (username) => {
        await Auth.resendSignUp(username);
    };

    const passwordRecovery = async (username) => {
        await Auth.forgotPassword(username);
    };

    const passwordReset = async (username, code, newPassword) => {
        await Auth.forgotPasswordSubmit(username, code, newPassword);
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                platform: "Amplify",
                login,
                logout,
                register,
                verifyCode,
                resendCode,
                passwordRecovery,
                passwordReset,
                reloadUserInfo: initialize,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
