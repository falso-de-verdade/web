import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AvForm } from 'availity-reactstrap-validation';
import { 
    Row, 
    Card, 
    Col, 
    TabPane, 
    TabContent, 
    CardBody, 
    Nav, 
    NavItem, 
    NavLink 
} from "reactstrap";
import classnames from "classnames";

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
            _activeTab: 0,

            ...props.modelData,
        }
    }

    render = () => {
        if (this.state._formState != FORM_STATE.WROTE) {
            const isLoading = this.state._formState == FORM_STATE.WAITING;
            return (
                <div disabled={isLoading} className="content">
                    <Row>
                        <Col style={{ marginTop: '-10px' }} md={12}>
                            <Card>
                                {this.doRender()}
                            </Card>
                        </Col>
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
        const tabComponents = this.tabs();
        if (tabComponents.length === 0) {
            throw new Error('Any tab component for model found.')
        }
        
        if (tabComponents.constructor != Array) {
            return (
                <AvForm autoComplete="off">
                    {tabComponents}
                </AvForm>
            );
        }
        
        return <React.Fragment>
            <CardBody style={{ padding: '10px', fontSize: 12 }}>
                <Nav tabs>
                    {tabComponents.map(({ name }, idx) => (
                        <NavItem className={classnames({ active: this.state._activeTab === idx })}>
                            <NavLink href="#" style={{ color: '#000' }}
                                onClick={() => { this.toggleTab(idx); }}>{name}</NavLink>
                        </NavItem>
                    ))}
                </Nav>
            </CardBody>
            {tabComponents.map(({ component }, idx) => (
                <TabContent activeTab={this.state._activeTab}>
                    <TabPane tabId={idx}>
                        <AvForm autoComplete="off">
                            {component}
                        </AvForm>
                    </TabPane>
                </TabContent>    
            ))}
        </React.Fragment>
    }

    tabs = () => {
        throw new Error('Missing model tabs implementation');
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

    toggleTab = tab => {
        if (this.state._activeTab !== tab) {
          this.setState({ _activeTab: tab })
        }
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