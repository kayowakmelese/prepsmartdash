import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Modal, TextField, Typography,Avatar,Box,Tabs,Tab,TabPanel } from '@mui/material';
import { colors } from '../../../styles';
import { AddCircleRounded,ChevronLeft,Add, Search } from '@mui/icons-material';
import { InputAdornment } from '@material-ui/core';
import {setDataReducer,loadAllUsers} from '../../../action/index'
import {connect} from 'react-redux'
import LoadingData from '../../../components/loadingData'
const UserScreen=(params)=>{
    const [modal,setModal]=React.useState(false);
    const [modalProgress,setModalProgress]=React.useState(1);
    const [screen,setScreen]=React.useState(2);
    const [tabvalue,setTabValue]=React.useState(1)
    const [allData,setAllData]=React.useState(null)
    React.useEffect(()=>{
        params.loadUsers()
    },[])
    React.useEffect(()=>{
      if(params.success){
        if(params.success.type==="ALLUSERS"){
              setAllData(params.data)
        }
      }
    },[params.success])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
        },
      ];
      const columns2 = [
        { field: 'id', headerName: '#', width: 70 },
        { field: 'DateAdded', headerName: 'Date added', width: 130 },
        { field: 'Type', headerName: 'Type', width: 130 },
        {
          field: 'age',
          headerName: 'Noted',
          type: 'number',
          width: 90,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 160,
          renderCell:(params)=>(
            params.value==='active'?<div className="green">
<Typography color={'green'} xs={{color:'green !important',borderColor:'green',borderWidth:1}} >Protected</Typography>
            </div>:
            <div className="red">
            <Typography color={'red'} xs={{color:'green !important'}}>Unprotected</Typography>
            </div>
          ),
          
         
        },
        {
          field: 'action',
          headerName: 'Action',
          width: 160,
          renderCell:(params)=>(
            <center>
            <div style={{alignContent:'center',justifyContent:'space-around',alignSelf:'center'}}>
              <IconButton onClick={()=>{setModal(true);setModalProgress(2)}}>
              <img src="../../../icons/edit.svg" height={20} width={20} style={{alignSelf:'center'}}/>
              </IconButton>
              <IconButton>

              <img src="../../../icons/delete.svg" height={20} width={20} style={{alignSelf:'center'}}/>
              </IconButton>

            </div></center>
          )
        }
      ];
      
      const rows = [
        { id: 1,  DateAdded: 'Jon', age: 35,status:'active',action:true },
        { id: 2,  DateAdded: 'Cersei', age: 42,status:'inactive',action:false },
        { id: 3,  DateAdded: 'Jaime', age: 45,status:'active',action:false },
        { id: 4,DateAdded: 'Arya', age: 16,status:'active',action:true },
        { id: 5,  DateAdded: 'Daenerys', age: null,status:'active',action:true },
        { id: 6, lastName: 'Melisandre', DateAdded: null, age: 150 ,status:'active',action:true},
        { id: 7, lastName: 'Clifford', DateAdded: 'Ferrara', age: 44,status:'active',action:true },
        { id: 8, lastName: 'Frances', DateAdded: 'Rossini', age: 36,status:'active',action:true },
        { id: 9, lastName: 'Roxie', DateAdded: 'Harvey', age: 65,status:'active',action:true },
      ];
    return (
        
        <div style={{height:'600px'}}>
        {
          screen===1?<div>
          <div className="padding w-f f-flex" style={{justifyContent:'space-between'}}>
            <TextField variant={'outlined'} color={'primary'} type='text' className={'w-30'} placeholder='Search'  ></TextField>
            
        <Button onClick={()=>setModal(true)} style={{backgroundColor:colors.primary10,color:'white'}} className={'w-20'}>Add</Button>
        </div>
        <br/>
            <div className="w-f" style={{overflowX:'scroll'}}>
             <table style={{width:1300}}>
                    <tr className="eee">
                        <th className="w-5 padding">#</th>
                        <th className="w-5">Code</th>
                        <th className="w-20">Name</th>
                        <th className="w-10">Email</th>
                         <th className="w-10">Phone number</th>
                        <th className="w-10">Date added</th>
                        <th className="w-10">Last login</th>
                         <th className="w-10">Role </th>
                        <th className="w-5">Status</th>
                        <th className="w-5">Action</th>
                    </tr>
                   {allData?
                     allData.map((dat,i)=>{
                       return  <tr>
                    <td className="padding">1</td>
                    <td className="padding">35</td>
                     <td className="f-flex padding"><Avatar color={'primary'}>KM</Avatar><p style={{alignSelf:'center',marginLeft:10}}>{dat.firstName} {dat.lastName}</p></td>
                     <td>kayomelese4@gmail.com</td>
                      <td className="padding">{dat.phoneNumber}</td>
                       <td className="padding">today</td>
                         <td className="padding">13 Dec 2021</td>
                         <td className="padding">user</td>
                         <td>
                             <div className={`${dat.isOnCycle?'green':'red'} w-50`}>
                            <Typography color={dat.isOnCycle?'green':'orangered'} variant={'p'} sx={{color:dat.isOnCycle?'green !important':'orangered !important',borderColor:dat.isOnCycle?'green':'red',borderWidth:1}} >{dat.isOnCycle?"Active":"Deactive"}</Typography>
            </div>
                         </td>
                         <td>
                           <center>
                <div style={{alignContent:'center',justifyContent:'space-around',alignSelf:'center'}}>
                  <IconButton onClick={()=>{}}>
                  <img src="../../../icons/edit.svg" height={20} width={20} style={{alignSelf:'center'}}/>
                  </IconButton>
                
    
                </div></center>
                         </td>
                     
                    </tr>
                     }):params.isLoading?<LoadingData/>:null
                   }
                    </table>
                    </div>
          </div>
          :<div >
            <div className="f-flex">
            <IconButton onClick={()=>setScreen(1)}>
              <ChevronLeft/>
            </IconButton>
            <Avatar color={'primary'} style={{alignSelf:'center'}}>KM</Avatar>
            <Typography variant={'p'} style={{alignSelf:'center',marginLeft:'2%'}}>
              <b>Kayowak melese</b>
            </Typography>
            </div>
            <Box sx={{borderBottom:1,borderColor:colors.primary4}}>
              <Tabs value={tabvalue} onChange={(n,e)=>{console.log("eee",e);setTabValue(e)}}  indicatorColor="primary">
                <Tab label="Profile" value={1}/>
                <Tab label="Encounter" value={2}/>
              </Tabs>
              
            </Box>
            <div className="w-f">
              {
                tabvalue===1?
                <div className='border m-top padding radius w-50'>
                  <div className="f-flex" style={{justifyContent:'space-between'}}>
                    <p style={{alignSelf:'center'}}>Personal Information</p>
                    <div className="f-flex">
                      <Button variant={'text'}>Edit</Button>
                      <Button variant={'text'} sx={{color:'black'}}>Reset password</Button>
                      <Button variant={'text'} sx={{color:'red'}}>Delete</Button>
                    </div>
                   
                  </div>
                  <div className="m-top w-70">
                  <div className='padding'>
                    
                  </div>
                      <div className="f-flex b-bottom" style={{justifyContent:'space-between'}}>
                      <p>Full name</p>
                      <p><b>Kayowak melese</b></p>
                      </div>
                      <div className="f-flex b-bottom" style={{justifyContent:'space-between'}}>
                      <p>Email</p>
                      <p><b>kayomelese4@gmail.com</b></p>
                      </div>
                      <div className="f-flex b-bottom" style={{justifyContent:'space-between'}}>
                      <p>Phone number</p>
                      <p><b>+251 949490003</b></p>
                      </div>
                      <div className="f-flex b-bottom" style={{justifyContent:'space-between'}}>
                      <p>Birthplace</p>
                      <p><b>Ambo</b></p>
                      </div>
                      <div className="f-flex b-bottom" style={{justifyContent:'space-between'}}>
                      <p>Location</p>
                      <p><b>Addis abeba</b></p>
                      </div>

                      
                    </div>
                </div>:
                tabvalue===2?
                <div style={{height:500}}>
                <DataGrid className="w-f" xs={{minHeight:500}}
        rows={rows}
        columns={columns2}
        pageSize={5}
        rowsPerPageOptions={[5]} sx={{height: 800,border:1,borderColor:'#ccc','& .MuiDataGrid-cell':{
                borderBottom:1,borderColor:'#ccc'
            } }}
      />
                </div>:null
              }
              </div>
           
          </div>
        }
       
      <Modal open={modal}>
           <center>

           {
             modalProgress===1? <div className="w-30  white padding" style={{marginTop:'5%'}}>
                   <Typography variant="p" color={colors.primary9} className="t-left">
                   <b>Add Users</b>
                   
                   </Typography>
                   <br/>
                   <div style={{position:'relative',width:120,marginTop:'10%',marginBottom:'10%'}}>
                   <img src="../../../icons/person.svg" height={90} width={90} style={{backgroundColor:colors.primary1,padding:10,borderRadius:90}}/>
                  <IconButton style={{position:'absolute',bottom:0,right:0,backgroundColor:colors.primary10}} size="large">
                      <Add sx={{color:'white'}} />
                  </IconButton>
                  <br/>

                 
                   </div>
                   <div className="t-left">
                   <p className=' t-l'>Username</p>
            <input type={'text'} placeholder='username' className='w-f'/>
            <p className=' t-l' >Email</p>
            <input type={'email'} placeholder='email' className='w-f'/>
            <p className=' t-l'>Password</p>
            <input type={'password'} placeholder='username' className='w-f'/>
            <p className=' t-l' >Confirm password</p>
            <input type={'password'} placeholder='password' className='w-f'/>
                   </div>
                 <div className="f-flex m-top" style={{justifyContent:'right'}}>
                     <Button variant={'text'} className="mrit" onClick={()=>setModal(false)}>Cancel</Button>
                     <Button variant={'contained'} disableElevation style={{padding:'0 15%'}} style={{backgroundColor:colors.primary10}}>Save</Button>
                 </div>
                   </div> :
                   <div className="w-30  white padding" style={{marginTop:'5%'}}>
                   <Typography variant="p" color={colors.primary9} className="t-left">
                   <b>Edit Users</b>
                   
                   </Typography>
                   <br/>
                   <div style={{position:'relative',width:120,marginTop:'10%',marginBottom:'10%'}}>
                   <img src="../../../icons/person.svg" height={90} width={90} style={{backgroundColor:colors.primary1,padding:10,borderRadius:90}}/>
                  <IconButton style={{position:'absolute',bottom:0,right:0,backgroundColor:colors.primary10}} size="large">
                      <Add sx={{color:'white'}} />
                  </IconButton>
                  <br/>

                 
                   </div>
                   <div className="t-left">
                   <p className=' t-l'>Username</p>
            <input type={'text'} placeholder='username' className='w-f'/>
            <p className=' t-l' >Email</p>
            <input type={'email'} placeholder='email' className='w-f'/>
                   </div>
                 <div className="f-flex m-top" style={{justifyContent:'right'}}>
                     <Button variant={'text'} className="mrit" onClick={()=>setModal(false)}>Cancel</Button>
                     <Button variant={'contained'} disableElevation style={{padding:'0 15%'}} style={{backgroundColor:colors.primary10}}>Save</Button>
                 </div>
                   </div> 
           }
                  
                   </center>
            </Modal>
        </div>
        
    )
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
      setMessage:(message)=>dispatch(setDataReducer(false,message,null,null)),
      loadUsers:()=>dispatch(loadAllUsers())
 

 

  }
}
export default connect(mapStateToProps,mapDispatchTopProps)(UserScreen)