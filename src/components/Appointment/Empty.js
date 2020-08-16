import React from "react";

//This component will be used to render an empty interview slot
export default function Header(props) {
  return(<main className="appointment__add">
  <img
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick={props.onAdd}
  />
</main>);
}
