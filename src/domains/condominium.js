import { AggregatedDomain } from ".";

class CondominiumDomain extends AggregatedDomain {
    onList = config => {
        return this.mergeParams({
            embedded: {
                condominium: 1,
            },
        }, config)
    }
}

export default new CondominiumDomain('condominium', 'condominiumrole');