import React, { useState } from 'react'

const Search = (props) => {
    const [originalList, setOrList] = useState([]);
    const [isFirst, setBul] = useState(true)
    const inputHandler = (data) => {
        if (isFirst) {setOrList(props.picList);setBul(false);}
          let x = data.target.value.length;
          let pl =[];
          if(x>=3){
            props.picList.map(picture => {
              if(picture.title.includes(data.target.value)) {
                return pl.push(picture);
              }
              return null;
            });
            props.dosetList([...pl]);
          }else props.dosetList(originalList);
          props.dosetPage(1);
      }
    return (
        <div><label>Serch: </label><input onChange={inputHandler}/></div>
    )
}
export default Search;