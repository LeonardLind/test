import { useState, Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'

import HomeInfo from '../components/HomeInfo';
import JustMaybe from "../assets/JustMaybe.mp3";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Island, Plane, Sky, Plane1, Plane2, Bird1 } from "../models";


const Home = () => {
  const audioRef = useRef(new Audio(JustMaybe));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);


  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;
    let rotation = [0.1, 4.7, 0]

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [0.1, 0.1, 0.1];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [0.2, 0.2, 0.2]; //3,3,3 for default plane
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  return (
    <section className="w-full h-screen relative">
       <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
        </div> 

      <Canvas 
      className={`w-full h-screen bg-transparent ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}

      camera={{near: 0.1, far: 1000}}
      >

        <Suspense fallback={<Loader />}>
        <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          />


       


        <Bird1 />

        <Sky isRotating={isRotating} />

        <Island 
        position={islandPosition}
        scale={islandScale}
        rotation={islandRotation}
        isRotating={isRotating}
        setIsRotating={setIsRotating}
        setCurrentStage={setCurrentStage}
        />
         <Plane2
         isRotating={isRotating}
         position={biplanePosition}
         rotation={[0, 20.1, 0]}
         scale={biplaneScale}
         />
        </Suspense>

      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        />
      </div>

    </section>
  )
}

export default Home