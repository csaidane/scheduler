import React from "react";
import InterviewerListItem from 'components/InterviewerListItem';
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';


//Comparable to DayList, this is a clickable container for a list of all possible interviewers
export default function InterviewerList(props) {

  InterviewerList.propTypes = {
    selected: PropTypes.number,
    setInterviewer: PropTypes.func.isRequired
  };


  const outputInterviewers = props.interviewers.map(inter => {
    return (<InterviewerListItem
      key ={inter.id}
      id ={inter.id}
      name={inter.name}
      avatar={inter.avatar}
      selected={inter.id===props.interviewer}
      setInterviewer={event => props.setInterviewer(inter.id)}/>);
  });
  return (<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{outputInterviewers}</ul>
</section>)
}