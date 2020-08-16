import React from "react";
import "components/Appointment/styles.scss";
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import useVisualMode from 'hooks/useVisualMode'
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';




/*
the appointment component represents the clickable appointments a user can interact with. This file is the index
for all possible versions of the appointments. This component tracks the state of a given appointment. 
If a user creates, deletes, edits, or otherwise interacts with the appointment, the other files in /Appointment 
will be rendered appropriately based on the current state
*/
export default function Appointment(props) {

  //Constants for state tracking and conditionnal rendering
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DEL = 'ERROR_DEL';
  const DELETING = 'DELETING'

  //Custom hook used to transition and track the history of an appointment
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Error handling save function for updating an appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id,interview, true)
    .then(()=>transition(SHOW))
    .catch((e)=>transition(ERROR_SAVE,true))
  }

  //Same as above, but this time the function does not update the spots remaining (see BookInterview function)
  function saveEdit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id,interview, false)
    .then(()=>transition(SHOW))
    .catch((e)=>transition(ERROR_SAVE,true))
  }

  
  //Seeks confirmation from the user before deleting an appointment
  function del(id){
    transition(CONFIRM)
  }
  //User confirms, be perform the appropriate operations
  function delConfirmed(id){
    transition(DELETING,true)
    props.deleteInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch((e)=>transition(ERROR_DEL,true))
  }
  //Renders the form for updating a given appointment
  function edit(){
    transition(EDIT)
  }


  //Actual component, conditionnal rendering based on the current state
  return(<article className="appointment" data-testid="appointment">
    <Header time={props.time}/>
  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer.name}
      onEdit = {edit}
      onDelete={del}
    />
  )}
  {mode === CREATE && (<Form interviewers={props.interviewers}
          onSave={save} 
          onCancel={back} />)}
  {mode === EDIT && (<Form interviewers={props.interviewers}
          name = {props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={saveEdit} 
          onCancel={back} />)}
          
  {mode === SAVING && (
    <Status
    message= "Saving, please wait"
    />
  )}
  {mode === DELETING && (
    <Status
    message= "Deleting, please wait"
    />
  )}
  {mode === ERROR_SAVE && (
    <Error
    message= "Could not save appointment"
    onClose ={back}
    />
  )}
  {mode === ERROR_DEL && (
    <Error
    message= {"Could not Delete Appointment"}
    onClose ={back}
    />
  )}
  {mode === CONFIRM && (
    <Confirm
    message= "Are you sure ? This action cannot be reversed"
    onCancel={back}
    onConfirm={delConfirmed}
    />
  )}
  </article>);
}




