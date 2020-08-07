export function getAppointmentsForDay(state, day) {
  let output = []
  let target = state.days.filter(d=> d.name === day)
  if(target.length === 0){
    return output;
  } else{
    for(let id of target[0].appointments){
      output.push(state["appointments"][id])
    }
  }
  return output;
}


export function getInterview(state, interview) {
  if(!interview){
    return null;
  } else{
    let id = interview['interviewer']
  let interviewer = state['interviewers'][id]
  let output = {...interview}
  output['interviewer'] = interviewer
  return output;
  }
}


export function getInterviewersForDay(state, day) {
  let output = []
  let target = state.days.filter(d=> d.name === day)
  if(target.length === 0){
    return output;
  } else{
    for(let id of target[0].interviewers){
      output.push(state["interviewers"][id])
    }
  }
  return output;
}