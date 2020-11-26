import { send } from "services/api";


class DataDomain {
    constructor(resource) {
        this.resource = resource;
    }

    url = () => `/${this.resource}`

    list = (parseItems = true) =>
        send({
            method: 'get',
            url: this.url(),
        }, parseItems)
    
    remove = item => this._with_item({
        item,
        method: 'delete'
    })

    create = body => send({
        body,
        method: 'post',
    })

    itemPath = item => `${this.url()}/${item._id}`

    _with_item = ({ item, ...config }) =>
        send({
            url: this.itemPath(item),
            headers: {
                'If-Match': item._etag
            },
            ...config, 
        })
}

export {
    DataDomain
}