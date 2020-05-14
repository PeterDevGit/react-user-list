import React, {Component} from 'react'
import Loader from "../Loader/Loader";
import ListUser from '../UserListContent/UserListContent'
import http from "../service/httpService"
import Pagination from "../Pagination/Pagination"

import './UserList.css'
import Dropdown from "../Dropdown/Dropdown";

class UserList extends Component {
    state = {
            usersData: [],
            loading: true,
            perPage: 5,
            totalUsers: null,
        }

    setUsers = (per_page, page) => {
        http.request('/users', 'GET', {per_page, page}, false, true)
            .then( response => {
                Promise.resolve(response.users).then(item => {
                    this.setState({
                        usersData: item,
                        loading: false,
                        totalUsers: response.wpTotal
                    })
                })
            }).catch(error => console.error(error));
    }

    componentDidMount() {
        this.setUsers(this.state.perPage, 1)
    }

    updatedUserListFunction = (user, responseType) => {
        const oldUsers = this.state.usersData.concat();
        let updatedUsers = []

        if(responseType === 'add'){
            updatedUsers = [...oldUsers, user]
        }
        if(responseType === 'edit'){
            updatedUsers = oldUsers.map(item => item.id === user.id ? user : item)
        }

        if(responseType === 'delete'){
            updatedUsers = oldUsers.filter(item => item.id !== user)
        }

        this.setState({
            usersData: updatedUsers
        })
    }

    pageNumberFunction = (activePage) => {
        this.setUsers(this.state.perPage, activePage)
    }

    selectedValueFunction= (value) =>{
        this.setUsers(value, 1)
        this.setState({
            perPage:value
        })
    }

    render() {
        const { loading, usersData, totalUsers, perPage } = this.state
        const countPages = Math.ceil(totalUsers / perPage)
        const defaultValue = 5
        const options = [
            {
                name: 5,
                value: 5
            },
            {
                name: 10,
                value: 10
            }
        ]

        return (
            <div className="all-page-wrapper">
                <div className="main-content">
                    { loading && <Loader /> }

                    { !loading &&
                    <React.Fragment>
                        <Dropdown selectedValue={this.selectedValueFunction} options={options} defaultValue={defaultValue}/>
                        <ListUser usersData={ usersData } updatedUserList={this.updatedUserListFunction} />
                        <Pagination countPages={countPages} pageNumber={this.pageNumberFunction} />
                    </React.Fragment> }

                </div>
            </div>
        )
    }
}

export default UserList