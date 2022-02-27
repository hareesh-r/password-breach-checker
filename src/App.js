import React from "react";
import logo from "./img/logo.png";
import Particles from "react-tsparticles";
import sphere from "./img/sphere.png";
import { useState } from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState();
  const [searched, setSearch] = useState(false);
  const [hashprefix, setHashPrefix] = useState("DC7CB");
  const [hashsuffix, setHashSuffix] = useState("");
  const [responseData, setResponseData] = useState();
  const sha1 = (msg) => {
    function rotate_left(n, s) {
      var t4 = (n << s) | (n >>> (32 - s));
      return t4;
    }
    function cvt_hex(val) {
      var str = "";
      var i;
      var v;
      for (i = 7; i >= 0; i--) {
        v = (val >>> (i * 4)) & 0x0f;
        str += v.toString(16);
      }
      return str;
    }
    function Utf8Encode(string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }
      return utftext;
    }
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xefcdab89;
    var H2 = 0x98badcfe;
    var H3 = 0x10325476;
    var H4 = 0xc3d2e1f0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = [];
    for (i = 0; i < msg_len - 3; i += 4) {
      j =
        (msg.charCodeAt(i) << 24) |
        (msg.charCodeAt(i + 1) << 16) |
        (msg.charCodeAt(i + 2) << 8) |
        msg.charCodeAt(i + 3);
      word_array.push(j);
    }
    switch (msg_len % 4) {
      case 0:
        i = 0x080000000;
        break;
      case 1:
        i = (msg.charCodeAt(msg_len - 1) << 24) | 0x0800000;
        break;
      case 2:
        i =
          (msg.charCodeAt(msg_len - 2) << 24) |
          (msg.charCodeAt(msg_len - 1) << 16) |
          0x08000;
        break;
      case 3:
        i =
          (msg.charCodeAt(msg_len - 3) << 24) |
          (msg.charCodeAt(msg_len - 2) << 16) |
          (msg.charCodeAt(msg_len - 1) << 8) |
          0x80;
        break;
      default:
        break;
    }
    word_array.push(i);
    while (word_array.length % 16 !== 14) word_array.push(0);
    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);
    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
      for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
      for (i = 16; i <= 79; i++)
        W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
      A = H0;
      B = H1;
      C = H2;
      D = H3;
      E = H4;
      for (i = 0; i <= 19; i++) {
        temp =
          (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5a827999) &
          0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B, 30);
        B = A;
        A = temp;
      }
      for (i = 20; i <= 39; i++) {
        temp =
          (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ed9eba1) &
          0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B, 30);
        B = A;
        A = temp;
      }
      for (i = 40; i <= 59; i++) {
        temp =
          (rotate_left(A, 5) +
            ((B & C) | (B & D) | (C & D)) +
            E +
            W[i] +
            0x8f1bbcdc) &
          0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B, 30);
        B = A;
        A = temp;
      }
      for (i = 60; i <= 79; i++) {
        temp =
          (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xca62c1d6) &
          0x0ffffffff;
        E = D;
        D = C;
        C = rotate_left(B, 30);
        B = A;
        A = temp;
      }
      H0 = (H0 + A) & 0x0ffffffff;
      H1 = (H1 + B) & 0x0ffffffff;
      H2 = (H2 + C) & 0x0ffffffff;
      H3 = (H3 + D) & 0x0ffffffff;
      H4 = (H4 + E) & 0x0ffffffff;
    }
    var temp1 =
      cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
    temp1 = temp1.toUpperCase();
    setHashPrefix(temp1.slice(0, 5));
    setHashSuffix(temp1.slice(5, temp1.length));
    return temp1.toUpperCase();
  };

  const getresult = () => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.get(`https://api.pwnedpasswords.com/range/${hashprefix}`)
      .then(res => {
        const persons = res.data;
        var personsJSON = persons.split('\r\n');
        for(var i=0;i<personsJSON.length;i++){
          if(hashsuffix!="" && personsJSON[i].includes(hashsuffix)){
            setResponseData(personsJSON[i]);
          }
        }
      })
    setSearch(true);
  }

  const changeColor = () => {
    if(responseData && responseData.split(':')[1]>0){
      var element = document.getElementById("search-password");
      element.classList.remove("safe");
      element.classList.add("danger");
    }else{
      var element = document.getElementById("search-password");
      element.classList.remove("danger");
      element.classList.add("safe");
    }
  }

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
                speed: 3,
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
        <div className="search-box flex">
          <input
            type="text"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Enter your username/password"
          />
          <button
            onClick={() => {
              setSearch(!searched);
              sha1(searchText);
              getresult(0);
            }}
          >
            Search
          </button>
        </div>

        <div className="search-desc flex">
          <h2>Check if your email or phone is in a data breach</h2>
        </div>

        {searched ? (
          <div>
            <div className="search-results flex">
              <div className="hash-password">
                <h5>
                  Your encoded password is{" "}
                  <em>
                    {hashprefix}
                    {hashsuffix}
                  </em>
                </h5>
              </div>
              {
                (responseData && responseData.split(':')[1]>0)? (<h2 className="red">{changeColor()}Change Your password immediately{}</h2>) : (<h2 className="green">{changeColor()}Your password is not leaked anywhere{}</h2>)
              }
              
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      
              {/* <div className="breach-name">
                <h3>Name : {responseData!==null && responseData}</h3>
              </div>
              <div className="breached-place">
                <h3>Your data got breached here :</h3>
              </div>
              <div className="breach-date">
                <h3>Data breached on</h3>
              </div>
              <div className="affected-users">
                <h3>many users have been affected here</h3>
              </div>
              <div className="isdata-sensitive">
                <h3>Your leaked data is sensitive</h3>
              </div> */}
    </div>
  );
}

export default App;
