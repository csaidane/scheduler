
import InterviewerList from 'components/InterviewerList';
import Button from "components/Button";
import React, { useState } from 'react'


export default function Form(props) {
  const [studentName, setStudentName] = useState(props.studentName || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setInterviewer(null)
    setStudentName('')
  };
  const cancel = () => {
    props.onCancel();
    reset();
  }
  const save = ()=>{
    props.onSave(studentName,interviewer)
  };
  return(<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name='name'
        type="text"
        placeholder="Enter Student Name"
        value={studentName}
        onChange={(event) => setStudentName(event.target.value)}
      />
    </form>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={save}>Save</Button>
    </section>
  </section>
</main>);
}