import React from "react";
import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import {getAppointmentsForDay} from '../helpers/selectors.js' 
import {getInterview} from '../helpers/selectors.js' 
import {getInterviewersForDay} from 'helpers/selectors'
import useApplicationData from '../hooks/useApplicationData.js'

//This is the main application component
export default function Application(props) {

  //Tracks state for which day is selected and existing interviews
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();
  
  //Returns all the appointments and interviewers corresponding to the current state, and performs some
  //formatting on the data to provide adequate information to the components
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state,state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    //Returns a number of appointments with all the information obtained above
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview ={bookInterview}
        deleteInterview={deleteInterview}
      />
    );
  });

  //Main application can be found here
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu"><DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
