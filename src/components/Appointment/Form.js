
import InterviewerList from 'components/InterviewerList';
import Button from "components/Button";
import React, { useState } from 'react'


//This component is a form that allows users to edit the given interview information
export default function Form(props) {
  //State is tracked to allow user to keep previous information upon hitting the "edit" button
  const [name, setStudentName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  //used to cancel user changes
  const reset = () => {
    setInterviewer(null)
    setStudentName('')
  };
  //Calls previous function
  const cancel = () => {
    props.onCancel();
    reset();
  }

  
  //Error handling on user input
  const [error, setError] = useState("");
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    setError("");
    props.onSave(name, interviewer);
  }
  
  const save = ()=>{
    props.onSave(name,interviewer)
  };
  return(<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name='name'
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(event) => setStudentName(event.target.value)}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>);
}