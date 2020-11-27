import React, { Component } from "react";

const FORM_STATE = {
    IDDLE: 0,
    WAITING: 1,
    WROTE: 2,
}

class ModelComponent extends Component {
    constructor(props) {
        super(props);

        this.isEditing = props.modelData !== undefined;
        
        this.state = {
            _formState: FORM_STATE.IDDLE,
            _hasError: false,
            _createdModel: null,

            ...props.modelData,
        }
    }

    render = () => {
        if (this.state._formState != FORM_STATE.WROTE) {
            return this.doRender(this.state._formState == FORM_STATE.WAITING);
        }
        
        const nextLink = this.deduceNextLink();
        this.props.history.push(`../${nextLink}`);
        // return useless data, required
        return (<div></div>)
    }

    mapData = () => {
        throw new Error('Missing model mapData implementation');
    }

    deduceNextLink = () => {
        if (this.state._hasError || this.isEditing) {
            return this.listingResource();
        }

        return this.domain.itemPath(this.state._createdModel);
    }

    cancelLink = () => {
        let link = this.listingResource();

        if (this.isEditing) {
            link = `../${link}`;
        }

        return link;
    }

    listingResource = () => `${this.domain.resource}s`; 

    doRender = isLoading => {
        throw new Error('Missing model doRender implementation');
    }

    setModelAttr = attrName => event => this.setRawModelAttrValue(attrName, event.target.value);
    setModelAttrValue = attrName => value => this.setRawModelAttrValue(attrName, value);

    setRawModelAttrValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    getModelAttr = attrName => this.state[attrName]

    buildSubmitConfig = data => {
        if (this.isEditing) {
            return {
                data: {
                    _id: this.state._id,
                    _etag: this.state._etag,
                    ...data,
                },
                handler: this.domain.update,
            }
        }

        return {
            data,
            handler: this.domain.create
        }
    }

    onFormSubmit = () => {
        let _createdModel = null;
        let _hasError = false;

        const { handler, data } = this.buildSubmitConfig(this.mapData());
    
        handler(data).then(model => {
            _createdModel = model;
            // this.setState({ _formState: FORM_STATE.WROTE, _hasError, _createdModel })
        }).catch(error => {
            _hasError = true;
        }).then(() => {
            this.setState({ _formState: FORM_STATE.WROTE, _hasError, _createdModel })
        });

        this.setState({ _formState: FORM_STATE.WAITING });
    }
}

export default ModelComponent;