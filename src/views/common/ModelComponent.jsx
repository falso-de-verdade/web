import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AvForm } from 'availity-reactstrap-validation';
import { Row } from "reactstrap";

import Button from 'components/CustomButton/CustomButton.jsx';

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
            const isLoading = this.state._formState == FORM_STATE.WAITING;
            return (
                <div disabled={isLoading} className="content">
                    <Row>
                        {this.doRender()}
                    </Row>
                    {this.buttonsComponent()}          
                </div>
            );
        }
        
        const nextLink = this.deduceNextLink();
        this.props.history.push(nextLink);
        // return useless data, required
        return (<div></div>)
    }

    mapData = () => {
        throw new Error('Missing model mapData implementation');
    }

    doRender = () => {
        throw new Error('Missing model doRender implementation');
    }

    deduceNextLink = () => {
        if (this.isEditing) {
            return `../${this.listingResource()}`;
        }

        if (this.state._hasError) {
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

    deduceButtonText = () => {
        if (this.isEditing) {
            return 'Salvar';
        }

        return 'Criar';
    }

    buttonsComponent = hideSaveButton => 
        <AvForm autoComplete="off">
            <Link to={this.cancelLink()}>
                <Button pullRight fill bsStyle="danger" >
                    Cancelar
                </Button>
            </Link>
            
            {!hideSaveButton && 
                <Button bsStyle="success" fill type="submit"
                    onClick={this.onFormSubmit}>
                    {this.deduceButtonText()}
                </Button>
            }
        </AvForm>

    onFormSubmit = () => {
        let _createdModel = null;
        let _hasError = false;

        const { handler, data } = this.buildSubmitConfig(this.mapData());
    
        handler(data).then(model => {
            _createdModel = model;
        }).catch(error => {
            _hasError = true;
        }).then(() => {
            this.setState({ _formState: FORM_STATE.WROTE, _hasError, _createdModel })
        });

        this.setState({ _formState: FORM_STATE.WAITING });
    }
}

export default ModelComponent;