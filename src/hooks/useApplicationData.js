import {useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});
const setDay = day => setState({ ...state, day });

useEffect(()=>{
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ])
  .then((all) => {
    setState(prev => ({days:all[0].data, appointments:all[1].data, interviewers: all[2].data}))
  })
},[])

function bookInterview(id, interview,update) {
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
  return axios.put('/api/appointments/'+id, {interview})  
}

function deleteInterview(id) {
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
  return axios.delete('/api/appointments/'+id)
  .then(()=>{
    setState({
      ...state,
      appointments
    })
  })  
}

return { state, setDay, bookInterview, deleteInterview };

}
