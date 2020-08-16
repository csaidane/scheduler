import {useState, useEffect } from "react";
import axios from 'axios';


//This hook handles all the stateful logic of the Application component. All the code was moves from Application.js
//to this file for the sake of readability.
export default function useApplicationData() {

//State tracking on all the application's information
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});
//Changes the Day inside the state (above)
const setDay = day => setState({ ...state, day });

//Does API requests and returns informations from the persistence layer: we retrive data on existing appointments and interviewers
useEffect(()=>{
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ])
  .then((all) => {
  setState(prev => ({ ...prev, days:all[0].data, appointments:all[1].data, interviewers: all[2].data}))
  })
},[])

//Main logic for the booking of an interview. Potentially alters the spots remaining for a day, depending on the "update" argument
function bookInterview(id, interview,update) {
  //Updates local state
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  setState({
    ...state,
    appointments
  });
  if(update){
    const today = state.days.find(day => day.appointments.includes(id));
    const newDays = [...state.days];
    const dayToChangeSpotsFor = newDays.find(newDay => newDay.id === today.id);
    dayToChangeSpotsFor.spots = dayToChangeSpotsFor.spots -1;
  }
  //Updates persistence layer information
  return axios.put('/api/appointments/'+id, {interview})  
}

//Similar as above, but for deleting a specific interview. Always updates the spots remaining. 
function deleteInterview(id) {
  //Updates local state
  const appointment = {
    ...state.appointments[id],
    interview: null 
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const today = state.days.find(day => day.appointments.includes(id));
  const newDays = [...state.days];
  const dayToChangeSpotsFor = newDays.find(newDay => newDay.id === today.id);
  dayToChangeSpotsFor.spots = dayToChangeSpotsFor.spots + 1;
  //Sends updated information to the API
  return axios.delete('/api/appointments/'+id)
  //updates state after AXIOS, in case an error occurs, so we don't have a discrepency between remote and local state
  .then(()=>{
    setState({
      ...state,
      appointments
    })
  })  
}

return { state, setDay, bookInterview, deleteInterview };

}
