import React, { useEffect } from 'react';
import { getProfileInfo } from '../../services/AuthService';
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import zemoso from '../../assets/images/zemoso_logo.png';
import { LOGIN_INFO } from '../../actions/actionTypes';
const Loading = () => {
    const [profile, setProfile] = React.useState({});
    const dispatch = useDispatch()
    let isLog = useSelector(state => state.AuthReducer);
    useEffect(() => {
        getProfileInfo(setProfile)
    }, [])

    useEffect(() => {
        if ('name' in profile) {
            dispatch({ type: LOGIN_INFO, payload: { isLogged: true, profile: profile } })
        }
    }, [profile])

    return (
        <div>
            <LoadingScreen
                loading={true}
                bgColor='#ffffff'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                logoSrc={zemoso}
                text='Loading'></LoadingScreen>
            {isLog.isLogged ? <Redirect to="/dashboard" /> : "Loading"}
        </div>)
}

export default Loading;