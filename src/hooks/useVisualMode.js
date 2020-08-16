import {useState } from "react";



//This hook is used to track the state of an appointment and conditionnally render the appropriate component
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  //The history of the component is tracked, so that a user can cancel changes and go back to the previous component

  //This function moves us to another state
  function transition(mode, replace=false){
    if(replace===true){
      setMode(mode)
      const temp =[...history]
      temp.pop()
      temp.push(mode)
      setHistory(temp)
    }else{
      setMode(mode)
      const temp = [...history]
      temp.push(mode)
      setHistory(temp)
    }
  }


  //This function takes us back
  function back(){
    if(history.length > 1){
      const temp = [...history]
      temp.pop()
      setMode(temp[temp.length-1])
      setHistory(temp)
    }
  }
  return { mode, transition,back };
}