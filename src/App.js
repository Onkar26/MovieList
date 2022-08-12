import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './App.css';
import Details from './Details';

// manually define key liked to ""

const flex = {
    backgroundColor: "#a5aea5",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center"
}

const searchBar = {
    textAlign: "center", 
    padding: "20px", 
    backgroundColor: "#c4d7a6",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "medium"
}



function App() {
    const [imdbID, setId] = useState("")
    const [list, setList] = useState([])
    var exId = "tt3896198"

    if(localStorage.getItem("liked")) ;
    else localStorage.setItem("liked", "")

    useEffect(()=>{
        fetch(`http://www.omdbapi.com/?s=${imdbID}&apikey=5051b53`).then(Response => Response.json()).then(Response => {
            if(Response.Response==="True"){
                console.log(Response.Search)
                
                //setList(JSON.parse(localStorage.getItem("search")))
                localStorage.setItem("search", JSON.stringify(Response.Search))
                localStorage.setItem("Movie", "")
                //setList(Response.Search) 
            }
                
        })
        if(imdbID==="" && localStorage.getItem("Movie")) setList(JSON.parse(localStorage.getItem("search"))); 
    },[imdbID])
  return (
    <>  

        <div  style={searchBar}>
            <input placeholder='Search Movies...' onChange={(e)=>{
                setId(e.target.value)
            }} />
            <button onClick={()=>{
                //localStorage.setItem("id", )
                setList(JSON.parse(localStorage.getItem("search")))
            }}>Search</button>
            <Link to="/Liked" style={{marginLeft: "30px"}}>Liked Movies</Link>
        </div>
        <div style={flex}>
            {list.map((item)=> {
                console.log("hi", item )
                return(
                <div>
                    <button className='movie' onClick={()=> {
                        localStorage.setItem("Movie", JSON.stringify(item)); 
                        setId("")}}>
                        <Link to={`/Details=${item.imdbID}`}>
                            <img height='300px' width='216px'  src={item.Poster}></img> 
                            <h2 style={{marginTop: "5px", fontWeight: "bold"}}>{item.Title}</h2>
                        </Link>
                    </button>  
                </div>  
              )
            })}
        </div>
        
    </>
    
  )
}

export default App;
