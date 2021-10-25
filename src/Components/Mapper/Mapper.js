import React, { useState } from "react";

const Mapper = (props) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    const scrollGet = () =>  window.scrollTo(0, scrollPosition)

    const style1 = {
        color: 'black',
        backgroundColor: 'white',
        margin: '2px'
      };
    const style2 = {
        color: 'salmon',
        backgroundColor: 'lightgrey',
        border: '2px',
        margin: '5px'
      };
    return (
        <ul onLoad={scrollGet}>
          { Object.keys(props.currentList).map(picture => (
            <li key={props.currentList[picture].albumId+props.currentList[picture].id} 
            style={props.exist === `${props.currentList[picture].albumId}${props.currentList[picture].id}` ? style2:style1}>
            {props.currentList[picture].title}
              <div>
                <img onClick={()=>props.openPic(props.currentList[picture])} src={props.currentList[picture].thumbnailUrl} alt={props.currentList[picture].title} 
                onClickCapture={handleScroll}/>
              </div>
            </li>
          ))}
        </ul>
    )
}
export default Mapper;