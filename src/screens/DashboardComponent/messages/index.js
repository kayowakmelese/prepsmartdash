import * as React from 'react'
import {loadMessages, setDataReducer} from '../../../action/index'
import {connect} from 'react-redux'
import LoadingData from '../../../components/loadingData'
import { colors } from '../../../styles'
import moment from 'moment'
import { ChevronLeft,Send } from '@mui/icons-material'
import { IconButton,TextField } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
const MessageScreen=(params)=>{
    const [messages,setMessages]=React.useState(null)
    const [screen,setScreen]=React.useState(1)
    const [selectedUser,setSelectedUser]=React.useState(null)
    const [message,setMessage]=React.useState(null)
    const [parsedData,setParsedData]=React.useState(null)
    
    React.useEffect(()=>{
        if(params.success){
            if(params.success.type==="ALLMESSAGES"){
                setMessages(params.data)
            }
        }
    },[params.success])
    React.useEffect(()=>{
        params.loadMessages();
    },[])
    const parseData=(phoneNumber)=>{
        let arr=[];
        for(var i=0;i<messages.length;i++){
                if(messages[i].from===phoneNumber || messages[i].to===phoneNumber){
                    arr.push(messages[i])
                }
        }
        setParsedData(arr);
        return arr;
    }
    return (
        <div className='padding w-f'>
            <p><b>Messages</b></p>
            <p style={{fontSize:12,color:'gray'}}>list of all messages</p>
            <br/><br/>
            <div className="border  w-f padding" >
                {screen===1?
                    messages?messages.map((dat,i)=>{
                        return <div className="padding f-flex" onClick={()=>{setSelectedUser(dat);setScreen(2);parseData(dat.direction==="outbound-api"?dat.to:dat.from)}} style={{backgroundColor:dat.direction==="outbound-api"?'#00d50003':'#7ae91e08',justifyContent:'space-between',cursor:'pointer'}}>
                        
                       <div> <p style={{fontSize:12,color:colors.primary10}}>{dat.to}</p>
                       <p><b>{dat.body}</b></p>
                       </div>
                       <div style={{alignItems:'center',justifyContent:'center',alignContent:'center'}}>
                           <p className={`padding ${dat.status!=='undelivered' && dat.status!=='failed'?'green':'red'}`}>{dat.status}</p>
                           <p style={{color:colors.primary10,textAlign:'center',fontSize:12}}>{moment(dat.dateSent).format('MMM DD HH:MM')}</p>
                       </div>
                                
                        </div>;
                    }):params.isLoading?<LoadingData/>:null:
                    <div className="padding " style={{alignSelf:'center',alignContent:'center',position:'relative'}}>
                    <div className="f-flex">
                    <IconButton onClick={()=>setScreen(1)}>
                        <ChevronLeft/>
                    </IconButton>
                        <p style={{alignSelf:'center'}}>{selectedUser.to}</p>
                        <br/>
                        </div>
                        <div>
                        {
                            parsedData?parsedData.map((dat,i)=>{
                                return <div className={`padding f-flex ${dat.to===(selectedUser.direction==='outbound-api'?selectedUser.to:selectedUser.from)?'bubble-right':'bubble-left'}`}>
                                    <div className={` ${dat.to===(selectedUser.direction==='outbound-api'?selectedUser.to:selectedUser.from)?'bubble-r':'bubble-l'} padding radius`} >
                                        <p style={{textAlign:'inherit'}}>{dat.body}</p>
                                        <div className="f-flex" style={{justifyContent:'right'}}>
                                        {
                                            dat.to===(selectedUser.direction==='outbound-api'?selectedUser.to:selectedUser.from)?
                                            dat.status==="undelivered" || dat.status==="failed"?<CloseIcon style={{fontSize:15,color:'red'}}/>:dat.status==="delivered"?<CheckCircleOutlineIcon style={{fontSize:15,color:'green'}}/>:dat.status==="received"?<CheckCircleIcon/>:null
                                            :null
                                        }
                                        <p style={{color:colors.primary10,fontSize:12,textAlign:'inherit'}}>{moment(dat.dateSent).format('MMM DD HH:MM')}</p>
                                        </div>
                                    </div>
                                </div>
                            }):null
                        }
                        </div>
                        <div className="white f-flex" style={{justifyContent:'center'}}>
                            <TextField label="reply message" value={message} onChange={(e)=>setMessage(e.target.value)} className="w-90"/>
                        <IconButton onClick={()=>{
                            message.trim().length>0?params.sendMessage(message,selectedUser.direction==='outbound-api'?selectedUser.to:selectedUser.from):params.setMessage("add reply message to send")
                        }}>
                            <Send/>
                        </IconButton>
                        </div>
                    </div>
                   
                }
            </div>
        </div>
    )
}
const mapStateToProps=(state)=>{
    return {
        isLoading:state.sendDataReducer.isLoading,
        success:state.sendDataReducer.success,
        error:state.sendDataReducer.error,
        data:state.sendDataReducer.data,
    }
}
const mapDispatchTopProps=(dispatch)=>{
    return {
        loadMessages:()=>dispatch(loadMessages()),
        setMessage:(message)=>dispatch(setDataReducer(false,message,null,null)),
    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(MessageScreen)