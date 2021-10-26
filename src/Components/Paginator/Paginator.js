import React, { useEffect, useCallback } from "react";

const Paginator = (props) => {
    let activePage=props.activePage;
    const picList=[...props.picList];
    const perPage= 10;
    let lastPost = activePage * perPage;
    let firstPost = lastPost - perPage;
    let curr = [...picList.slice(firstPost, lastPost)];
    const pageNum = [];
    for(let i = 1; i <=Math.ceil(picList.length/perPage); i++){
      pageNum.push(i);
    }
    const short = pageNum.slice(activePage-6>0 ? activePage-6 : 0, activePage+5<pageNum.length ? activePage+5 : pageNum.length)

    const fun = useCallback(() => {//fun start
        props.dosetCurr(curr);
    });
    useEffect(()=>{
            fun();
        }, [fun]);
    
    
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
        <nav><button onClick={() => props.paginate(activePage===1 ? activePage : activePage-1)}>previous</button>
            {short.map(num => (
              <object key={num} style = {activePage === num ? style2:style1}>
                <a onClick={() => props.paginate(num)}href="!#">{num}</a>
              </object>
            ))}
            <button onClick={() => props.paginate(activePage===pageNum.length ? activePage : activePage+1)}>next</button>
            <p>Total pages: {pageNum.length} Total pic: {picList.length}</p>
        </nav>
    )
}
export default Paginator;