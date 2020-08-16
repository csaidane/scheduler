import React from "react";
import "components/InterviewerListItem.scss";
var classnames = require('classnames');

//This component represents all the interviewers available to book an interview with, and includes information such as
//their names, picture, etc.
export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item",{
    "interviewers__item--selected":props.selected
  });
  return (
    <li className={interviewerClass} onClick={props.setInterviewer} >
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  );
}

