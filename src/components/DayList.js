import React from "react";
import DayListItem from 'components/DayListItem';

//DayList is the container for all the daylistItems, it is to be displayed and clickable on the left side of the app
export default function DayList(props) {

  const outputDays = props.days.map(day => {
    return (<DayListItem
      key={day.id} 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  />);
  });

  return <ul>{outputDays}</ul>;
}