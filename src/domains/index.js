import { send, sendAndParse } from "services/api";


class DataDomain {
    constructor(resource) {
        this.resource = resource;
    }

    list = config =>
        sendAndParse({
            method: 'get',
            url: this.resource,
            ...config,
        })
    
    remove = item => this._withItem({
        item,
        method: 'delete'
    })

    create = data => sendAndParse({
        data,
        method: 'post',
        url: this.resource,
    }, true)

    update = item => 
        this._withItem({
            item: item,
            data: { ...item, _etag: undefined },
            method: 'patch',
        })

    find = id => sendAndParse({
        method: 'get',
        url: this.itemPath({
            _id: id
        }),
    }, true)

    itemPath = item => `${this.resource}/${item._id}`

    _withItem = ({ item, ...config }) =>
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