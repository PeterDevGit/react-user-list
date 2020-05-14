import React, { Component } from "react"
import Modal from "../Modal/Modal"
import Form from "../FormPopUp/Form"
import http from "../service/httpService"
import UserListItem from "../UserListItem/UserListItem"

import './UserListContent.css'

class ListUser extends Component {

    state = {
        userId: null,
        showPopUp: false,
        typeContentModal: 'add'
    }

    responseCallBackFunction = (typeForm= 'success') => {
        this.setState({
            typeContentModal: typeForm
        })
    }

    /*Удаление пользователя*/
    deleteUserId = (delUserId) => {
       const { updatedUserList } = this.props

        http.request('/users/'+ delUserId, 'DELETE', null, {reassign: 1, force: true} )
            .then( () => {
                updatedUserList(delUserId, 'delete')
                this.setState({
                    userId: null,
                    typeContentModal: 'success-delete'
                })
            })
            .catch(error => console.error(error))
    }

    statusModal = (typeForm='add') => {
        this.setState({
            showPopUp: !this.state.showPopUp,
            typeContentModal: typeForm
        })
    }

    modalRender = () => {
        const { typeContentModal, userId} = this.state
        const { usersData } =this.props

        const userNameFind = usersData.find(item => item.id === userId)
        let name;

        if(userId && userNameFind){
            name = userNameFind.name_api
        }

        switch (typeContentModal) {
            case 'add': return(
                <div className="form-content">
                    <span className="title-form">Создание пользователя</span>
                    <Form responseCallBack={this.responseCallBackFunction} updatedUserList={this.props.updatedUserList}/>
                </div>
            )
            case 'edit': return (
                <div className="form-content">
                        <span className="title-form">Редактирование пользователя</span>
                        <Form responseCallBack={this.responseCallBackFunction} id={userId} updatedUserList={this.props.updatedUserList} />
                </div>
                )
            case 'delete': return (
                <div className="form-content">
                    <span className="title-form delete">Удалить пользователя? { name }</span>
                    <div className="btn-list">
                        <button
                            className="btn btn-danger"
                            onClick={() => this.deleteUserId(this.state.userId)}
                        >Yes</button>

                        <button className="btn btn-success" onClick={this.statusModal}>No</button>
                    </div>
                </div>
            )

            case 'success-added': return (<span className="success-span">Пользователь удачно создан</span>)
            case 'success-edit': return (<span className="success-span">Пользователь удачно отредактирован</span>)
            case 'success-delete': return (<span className="success-span">Пользователь удалён</span>)
        default: return ''
        }
    }

    callBackFunction = (id, typeForm) => {
        this.setState({
            userId:id,
            showPopUp:true,
            typeContentModal: typeForm
        })
    }

    render() {
        const { showPopUp } = this.state
        const { usersData } =this.props

        const users = usersData.map( (user) => {
        return <UserListItem key={user.id} user={user} callBack={this.callBackFunction} />
    })

    return(
        <React.Fragment>
            <span className="button-add-block">
                <button
                    className='btn btn-primary'
                    onClick={() => this.statusModal('add')}
                >Add User
                </button>
            </span>

            <table border="1">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Subname</th>
                    <th>Date of birthday</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Create user date</th>
                    <th>Update user date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                { users }
                </tbody>
            </table>

            {showPopUp &&
            <Modal close={ () => this.statusModal() }>
                { this.modalRender() }
            </Modal>
            }
        </React.Fragment>
    )
    }
}

export default ListUser