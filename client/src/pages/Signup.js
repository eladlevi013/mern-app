import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

function Signup() {
    const [signupData, setSignupData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const { firstName, lastName, email, password } = signupData;

    const onChange = (e) => {
        setSignupData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        // Todo: Add signup logic
    }

    return (
        <div>
            <section className="heading">
                <h1><FaUser /> Welcome to signup page</h1>
            </section>

            <section className="form" onSubmit={onSubmit}>
                <form>
                <div className="form-group">
                    <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-info">Submit</button>
                </div>
                </form>
            </section>
        </div>
    )
}

export default Signup;