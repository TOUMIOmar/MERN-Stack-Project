import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addtask, deletetask, getusertasks, updatetask } from '../redux/slices/taskSlice'
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';


const Home = () => {
 const dispatch=useDispatch()
 const [updated,setupdatetask]=useState({})
const [visible,setvisible]=useState({visibility:"hidden"})
 const handleChange=(e)=>{
  setupdatetask({...taskList,[e.target.name]:e.target.value})
  console.log(updated)
}
 const {errors: err, isAuth ,userList} = useSelector(state => state.user)
 const {error,taskList,isLoading}=useSelector(state=>state.task)
 const { register, handleSubmit, formState: { errors } } = useForm();
 const onSubmit = data => {
  dispatch(addtask(data))
  console.log(data)};
 console.log(errors);
 useEffect(()=>{dispatch(getusertasks())},[])
 
  return ( 
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="text" {...register('title')}/>
      <input type="text" placeholder="desc" {...register('desc')}/>
      <input type="submit" />
    </form>
    {isLoading && <p>Loading</p>}
    {Array.isArray(taskList) && taskList.map(el=>
    <div>
      <p>{el.title}</p>
      <p>{el.desc}</p>
      <button onClick={()=>{(visible.visibility=="hidden")?setvisible({visibility:"visible"}):setvisible({visibility:"hidden"})}}>update</button>

      <div style={visible}>
      <input type='text' placeholder='add name' name='title'onChange={handleChange}></input>
     <input type='text' placeholder='add age' name='desc'onChange={handleChange}></input>
     <button onClick={()=>dispatch(updatetask({...updated,_id:el._id}))}>up</button>

      </div>

     
    
    <button onClick={()=>dispatch(deletetask(el))}>X</button> 
     
    </div>
    )}
    </div>
  )
}

export default Home