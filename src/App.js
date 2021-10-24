import './App.css';
import React, { useState, useEffect } from 'react';


const App = () => {
const [exist, setExist] = useState('');
const [picView, setView] = useState(false);
const [activePage, setPage] = useState(1);
const [perPage] = useState(10);
const [picList, setList] = useState([]);
const [originalList, setOrList] = useState([]);
const [isFirst, setBul] = useState(true)
const [isLoading, setisLoading] = useState(true);

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then((res) => res.json())
    .then((data) => setList([...data]))
    .then(setisLoading(false));
  },[]);
  
const inputHandler = (props) => {
  if (isFirst) {setOrList(picList);setBul(false);}
    let x = props.target.value.length;
    let pl =[];
    if(x>=3){
      picList.map(picture => {
        if(picture.title.includes(props.target.value)) {
          return pl.push(picture);
        }
        return null;
      });
      setList([...pl]);
    }else setList(originalList);
}

  const lastPost = activePage * perPage;
  const firstPost = lastPost - perPage;
  const currentList = picList.slice(firstPost, lastPost);
  const pageNum = [];
  for(let i = 1; i <=Math.ceil(picList.length/perPage); i++){
    pageNum.push(i);
  }
  const paginate = (pnum) => setPage(pnum);
  const short = pageNum.slice(activePage-6>0 ? activePage-6 : 0, activePage+5<pageNum.length ? activePage+5 : pageNum.length)
  
  const style1 = {
    color: 'black',
    backgroundColor: 'white',
    margin: '2px'
  };
  const style2 = {
    color: 'red',
    backgroundColor: 'grey',
  };
  const style3 = {
    color: 'salmon',
    backgroundColor: 'lightgrey',
    border: '2px',
    margin: '5px'
  };
  
  const [pic, setPic] = useState();
  const openPic = (picObj) => {
    setPic(picObj);
    changeView();
    setExist(`${picObj.albumId}${picObj.id}`);
  }

  const changeView = () => setView(!picView);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
};
  const scrollGet = () =>  window.scrollTo(0, scrollPosition)

  return (
    picView ? ( isLoading ? (
      <div>Loading...</div>
    ):(
      <div ><button onClick={changeView}>Back</button>
        <p>{pic.title}</p>
        <div><img src={pic.url} alt={pic.title} /></div>
      </div>)
    ):(
      <div>
      <label>Serch: </label><input onChange={inputHandler}/>
      {isLoading ? (
        <div>Loading...</div>
      ):(
        <ul onLoad={scrollGet}>
          { Object.keys(currentList).map(picture => (
            <li key={currentList[picture].albumId+currentList[picture].id} style={exist === `${currentList[picture].albumId}${currentList[picture].id}` ? style3:style1}>
              {currentList[picture].title}
            
              <div>
                <img onClick={()=>openPic(currentList[picture])} src={currentList[picture].thumbnailUrl} alt={currentList[picture].title} onClickCapture={handleScroll}/>
              </div>

            </li>
          ))}
        </ul>
      )}
        <nav className="pagination">
            {short.map(num => (
              <object key={num} className="page-item" style = {activePage === num ? style2:style1}>
                <a onClick={() => paginate(num)}href="!#" className="page-link">{num}</a>
              </object>
            ))}
            <p>Total pages: {pageNum.length} Total pic: {picList.length}</p>
        </nav>
      </div>
    )
  );
}

export default App;
