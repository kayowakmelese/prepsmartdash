import { Badge,Avatar, Alert, Snackbar } from '@mui/material'
import * as React from 'react'
import {colors,styles} from '../styles/index'
import Typography from '@mui/material/Typography';
import {Routes,Link,HashRouter as Router,Route,useMatch,useNavigate} from 'react-router-dom'
import DashBoardTab from './DashboardComponent/Dashboard';
import UserScreen from './DashboardComponent/UserTabs/UsersScreen';
import MemberShip from './DashboardComponent/Dashboard/MembershipScreen';
import TeamScreen from './DashboardComponent/TeamTabs/TeamScreen';
import SettingScreen from './DashboardComponent/SettingsTab/SettingScreen';
import NotificationsScreen from './DashboardComponent/NotificationTab/NotificationsScreen'
import { checkSigned, checkSignedFromReducer } from '../functions/checkSigned'
import { connect } from 'react-redux';

const DashboardScreen=(params)=>{ 
    const [path,setPath]=React.useState(null) 
    const [showAlert,setShowAlert]=React.useState(false);
    const [active,setActive]=React.useState(2);
      let history = useNavigate();

    React.useEffect(()=>{
        // console.log(useMatch)
    },[])
    React.useEffect(()=>{
        if(checkSigned() || checkSignedFromReducer(params.udata)){
            // window.location.href="/home"

        }else{
            // window.location.href="/"
            history("/")
        }
    },[])
    React.useEffect(()=>{
        setTimeout(()=>{
            if(params.success || params.error){
                setShowAlert(true);
            }else{
                setShowAlert(false);
            }
            setTimeout(()=>setShowAlert(false),3000);
        },500)
      
    },[params.success,params.error])
    return <div>
     <Snackbar  anchorOrigin={{ vertical: 'top',horizontal: 'right'}} open={showAlert}  autoHideDuration={6000}>
         {params.success? <Alert  color={'success'}>{params.success.message}</Alert>:
         <Alert  severity='error'>{params.error}</Alert>
         }  
       </Snackbar>
        <div style={{height:40,backgroundColor:'white',justifyContent:'space-between',position:'fixed',top:0,zIndex:5}} className='f-flex padding w-f'>
           <Typography variant="h5" component="div" style={{alignSelf:'center',color:colors.primary10}}>
           <b>Ripe Wipe</b>
           </Typography>
           
            <div className='f-flex' style={{alignContent:'center',alignSelf:'center'}}>
            <div style={{alignSelf:'center'}} className='padding'>
            <Badge badgeContent={4} color="primary">
            <img src={`${process.env.PUBLIC_URL}/icons/bell.svg`} alt='icon' height={20} width={20}/>
            </Badge>
            </div>
            <div className="padding">
            <Avatar src={`${process.env.PUBLIC_URL}/avatar.jpg`}/>
            </div>
            
                
            </div>
        </div>
        <div className='f-flex'>
        <div className='w-20 white b-s' style={{position:'fixed',left:0,height:'100%',paddingTop:100}}>
            <Link to={`dashboard`} onClick={()=>setActive(1)}>
            <div className="padding f-flex" style={{backgroundColor:active===1?colors.primary1:null}}>
                <img src={`${process.env.PUBLIC_URL}/icons/${active===1?'homeActive':'home'}.svg`} height={20} width={20} style={{marginRight:10}}/>
                <Typography variant='p' color={'primary'} style={styles.navbarText}>
                    Dashboard
                </Typography>
            </div>
            </Link>
            <Link to={'user'} onClick={()=>setActive(2)} >
                        <div className="padding f-flex" style={{backgroundColor:active===2?colors.primary1:null}} >
                <img src={`${process.env.PUBLIC_URL}/icons/${active===2?'../icons/persona.svg':'../icons/person.svg'}`} height={20} width={20} style={{marginRight:10}}/>
                <Typography variant='p' color={'primary'} style={styles.navbarText}>
                    Users
                </Typography>
            </div>
            </Link>
            <Link to={'team'} onClick={()=>setActive(3)}>
            <div className="padding f-flex" style={{backgroundColor:active===3?colors.primary1:null}} >
                <img src={`${process.env.PUBLIC_URL}/icons/${active===3?'teamActive':'team'}.svg`} height={20} width={20} style={{marginRight:10}}/>
                <Typography variant='p' color={'primary'} style={styles.navbarText}>
                    Team
                </Typography>
            </div>
            </Link>
            <Link to={'settings'} onClick={()=>setActive(4)}>
            <div className="padding f-flex" style={{backgroundColor:active===4?colors.primary1:null}} >
                <img src={`${process.env.PUBLIC_URL}/icons/${active===4?'settingSelected.svg':'settings.svg'}`} height={20} width={20} style={{marginRight:10}}/>
                <Typography variant='p' color={'primary'} style={styles.navbarText}>
                    Settings
                </Typography>
            </div>
            </Link>
            <Link to={'notifications'} onClick={()=>setActive(5)}>
            <div className="padding f-flex" style={{backgroundColor:active===5?colors.primary1:null}} >
                <img src={active===5?`${process.env.PUBLIC_URL}/icons/notificationActive.svg`:`${process.env.PUBLIC_URL}/icons/notification.svg`} height={20} width={20} style={{marginRight:10}}/>
                <Typography variant='p' color={'primary'} style={styles.navbarText}>
                    Notification
                </Typography>
            </div>
            </Link>
        </div>
        <div className='padding w-f' style={{marginTop:70,paddingLeft:'21%',backgroundColor:'white'}}>
            <Routes>
                <Route path={`dashboard`} element={<DashBoardTab/>}/>
                <Route path={`user`} element={<UserScreen/>}/>
                <Route path={'membership'} element={<MemberShip/>}/>
                <Route path={'team'} element={<TeamScreen/>}/>
                <Route path={'settings'} element={<SettingScreen/>}/>
                <Route path={'notifications'} element={<NotificationsScreen/>}/>
            </Routes>
            </div>
        </div>
       
    </div>

}
const mapStateToProps=(state)=>{
    return {
        isLoading:state.sendDataReducer.isLoading,
        success:state.sendDataReducer.success,
        error:state.sendDataReducer.error,
    }
}
const mapDispatchTopProps=(dispatch)=>{
    return {

    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(DashboardScreen)
const Dash=()=>{
    return <h1>this is dashboard</h1>
}

