import React, {useState} from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei'; // for camera controls
import * as THREE from 'three';

function Page({ flip }) {
    // This spring will rotate the page by 180 degrees when flip is true
    const { rotation } = useSpring({
      rotation: flip ? [0, Math.PI, 0] : [0, 0, 0],
      config: { mass: 1, tension: 180, friction: 12 },
    });
  
    return (
      <a.mesh rotation={rotation}>
        <planeGeometry args={[1, 1.5]} />
        <meshStandardMaterial color="white" side={THREE.DoubleSide} />
      </a.mesh>
    );
  }

  function Book({openToPage}) {
    const [flip, setFlip] = useState(false);
    const { viewport } = useThree();
    const pageTexture = useLoader(TextureLoader, '/page.png'); 
    const coverTexture = useLoader(TextureLoader, '/book.png');
    const spineTexture = useLoader(TextureLoader, '/spine.png');

     // Calculate the open angle depending on the number of pages
    const openAngle = Math.min(Math.PI / 2, (openToPage * Math.PI) / 180);

    // Use spring animation to rotate the cover
    const { rotation } = useSpring({
        rotation: [-Math.PI / 2 + openAngle, Math.PI, 0],
        config: { mass: 1, tension: 180, friction: 12 },
    });
  
    const bookWidth = 1;
    const bookHeight = 1.5;
    // Simplified book model for demonstration purposes
    return (
        <a.group  scale={[4, 4, 4]}>
        {/* Book Cover */}
        {openToPage ? 
           <group >
           {/* Book Cover */}
           <mesh position={[0, 0, 0.05]}>
             <boxGeometry args={[bookWidth,bookHeight, 0.1]} />
             <meshStandardMaterial map={coverTexture} />
           </mesh>
           
           {/* Book Spine */}
           <mesh position={[-0.55, 0, 0]}>
             <boxGeometry args={[0.1, 1.5, 0.2]} />
             <meshStandardMaterial map={spineTexture} />
           </mesh>
     
           {/* Flipping Page */}
           <Page flip={flip} position={[0, 0, 0]} />
     
           {/* Trigger the flip animation on click */}
           <mesh
             position={[0, 0, 0]}
             onClick={() => setFlip(!flip)}
           >
             <planeGeometry args={[1, 1.5]} />
             <meshStandardMaterial color="white" opacity={0} transparent />
           </mesh>
         </group>
        :
        <group >
         <mesh position={[-bookWidth / 2, 0, 0]}>
        <planeGeometry args={[bookWidth, bookHeight]} />
        <meshStandardMaterial map={pageTexture} side={THREE.DoubleSide} />
        </mesh>
         {/* Book Spine */}
        <mesh position={[-0.55, 0, 0]}>
          <boxGeometry args={[0.1, 1.5, 0.2]} />
          <meshStandardMaterial map={spineTexture} />
        </mesh>
        <a.mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1, 1.55]} />
        <meshStandardMaterial map={pageTexture} />
        </a.mesh>
        
       
  
        {/* Flipping Page */}
  
        {/* Trigger the flip animation on click */}
        <mesh
          position={[0, 0, 0]}
          onClick={() => setFlip(!flip)}
        >
          <planeGeometry args={[1, 1.5]} />
          <meshStandardMaterial color="white" opacity={0} transparent />
        </mesh>
      </group>
       
        }
       
  
        
      </a.group>
    );
  }

  function Scene() {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ height: '100vh', width: '100vw', border : 'red solid 3px' }}>
       <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Book openToPage={open ? 1 : 0} />
        <mesh
            onPointerDown={() => setOpen(!open)}
            position={[0, 0, 0]}
            visible={false} // Make the mesh invisible but still clickable
        >
            <planeGeometry args={[2, 2]} />
            <meshStandardMaterial />
        </mesh>
        </Canvas>
      </div>
    );
  }
  
export default Scene;
