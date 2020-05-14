import React from 'react'
import './UserListItem.css'

const UserListItem = ({user, callBack}) =>  {
        return(
            <tr>
                <td>{ user.name_api}</td>
                <td>{ user.subname_api}</td>
                <td>{ user.dateOfBirthday_api}</td>
                <td>{ user.phone_api}</td>
                <td>{ user.email_api}</td>
                <td>{ user.create_api}</td>
                <td>{ user.update_api}</td>
                <td><button className="btn btn-primary" onClick={() => callBack(user.id, 'edit')}>Edit</button></td>
                <td><button className="btn btn-warning" onClick={() => callBack(user.id, 'delete')}>Delete</button></td>
            </tr>
        )
}

export default UserListItem