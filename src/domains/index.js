import { send, sendAndParse } from "services/api";


class DataDomain {
    constructor(resource) {
        this.resource = resource;
        this.list = this.list.bind(this);
        this.find = this.find.bind(this);
        this.remove = this.remove.bind(this);
    }

    onList = config => config
    onFind = config => this.onList(config)

    list(config) {
        let render = sendAndParse;
        if (config && config.noparse === true) {
            render = send;
        }
        return render({
            method: 'get',
            url: this.resource,
            ...this.onFind(config),
        })
    }

    remove(item) {
        return this._withItem({
            item,
            method: 'delete'
        });
    }

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

    find(id, config) {
        return sendAndParse({
            method: 'get',
            url: this.itemPath({
                _id: id
            }),
            ...this.onFind(config),
        }, true)
    }

    itemPath = item => `${this.resource}/${item._id}`

    mergeParams = (params, config = {}) => {
        // fail-safe method to merge query string parameters
        return {
            ...config,

            params: {
                ...params, 
                ...config.params,
            },
        }
    }

    _withItem = ({ item, ...config }) =>
        send({
            url: this.itemPath(item),
            headers: {
                'If-Match': item._etag
            },
            ...config,
        })
}

class AggregatedDomain extends DataDomain {
    constructor(resource, 
                aggregation_resource, 
                field = '_id',
                hasMany = false) {
        super(resource);
        this.aggregation_resource = aggregation_resource;
        this.agg_field = field;
        this.hasMany = hasMany;
    }

    list(config) {
        config = {
            url: this.aggregation_resource,
            ...config, 
        }
        return super.list(config);
    }

    remove(item){
        const oldResource = this.resource;

        // temp change
        this.resource = this.aggregation_resource;

        const promise = super.remove(item);

        // flip resource back
        this.resource = oldResource;

        return promise;
    }

    async find(id, config) {
        config = {
            url: this.aggregation_resource,
            
            ...this.mergeParams({
                where: {
                    [this.agg_field]: id,
                },
            }, config)
        }

        const response = await super.find(id, config);
        if (this.hasMany) {
            return response._items;
        }
        return response._items[0];
    }
}

export {
    DataDomain,
    AggregatedDomain,
}