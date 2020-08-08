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





export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DEL = 'ERROR_DEL';
  const DELETING = 'DELETING'


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id,interview)
    .then(()=>transition(SHOW))
    .catch((e)=>transition(ERROR_SAVE,true))
  }

  function del(id){
    transition(CONFIRM)
  }

  function delConfirmed(id){
    transition(DELETING,true)
    props.deleteInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch((e)=>transition(ERROR_DEL,true))
  }
  function edit(){
    transition(EDIT)
  }


  return(<article className="appointment">
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
          studentName = {props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save} 
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




