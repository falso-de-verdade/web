import { DataDomain } from ".";
import { sendAndParse } from "services/api";


class UserDomain extends DataDomain {
    me = () =>
        sendAndParse({
            method: 'get',
            url: `${this.resource}/me`
        }, true)
}


export default new UserDomain('user');