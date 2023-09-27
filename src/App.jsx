import { useEffect,useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInit from './lib/SceneInit';
import back_hamburger from '../assets/back_yard_burgers/untitled.glb';
import realistic_hamburger from '../assets/realistic_burger/untitled.glb';
import pizza from '../assets/pizza/pizza.glb';
import logo from "./icons/hamburgermenu.png";
import logomain from "../src/icons/logo.png";
import hamburgers from "../src/icons/hamburger.png";
import menu from "../src/icons/menu.png";

function App() {
  const [showNavbar, setShowNavbar] = useState(false)
  const [hamburger, setHamburger] = useState(0)
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


  useEffect(() => {
        
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
          gltfScene.scene.scale.set(0.45, 0.45, 0.45);
          test.animate();
          animate();
        });

        glftLoader.load(back_hamburger, (gltfScene) => {
          loadedModel2 = gltfScene;
          gltfScene.scene.rotation.y = Math.PI / 8;
          gltfScene.scene.scale.set(0.75, 0.75, 0.75);
          gltfScene.scene.position.y = 1;
          test.animate();
          animate();
        });
      

      const animate = () => {

          if(hamburger==0 ){
              test.scene.add(loadedModel.scene);
              loadedModel.scene.rotation.y += 0.01;
          }else if(hamburger==1 ){
            test.scene.add(loadedModel2.scene);
            loadedModel2.scene.rotation.y += 0.01;
        }else if(hamburger==2 ){
          test.scene.add(loadedModel3.scene);
          loadedModel3.scene.rotation.y += 0.01;
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
                  <a href="/">Home</a>
                </li>
                <li>
                <a href="/">Menu</a>
                </li>
                <li>
                <a href="/">About</a>
                </li>
                <li>
                <a href="/">Contact</a>
                </li>
                <li>
                <a href="/"></a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='information'>
              <p className='our'>{ hamburger==0 ? "Our Classic" : "Our Special"}</p>
              <p className='burger'>{ hamburger==0 || hamburger==1 ? "Burger" : "Pizza"}</p>
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
          <button onClick={nextModel} className='arrowdiv'>
              ☛
          </button>
          <div class="column">
            <div><button onClick={nextModel} className='arrowdiv2'>☚</button></div>
            <div><img className="image2" src={menu}/></div>
            <div><button onClick={nextModel} className='arrowdiv3'>☛</button></div>  
          </div>
          <div className="myDiv">
             <img className="image" src={logo}/>
          </div>
      </div>
    </div>
  );
}

export default App;
