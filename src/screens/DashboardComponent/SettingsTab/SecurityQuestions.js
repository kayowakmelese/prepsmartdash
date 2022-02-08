import { IconButton } from '@mui/material';
import * as React from 'react'
import { connect } from 'react-redux';
import { loadSecurityQuestions, setModalReducer } from '../../../action';
import LoadingData from '../../../components/loadingData';


const SecurityQuestionScreen=(params)=>{
    const [data,setData]=React.useState(null)
    React.useEffect(()=>{
        if(params.success){
            if(params.success.type==="SECURITYQUESTIONS"){
                let dd=params.data.reverse();
                setData(dd)
            }
        }
    },[params.success])
    React.useEffect(()=>{
        params.loadSecurityQ()
    },[])
    return  <div className="w-50">
    {
        data? <table className="w-f">
        <tr className="eee">
            <th className="w-10 padding">#</th>
            <th className="w-70">Security Questions</th>
            <th className="w-20">Action</th>
        </tr>
        {data.map((dat,o)=>{
            let id=dat.id;
                return  <tr style={{borderBottom:'1px solid #222 !important'}}>
            <td className="padding">{o+1}</td>
            <td>{dat.value}</td>
            <td className="f-flex padding" style={{alignSelf:'center',justifyContent:'center'}}>
                <IconButton onClick={()=>{params.changeModalState(true,2,2,{id:dat.id,value:dat.value})}}><img src='../../icons/edit.svg' height={20} width={20}/></IconButton>

                <IconButton onClick={()=>{params.changeModalState(true,4,3,{id:dat.id,value:dat.value})}}><img src='../../icons/delete.svg' height={20} width={20}/></IconButton>
            </td>
        </tr>
            })
       }
       
    </table>:params.isLoading?<LoadingData/>:null
    }
   
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
        loadSecurityQ:()=>dispatch(loadSecurityQuestions()),
        changeModalState:(visible,screen,progress,someValue)=>dispatch(setModalReducer(visible,screen,progress,someValue))
    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(SecurityQuestionScreen)