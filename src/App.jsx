import React,{ useEffect,useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInit from './lib/SceneInit';
import back_hamburger from '../assets/back_yard_burgers/untitled.glb';
import realistic_hamburger from '../assets/realistic_burger/untitled.glb';
import pizza from '../assets/pizza/pizza.glb';
import logo from "./icons/hamburgermenu.png";
import logomain from "../src/icons/logo.png";
import hamburgers from "../src/icons/hamburger.png";
import Box from '@mui/material/Box';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import SignInSide from './Contact';
import About from './About';
import menu from "../src/icons/realmenu.png";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  boxShadow: 100,
};

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [hamburger, setHamburger] = useState(0);
  const [modals, setModal] = useState("About");
  const [open, setOpen] = React.useState(false);
  const [showResults, setShowResults] = useState(false);
  function handleOpen(which) {
    setOpen(true);
    setModal(which);
    setShowNavbar(false);
  } 
  const handleClose = () => setOpen(false);

  var number=hamburger;

  const test = new SceneInit('myThreeJsCanvas');

  const glftLoader = new GLTFLoader();
  let loadedModel;
  let loadedModel2;
  let loadedModel3;

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const nextModel = () => {
    number=number+1;
    setHamburger(number%3);
  }

  const prevModel = () => {
    number=number-1;
    setHamburger(number%3);
  }


  useEffect(() => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/js/libs/draco/')
        glftLoader.setDRACOLoader(dracoLoader)
        test.initialize();


        glftLoader.load(realistic_hamburger, (gltfScene) => {
          loadedModel = gltfScene;
          gltfScene.scene.rotation.y = Math.PI / 8;
          gltfScene.scene.position.y = -11;
          gltfScene.scene.scale.set(0.55, 0.55, 0.55);
          test.animate();
          animate();
        });

        glftLoader.load(pizza, (gltfScene) => {
          loadedModel3 = gltfScene;
          gltfScene.scene.rotation.y = Math.PI / 8;
          loadedModel3.scene.rotation.x = 90;
          gltfScene.scene.position.y = -2;
          gltfScene.scene.scale.set(0.45, 0.45, 0.45);
          test.animate();
          animate();
        });

        glftLoader.load(back_hamburger, (gltfScene) => {
          loadedModel2 = gltfScene;
          gltfScene.scene.rotation.y = Math.PI / 8;
          gltfScene.scene.scale.set(11, 11, 11);
          gltfScene.scene.position.y = 1;
          test.animate();
          animate();
        });
      

      const animate = () => {

          if(hamburger==0 &&loadedModel ){
              test.scene.add(loadedModel.scene);
              loadedModel.scene.rotation.y += 0.01;
              setShowResults(true);
          }else if(hamburger==1 &&loadedModel2 ){
            test.scene.add(loadedModel2.scene);
            loadedModel2.scene.rotation.y += 0.01;
            setShowResults(true);
        }else if(hamburger==2 &&loadedModel3 ){
          test.scene.add(loadedModel3.scene);
          loadedModel3.scene.rotation.y += 0.01;
          setShowResults(true);
      }
      
        requestAnimationFrame(animate);
      };



    }, [number]);



  return (
    <div>
      <canvas class="bg" id="myThreeJsCanvas" />
      <div id='info'>
          <nav className="navbar ">
          <div className="container">
            <div className="logo">
              <img src={logomain} ></img>
            </div>
            <div className="menu-icon" onClick={handleShowNavbar}>
              <img src={hamburgers} ></img>
            </div>
            <div className={`nav-elements  ${showNavbar && 'active'}`}>
              <ul>
                <li>
                  <a href='\'>Home</a>
                </li>
                <li>
                <a onClick={() => handleOpen("Menu")}>Menu</a>
                </li>
                <li>
                <a onClick={() => handleOpen("About")}>About</a>
                </li>
                <li>
                <a onClick={() => handleOpen("Contact")}>Contact</a>
                </li>
                <li><a></a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='information'>
              <p className='our'>{ hamburger==0 ? "Our Classic" : "Our Special"}</p>
              { hamburger==0 || hamburger==1 ?
                  <p className='burger'> Burger </p>
                  :
                  <p className='pizza'> Pizza </p>
              }
        </div>
        <div className='information2'>
              <p className='info2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit,</p>
              <p className='info2'>incididunt ut labore et dolore magna aliqua. </p>
        </div>
        <a class="fixedButton first" href>
            <div class="roundedFixedBtn"><i class="fa fa-twitter"></i></div>
          </a>
          <a class="fixedButton second" href>
            <div class="roundedFixedBtn"><i class="fa fa-instagram"></i></div>
          </a>
          <a class="fixedButton third" href>
            <div class="roundedFixedBtn"><i class="fa fa-facebook"></i></div>
          </a>
          {showResults==true ? (
              <button onClick={nextModel} className='arrowdiv'>
              ☛
              </button>) : (
                <div></div>
           )}

          <div class="column">
            
              {hamburger!=0 && showResults==true ? (
                <div><button onClick={prevModel} className='arrowdiv2'>☚</button></div>
              ) : (
                <div></div>
              )}
              {showResults==true ? (
                <div><button onClick={nextModel} className='arrowdiv3'>☛</button></div>
              ) : (
                <div></div>
              )}

          </div>
          <div className="myDiv">
             <img className="image" src={logo}/>
          </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ModalClose  />
                {(() => {
                if (modals=="About") {
                  return (
                    <About></About>
                  )
                } else if (modals=="Menu") {
                  return (
                    <img className='menu' src={menu}></img>
                  )
                } else {
                  return (
                    <SignInSide></SignInSide>
                  )
                }
              })()}
        </Box>
      </Modal>
    </div>
  );
}

export default App;
