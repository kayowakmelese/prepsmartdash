import { Button, CircularProgress, IconButton, TextField } from '@mui/material'
import * as React from 'react'
import {connect} from 'react-redux'
import { colors } from '../../../styles'
import moment from 'moment'
import {generateCodes,loadGeneratedCodes, setDataReducer} from '../../../action/index'
import { getTimeFromMins } from '../../../functions/checkSigned'
import LoadingData from '../../../components/loadingData'
const GenerateCodes=(params)=>{
    const [codeNumber,setCodeNumber]=React.useState(null)
    const [data,setData]=React.useState(null)
    React.useEffect(()=>{
        if(params.success){
            if(params.success.type==="INVITATIONCODES"){
                let dd=params.data.reverse();
                setData(dd)
            }
        }
    },[params.success])
    React.useEffect(()=>{
        params.loadCodes();
    },[])
    return  <div className="w-f">
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
       <br/><br/>
       
       <div className="w-50">
       {data?
       <table className="w-f">
            <tr className="eee">
                <th className="w-10 padding">#</th>
                <th className="w-70">Type</th>
                <th className="w-20">Expiration countdown</th>
                <th className="w-20">Action</th>
            </tr>
       
        {data.map((dat,o)=>{
            let diff=null;
            let checkDay=moment(dat.expiryDate).diff(moment(),'days')
            if(checkDay>1){
                diff=checkDay + ' days';
            }else{
                diff=moment(dat.expiryDate).diff(moment(),'minutes');
                diff=getTimeFromMins(diff);
            }
            var duration = moment.duration(moment(dat.expiryDate).diff(moment()));
            var hours = duration.asHours();
         return dat.isActive?<tr key={dat.invitationCodeId} style={{borderBottom:'1px solid #222 !important'}}>
                <td className="padding">{o+1}</td>
                <td>{dat.invitationCode}</td>
                <td>{diff}</td>
                <td className="f-flex padding" style={{alignSelf:'center',justifyContent:'center'}}>
                <IconButton onClick={()=>{navigator.clipboard.writeText(dat.invitationCode);params.setMessage("copied invitation code successfully!")}}>

                <img src='../../icons/copy.svg' height={20} width={20}/>
                </IconButton>
                </td>
            </tr>:null
         
                })}
      
       </table>
       
       :params.isLoading?<LoadingData/>:null}
       </div>
    </div>
}
const mapStateToProps=(state)=>{
    return {
        isLoading:state.sendDataReducer.isLoading,
        success:state.sendDataReducer.success,
        error:state.sendDataReducer.error,
        data:state.sendDataReducer.data
    }
}
const mapDispatchTopProps=(dispatch)=>{
    return {
        loadCodes:()=>dispatch(loadGeneratedCodes()),
        generateCode:(numer)=>dispatch(generateCodes(numer)),
        setMessage:(message)=>dispatch(setDataReducer(false,null,{message:message},null))
    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(GenerateCodes)