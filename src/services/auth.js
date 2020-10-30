const ATTRIBUTE = 'user';

/**
 * Main function for determining wheter an user is logged in.
 */
const isLoggedIn = props => {
    try {
        return getCurrentUser() != null;
    } catch {
        return false;
    }

    return true;
}

const setLoggedUser = user => {
    const userData = JSON.stringify(user);
    localStorage.setItem(ATTRIBUTE, userData);
}

const getCurrentUser = () => {
    const userData = localStorage.getItem(ATTRIBUTE);
    if (userData) {
        return JSON.parse(userData);
    }

    return null;
}

const removeLoggedUser = () => {
    localStorage.removeItem(ATTRIBUTE);
}

export {
    isLoggedIn,
    setLoggedUser,
    getCurrentUser,
    removeLoggedUser
}