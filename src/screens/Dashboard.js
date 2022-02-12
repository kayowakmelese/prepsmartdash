import { Badge,Avatar, Alert, Snackbar } from '@mui/material'
import * as React from 'react'
import {colors,styles} from '../styles/index'
import {Routes,Link,HashRouter as Router,Route,useMatch,useNavigate} from 'react-router-dom'
import DashBoardTab from './DashboardComponent/Dashboard';
import UserScreen from './DashboardComponent/UserTabs/UsersScreen';
import MemberShip from './DashboardComponent/Dashboard/MembershipScreen';
import TeamScreen from './DashboardComponent/TeamTabs/TeamScreen';
import SettingScreen from './DashboardComponent/SettingsTab/SettingScreen';
import NotificationsScreen from './DashboardComponent/NotificationTab/NotificationsScreen'
import { checkSigned, checkSignedFromReducer } from '../functions/checkSigned'
import { connect } from 'react-redux';
import { addBatchSecurityQuestion, addBatchSexType,createAdmin, addSecurityQuestions,generateCodes,editSecurityQuestion, addSexType, setDataReducer, editSexType,setModalReducer,deleteSexType,deleteSecurityQuestion } from '../action';
import { CircularProgress } from '@mui/material';
import { Box, Button, InputAdornment, Modal, Tab, Tabs, TextField,IconButton,Typography} from '@material-ui/core';
import DeleteScreen from '../components/deletecomponent'

import { AccessAlarm, PeopleOutlined,PersonOutlined,MailOutlined,FavoriteBorderOutlined,GppGoodOutlined,SentimentSatisfiedOutlined,ChatOutlined } from '@mui/icons-material';
import GenerateCodes from './DashboardComponent/SettingsTab/GenerateCodes'
import SecurityQuestionScreen from './DashboardComponent/SettingsTab/SecurityQuestions'
import SexTypeScreen from './DashboardComponent/SettingsTab/SexTypeTab'
import AdminScreen from './DashboardComponent/Admins/AdminScreen'
import MessageScreen from './DashboardComponent/messages/index'

const DashboardScreen=(params)=>{ 
    const [path,setPath]=React.useState(null) 
    const [showAlert,setShowAlert]=React.useState(false);
    const [active,setActive]=React.useState(2);
    const [tabvalue,setTabValue]=React.useState(1)
    const [modal,setModal]=React.useState(false)
    const [modalScreen,setModalScreen]=React.useState(4)
    const [sexType,setSexType]=React.useState(null)
    const [securityQuestionValue,setSecurityQuestionValue]=React.useState(null)
    const [batch,setBatch]=React.useState([]);
    const [count,setCount]=React.useState(1);
    const [changed,setChanged]=React.useState(null)
    const [id,setId]=React.useState(null);
    const [codeNumber,setCodeNumber]=React.useState(null)
    const [name,setFirstName]=React.useState("")
    const [secondName,setSecondName]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [confirmPassword,setConfirmPassword]=React.useState("")
    const [email,setEmail]=React.useState("")
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
   
    React.useEffect(()=>{  
        if(params.screen===1){
            setModalScreen(1)
        }else if(params.screen===2){
            setModalScreen(2)
        }else if(params.screen===3){
            setModalScreen(3)
        }else if(params.screen===4){
            setModalScreen(4)
        }else if(params.screen===7){
            setModalScreen(7)
        }else{
            setModalScreen(2);
        }

    },[params.screen])
    React.useEffect(()=>{
        if(params.someValue){
            setId(params.someValue.id)
        }
    },[params.someValue])
    React.useEffect(()=>{
        if(params.success){
            setId(null);
            if(params.success.type==="AddSECURITYQUESTIONS"){
                setModal(false);
            }else if(params.success.type==="ADDSEXTYPE"){
                setSexType(" ")
            }else if(params.success.type==="DELETESEXTYPE"){
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="DELETESECURITYQUESTION"){
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="EDITEDSEXTYPE"){
                setChanged(null)
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="EDITSECURITYQUESTION"){
                setChanged(null)
                params.changeModalState(false,1,1,null)
            }
        }
    },[params.success])
   
    React.useEffect(()=>{
        console.log("modalstate",modal)
        params.changeModalState(modal,1,1,null)
    },[modal])
    React.useEffect(()=>{
        
        let arr=batch;

        arr.push({value:null})
        setBatch(arr)
    },[count])
    React.useEffect(()=>{
        
        console.log("batch",batch)
    },[batch])
    React.useEffect(()=>{
        setCount(1)
    },[])
    function ValidateEmail(inputText)
    {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat))
    {
    return true;
    }
    else
    {
    params.setMessage("You have entered an invalid email address!");
    return false;
    }
    }
    return <div>
     <Snackbar  anchorOrigin={{ vertical: 'top',horizontal: 'right'}} open={showAlert}  autoHideDuration={6000}>
         {params.success? <Alert  color={'success'}>{params.success.message}</Alert>:
         <Alert  severity='error'>{params.error}</Alert>
         }  
       </Snackbar>
      
        <div className='f-flex'>
        <div className='w-20  b-s b-g' style={{position:'fixed',left:0,height:'100%',color:'white',zIndex:2 }}>
        <Typography variant="h5" component="div" className="padding" style={{alignSelf:'center',color:'white',textAlign:'center'}}>
           <b>Ripe Wipe</b>
           </Typography>
            <Link to={'user'} onClick={()=>setActive(1)} >
                        <div className="padding f-flex" style={active===1?styles.navbarSelected:styles.navbarUnSelected}>
              <PersonOutlined/>
               <Typography variant='p' color={'primary'} style={active===1?styles.navbarUnText:styles.navbarText}>
                    Users
                </Typography>
            </div>
            </Link>
            <Link to={'admins'} onClick={()=>setActive(2)} >
                        <div className="padding f-flex" style={active===2?styles.navbarSelected:styles.navbarUnSelected} >
                       <PeopleOutlined/>
                              <Typography variant='p' color={'primary'} style={active===2?styles.navbarUnText:styles.navbarText}>
                    Admins
                </Typography>
            </div>
            </Link>
            <Link to={'invitations'} onClick={()=>setActive(3)} >
                        <div className="padding f-flex" style={active===3?styles.navbarSelected:styles.navbarUnSelected} >
                        <MailOutlined/>
                <Typography variant='p' color={'primary'} style={active===3?styles.navbarUnText:styles.navbarText}>
                    Invitations
                </Typography>
            </div>
            </Link>
            <Link to={'user'} onClick={()=>setActive(4)} >
                        <div className="padding f-flex" style={active===4?styles.navbarSelected:styles.navbarUnSelected} >
              <FavoriteBorderOutlined/>
                <Typography variant='p' color={'primary'} style={active===4?styles.navbarUnText:styles.navbarText}>
                    Encounters
                </Typography>
            </div>
            </Link>
            <Link to={'SecurityQuestion'} onClick={()=>setActive(5)} >
                        <div className="padding f-flex" style={active===5?styles.navbarSelected:styles.navbarUnSelected} >
             <GppGoodOutlined/>
                <Typography variant='p' color={'primary'} style={active===5?styles.navbarUnText:styles.navbarText}>
                    Security questions
                </Typography>
            </div>
            </Link>
            <Link to={'Sextype'} onClick={()=>setActive(6)} >
                        <div className="padding f-flex" style={active===6?styles.navbarSelected:styles.navbarUnSelected} >
               <SentimentSatisfiedOutlined/>
                <Typography variant='p' color={'primary'} style={active===6?styles.navbarUnText:styles.navbarText}>
                    Sex types
                </Typography>
            </div>
            </Link>
            <Link to={'user'} onClick={()=>setActive(7)} >
                        <div className={`padding f-flex`} style={active===7?styles.navbarSelected:styles.navbarUnSelected} >
                <ChatOutlined/>
                <Typography variant='p' color={'primary'} style={active===7?styles.navbarUnText:styles.navbarText}>
                    Dose messages
                </Typography>
            </div>
            </Link>
            <Link to={'messages'} onClick={()=>setActive(8)} >
                        <div className={`padding f-flex`} style={active===8?styles.navbarSelected:styles.navbarUnSelected} >
                <ChatOutlined/>
                <Typography variant='p' color={'primary'} style={active===8?styles.navbarUnText:styles.navbarText}>
                    Messages
                </Typography>
            </div>
            </Link>
           
        </div>
        <div className='w-f eee' style={{backgroundColor:'white'}}>
        <div style={{height:40,backgroundColor:'white',justifyContent:'space-between',zIndex:1}} className='f-flex padding w-f'>
           <Typography variant="h5" component="div" style={{alignSelf:'center',color:colors.primary10}}>
          
           </Typography>
           
            <div className='f-flex' style={{alignContent:'center',alignSelf:'center'}}>
           
            <div className="padding">
            <Avatar src={`${process.env.PUBLIC_URL}/avatar.jpg`}/>
            </div>
            
                
            </div>
        </div>
        <br/>
        <div className="padding" style={{paddingLeft:'21%'}}>
        <div className="padding white">
            <Routes>
                <Route path={`dashboard`} element={<DashBoardTab/>}/>
                <Route path={`user`} element={<UserScreen/>}/>
                <Route path={'membership'} element={<MemberShip/>}/>
                <Route path={'team'} element={<TeamScreen/>}/>
                <Route path={'settings'} element={<SettingScreen/>}/>
                <Route path={'notifications'} element={<NotificationsScreen/>}/>
                <Route path={'invitations'} element={<GenerateCodes/>}/>
                <Route path={'SecurityQuestion'} element={<SecurityQuestionScreen/>}/>
                <Route path={'Sextype'} element={<SexTypeScreen/>}/>
                <Route path={'admins'} element={<AdminScreen/>}/> 
                <Route path={'messages'} element={<MessageScreen/>}/>
                
            </Routes>
            </div>
            </div>
            </div>
        </div>
        <Modal open={params.modalVisible} style={{overflow:'scroll',height:'100%'}}>
            <center>
            {
                modalScreen===1? params.screen===1?  <div className="w-30 white padding left-r" style={{marginTop:'10%'}}>
               <p className="left-r w-90" style={{fontSize:15,color:'black'}}><b>{params.progress===1?"Add":"Edit"} sex type</b></p>
               <br/>
               {
                       batch.map((dat,i)=>{
                           let val=params.progress===2?batch[i].value != null?batch[i].value:params.someValue.value:batch[i].value;
                           console.log("valueee",val)
                           {/* setChanged(val) */}
                           return ( <div><TextField label="Sex type name" className="w-f" variant="outlined" value={!changed?val:null} onChange={(e)=>{let xx=batch;xx[i].value=e.target.value;setBatch(xx);setChanged(e.target.value);console.log("batch"+batch[i].value!=null,JSON.stringify(batch)+params.progress)}}/>
                                 <br/><br/></div>)
                       })
                   }
                  
                  {
                      params.progress===1?
                     
                      <Button onClick={()=>{
                          let cc=count+1;
                          setCount(cc);
                          }}>Add more</Button>:null
                  }
               {/* <TextField variant="outlined" label="Sex type name" className="w-f margin-input" value={sexType} onChange={(e)=>setSexType(e.target.value)}/> */}
               <br/><br/>
               <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'text'} className="mrit" onClick={() => params.changeModalState(false,1,1,null)}  style={{marginRight:'5%', padding: '0% 10%',color:colors.primary10 }}>Cancel</Button>
                    <button variant={'contained'} onClick={()=>  
                        batch.length >0?params.progress===1?params.addBatchSexType(batch):params.someValue.value===securityQuestionValue?params.setMessage("No changes made"):params.editSexType(batch[0].value,params.someValue?params.someValue.id:null):params.setMessage("add sex type to continue")
                    
                    } disableElevation style={{ backgroundColor: colors.primary10,color:'white', padding: '3% 10%' }}>{
                       params.isLoading?<CircularProgress size={15} sx={{color:'white'}}/>:params.progress===1?"ADD":"SAVE"
                    }</button>
                </div>
           </div>:<DeleteScreen isLoading={params.isLoading} cancel={()=>params.changeModalState(false,1,1,null)} actions={()=>{
               
               params.deleteSecurityQuestion(id)}} desc={"Are you sure you want to delete this security question?"}/>
        :modalScreen===6? 
           <DeleteScreen isLoading={params.isLoading} cancel={()=>params.changeModalState(false,1,1,null)} actions={()=>params.deleteSexType(params.someValue?params.someValue.id:null)} desc={"Are you sure you want to delete this sex type?"}/>:
           modalScreen===3?
           <div className="w-30 white padding" style={{marginTop:'10%'}}>
               
               <div className="w-90 left-r">
             
                   <p style={{fontSize:15,color:'black'}}><b>Add Dose Message</b></p>
                   <br/><br/>
                   <TextField label="Dose type" className="w-f" variant="outlined"/>
                   <br/><br/>
                   <TextField label="Message" className="w-f" multiline={true} variant="outlined"/>
                   <br/><br/>
                   <Button>Add more</Button>
                   <br/><br/>
               <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'outlined'} className="mrit" onClick={() => setModal(false)} style={{marginRight:'5%'}}>Cancel</Button>
                    <Button variant={'contained'} disableElevation style={{ padding: '0 15%' }} style={{ backgroundColor: colors.primary10,color:'white' }}>Done</Button>
                </div>
               </div>

               <br/>
              
           </div>:modalScreen===4?
           <div className="w-30 white padding" style={{marginTop:'10%'}}>
               
               <div className="w-90 left-r">
             
                   <p style={{fontSize:15,color:'black'}}><b>{params.progress===1?"Add":"Edit"} Security Question</b></p>
                   <br/><br/>
                   {
                       batch.map((dat,i)=>{
                        let val=params.progress===2?batch[i].value != null?batch[i].value:params.someValue.value:batch[i].value;
                           console.log("valueee",val)
                           {/* setChanged(val) */}
                           return ( <div><TextField label="Security Question" className="w-f" variant="outlined" value={!changed?val:null} onChange={(e)=>{let xx=batch;xx[i].value=e.target.value;setBatch(xx);setChanged(e.target.value);console.log("batch"+batch[i].value!=null,JSON.stringify(batch)+params.progress)}}/>
                                 <br/><br/></div>)
                           {/* return ( <div><TextField label="Security Question" className="w-f" variant="outlined" value={batch.length>0?batch[i].value:securityQuestionValue} onChange={(e)=>{batch.length>0?batch[i].value=e.target.value:setSecurityQuestionValue(e.target.value)}}/>
                                 <br/><br/></div>) */}
                       })
                   }
                  
                  {
                      params.progress===1?<Button onClick={()=>{
                          let cc=count+1;
                          setCount(cc);
                          }}>Add more</Button>:null
                  }
                   
                   <br/><br/>
               <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <button onClick={()=>
        params.changeModalState(false,1,1,null)} className="mrit border"  style={{marginRight:'5%', padding: '0% 10%',color:colors.primary10 }}>Cancel</button>
                    <button style={{ backgroundColor: colors.primary10,color:'white', padding: '3% 10%' }} onClick={() => {
                        batch.length >0?params.progress===1?params.addBatchSecurityQuestion(batch):params.someValue.value===securityQuestionValue?params.setMessage("No changes made"):params.editSecurityQuestion(batch[0].value,params.someValue?params.someValue.id:null):params.setMessage("add security question to continue")
                    }}>
                        {params.isLoading?
                        <CircularProgress size={15} sx={{color:'white'}}/>:params.progress===1?"Done":"Save"}
                    </button>
                </div>
               </div>

               <br/>
              
           </div>:modalScreen===5?
           
           <center>
    <TextField type="number" onChange={(e)=>setCodeNumber(e.target.value)} label="Number of codes" variant={"outlined"} className="w-30"/>
        <br/><br/>
        <button className="w-20" style={{backgroundColor:colors.primary10,color:'white'}} onClick={()=>{
            if(codeNumber.trim().length>0){
                params.generateCode(codeNumber.trim())
            }
        }}>
            {
                params.isLoading?<CircularProgress size={15} sx={{color:'white'}}/>:"Generate"
            }
        </button>
    </center>
           :modalScreen===7?<div className="w-30 padding white" style={{marginTop:'5%'}}>
          <Typography variant="h5" className="padding"> Register Admin</Typography>
          <TextField label="First name" value={name} onChange={(e)=>setFirstName(e.target.value)} className="w-f" variant='outlined' required/>
          <br/><br/>
          <TextField label="Last name" value={secondName} onChange={(e)=>setSecondName(e.target.value)} className="w-f" variant='outlined'/>
          <br/><br/>
          <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-f" variant='outlined'/>
          <br/><br/>
          <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="w-f" variant='outlined'/>
          <br/><br/>
          <TextField label="Email" className="w-f" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} variant='outlined'/>

          <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'text'} className="mrit" onClick={() => params.changeModalState(false,1,1,null)}  style={{marginRight:'5%', padding: '0% 10%',color:colors.primary10 }}>Cancel</Button>
                    <button variant={'contained'} onClick={()=>{if(name.trim().length>0 && secondName.trim().length>0 && (password.trim().length>=6) && (password.trim()===confirmPassword.trim()) && ValidateEmail(email) ){
                              console.log("viral")
                                if(password.trim()!=confirmPassword.trim()){
                                params.setMessage("Password and confirm password does not match")
                                }else{
                                    params.createAdmin(name,secondName,password,email)
                                }
                              
                    
                    }else{
                        params.setMessage("Fill all the information to continue")
                    }
                     }
                        } disableElevation style={{ backgroundColor: colors.primary10,color:'white', padding: '3% 10%' }}>{
                       params.isLoading?<CircularProgress size={15} sx={{color:'white'}}/>:params.progress===1?"ADD":"SAVE"
                    }</button>
                </div>


           </div>:
           <DeleteScreen isLoading={params.isLoading} cancel={()=>params.changeModalState(false,1,1,null)} actions={()=>params.deleteSecurityQuestion(id)} desc={"Are you sure you want to delete this security question?"}/>

          
           

            }
         
           </center>
           </Modal>
       
    </div>

}
const mapStateToProps=(state)=>{
    return {
        isLoading:state.sendDataReducer.isLoading,
        success:state.sendDataReducer.success,
        error:state.sendDataReducer.error,
        data:state.sendDataReducer.data,
        modalVisible:state.ModalReducer.visible,
        screen:state.ModalReducer.screen,
        progress:state.ModalReducer.progress,
        someValue:state.ModalReducer.someValue
    }
}
const mapDispatchTopProps=(dispatch)=>{
    return {
        addSecurityQuestion:(en)=>dispatch(addSecurityQuestions(en)),
        setMessage:(message)=>dispatch(setDataReducer(false,message,null,null)),
        addSexType:(en)=>dispatch(addSexType(en)),
        changeModalState:(visible,screen,progress,someValue)=>dispatch(setModalReducer(visible,screen,progress,someValue)),
        addBatchSecurityQuestion:(batch)=>dispatch(addBatchSecurityQuestion(batch)),
        addBatchSexType:(batch)=>dispatch(addBatchSexType(batch)),
        deleteSexType:(id)=>dispatch(deleteSexType(id)),
        deleteSecurityQuestion:(id)=>dispatch(deleteSecurityQuestion(id)),
        editSexType:(value,id)=>dispatch(editSexType(value,id)),
        editSecurityQuestion:(value,id)=>dispatch(editSecurityQuestion(value,id)),
        createAdmin:(firstname,lastname,email,password)=>dispatch(createAdmin(firstname,lastname,email,password)),
        generateCode:(numer)=>dispatch(generateCodes(numer)),
    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(DashboardScreen)
const Dash=()=>{
    return <h1>this is dashboard</h1>
}

