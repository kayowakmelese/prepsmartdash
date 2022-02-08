import { Alert, Checkbox, CircularProgress, TextField } from '@mui/material'
import * as React from 'react'
import { Link,useNavigate  } from 'react-router-dom'

import { signIn } from '../action'
import {colors} from '../styles/index'
import {connect} from 'react-redux'
import { Snackbar } from '@material-ui/core'
import CheckSigned from './CheckSigned'
import { checkSigned, checkSignedFromReducer } from '../functions/checkSigned'

const SignInScreen=(params)=>{  
    const [username,setUsername]=React.useState(null)
    const [password,setPassword]=React.useState(null)
    const [rememberMe,setRememberMe]=React.useState(true)
    const [showAlert,setShowAlert]=React.useState(false);
      let history = useNavigate();

    
    React.useEffect(()=>{
            if(params.usuccess){
                if(params.usuccess.type==="SIGNIN"){
                    // window.location.href="home"
                    history("home")
                }
            }
    },[params.usuccess])
    React.useEffect(()=>{
        if(checkSigned() || checkSignedFromReducer(params.udata)){
            // window.location.href="home"
           // History.push("home")
           
                    history("home")
        }else{
          //  window.location.href="/"
        }
    },[])
   
    React.useEffect(()=>{
        if(params.usuccess || params.uerror){
            setShowAlert(true);
        }else{
            setShowAlert(false);
        }
        setTimeout(()=>setShowAlert(false),3000);
    },[params.usuccess,params.uerror])
    return <div style={{marginTop:'5%',marginLeft:'10%',height:'80%',position:'absolute',top:0,left:0,width:'80%'}} className='flex b-s'>
       
       <div style={{backgroundColor:colors.primary10}} className='w-50'></div>
       <div className='white w-50 padding'>
       <Snackbar  anchorOrigin={{ vertical: 'top',horizontal: 'right'}} open={showAlert}  autoHideDuration={6000}>
         {params.usuccess? <Alert>{params.usuccess.message}</Alert>:
         <Alert severity='error'>{params.uerror}</Alert>
         }  
       </Snackbar>
            <h2 style={{marginTop:'10%',textAlign:'center',color:colors.primary4}}>
                Admin panel
            </h2>
            <center>
            <div className='w-70' style={{textAlign:'left'}}>
{/*             
            <p className=' t-l'>Email</p>
            <input type={'text'} placeholder='email' className='w-f'/> */}
            <br/><br/>
            <TextField label="email" type="email" value={username} onChange={(e)=>setUsername(e.target.value)} variant="outlined" className="w-f border"/>
            <br/><br/>
            <TextField label="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} variant="outlined" className="w-f border"/>
            {/* <p className='mtop  t-l' style={{marginTop:'10%'}}>Password</p>
            <input type={'password'} placeholder='password' className='w-f'/> */}
           <div className='f-flex' style={{justifyContent:'space-between'}}>
               <div className='f-flex' style={{alignContent:'center'}}>
               <Checkbox checked={rememberMe} onChange={(change)=>setRememberMe(rememberMe?false:true)}/>
                   <p style={{alignSelf:'center'}}>Remember me</p>
               </div>
               <p style={{alignSelf:'center'}}>Forgot your password?</p>
           </div>
           
           <button style={{borderRadius:50,backgroundColor:colors.primary10,padding:15,marginTop:'5%'}} className='w-f' onClick={()=>params.signIn(username,password,rememberMe)}>
               {
                   params.uisLoading?<CircularProgress size={20} sx={{color:'white'}}/>:<p className='t-b t-w'>Log in</p>
               }
               
           </button>
           
           <div className='f-flex padding' style={{justifyContent:'space-between'}}>
               <div className='f-flex'>
                   <p>Quick Signin</p>
                   <img src='google.png' width={'20'} height={'20'} style={{borderRadius:50,marginLeft:10}}/>
                   <img src='google.png' width={'20'} height={'20'} style={{borderRadius:50,marginLeft:10}}/>
                   <img src='google.png' width={'20'} height={'20'} style={{borderRadius:50,marginLeft:10}}/>
               </div>
               <p className='t-b'>Sign Up</p>
           </div>
            </div>
            </center>
            
       </div>
           
       
    </div>

}
const mapStateToProps=(state)=>{
    return {
        isLoading:state.sendDataReducer.isLoading,
        success:state.sendDataReducer.success,
        error:state.sendDataReducer.error,
        
        uisLoading:state.userInformationReducer.isLoading,
        usuccess:state.userInformationReducer.success,
        uerror:state.userInformationReducer.error,
        udata:state.userInformationReducer.data
    }
}
const mapDispatchTopProps=(dispatch)=>{
    return {

        signIn:(username,password,rememberme)=>dispatch(signIn(username,password,rememberme))
    }
}
export default connect (mapStateToProps,mapDispatchTopProps)(SignInScreen)