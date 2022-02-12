import { IconButton,Typography,Button } from '@mui/material';
import * as React from 'react'
import { connect } from 'react-redux';
import { loadSecurityQuestions, loadSexType, setModalReducer } from '../../../action';
import LoadingData from '../../../components/loadingData';
import moment from 'moment'
import {colors} from '../../../styles/index'
const SexTypeScreen=(params)=>{
    const [data,setData]=React.useState(null)
    React.useEffect(()=>{
        if(params.success){
            if(params.success.type==="SEXTYPE"){
                if(params.data){

                    let dd=params.data.reverse();
                    setData(dd)
                }
            }
        }
    },[params.success])
    React.useEffect(()=>{
        params.loadSexType()
    },[])
    return      <div className="w-f">
    <div className="w-f flex" style={{justifyContent:'space-between'}}>
        <Typography variant="h5" style={{alignSelf:'center',justifyContent:'center',alignContent:'center'}}>List sex types</Typography>
        <Button color={'primary'} onClick={()=>params.changeModalState(true,1,1,null)} style={{backgroundColor:colors.primary10,color:'white',alignContent:'center',alignSelf:'center'}} className="flex">
       <p style={{fontSize:20,paddingRight:10}}> + </p> 
        New sex type</Button>
    </div>
       <br/><br/>
    {
        data?<table className="w-f">
        <tr className="eee">
            <th className="w-10 padding">#</th>
            <th className="w-30">Name(en)</th>
            <th className="w-30">Name(es)</th>
            <th className="w-10">Status</th>
            <th className="w-20">Creation date</th>
            <th className="w-10">Actions</th>
        </tr>
        {data.map((dat,o)=>{
                return  <tr style={{borderBottom:'1px solid #222 !important'}}>
            <td className="padding">{o+1}</td>
            <td>{dat.en}</td>
            <td>{dat.es}</td>
            <td>Active</td>
            <td>{moment(dat.createdDate).format("MMMM DD ,HH:MM a")}</td>
            <td className="f-flex padding" style={{alignSelf:'center',justifyContent:'center'}}>
                <IconButton onClick={()=>{params.changeModalState(true,1,2,{value:dat.en,es:dat.es,id:dat.id})}}><img src='../../icons/edit.svg' height={20} width={20}/></IconButton>

                <IconButton onClick={()=>{params.changeModalState(true,2,3,{value:dat.en,es:dat.es,id:dat.id})}}><img src='../../icons/delete.svg' height={20} width={20}/></IconButton>
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
        loadSexType:()=>dispatch(loadSexType()),
        changeModalState:(visible,screen,progress,someValue)=>dispatch(setModalReducer(visible,screen,progress,someValue))
    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(SexTypeScreen)