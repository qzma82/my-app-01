import './App.css';
import Load from '../Components/Loading/Loading'
import Search from '../Components/Search/Search'
import Image from '../Components/ImageView/ImageView'
import Mapper from '../Components/Mapper/Mapper'
import React, { useState, useEffect } from 'react';


const App = () => {
const [pic, setPic] = useState();
const [exist, setExist] = useState('');
const [picView, setView] = useState(false);
const [activePage, setPage] = useState(1);
const [picList, setList] = useState([]);
const [isLoading, setisLoading] = useState(true);

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then((res) => res.json())
    .then((data) => setList([...data]))
    .then(setisLoading(false));
  },[]);
  
  const [perPage] = useState(10);
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

  const openPic = (picObj) => {
    setPic(picObj);
    changeView();
    setExist(`${picObj.albumId}${picObj.id}`);
  }
  const changeView = () => setView(!picView);
  const dosetList = (data) => setList(data);
  const dosetPage = (data) => setPage(data);

  return (
    picView ? ( isLoading ? 
      (<Load/>):(<Image pic={pic} changeView={changeView}/>)
    ):(
      <div><Search picList={picList} dosetList={dosetList} dosetPage={dosetPage}/>
      {isLoading ? 
      (<Load/>):(<div><Mapper currentList={currentList} exist={exist} openPic={openPic}/></div>)}
        <nav><button onClick={() => paginate(activePage===1 ? activePage : activePage-1)}>previous</button>
            {short.map(num => (
              <object key={num} style = {activePage === num ? style2:style1}>
                <a onClick={() => paginate(num)}href="!#">{num}</a>
              </object>
            ))}
            <button onClick={() => paginate(activePage===pageNum.length ? activePage : activePage+1)}>next</button>
            <p>Total pages: {pageNum.length} Total pic: {picList.length}</p>
        </nav>
      </div>
    )
  );
}
export default App;
