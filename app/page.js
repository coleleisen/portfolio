"use client"
import Image from 'next/image'
import Header from './components/header'
import SpaceBackground from './components/spaceBackground'
import React, { useRef, useState, useEffect, useContext } from 'react';

export default function Home() {
  const SharedStateContext = React.createContext();
  function SharedStateProvider({ children }) {
    const [sharedState, setSharedState] = React.useState(-1.8);

      return (
        <SharedStateContext.Provider value={{ sharedState, setSharedState }}>
          {children}
        </SharedStateContext.Provider>
      );
    }
    function Content({ shared }) {
      const { sharedState } = useContext(shared);
      const [currentContent, setCurrentContent] = useState(sharedState);
      const [animationClass, setAnimationClass] = useState('');
    
      useEffect(() => {
        if (currentContent !== sharedState) {
          setAnimationClass('slide-out'); // Start sliding out
          const timeoutId = setTimeout(() => {
            setCurrentContent(sharedState);
            setAnimationClass('slide-in'); // Slide in new content
          }, 500); // Duration of the slide-out animation
    
          return () => clearTimeout(timeoutId);
        }
      }, [sharedState, currentContent]);
    
      const renderContent = () => {
        switch (currentContent) {
          case -1.8:
            return(
              <div className="text-white p-12 rounded-lg shadow-lg text-center" style={{ borderRadius: '10%', backgroundColor: 'rgb(30,50,50,0.8)', height: '100%', minHeight: '100%', width: '55%', zIndex : 10 }}>
                <h1 className="text-4xl font-bold">About Cole</h1>
               </div>
            );
          case -0.4:
            return(
              <div className="text-white p-12 rounded-lg shadow-lg text-center" style={{ borderRadius: '10%', backgroundColor: 'rgb(30,50,50,0.8)', height: '100%', minHeight: '100%', width: '55%', zIndex : 10 }}>
                <h1 className="text-4xl font-bold">Experience</h1>
               </div>
            );
          case 1:
            return(
              <div className="text-white p-12 rounded-lg shadow-lg text-center" style={{ borderRadius: '10%', backgroundColor: 'rgb(30,50,50,0.8)', height: '100%', minHeight: '100%', width: '55%', zIndex : 10 }}>
                <h1 className="text-4xl font-bold">Projects</h1>
               </div>
            );
          case 2.4:
            return (
              <div className="text-white p-12 rounded-lg shadow-lg text-center" style={{ borderRadius: '10%', backgroundColor: 'rgb(30,50,50,0.8)', height: '100%', minHeight: '100%', width: '55%', zIndex : 10 }}>
                <h1 className="text-4xl font-bold">Skills</h1>
              </div>
            );
          default:
            return(
              <div className="text-white p-12 rounded-lg shadow-lg text-center" style={{ borderRadius: '10%', backgroundColor: 'rgb(30,50,50,0.8)', height: '100%', minHeight: '100%', width: '55%', zIndex : 10 }}>
                <h1 className="text-4xl font-bold">About Cole</h1>
               </div>
            );
          }
      };
    
      return (
        <div className={`flex-grow flex items-center justify-center ${animationClass}`} style={{ zIndex: 5 }}>
            {renderContent()}       
        </div>
      );
    }

  return (
    <div style={{height : '100vh', overflow : 'hidden'}}>
      <SharedStateProvider>
      <Header></Header>
      <SpaceBackground SharedStateContext={SharedStateContext}></SpaceBackground>
      <Content shared={SharedStateContext}></Content>
      </SharedStateProvider>
    </div>
    
  )

}
