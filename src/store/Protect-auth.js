import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Protect_auth = (props) => {
    const navigation = useNavigate()
    const { Component } = props
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedExpirationDate = localStorage.getItem('expirationTime');
        const storedUserId = localStorage.getItem('userId');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userRole = localStorage.getItem('userRole');
        if (!storedToken || !storedExpirationDate || !storedUserId) {

            navigation('/adminlogin')

        } else {
            if (isLoggedIn === false) {
                navigation('/adminlogin')
            } else {
                if (userRole && userRole !== "recruiter" && userRole !== "company") {
                    navigation('/adminlogin')
                }

            }
        }
    }, [])

    return (
        <div>

            <Component />
        </div>
    )
}

export default Protect_auth