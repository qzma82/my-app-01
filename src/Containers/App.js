import './App.css';
import Load from '../Components/Loading/Loading'
import Search from '../Components/Search/Search'
import Image from '../Components/ImageView/ImageView'
import Mapper from '../Components/Mapper/Mapper'
import Paginator from '../Components/Paginator/Paginator'
import React, { useState, useEffect } from 'react';


const App = () => {
  const [pic, setPic] = useState();
  const [exist, setExist] = useState('');
  const [picView, setView] = useState(false);
  const [activePage, setPage] = useState(1);
  const [picList, setList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [currentList, setCurrList] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((data) => setList([...data]))
      .then(setisLoading(false));
    },[]);

  const openPic = (picObj) => {
    setPic(picObj);
    changeView();
    setExist(`${picObj.albumId}${picObj.id}`);
  }
  const changeView = () => setView(!picView);
  const dosetList = (data) => setList(data);
  const dosetPage = (data) => setPage(data);
  const paginate = (pnum) => setPage(pnum);
  const dosetCurr = (curr) => setCurrList(curr);
  const scrollGet = () =>  window.scrollTo(0, scrollPosition)

  return (
    picView ? ( isLoading ? 
      (<Load/>):(<Image pic={pic} changeView={changeView}/>)
    ):(
      <div><Search picList={picList} dosetList={dosetList} dosetPage={dosetPage}/>
      {isLoading ? 
      (<Load/>):(<div onLoad={scrollGet}><Mapper currentList={currentList} exist={exist} openPic={openPic} setScrollPosition={setScrollPosition}/></div>)}
        <Paginator activePage={activePage} picList={picList} paginate={paginate} dosetCurr={dosetCurr}/>
      </div>
    )
  );
}
export default App;
