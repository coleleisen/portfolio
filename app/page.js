"use client"
import Image from 'next/image'
import Header from './components/header'
import SpaceBackground from './components/spaceBackground'
import React, { useRef, useState, useEffect, useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Head from 'next/head';

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
      const [isMobile, setIsMobile] = React.useState(false);
      const [isSmall, setIsSmall] = React.useState(false);

      const [isSmaller, setIsSmaller] = React.useState(false);
      const { sharedState } = useContext(shared);
      const [currentContent, setCurrentContent] = useState(sharedState);
      const [animationClass, setAnimationClass] = useState('');
      let containerClass = isSmaller ? 'grid grid-cols-3 gap-3' : 'grid grid-cols-5 gap-4';
      let containerClassFront = isSmall ? 'grid grid-cols-3 gap-3' : 'grid grid-cols-5 gap-4';

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

  
      useEffect(() => {
        setIsSmaller(window.innerWidth <= 1550);
        setIsSmall(window.innerWidth <= 1200);

        setIsMobile(window.innerWidth <= 890);
  
        const handleResize = () => {
          console.log(window.innerWidth)
          setIsSmaller(window.innerWidth <= 1550);
          setIsSmall(window.innerWidth <= 1200);
          setIsMobile(window.innerWidth <= 890);
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
        }, []);

      useEffect(() => {
        containerClass = isSmaller ? 'grid grid-cols-3 gap-3' : 'grid grid-cols-5 gap-4';

      }, [isSmaller]);
      useEffect(() => {
        containerClassFront = isSmall ? 'grid grid-cols-3 gap-3' : 'grid grid-cols-5 gap-4';

      }, [isSmall]);

      /*renderThumbVertical={({ style, ...props }) =>
                  <div {...props} style={{ ...style, backgroundColor: 'white', borderRadius: '2px', minHeight : '50%', top : '20%', bottom : '20%' }}/>
                }
                renderTrackVertical={({ style, ...props }) =>
                  <div {...props} style={{ ...style, backgroundColor: 'grey', right: '0', bottom: '2px', top: '2px', borderRadius: '10px' }}/>
              }
        */
    
      const renderContent = () => {
        switch (currentContent) {
          case -1.8:
            return(
              <div className="text-white  rounded-lg shadow-lg text-center" style={{overflowY:'auto', borderRadius: '10%', backgroundColor: 'rgb(30,50,50,0.8)', height: '70vh', minHeight: '70vh',  width: '65%', zIndex : 10 }}>
                <Scrollbars >

                <div class="container mx-auto p-4">
                <h1 className="text-4xl font-bold">About Cole</h1>
                  <div class="about-cole flex flex-col md:flex-row items-center">
                    
                      <div class="w-full md:w-1/4 mb-4 md:mb-0">
                          <img src="ratty.jpg" alt="Cole Leisen" class="rounded-full mx-auto" style={{maxWidth: '200px'}}/>
                      </div>

                    
                      <div class="w-full md:w-3/4">
                        <br></br>
                          <p>
                              I am a passionate software developer that wants to innovate the digital space by designing cutting edge applications. I am a full stack developer that likes to create robust features on both the front and back of applications. However, I do prefer backend development to create lightning fast, scalable, extensible and modular backend systems with organized rest APIs as well as well structured databases. For front end designs I enjoy creating animations and 3D UI components to bring web pages to life. I specialize in making mobile friendly responsive web designs that are functional and easy to use.
                          </p>
                          <br></br>
                          <br></br>
                          <p>
                              Besides software projects I like to spend my free time on my hobbies such as hockey, digital music production and video games. I also like to spend time with my friends and family to have a good work life balance.
                          </p>
                      </div>
                  </div>
                </div>
                </Scrollbars>
               </div>
            );
          case -0.4:
            return(
              <div className="text-white rounded-lg shadow-lg text-center" style={{overflowY:'auto', borderRadius: '10%', backgroundColor: 'rgb(30,50,50,0.8)', height: '70vh', minHeight: '70vh',  width: '65%', zIndex : 10 }}>
              <Scrollbars >
                <div class="container mx-auto p-4">
                  <div class="experience-section">
                    <h1 className="text-4xl font-bold">Experience</h1>   
                      <div class="mb-6 mt-6">
                          <div class="font-semibold">Full Stack Developer - Videolinq</div>
                          <div class="text-sm text-gray-300">August 2021 - August 2023</div>
                          <ul >
                              <li class="mt-2">• Maintained livestreaming web application and learned to be extremely productive and versatile working for a small startup </li>
                              <li class="mt-2">• Worked with a tech stack of Java Spring Boot, AngularJS, MySQL, MaterialUI, AWS and Wowza</li>
                              <li class="mt-2">• Learned dev ops best practices, backend design principles, UI design techniques as well as communication and collaboration skills</li>
                              <li class="mt-2">• Worked with several external APIs like Twitter, Twitch, Facebook, Youtube and Linkedin </li>
                              <li class="mt-2">• Developed key features including an end to end closed captioning service with a realtime captions editor and translations</li>
                          </ul>
                      </div>
                  
                      <div class="mb-6">
                          <div class="font-semibold">Freelance Web Developer - Self Employed</div>
                          <div class="text-sm text-gray-300">September 2019 - July 2021</div>
                          <ul>
                              <li  class="mt-2">• Worked directly with clients to create simple websites</li>
                              <li  class="mt-2">• Developed websites using HTML, CSS, and JavaScript, ensuring compatibility across browsers and responsive design</li>
                              <li  class="mt-2">• Worked on several entrepreneurial web applications with like minded developers to create digital products</li>
                          </ul>
                      </div>
                      <div class="mb-6">
                          <div class="font-semibold">Computer Programming Student - Seneca College</div>
                          <div class="text-sm text-gray-300">September 2018 - May 2021</div>
                          <ul >
                              <li  class="mt-2">• Learned valuable skills with a heavy focus on C++, javascript based web development and mobile development.</li>
                              <li  class="mt-2">• Obtained diploma in 3 year program at Seneca called <a class="underline" href="https://www.senecacollege.ca/programs/fulltime/CPA.html#menu" target="_blank">Computer Programming Analysis (CPA)</a></li>
                          </ul>
                      </div>
                  </div>
                </div>
                </Scrollbars>
               </div>
            );
          case 1:
            return(
              <div className="text-white rounded-lg shadow-lg text-center" style={{overflowY:'auto', borderRadius: '10%', backgroundColor: 'rgb(30,50,50,0.8)', height: '70vh', minHeight: '70vh',  width: '65%', zIndex : 10 }}>
                <Scrollbars >

                <div class="container mx-auto p-4">
                  <div class="projects-section">
                  <h1 className="text-4xl font-bold">Projects</h1>
                      <div class="mb-4 mt-4">
                          <h2 class="font-semibold">Soundsphere AI</h2>
                          <p class="mt-2"><span class="font-semibold">Description:</span> SaaS AI sound generator from text prompt input using Pytorch audio machine learning model. </p>
                          <p class="mt-2"><span class="font-semibold">Technologies Used:</span> NextJS, Python/Pytorch, NodeJS/Express, MySQL, TailwindCSS, Docker, RunPod, Render, Vercel</p>
                          <p class="mt-2"><span class="font-semibold">Visit here:</span> <a href="https://soundsphere.ai" target='_blank'>https://soundsphere.ai</a> </p>
                      </div>

                      <div class="mb-4">
                          <h2 class="font-semibold">Algoshuffle</h2>
                          <p class="mt-2"><span class="font-semibold">Technologies Used:</span> React, NodeJS/Express, MongoDB, Docker, Nginx, MaterialUI, Algorand blockchain API</p>
                          <p class="mt-2"><span class="font-semibold">Description:</span> Algorand NFT application used to buy, sell, trade and host shuffles for NFT art projects. Shuffles were being done to randomly give away discounts for NFT art projects in private discord communities, this application was designed to create a platform to host these shuffles.</p>
                          <p class="mt-2"><span class="font-semibold">View Code Here:</span> <a href="https://github.com/coleleisen/algoshuffle" target='_blank'>https://github.com/coleleisen/algoshuffle</a> </p>
                      </div>

                      <div class="mb-4">
                          <h2 class="font-semibold">ESPN Trade Analyzer</h2>
                          <p class="mt-2"><span class="font-semibold">Technologies Used:</span> React, NodeJS/Express, MongoDB, Bootstrap, Puppeteer </p>
                          <p class="mt-2"><span class="font-semibold">Description:</span> ESPN Fantasy sports app made to analyze trades and statistics in your specific league. It scrapes ESPNs website HTML with Puppeteer to obtain personalized league data, stores it in Mongo cloud and serves to the front end in order to compare stats on potential trades.</p>
                          <p class="mt-2"><span class="font-semibold">Visit here:</span> <a href="https://scraper.bet" target='_blank'>https://scraper.bet</a> </p>
                          <p class="mt-2"><span class="font-semibold">View Frontend here:</span> <a href="https://github.com/coleleisen/ESPN-API" target='_blank'>https://github.com/coleleisen/ESPN-API</a> </p>
                          <p class="mt-2"><span class="font-semibold">View Backend Here:</span> <a href="https://github.com/coleleisen/ESPN-Fantasy" target='_blank'>https://github.com/coleleisen/ESPN-Fantasy</a> </p>

                      </div>

                  </div>
                </div>
              </Scrollbars>
               </div>
            );
          case 2.4:
            return (
              <div className="text-white rounded-lg shadow-lg text-center" style={{overflowY:'auto', borderRadius: '10%', backgroundColor: 'rgb(30,50,50,0.8)', height: '70vh', minHeight: '70vh',  width: '65%', zIndex : 10 }}>
                 <Scrollbars>
                <div class="container mx-auto p-4">
                <h1 className="text-4xl font-bold">Skills</h1>
                <br></br>
                  <div  style={{color : 'dodgerblue'}} class="skills-section frontend">
                    <div class="text-xl font-bold mb-2 underline">Frontend</div>
                    <br></br>
                      <div className={containerClassFront}>
                          <div class="skill font-semibold">ReactJS</div>
                          <div class="skill font-semibold">HTML</div>
                          <div class="skill font-semibold">Typescript</div>
                          <div class="skill font-semibold">NextJS</div>
                          <div class="skill font-semibold">Android Studio</div>
                          <div class="skill font-semibold">React Native</div>
                          <div class="skill font-semibold">CSS</div>
                          <div class="skill font-semibold">AngularJS</div>
                          <div class="skill font-semibold">Tailwind/Material</div>
                          <div class="skill font-semibold">Xcode & Swift</div>

                      </div>
                    </div>

                  <br></br>
                  <br></br>
                  <div style={{color : 'red'}}  class="skills-section backend">
                      <div  class="text-xl font-bold mb-2 underline">Backend</div>
                      <br></br>
                        <div className={containerClassFront}>
                            <div class="skill font-semibold">NodeJS Express</div>
                            <div class="skill font-semibold">Java Spring Boot</div>
                            <div class="skill font-semibold">Golang</div>
                            <div class="skill font-semibold">C# & .NET</div>
                            <div class="skill font-semibold">C++</div>
                            <div class="skill font-semibold">Python</div>
                            <div class="skill font-semibold">SQL</div>
                            <div class="skill font-semibold">MongoDB</div>
                            <div class="skill font-semibold">Redis</div>
                            <div class="skill font-semibold">RabbitMQ</div>
                        </div>
                      </div>

                  <br></br>
                  <br></br>
                  <div style={{color : 'green'}}  class="skills-section tools">
                      <div class="text-xl font-bold mb-2 underline">Tools & Other</div>
                      <br></br>
                        <div className={containerClass} >
                            <div class="skill font-semibold">Git</div>
                            <div class="skill font-semibold">Docker</div>
                            <div class="skill font-semibold">AWS/Gcloud/Azure</div>
                            <div class="skill font-semibold">Linux/MacOS/Windows</div>
                            <div class="skill font-semibold">JSON/XML/Protobuf</div>
                            <div class="skill font-semibold">VS Code/IntelliJIDEA</div>
                            <div class="skill font-semibold">Kubernetes</div>
                            <div class="skill font-semibold">Nginx</div>
                            <div class="skill font-semibold">Wowza</div>
                            <div class="skill font-semibold">Bash/CMD</div>
                            <div class="skill font-semibold">Jenkins</div> 
                            <div class="skill font-semibold">Unit Testing</div> 
                            <div class="skill font-semibold">Websockets</div>
                            <div class="skill font-semibold">Rest APIs</div>
                            <div class="skill font-semibold">AI models</div>

                        </div>
                  </div>
              </div>
              </Scrollbars>
              </div>
            );
          default:
            return(
              <div className="text-white  rounded-lg shadow-lg text-center" style={{overflowY:'auto', borderRadius: '10%', backgroundColor: 'rgb(30,50,50,0.8)', height: '70vh', minHeight: '70vh',  width: '65%', zIndex : 10 }}>
              <Scrollbars>
              <div class="container mx-auto p-4">
              <h1 className="text-4xl font-bold">About Cole</h1>
                <div class="about-cole flex flex-col md:flex-row items-center">
                  
                    <div class="w-full md:w-1/4 mb-4 md:mb-0">
                        <img src="ratty.jpg" alt="Cole Leisen" class="rounded-full mx-auto" style={{maxWidth: '200px'}}/>
                    </div>

                  
                    <div class="w-full md:w-3/4">
                      <br></br>
                        <p>
                            I am a passionate software developer that wants to innovate the digital space by designing cutting edge applications. I am a full stack developer that likes to create robust features on both the front and back of applications. However, I do prefer backend development to create lightning fast, scalable, extensible and modular backend systems with organized rest APIs as well as well structured databases. For front end designs I enjoy creating animations and 3D UI components to bring web pages to life. I specialize in making mobile friendly responsive web designs that are functional and easy to use.
                        </p>
                        <br></br>
                        <br></br>
                        <p>
                            Besides software projects I like to spend my free time on my hobbies such as hockey, digital music production and video games. I also like to spend time with my friends and family to have a good work life balance.
                        </p>
                    </div>
                </div>
              </div>
              </Scrollbars>
             </div>
            );
          }
      };
    
      return (
        <div className={`flex-grow flex items-center mt-5 justify-center ${animationClass}`} style={{ zIndex: 5 }}>
         
            {renderContent()}     
           
        </div>
      );
    }

  return (
    <div style={{height : '100vh', overflow : 'hidden'}}>
      <Head>
        <title>Cole Leisens software developer portfolio</title>
        <meta name="description" content="A portfolio website for Cole Leisens software development career" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SharedStateProvider>
      <Header></Header>
      <SpaceBackground SharedStateContext={SharedStateContext}></SpaceBackground>
      
      <Content shared={SharedStateContext}></Content>
      </SharedStateProvider>
    </div>
    
  )

}
