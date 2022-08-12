import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css"  

const listView = {
  backgroundColor: "#a5aea5",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center"
}


function Liked() {
  return (
    <>
        <div style={{textAlign: "center", fontWeight: "bold", fontSize: "25px", color: "red", padding: "30px", borderStyle: "solid", borderWidth: "3px", borderColor: "black"}}>Liked Movies</div>
        <div style={listView}>
            { localStorage.getItem("liked").split("|").map((movie)=>{ 
              if(movie.length>0)
                  return (
                    <div className="movie" style={{height: "380px"}}>
                      <img style={{height: "300px", width: "220px"}} src={movie.split("+")[1]}></img> 
                      <div style={{textAlign: "center",padding: "10px",paddingBottom: "30px"}}>{movie.split("+")[0]}</div>
                    </div>
                      
                  )
            })}
        </div>      
    </>
  );
}

export default Liked;
