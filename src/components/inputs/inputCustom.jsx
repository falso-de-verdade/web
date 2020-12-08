import React, { Component } from 'react';

import { Label } from 'reactstrap';
import { AvField, AvGroup } from 'availity-reactstrap-validation';


class InputCustom extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const styleInput = {
            fontSize: 12,
            height: '38px',
            borderWidth: '1px',
            color: '#000'
        }        
    
        const styleLabel = {
            fontSize: 11,
            borderWidth: '1px',
            color: '#000'
        }

        return(
            <div>
                <AvGroup>
                    <Label for={this.props.id} style={styleLabel}>{this.props.descricao}</Label>
                    <AvField
                        style={styleInput}
                        name={this.props.id} 
                        disabled={this.props.disabledButtons}
                        {...this.props}/>
                </AvGroup>
            </div>
        )
    }

}

export default InputCustom;