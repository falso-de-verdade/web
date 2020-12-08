const USER_KEY = 'user';
const JWT_KEY = 'jwt';

/**
 * Main function for determining wheter an user is logged in.
 */
const isLoggedIn = () => {
    return getCurrentUser() != null && getCurrentJWT() != null;
}

const setLoggedUser = user => {
    setIntoStorage(USER_KEY, user);
}

const setJWTCreds = credentials => {
    setIntoStorage(JWT_KEY, credentials);
}

const getCurrentUser = () => maybeParseFromStorage(USER_KEY);

const getCurrentJWT = () => maybeParseFromStorage(JWT_KEY);

const removeLoggedUser = () => {
    const storage = defaultStorage();
    const keysToDel = [USER_KEY, JWT_KEY];

    keysToDel.map(key => {
        try {
            storage.removeItem(key);
        } catch {
            //
        }
    })
}

const setIntoStorage = (key, data) => {
    const value = JSON.stringify(data);
    const storage = defaultStorage();
    storage.setItem(key, value);
}

const maybeParseFromStorage = key => {
    const storage = defaultStorage();

    try {
        const data = storage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
    } catch {
        //
    }

    return null;
}

const defaultStorage = () => {
    return localStorage;
}

export {
    isLoggedIn,
    setLoggedUser,
    getCurrentUser,
    removeLoggedUser,
    getCurrentJWT,
    setJWTCreds,
}