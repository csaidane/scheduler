import {useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);



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