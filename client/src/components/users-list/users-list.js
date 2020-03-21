import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

import {BLOCKED, NOT_BLOCKED, ADMIN, USER} from "../../constants"
import {editUserCheckbox, editUserAllCheckbox} from "../../actionsCreator"
import {Link} from "react-router-dom"


const UsersList = ({users}) => {
    const [select, setSelect] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setSelect(users.length === users.filter((user) => user.checked === true).length)
    }, [users])

    const checkHandler = (id) => () => {
        dispatch(editUserCheckbox(id))
    }

    const checkAllHandler = () => {
        dispatch(editUserAllCheckbox())
        setSelect(sel => !sel)
    }

    const dateFormat = (dateNow) => {
        console.log(dateNow, typeof dateNow)
        if (dateNow) {
            let usaTime = new Date(dateNow).toLocaleString("en-US", {timeZone: "Europe/Minsk"})
            usaTime = new Date(usaTime)
            return usaTime.toLocaleString()
        }
        return dateNow
    }

    return (
        <table>
            <thead>
            <tr>
                <th className="main-checkbox">
                    <label>
                        <input
                            type="checkbox"
                            className="filled-in checkbox-blue-grey"
                            checked={select}
                            onChange={checkAllHandler}/>
                        <span/>
                    </label>
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>email</th>
                <th>Status</th>
                <th>Rank</th>
            </tr>
            </thead>

            <tbody>
            {users.map(({id, name, email, blocked, isAdmin, checked}) => {
                return (
                    <tr key={id}>
                        <td className="checkbox-table-row">
                            <label>
                                <input
                                    type="checkbox"
                                    className="filled-in checkbox-blue-grey"
                                    checked={checked}
                                    onChange={checkHandler(id)}/>
                                <span/>
                            </label>
                        </td>
                        <td><Link to={`collections/${id}`}>{id}</Link></td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{blocked ? BLOCKED : NOT_BLOCKED}</td>
                        <td>{isAdmin ? ADMIN : USER}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default UsersList
