import React from 'react'

const Profile = ({ user }) => (
    <>
        <img src={user.url} alt='profile' />
        <h1> Profile Info</h1>
        <h1> Name: {user.name}</h1>
        <h1> Email: {user.email}</h1>
    </>
)

export default Profile;