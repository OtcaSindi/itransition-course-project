import React, {useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom"

import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {AuthContext} from "../context/AuthContext"


const AuthPage = () => {
    const authorization = useContext(AuthContext)
    const message = useMessage()

    const {error, clearError, request} = useHttp()

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        return () => clearError()
    }, [error, message, clearError])

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        setLoading(true)
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            authorization.login(data.token, data.userId)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="center">Welcome</h1>
                <div className="card blue darken-1">
                    <div
                        className="card-content white-text auth"
                    >
                        <span className="card-title center">Authorization</span>
                        <div>

                            <div className="input-field">
                                <input id="email"
                                       type="text"
                                       name="email"
                                       className="validate yellow-input"
                                       value={form.email}
                                       onChange={changeHandler}
                                />
                                <label htmlFor="email">Enter email</label>
                            </div>

                            <div className="input-field">
                                <input id="password"
                                       type="password"
                                       name="password"
                                       className="validate yellow-input"
                                       value={form.password}
                                       onChange={changeHandler}
                                />
                                <label htmlFor="password">Enter password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action center">
                        <div>
                            <span>
                                Don't have an account? <Link className="link-auth" to="/register">Sign Up</Link>
                            </span>
                        </div>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
