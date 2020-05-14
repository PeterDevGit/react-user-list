import React, {Component} from 'react'
import './Modal.css'

export default class InputForm extends Component {
    render() {
        const { close } = this.props;
        return(
            <div className="wrapper-pop-up">
                <div className="add-edit-popup">
                    <div className="user-add-edit-form">
                        {this.props.children}
                    </div>
                    <span
                        className="close-pop-up"
                        onClick={() => close()}
                    >X</span>
                </div>
                <div
                    className="bg-full-popup"
                    onClick={() => close()}
                > </div>
            </div>
        ) //return
    } //render
} // class