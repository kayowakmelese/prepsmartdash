import {SENDDATA, SIGNIN,MODAL} from './type'
import axios from "axios";
import ls from 'local-storage';
import { IP, PORT } from '../ip_config'
axios.interceptors.request.use(
    async config => {
       // const token = await AsyncStorage.getItem('token')
    //    if (token) {
            //config.headers.Authorization = "Bearer " + token;
            config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGRU1wcm5sVnJsbjZBWWM2a0lxcGYiLCJpYXQiOjE2NDI2MjAxMTk2ODYsImV4cCI6MTY0MjcwNjUxOTY4Nn0.oebR4vLN8lhtclkNLijwdU6sfQ22ekw7q-PCPus-Jk0";
        // } else {
        //     console.log("no token")
        // }
        return config
    }
)

export const setDataReducer=(isLoading,error,success,data)=>{
    return {
        type:SENDDATA,
        isLoading,
        error,success,data
    }
}
export const setModalReducer=(visible,screen,progress,someValue)=>{
    return {
        type:MODAL,
        visible,screen,progress,someValue
    }
}

export const setUserInformation=(isLoading,error,success,data)=>{
    return {
        type:SIGNIN,
        isLoading,
        error,success,data
    }
}


export const signIn=(email,password,rememberme)=>{
    return dispatch=>{
        let params={
            email:email,
            password:password
        }
        dispatch(setUserInformation(true,null,null,null))
        axios.post(`http://${IP}:${PORT}/api/admin/signIn`,params).then((data)=>{
            if(data.data){
                if(true){
                    ls("accessToken",data.data.accessToken);
                    ls("refreshToken",data.data.refreshToken);
                    ls("userId",data.data.userId);
                    ls("data",data.data)
                    
                }
                console.log("response",data.data)
                dispatch(setUserInformation(false,null,{type:"SIGNIN",message:"authentication successful!"},data.data))
            }

        }).catch((error)=>{
                dispatch(setUserInformation(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
        })
    }
}
export const generateCodes=(number)=>{
    return dispatch=>{
        let params={
            count:parseInt(number)
        }
        dispatch(setDataReducer(true,null,null,null))
        axios.post(`http://${IP}:${PORT}/api/invitation-code/add`,params).then((data)=>{
            if(data.data){
                dispatch(setDataReducer(false,null,{type:"INVITATIONREQUEST",message:"invitation codes loaded successfully!"},data.data))
            }else{
            
            }
            dispatch(loadGeneratedCodes());
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const loadGeneratedCodes=()=>{
    return dispatch=>{
        let params={

        }
        dispatch(setDataReducer(true,null,null,null))
        axios.get(`http://${IP}:${PORT}/api/invitation-code/all`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setDataReducer(false,null,{type:"INVITATIONCODES",message:"invitation codes loaded successfully!"},data.data.invitationCodes))
            }else{
            
            }
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const loadSecurityQuestions=()=>{
    return dispatch=>{
        let params={

        }
        dispatch(setDataReducer(true,null,null,null))
        axios.get(`http://${IP}:${PORT}/api/lookups/security-questions/en`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setDataReducer(false,null,{type:"SECURITYQUESTIONS",message:"security questions loaded successfully!"},data.data.securityQuestions))
            }else{
            
            }
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const loadAllUsers=()=>{
    return dispatch=>{
        let params={

        }
        dispatch(setDataReducer(true,null,null,null))
        axios.get(`http://${IP}:${PORT}/api/admin/all/users`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setDataReducer(false,null,{type:"ALLUSERS",message:"users loaded successfully!"},data.data.users))
            }else{
            
            }
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const loadSexType=()=>{
    return dispatch=>{
        let params={

        }
        dispatch(setDataReducer(true,null,null,null))
        axios.get(`http://${IP}:${PORT}/api/lookups/sex-type`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setDataReducer(false,null,{type:"SEXTYPE",message:"security questions loaded successfully!"},data.data.sexTypes))
            }else{
            
            }
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const addSexType=(en)=>{
    return dispatch=>{
        let params={
            en:en,
            es:en,
            isActive:true
        }
        dispatch(setDataReducer(true,null,null,null))
        axios.post(`http://${IP}:${PORT}/api/lookups/sex-type`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setDataReducer(false,null,{type:"ADDSEXTYPE",message:"sex type added successfully!"},data.data.securityQuestions))
            }else{
            
            }
            dispatch(loadSexType())
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const addSecurityQuestions=(en)=>{
    return dispatch=>{
        let params={
            en:en,
            es:en,
            isActive:true
        }
        dispatch(setDataReducer(true,null,null,null))
        axios.post(`http://${IP}:${PORT}/api/lookups/security-questions`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setDataReducer(false,null,{type:"AddSECURITYQUESTIONS",message:"security questions added successfully!"},data.data.securityQuestions))
            }else{
            
            }
            dispatch(loadSecurityQuestions())
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const addBatchSecurityQuestion=(batch)=>{
    return dispatch=>{
        let xx=[];
        for(var i=0;i<batch.length;i++){
            if(batch[i].value){
                xx.push({
                    en:batch[i].value,
                    es:batch[i].value,
                    isActive:true
                })
            }
        }
        let params={
           questions:xx
        }
        console.log("paramsare",params)
        dispatch(setDataReducer(true,null,null,null))
        axios.post(`http://${IP}:${PORT}/api/lookups/security-questions/batch`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setDataReducer(false,null,{type:"AddSECURITYQUESTIONS",message:"security questions added successfully!"},data.data.securityQuestions))
            }else{
            
            }
            dispatch(loadSecurityQuestions())
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const addBatchSexType=(batch)=>{
    return dispatch=>{
        let xx=[];
        for(var i=0;i<batch.length;i++){
            if(batch[i].value){
                xx.push({
                    en:batch[i].value,
                    es:batch[i].value,
                    isActive:true
                })
            }
        }
        let params={
           types:xx
        }
        dispatch(setDataReducer(true,null,null,null))
        axios.post(`http://${IP}:${PORT}/api/lookups/sex-type/batch`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setDataReducer(false,null,{type:"ADDSEXTYPE",message:"sex type added successfully!"},data.data.securityQuestions))
            }else{
            
            }
            dispatch(loadSexType())
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const deleteSexType=(id)=>{
    return dispatch=>{
        let params={
        }
        dispatch(setDataReducer(true,null,null,null))
        axios.delete(`http://${IP}:${PORT}/api/lookups/sex-type/delete/${id}`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setDataReducer(false,null,{type:"DELETESEXTYPE",message:"sex type deleted successfully!"},data.data))
            }else{
            
            }
            dispatch(loadSexType())
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const deleteSecurityQuestion=(id)=>{
    return dispatch=>{
        let params={
        }
        dispatch(setDataReducer(true,null,null,null))
        axios.delete(`http://${IP}:${PORT}/api/lookups/security-questions/delete/${id}`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setDataReducer(false,null,{type:"DELETESECURITYQUESTION",message:"security question deleted successfully!"},data.data))
            }else{
            
            }
            dispatch(loadSecurityQuestions())
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const editSecurityQuestion=(value,id)=>{
    return dispatch=>{
        let params={
            id:id,
            en:value,
            es:value
        }
        console.log("paramsd",params)
        dispatch(setDataReducer(true,null,null,null))
        axios.put(`http://${IP}:${PORT}/api/lookups/security-questions/update`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setDataReducer(false,null,{type:"EDITSECURITYQUESTION",message:"security question updated successfully!"},data.data))
            }else{
            
            }
            dispatch(loadSecurityQuestions())
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const editSexType=(value,id)=>{
    return dispatch=>{
        let params={
            id:id,
            en:value,
            es:value
        }
        console.log("params",params)
        dispatch(setDataReducer(true,null,null,null))
        axios.put(`http://${IP}:${PORT}/api/lookups/sex-type/update`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setDataReducer(false,null,{type:"EDITEDSEXTYPE",message:"Sex type edited successfully"},data.data))
            }else{
            
            }
            dispatch(loadSexType())
        }).catch((error)=>{
            dispatch(setDataReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}

const handleMessages=(error)=>{
    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response.data;
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        let errar={
            message:"trouble connecting to the server!please try again"
        }
        console.log("requesterror",error.request);
        return errar
    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Errorb', error.message);
        return error.message
    }
}