import React from "react";
import logo from "./img/logo.png";
import Particles from "react-tsparticles";
import sphere from "./img/sphere.png"
import { useState } from "react";
import "./App.css";

function App() {
  const [searchText,setSearchText] = useState();
  return (
    <div className="App">
      <div className="top">
        <div className="skyblue"></div>
        <div className="navbar flex">
          <div className="navbar-left">
            <img src={logo} alt="logo" />
          </div>
          <div className="navbar-right flex">
            <a href="#home">Home</a>
            <a href="#search-password">Search Passwords</a>
            <a href="#strength-checker">Strength Checker</a>
          </div>
        </div>
        <img className="sphere" src={sphere} alt="sphere cyber hexagon blue" />
      </div>

      <div id="home" className="first-section">
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: {
                value: "#0d47a1",
              },
            },
            fpsLimit: 25,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 5,
              },
            },
            detectRetina: true,
          }}
        />
        <h1 className="breach">Breach</h1>
        <h1 className="checker"> Checker</h1>
        <div className="blackblue"></div>
      </div>
      <div id="search-password" className="second-section">

          <input type="text" onChange={(e)=>setSearchText(e.target.value)} placeholder="Enter your username/password" />

      </div>
    </div>
  );
}

export default App;
