import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../../assets/css/zeplin.css';
import AppBar from '../../components/molecules/AegisAppBar';
import SideBar from '../../components/molecules/SideBar';
import DashBoard from '../DashBoard';
import { useSelector, useDispatch } from "react-redux";
import CardManagement from '../CardManagement';
import AddCardToList from '../AddCardToList';
import UserManagement from '../UserManagement';
import ExtendOrRemoveUser from '../ExtendOrRemoveUser';
import { getAllCards } from '../../services/CardMgmtService';
const useStyles = makeStyles(theme => ({
  orientation: {
    display: 'flex',
    height: '935px',
    marginTop: '3%'
  },
}));

const Skeleton = (props) => {
  const [value, setValue] = React.useState(1);
  const dispatch = useDispatch();
  let profile = useSelector(state => state.AuthReducer.profile);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const retrieveCardsInfo=async ()=>{
  //   const cards=await getAllCards()
  //   dispatch({type:'ADD_CARDS',payload:cards})
  // }

  // useEffect(()=>{
  //   retrieveCardsInfo()
  // },[])
  const mapper = new Map([
    [1, <DashBoard value={value} setValue={setValue} />],
    [2, <div> <UserManagement /></div>],
    [3, <div><CardManagement value={value} setValue={setValue} /></div>],
    [4, <div><AddCardToList /></div>],
    [5, <div><ExtendOrRemoveUser /></div>],
  ]);

  return (
    <div>
      <AppBar src={profile.picture} username={profile.given_name} />
      <div className={classes.orientation}>
        <SideBar value={value} handleChange={handleChange} />
        <div className="container">
          <div className="base">
            {/* Skeleton input */}
            {mapper.get(value)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;