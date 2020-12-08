import { DataDomain } from ".";
import { send } from "services/api";


class UserDomain extends DataDomain {
    me = () =>
        send({
            method: 'get',
            url: `${this.resource}/me`
        })
}


export default new UserDomain('user');