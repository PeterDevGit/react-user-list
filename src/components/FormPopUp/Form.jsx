import React, {Component} from 'react'
import Loader from "../Loader/Loader"
import DatePicker from "react-datepicker"
import http from "../service/httpService"
import InputItem from "../InputItem/InputItem"
import { generate_password, nowDateFormat, cyr_to_latin } from "../utils/functions";

import './Form.css'
import "react-datepicker/dist/react-datepicker.css"

export default class Form extends Component{

    state = {
        loading: true,
        input_name: '',
        input_subname: '',
        input_date_birthday: new Date(),
        input_phone: '',
        input_email: '',
        password: '',
        user_create_api: '',
        user_update_api: '',
        errorField: {}
    }

    static defaultProps = {
        id: null
    }

    dateChange = (date) => {
        this.setState({
            input_date_birthday: date
        })
    }

    changeInput = (event) => {
        const value = event.target.value
        const fieldName = event.target.name

        this.setState({
            [fieldName]: value
        })
    }

    componentDidMount() {
        const { id } = this.props;

        if(id){
            http.request('/users/'+ id, 'GET' )
                .then( (user) => {
                    console.log(user)
                    this.setState({
                        input_name: user.name_api,
                        input_subname: user.subname_api,
                        input_date_birthday: new Date(user.dateOfBirthday_api.split('.').reverse().join('-')),
                        input_phone: user.phone_api,
                        input_email: user.email_api,
                        loading:false
                    })
                })
                .catch(error => console.error(error));
        }
    }

    /*todo Валидация формы*/
    validateEmptyField = () => {
        const { input_name, input_subname, input_phone, input_email } = this.state
        const errorTextField = 'Заполните пожалуйста поле'
        let errorAll = {};

        if(input_name === ''){
            errorAll.input_name = errorTextField;
        }

        if(input_subname === ''){
            errorAll.input_subname = errorTextField;
        }

        if(input_phone === ''){
            errorAll.input_phone = errorTextField;
        }

        if(input_email === ''){
            errorAll.input_email = errorTextField;
        }

        this.setState({
            errorField: errorAll
        })

        if(JSON.stringify(errorAll).length > 2){
            return false
        }else{
            return true
        }
    }

    /*todo Отправка формы*/
    submitForm = (event) => {
        event.preventDefault()

        const {input_name, input_subname, input_date_birthday, input_phone, input_email} = this.state
        const { responseCallBack, id, updatedUserList } = this.props

        const input_date_birthday_format = nowDateFormat(input_date_birthday)
        const user_create_api = nowDateFormat(new Date())
        const passwordValue = generate_password(10)

        if(this.validateEmptyField()){
            /*todo редактирование пользователя*/
            let userBody = {
                name_api: input_name,
                subname_api: input_subname,
                phone_api: input_phone,
                dateOfBirthday_api: input_date_birthday_format,
                email_api: input_email,
                update_api: user_create_api
            }

            if(id){
                http.request('/users/' + id, 'PUT',null, userBody, false)
                    .then( (response) => {
                        updatedUserList(response, 'edit')
                        responseCallBack('success-edit')
                    })
                    .catch(error => console.error(error));
            }else{

                /*todo создание пользователя*/
                userBody.username = cyr_to_latin(input_name);
                userBody.name = input_name
                userBody.last_name = input_subname
                userBody.email = input_email
                userBody.create_api = user_create_api
                userBody.update_api = user_create_api
                userBody.password = passwordValue

                http.request('/users', 'POST',null, userBody, false)
                    .then( (response) => {
                        updatedUserList(response,'add')
                        responseCallBack('success-added')
                    })
                    .catch(error => console.error(error));
            }
        }
    }

    render() {
        const { input_name, input_subname, input_phone, input_email, errorField, loading } = this.state
        const { id } = this.props

        return(
            <React.Fragment>
                {id && loading && <Loader />}
                <form onSubmit={ this.submitForm } >
                    <InputItem
                        value={input_name}
                        name="input_name"
                        type="text"
                        label="Name"
                        validation={{
                            type: 'text',
                            minLength: 3,
                            maxLength: 60
                        }}
                        errorField={errorField.input_name && errorField.input_name}
                        onChanged={ inputName => this.changeInput(inputName) }
                    />

                    <InputItem
                        value={input_subname}
                        name="input_subname"
                        type="text"
                        label="Subname"
                        validation= {{
                            type: "text",
                            minLength: 3,
                            maxLength: 60
                        }}
                        errorField={errorField.input_subname && errorField.input_subname}
                        onChanged={ inputName => this.changeInput(inputName) }
                    />

                    <label htmlFor="input_date_birthday">Date of birthday</label>
                    <DatePicker
                        selected={this.state.input_date_birthday}
                        onChange={this.dateChange}
                        dateFormat="dd.MM.yyyy"
                    />

                    <InputItem
                        value={input_phone}
                        name="input_phone"
                        type="phone"
                        label="Phone"
                        validation= {{
                            type: 'phone'
                            }
                        }
                        errorField={errorField.input_phone && errorField.input_phone}
                        onChanged={ inputName => this.changeInput(inputName) }
                    />

                    <InputItem
                        value={input_email}
                        name="input_email"
                        type="email"
                        label="Email"
                        validation= {{
                            type: 'email'
                        }}
                        errorField={errorField.input_email && errorField.input_email}
                        onChanged={ inputName => this.changeInput(inputName) }
                    />

                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={ this.submitForm }
                    >Отправить</button>
                </form>
            </React.Fragment>
        )
    }
}