import React, { useEffect, useState } from 'react'
import Todo from './Components/Todo'
import './App.css'

const App = () => {
   const [count,setCount]=useState(0)
   const [val,setVal]=useState()
 const changeVal=(value)=>{
   setVal(value)
 }
  useEffect(()=>{
    console.log("component Mount")
    return ()=> console.log("UnMount")
  },[count])

  
  

    
  
 
  return (
    <>
       <div className='todo-app'>
      < Todo/>

    </div>
  
    </>
    
  )
}

export default App