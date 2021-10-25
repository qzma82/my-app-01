import React, { useState } from "react";

const Paginator = (props) => {
    const [activePage, setPage] = useState(1);
    const [perPage] = useState(10);
    const paginate = (pnum) => setPage(pnum);

    const lastPost = activePage * perPage;
    const firstPost = lastPost - perPage;
    props.currList(props.picList.slice(firstPost, lastPost));
    const pageNum = [];
    for(let i = 1; i <=Math.ceil(props.picList.length/perPage); i++){
        pageNum.push(i);
    }
    
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
    return (
        <nav><button onClick={() => paginate(activePage===1 ? activePage : activePage-1)}>previous</button>
            {short.map(num => (
              <object key={num} style = {activePage === num ? style2:style1}>
                <a onClick={() => paginate(num)}href="!#">{num}</a>
              </object>
            ))}
            <button onClick={() => paginate(activePage===pageNum.length ? activePage : activePage+1)}>next</button>
            <p>Total pages: {pageNum.length} Total pic: {props.picList.length}</p>
        </nav>
    )
}
export default Paginator;