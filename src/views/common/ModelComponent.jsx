import React, { Component } from "react";

class ModelComponent extends Component {
    constructor(modelName, props) {
        super(props);
        this.modelName = modelName;

        this.state = {
            [this.modelName]: {...props[modelName]}
        };
    }

    setModelAttr = attrName => event => this.setRawModelAttrValue(attrName, event.target.value);
    setModelAttrValue = attrName => value => this.setRawModelAttrValue(attrName, value);

    setRawModelAttrValue = (attrName, value) => {
        this.setState({ [this.modelName]: { ...this.state[this.modelName], [attrName]: value } })
    }

    getModelAttr = attrName => this.state[this.modelName][attrName]
}

export default ModelComponent;