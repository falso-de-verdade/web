import { send } from "services/api";


class DataDomain {
    constructor(resource) {
        this.resource = resource;
    }

    list = (parseItems = true) =>
        send({
            method: 'get',
            url: this.resource,
        }, parseItems)
    
    remove = item => this._with_item({
        item,
        method: 'delete'
    })

    create = data => send({
        data,
        method: 'post',
        url: this.resource,
    })

    itemPath = item => `${this.url()}/${item._id}`

    itemPath = item => `${this.resource}/${item._id}`

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