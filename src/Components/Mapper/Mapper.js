import React from "react";

const Mapper = (props) => {
    
    const handleScroll = () => {
      let position = window.pageYOffset;
      props.setScrollPosition(position);
    };
    
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
        <ul>
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