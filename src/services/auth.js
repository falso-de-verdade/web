/**
 * Main function for determining wheter an user is logged in.
 */
const isLoggedIn = props => {
    try {
        return props.location.state.isAuthenticated;
    } catch {
        return false;
    }
}

module.exports = { 
    isLoggedIn,
}