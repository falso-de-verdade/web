import { Component } from "react";

class ModelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.modelData
        }
    }

    setModelAttr = attrName => event => this.setRawModelAttrValue(attrName, event.target.value);
    setModelAttrValue = attrName => value => this.setRawModelAttrValue(attrName, value);

    setRawModelAttrValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    getModelAttr = attrName => this.state[attrName]
}

export default ModelComponent;