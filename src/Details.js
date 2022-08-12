import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const listView = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "50px",
  marginBottom: "50px",
  padding: "20px",
  borderStyle: "solid",
  borderWeight: "3px",
  backgroundColor: "lightgray",
  borderStyle: "solid", 
  borderWidth: "2px"
};

const plot1 = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  marginTop: "50px",
  marginBottom: "50px",
  padding: "20px",
  borderStyle: "solid",
  borderWidth: "3px",
  backgroundColor: "lightgray",
  width: "700px"
};

// normal variable
var resp_util = 1;

function Details() {
  const [liked, setLiked] = useState(new Set());
  let { id } = useParams();
  //state variable
  const [resp, setResp] = useState({});
  const movie = JSON.parse(localStorage.getItem("Movie"));
  console.log("render");

  // it is async path so 1st resp_util will be displayed
  // fetch(`http://www.omdbapi.com/?i=${id}&apikey=5051b53`)
  //   .then((Response) => Response.json())
  //   .then((Response) => {
  //     if (Response.Response === "True") {
  //       console.log(resp_util, "resp_util");
  //       resp_util = (
  //         <div style={plot1}>
  //           <div
  //             style={{ borderStyle: "solid", padding: "3px" }}
  //           >{`Actors : ${Response.Actors}`}</div>
  //           <div
  //             style={{
  //               textAlign: "center",
  //               fontSize: "50px",
  //               textWeight: "bold",
  //               marginBottom: "10px",
  //               textDecoration: "underline",
  //             }}
  //           >
  //             Plot
  //           </div>
  //           <div>{Response.Plot}</div>
  //         </div>
  //       );
  //       console.log(resp_util, "resp_util");
  //     }
  //   })

  useEffect(() => {
    if (resp !== {})
      fetch(`http://www.omdbapi.com/?i=${id}&apikey=5051b53`)
        .then((Response) => Response.json())
        .then((Response) => {
          if (Response.Response === "True") {
            console.log("useeffect fetch");
            setResp(Response);
          }
        });
  }, []);

  console.log("end");

  return (
    <div
      style={{
        backgroundColor: "lightgreen",
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap"
      }}
    >
      <div style={{ display: "flex", justifyContent: "center"}}>
        <div style={listView}>
          <div>
            <img src={movie.Poster}></img>
          </div>
          <div style={{ textWeight: "bold" }}>
            <span>Title :</span>
            {` ${movie.Title}`}
          </div>
          <div>
            <span>Year :</span>
            {` ${movie.Year}`}
          </div>
          <div>{`IMDB ID : ${movie.imdbID}`}</div>
          <button
            style={{ margin: "10px" }}
            onClick={() => {
              // let liked = new Set([...(localStorage.getItem("liked")) , movie])
              let update = new Set([
                ...localStorage.getItem("liked").split("|"),
                movie.Title.concat(` + ${movie.Poster}`),
              ]);
              setLiked(update);
              localStorage.setItem("liked", Array.from(update).join("|"));
              console.log(update, localStorage.getItem("liked"));
            }}
          >
            Add to Liked
          </button>
        </div>
      </div>

      <div style={plot1}>
        <div
          style={{ padding: "3px" , borderStyle: "solid", borderWidth: "2px" }}
        >{`Actors : ${resp.Actors}`}</div>
        <div
          style={{
            margin: "30px",
            textAlign: "center",
            fontSize: "50px",
            textWeight: "bold",
            textDecoration: "underline",
          }}
        >
          Plot
        </div>
        <div style={{textAlign: "justify"}}>{resp.Plot}</div>
      </div>
    </div>
  );
}

export default Details;
