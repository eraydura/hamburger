import { useEffect,useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInit from './lib/SceneInit';
import logo from "./icons/hamburgermenu.png";

function App() {
  const [showNavbar, setShowNavbar] = useState(false)
  const [hamburger, setHamburger] = useState(0)
  var number=hamburger;

  const test = new SceneInit('myThreeJsCanvas');

  const glftLoader = new GLTFLoader();
  let loadedModel;
  let loadedModel2;

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const nextModel = () => {
    number=number+1;
    setHamburger(number%2);
  }


  useEffect(() => {

        test.initialize();

        glftLoader.load('./assets/back_yard_burgers/scene.gltf', (gltfScene) => {
          loadedModel = gltfScene;
          gltfScene.scene.rotation.y = Math.PI / 8;
          gltfScene.scene.position.y = 1;
          gltfScene.scene.scale.set(0.8, 0.8, 0.8);
          test.animate();
          animate();
        });

        glftLoader.load('./assets/realistic_burger/scene.gltf', (gltfScene) => {
          loadedModel2 = gltfScene;
          gltfScene.scene.rotation.y = Math.PI / 8;
          gltfScene.scene.scale.set(0.6, 0.6, 0.6);
          gltfScene.scene.position.y = -11;
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
        }
      
        requestAnimationFrame(animate);
      };



    }, [number]);



  return (
    <div >
      <canvas class="bg" id="myThreeJsCanvas" />
      <div id='info'>
      <nav className="navbar ">
      <div className="container">
        <div className="logo">
           <img src="../src/icons/logo.png" ></img>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src="../src/icons/hamburger.png" ></img>
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
          <div className='our'>{ hamburger==0 ? "Our Classic" : "Our Special"}</div>
          <div className='burger'>Burger</div>
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

      <button className='arrowdiv' onClick={nextModel}>
        &#10148;
      </button>
      </div>
      <div className="myDiv">

<img className="image" src={logo}/>

      </div>
    

      </div>
  );
}

export default App;
