import SignInComponent from "./SignInComponent";
import { send } from "services/api";

const signIn = data => {
    return send({
        method: 'post',
        url: '/signin',
        data,
    })
}

export {
    SignInComponent,
    signIn,
}