"use client"
import React, { useRef, useState, useEffect, useContext } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Stars, OrthographicCamera, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Share } from 'next/font/google';



function SpaceBackground({SharedStateContext}) {  

    function ShootingStar() {
        const mesh = useRef();
        const [position, setPosition] = useState([Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400]);
        const [speed] = useState(() => Math.random() * 1);
      
        useFrame(() => {
          mesh.current.position.x -= speed;
          mesh.current.position.y -= speed;
          if (mesh.current.position.x < -200 || mesh.current.position.y < -200) {
            setPosition([Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400]);
          }
        });
      
        return (
          <mesh ref={mesh} position={position} style={{zIndex : -2}}>
            <sphereGeometry args={[0.5, 8, 0]} />
            <meshBasicMaterial color="#FFFF99" />
          </mesh>
        );
      }
      function Camera() {
          const { camera, size } = useThree();
        
          useEffect(() => {
            camera.aspect = size.width / size.height;
            camera.updateProjectionMatrix();
          }, [camera, size.width, size.height]);
        
          return null;
        }
      function Planet({position, image}) {
          const { sharedState, setSharedState } = useContext(SharedStateContext);

          const mesh = useRef();
          const clicked = () =>{
          
              setSharedState(position[0])
          }
          const texture = useLoader(THREE.TextureLoader, image);
          useFrame(() => (mesh.current.rotation.y += 0.01));
          return (
            <mesh onPointerDown={()=>clicked(position)}  ref={mesh} position={position} style={{zIndex : 5}}>
              <sphereGeometry args={[0.5, 128, 128]} />
              <meshBasicMaterial map={texture}/>
              
            </mesh>
          );
        }
          const delay = ms => new Promise(res => setTimeout(res, ms));

        function Sun({ image}) {
          const mesh = useRef();
          const { sharedState, setSharedState } = useContext(SharedStateContext);

          const texture = useLoader(THREE.TextureLoader, image);
          // State to control the direction of the bounce
          const [up, setUp] = React.useState(true);
          const [bouncing, setBouncing] = React.useState(true);

          const [targetLeft, setTargetLeft] = useState(sharedState);

          useEffect(() => {
            setBouncing(false)
            mesh.current.position.y = 3.5
            delay(400)
            .then(()=>{             
                setTargetLeft(sharedState);
                setBouncing(true)
            })         
          }, [sharedState]);

          useFrame((state, delta) => {
              // Adjust the bounce speed and height as needed
              const bounceSpeed = 0.11; // Speed of bounce
              const bounceHeight = 0.087; // Max height of bounce
              if(bouncing){
                if (up) {
                    mesh.current.position.y += bounceSpeed * delta;
                    if (mesh.current.position.y >= 3.5 + bounceHeight) setUp(false);
                    } else {
                    mesh.current.position.y -= bounceSpeed * delta;
                    if (mesh.current.position.y <= 3.5) setUp(true);
                    }
              }
              
              const positionSpeed = 10; // Speed of horizontal position change
              mesh.current.position.x += (sharedState - mesh.current.position.x) * positionSpeed * delta;
          });
          return (
            <mesh  ref={mesh} position={[targetLeft,3.5,0.0]} style={{zIndex : 5}}>
              <sphereGeometry args={[0.16, 128, 128]} />
              <meshBasicMaterial map={texture}/>
              
            </mesh>
          );
        }
      
      
        const ResizeHandler = () => {
          const { camera, gl,size } = useThree();
          const aspect = size.width / size.height;
          camera.aspect = aspect
          camera.updateProjectionMatrix()
          useEffect(() => {
              
            const handleResize = () => {
              // Update camera
              camera.aspect = gl.domElement.clientWidth / gl.domElement.clientHeight;
              camera.updateProjectionMatrix();
              // Update renderer
              gl.setSize(gl.domElement.clientWidth, gl.domElement.clientHeight);
            };
        
            // Handle the resize event
            window.addEventListener('resize', handleResize);
            // Ensure canvas has correct size when component mounts
            handleResize();
        
            // Cleanup
            return () => {
              window.removeEventListener('resize', handleResize);
            };
          }, [camera, gl]); // Empty dependency array means this effect runs once on mount
        
          return null;
        };

        function Button({ image, left, top, link }) {
            const mesh = useRef();
            const { size } = useThree();
            const aspectRatio = size.width / size.height;
            const texture = useLoader(THREE.TextureLoader, image);
            useFrame(() => (mesh.current.rotation.y += 0.01));
            const clicked = ()=>{
                window.open(link, '_blank');
            }
            return (
                <mesh ref={mesh} onClick={clicked} position={[left * aspectRatio, top * aspectRatio, 0]}>
                <boxGeometry args={[0.8, 0.8, 0.8]} /> 
                <meshBasicMaterial attach="material" map={texture} />
              </mesh>
            );
          }


  
  return (
    
    <Canvas style={{ position: 'fixed', top: 0, left: 0}}>
      <Stars color="#FFFF99" style={{color : "#FFFF99"}} />
     
      <Camera/>
      <Button image={"linkedin.png"} left={-3.2} top={0.65} link={"https://www.linkedin.com/in/cole-leisen"}></Button>
      <Button image={"github.png"} left={-3.2} top={0} link={"https://github.com/coleleisen"}></Button>

      <Sun image={"sun.png"}></Sun>
      <Planet  position={[-1.8,2.7,0.0]} image={"lavaplanet.png"}></Planet>
      <Text
        color="white" // Default color
        anchorX="center" // Horizontal anchor
        anchorY="middle" // Vertical anchor
        fontSize={0.2}
        
        position={[-1.8, 1.9, 0]} // Position in 3D space
      >
        About cole
      </Text>
      <Planet   position={[-0.4,2.7,0]} image={"planet.png"}></Planet>
      <Text
        color="white" // Default color
        anchorX="center" // Horizontal anchor
        anchorY="middle" // Vertical anchor
        fontSize={0.2}
        
        position={[-0.4, 1.9, 0]} // Position in 3D space
      >
        Experience
      </Text>
      <Planet position={[1,2.7,0]} image={"greenland.png"}></Planet>
      <Text
        color="white" // Default color
        anchorX="center" // Horizontal anchor
        anchorY="middle" // Vertical anchor
        fontSize={0.2}
        
        position={[1, 1.9, 0]} // Position in 3D space
      >
        Projects
      </Text>
      <Planet position={[2.4,2.7,0]} image={"gasplanet.png"}></Planet>
      <Text
        onPointerDown={()=>console.log('here')}
        color="white" // Default color
        anchorX="center" // Horizontal anchor
        anchorY="middle" // Vertical anchor
        fontSize={0.2}
        
        position={[2.4, 1.9, 0]} // Position in 3D space
      >
        Skills
      </Text>
      {[...Array(50)].map((_, i) => <ShootingStar key={i} />)


}
    </Canvas>
 
  );
}

export default SpaceBackground;
