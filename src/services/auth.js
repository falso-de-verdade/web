/**
 * Main function for determining wheter an user is logged in.
 */
const isLoggedIn = props => {
    try {
        //return props.location.state.isAuthenticated;
        const Authorization = localStorage.getItem('isAuthenticated');
        console.log(Authorization)
        return Authorization;
    } catch {
        return false;
    }
}

module.exports = {
    isLoggedIn,
}