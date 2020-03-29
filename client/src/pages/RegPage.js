import React, {useEffect, useState} from "react"
import {useHttp} from "../hooks/use-http"
import {useMessage} from "../hooks/use-message"
import {Link, useHistory} from "react-router-dom"

const RegPage = () => {
    const message = useMessage()
    const history = useHistory()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        name: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        return () => clearError()
    }, [error, message, clearError])

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            if (data.message === 'User created.') {
                history.push('/auth')
            }
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="center">Welcome</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title center">Create your account</span>
                        <div>

                            <div className="input-field">
                                <input id="name"
                                       type="text"
                                       name="name"
                                       className="validate yellow-input"
                                       value={form.name}
                                       onChange={changeHandler}
                                />
                                <label htmlFor="name">Enter name</label>
                            </div>

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
                                Have an account? <Link to="/" className="link-auth">Log in now </Link>
                            </span>
                        </div>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            SIGN UP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegPage
