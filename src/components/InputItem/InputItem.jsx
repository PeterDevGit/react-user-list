import React from 'react'
import validate from '../utils/validation'

import './InputItem.css'

class InputItem extends React.Component {

    state = {
            errorText: null
        }

    static defaultProps = {
        errorField: ''
    }

    componentDidUpdate(prevProp) {
        const { errorField } = this.props;
        if( errorField !== prevProp.errorField){
            this.setState({
                errorText: errorField
            })
        }
    }

    onChangedValue = (e) => {
        const { validation, onChanged} = this.props;
        const result = validate(validation, e.target.value)
        onChanged(e)
        this.setState({
            errorText: result
        })
    }

    render(){
        const {errorText} = this.state;
        const {value, name, type, label} = this.props;

        return(
            <span key={name}>
            <label htmlFor={label}>
                {label}
            </label>

            <input
                className={errorText && 'error'}
                name={name}
                type={type}
                value={value}
                onChange={ (e) => this.onChangedValue(e) }
            />
            <span className="error-message">{errorText}</span>
        </span>
        )
    }
}

export default InputItem