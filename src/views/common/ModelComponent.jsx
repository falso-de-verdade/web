import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { AvForm, AvField, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import { 
    Row, 
    Card, 
    Col, 
    TabPane, 
    TabContent, 
    CardBody, 
    Nav, 
    NavItem, 
    NavLink,
    Container,
    Label,
    FormGroup
} from "reactstrap";

import classnames from "classnames";

import Button from 'components/CustomButton/CustomButton.jsx';
import { TableComponent } from "components/Listing";
import { UserAuthContext } from "contexts";


const FORM_STATE = {
    IDDLE: 0,
    WAITING: 1,
    WROTE: 2,
    FETCHING_LINK: 3,
}

class MissingModelImplementation extends Error {
    constructor(model, methodName) {
        super(`${model.constructor.name} misses ` +
              `an implementation on method: ${methodName}`)
        this.name = "MissingModelImplementation";
    }
}

class ModelComponent extends Component {
    constructor(props) {
        super(props);
        
        this.originalData = props.modelData;
        this.isEditing = this.originalData !== undefined;
        
        // store registered forms
        this.forms = {}

        // which creation step 
        this.creatingStep = 0;

        // store the form indices which has errors
        this.formErrors = [];
        
        this.state = {
            _formState: FORM_STATE.IDDLE,
            _hasError: false,
            _formResponse: null,
            _itemLink: null,
            _activeTab: 0,
        }
    }

    render = () => {
        if (this.domain === undefined) {
            throw new Error(`Missing ${this.constructor.name} data domain attribute.`);
        }

        const state = this.state._formState;

        if (this.state._itemLink) {
            return <Redirect to={this.state._itemLink} />
        }

        if (this.state._formState != FORM_STATE.WROTE) {
            const isLoading = this.state._formState == FORM_STATE.WAITING;
            return (
                <div disabled={isLoading} className="content">
                    <Row>
                        <Col md={12}>
                            <Card>
                                {this.doRender(this.tabAndFields())}
                            </Card>
                        </Col>
                    </Row>
                    {this.buttonsComponent(this.disableFields())}
                </div>
            );
        }
        
        const nextLink = this.deduceNextLink();
        if (nextLink) {
            return <Redirect to={nextLink} />
        }
        
        // return useless data, required
        return (<div></div>)
    }

    mapData = values => {
        throw new MissingModelImplementation(this, "mapData");
    }

    tabAndFields = () => {
        throw new MissingModelImplementation(this, "tabAndFields");
    }

    onModelResponse = (response, formValues) => {
        //
    }

    disableFields = () => !this.context.isManager;

    doRender = settings => {
        // remove empty values
        settings = settings.filter(value => !!value);

        if (settings.length === 0) {
            throw new Error('Any tab component for model found.')
        }

        return <React.Fragment>
            <CardBody style={{ padding: '10px', fontSize: 12 }}>
                <Nav tabs>
                    {settings.map(({ name }, idx) => (
                        <NavItem
                            className={classnames({ active: this.state._activeTab === idx })}>
                            <NavLink 
                                disabled={idx > this.creatingStep && !this.isEditing} 
                                href="#" 
                                style={{ color: '#000' }}
                                onClick={() => { this.toggleTab(idx); }}>{name}</NavLink>
                        </NavItem>
                    ))}
                </Nav>
            </CardBody>
              
            {settings.map((tabData, idx) => (
                <TabContent activeTab={this.state._activeTab}>
                    <TabPane tabId={idx}>
                        {this.buildFormComponent(tabData, idx)}
                    </TabPane>
                </TabContent>
            ))}
        </React.Fragment>
    }

    lazyOnInvalidSubmit = formIndex => {
        return (event, errors, values) => {
            console.log(errors, values);
            this.maybePushFormError(formIndex);
        }
    }

    deduceNextLink = () => {
        if (this.isEditing) {
            return `../${this.listingResource()}`;
        }

        if (this.state._hasError) {
            return this.listingResource();
        }

        this.fetchItemLink();
    }

    fetchItemLink = () => {
        let _hasError = false;
        let _itemLink = null;

        this.retrieveCreatedItem(this.state._formResponse)
            .then(item => {
                _itemLink = this.domain.itemPath(item);
            })
            .catch(error => {
                _hasError = true;        
            })
            .then(() => {
                this.setState({ _formState: FORM_STATE.WROTE, 
                                _hasError,
                                _itemLink, });
            })
    }

    retrieveCreatedItem = async(item) => item

    mapModelData = () => this.originalData

    buildFormComponent = (tabData, idx) => {
        const children = () => {
            const parsedData = tabData.rows.filter(value => !!value);
            return parsedData.map((row, rowIdx) => (
                <Row key={rowIdx}>
                    {Object.keys(row).map(key => this.buildFieldComponent(key, row[key]))}
                </Row>
            ))
        } 
        
        // check wheter it is a virtual form
        const isVirtual = tabData.isVirtual === true; 

        // default form properties
        let formProps = {
            model: this.mapModelData(), 
            onValidSubmit: this.commonOnValidSubmit,
        }

        if (isVirtual) {
            const {
                name,
                onValidSubmit,
                getItems,
                headers,
                dataReducer,
                hideOperations,
            } = this.getVirtualProps(tabData);

            // change form behaviour
            formProps = { onValidSubmit }

            const operations = props =>
                <Button
                    bsStyle="danger"
                    bsSize="xs"
                    onClick={this.lazyStateRemove(name, props.item)}>
                    <span className="fa fa-times"></span>
                </Button>

            const table = {
                as: TableComponent,
                items: getItems(),
                OperationsComponent: hideOperations || operations,
                headers,
                dataReducer,
                col: {
                    md: 8
                },
            }

            // insert table rows
            tabData.rows.push({ table });
        }

        return (
            <Container fluid={true}>
                <AvForm 
                    ref={ref => this.forms[idx] = ref}
                    onInvalidSubmit={this.lazyOnInvalidSubmit(idx)}
                    {...formProps}>  
                    {children()}
                </AvForm>
            </Container>
        )
    }

    getVirtualProps = tabData => {
        const {
            provides,
            mapValues,
            headers,
            dataReducer,
            hideOperations,
        } = tabData;

        // name used to identify array on state
        const name = `_tmp${provides}`;

        const getState = () => {
            // get a state, or create one if missing
            const state = this.state[name];
            if (state === undefined) {
                return []
            }

            return state;
        }

        // built-in submit handler
        const onValidSubmit = (event, values) => {
            // transform raw values into actual data
            const data = mapValues(values);

            // retrieve a valid virtual state
            let state = getState();

            // append data into state and update it
            if (data.constructor == Array) {
                state = state.concat(data);
            } else {
                state.push(data);
            }

            this.setState({ [name]: state })
        }

        const getValues = () => {
            // maybe get data from props
            let original = []
            if (this.originalData && this.originalData[provides]) {
                original = this.originalData[provides];
            }  
            
            // merge original data with virtual one
            return {
                [provides]: original.concat(getState())
            }
        }

        const getItems = () => {
            return getValues()[provides]
        }

        const validateForm = () => tabData.validate(getItems())

        return {
            provides,
            mapValues,
            getState,
            onValidSubmit,
            getValues,
            getItems,
            validateForm,
            name,
            headers,
            dataReducer,
            hideOperations,
        }
    }

    lazyStateRemove = (key, item) => {
        return () => {
          try {
            const newState = this.state[key].filter(v => v != item);
            this.setState({ [key]: newState })
          } catch (error) {
            console.log(error)
          }
        }
      }

    buildFieldComponent = (name, fieldProps) => {
        // return raw component
        if (React.isValidElement(fieldProps)) {
            return fieldProps;
        }

        // fallback to AvField component
        if (fieldProps.as === undefined) {
            fieldProps = {
                ...fieldProps,
                as: AvField,
            }
        }

        return (
            <Col key={name} xs={6} sm={4} {...fieldProps.col}>
                <AvGroup>
                    {fieldProps.label && 
                        <Label for={name}>{fieldProps.label}</Label>
                    }
                    <fieldProps.as
                        required
                        name={name}
                        id={name}
                        readOnly={this.disableFields()}
                        {...fieldProps}
                        label={null}
                        />
                    {fieldProps.feedback && (
                        <AvFeedback>
                            {fieldProps.feedback}
                        </AvFeedback>
                    )}
                </AvGroup>
            </Col>
        )
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

    raiseForMissingMethod = methodName => {
        throw new Error('Missing model tabs implementation');
    }

    buildSubmitConfig = data => {
        if (this.isEditing) {
            const model = this.mapModelData();
            return {
                data: {
                    _id: model._id,
                    _etag: model._etag,
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

    isCreationDone = () => this.creatingStep == this.tabAndFields().length - 1

    deduceButtonText = () => {
        if (this.isEditing) {
            return 'Salvar';
        }

        if (this.isCreationDone()) {
            return 'Criar';
        }

        return 'Próximo'
    }

    buttonsComponent = hideSaveButton => 
        <FormGroup>
            <Link to={this.cancelLink()}>
                <Button fill pullRight bsStyle="danger" >
                    Cancelar
                </Button>
            </Link>
            
            {!hideSaveButton && 
                <Button fill bsStyle="success" onClick={this.maybeSubmit}>
                    {this.deduceButtonText()}
                </Button>
            }
        </FormGroup>

    maybeToggleTabToError = () => {
        if (this.formErrors.length != 0) {
            // switch the first form with error
            const formErrIdx = this.formErrors[0];
            
            // convert to integer before changing tab
            this.toggleTab(parseInt(formErrIdx));
            return true;
        }
    }

    commonOnValidSubmit = async() => {
        const formIndex = this.state._activeTab;

        // remove stale form errors
        this.formErrors = this.formErrors.filter(idx => idx != formIndex)

        // stop if there are errors on other forms
        if (this.maybeToggleTabToError()) {
            return;
        }

        // can we actually submit
        if (this.isEditing || this.isCreationDone()) {
            // find any invalid form and register it
            await this.mapInvalidForms(formIndex);

            // stop if we got some error somewhere
            if (this.maybeToggleTabToError()) {
                return;
            }

            return this.onFormSubmit();
        }

        this.creatingStep += 1;
        this.toggleTab(this.creatingStep);
    }

    mapInvalidForms = async(excludeFormIdx) => {
        const tabSettings = this.tabAndFields();

        const isVirtualFormValid = tabData => {
            const { validateForm } = this.getVirtualProps(tabData);
            return validateForm();
        }

        const isFormValid = async(form) => {
            // see https://github.com/Availity/availity-reactstrap-validation/blob/1e385cf8ab869ae3992caec6fbfcdc44da41f6b3/src/AvForm.js#L99
            const { isValid } = await form.validateAll(form.getValues(), false);
            return isValid;
        }

        const isValid = async(form, idx) => {
            // grab current tab data
            const tabData = tabSettings[idx];

            if (tabData.isVirtual === true) {
                return isVirtualFormValid(tabData);
            }

            return await isFormValid(form);
        }

        // ensure every form is free of errors
        await this.forEachForm(async(form, idx) => {
            // skip this form index
            if (idx == excludeFormIdx) {
                return;
            }

            // check whether it is valid
            const isFormValid = await isValid(form, idx);

            isFormValid || this.maybePushFormError(idx);
        });
    }

    currentTabData = () => this.tabAndFields()[this.state._activeTab];

    maybePushFormError = formIdx => 
        this.formErrors.includes(formIdx) || this.formErrors.push(formIdx)

    maybeSubmit = async() => {
        const tabData = this.currentTabData();

        // custom way to validate a form
        if (tabData.isVirtual === true) {
            const { validateForm } = this.getVirtualProps(tabData);

            // is virtual form validated
            if (validateForm()) {
                await this.commonOnValidSubmit();
            } else {
                // fake an form validation error
                const formIndex = this.state._activeTab;
                this.maybePushFormError(formIndex);
            }
        } else {
            // gather form reference
            const currentForm = this.currentForm();
            
            // wait until it is submitted
            await currentForm.submit();
        }
    }

    currentForm = () => this.forms[this.state._activeTab]

    dispatchModelRedirect = () => {
        this.setState({ _formState: FORM_STATE.WROTE })
    }

    forEachForm = async(callback) => {
        // workaround to use an async forEach

        const keys = Object.keys(this.forms);
        const keysLen = keys.length;

        for (let index = 0; index < keysLen; index++) {
            const key = keys[index];
            const form = this.forms[key];
            form && await callback(form, key);
        }
    }

    getFormValues = async() => {
        let values = {}

        const update = newValues => {
            values = {
                ...values,
                ...newValues,
            }
        }

        await this.forEachForm(form => update(form.getValues()));

        const settings = this.tabAndFields();
        settings.forEach(tabData => {
            if (tabData.isVirtual === true) {
                const { getValues } = this.getVirtualProps(tabData);
                update(getValues());
            }
        })

        return values;
    }

    onFormSubmit = async() => {
        // extract form data
        const values = await this.getFormValues();

        let _formResponse = null;
        let _hasError = false;

        const { handler, data } = this.buildSubmitConfig(this.mapData(values));
    
        handler(data).then(model => {
            _formResponse = model;
        }).catch(error => {
            _hasError = true;
        }).then(() => {
            // maybe got a new state
            let stateOverride = this.onModelResponse(_formResponse, values);

            // whether should jump to next link
            const shouldRedirect = _hasError || !stateOverride;
            
            let newState = {
                _hasError,
                _formResponse,
            }

            if (shouldRedirect) {
                newState = {
                    ...newState,
                    _formState: FORM_STATE.WROTE,
                }
            } else {
                newState = {
                    ...newState,
                    ...stateOverride,
                }
            }

            this.setState(newState)
        });

        this.setState({ _formState: FORM_STATE.WAITING });
    }
}

ModelComponent.contextType = UserAuthContext;

export default ModelComponent;