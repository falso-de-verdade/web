import React, { Component } from 'react';

import { Label } from 'reactstrap';
import { AvGroup } from 'availity-reactstrap-validation';
import CurrencyInput from 'react-currency-input';


class InputCurrencyCustom extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const styleInputVlr = {
            height: '40px',
            borderStyle: 'solid',
            borderColor: '#d9d9d9',
            borderRadius: '3px',
            borderWidth: '1px',
            textAlign: 'right',
            fontSize: 13,
            color: '#000',
            paddingRight: '10px',
            width: '100%'
        }

        const styleLabel = {
            fontSize: 11,
            borderWidth: '1px',
            color: '#000'
        }

        return (
            <div>
                <AvGroup>
                    <Label for="preco" style={styleLabel}>{this.props.descricao}</Label>
                    <CurrencyInput
                        prefix={this.props.prefix}
                        suffix={this.props.suffix}
                        type="text"
                        decimalSeparator=","
                        thousandSeparator="."
                        name={this.props.id}
                        id={this.props.id}
                        value={this.props.value}
                        onChangeEvent={this.props.onChangeEvent}
                        style={styleInputVlr}
                        disabled={this.props.disabledButtons}
                    />
                </AvGroup>
            </div>
        )
    }

}

export default InputCurrencyCustom;