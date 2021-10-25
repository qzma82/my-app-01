import React from "react";

const imageView = (props) => {
    return (
    <div ><button onClick={props.changeView}>Back</button>
    <p>{props.pic.title}</p>
    <div><img src={props.pic.url} alt={props.pic.title} /></div>
    </div>
    )
}
export default imageView;