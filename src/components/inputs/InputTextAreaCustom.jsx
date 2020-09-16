import React, { Component } from 'react';

import { Label } from 'reactstrap';
import { AvField, AvGroup } from 'availity-reactstrap-validation';


class InputTextAreaCustom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const style = {
            fontSize: 12,
            height: '38px',
            borderWidth: '1px',
            color: '#000',
            resize: 'none',
            width: 1035,
            height: 350
        }

        const styleLabel = {
            fontSize: 11,
            borderWidth: '1px',
            color: '#000'
        }

        return (
            <div>
                <AvGroup>
                    <Label for={this.props.id} style={styleLabel}>{this.props.descricao}</Label>
                    <AvField
                        style={this.props.style}
                        type="textarea"
                        style={style}
                        name={this.props.id}
                        id={this.props.id}
                        disabled={this.props.disabledButtons}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        rows={this.props.rows}
                    />
                </AvGroup>
            </div>
        )
    }

}

export default InputTextAreaCustom;