import React from 'react'
import {Redirect } from 'react-router'
import PageLayout from './components/PageLayout';
const Dashboard = (props) => {
    if(!localStorage.getItem('token')) {
       return <Redirect to="/"/>
    }
    return <PageLayout/>
}

export default Dashboard;