
import {LOGIN_INFO} from '../../actions/actionTypes';
const initialState={
    isLogged:false,
    profile:null,
 
}


export default (state=initialState,action)=>{
    switch(action.type){
        case LOGIN_INFO:return action.payload
        
    }
    return initialState;
}