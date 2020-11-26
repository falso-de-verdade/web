import { send } from "services/api";


class DataDomain {
    constructor(url) {
        this.url = url;
    }

    list = (parseItems = true) => {
        return send({
            method: 'get',
            url: this.url,
        }, parseItems)
    }
    
    remove = item => {
        return send({
            method: 'delete',
            url: this.path(item),
            headers: {
                'If-Match': item._etag
            }
        })
    }

    path = item => `${this.url}/${item._id}`
}

export {
    DataDomain
}