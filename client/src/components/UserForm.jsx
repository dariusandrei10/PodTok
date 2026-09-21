import { useState } from "react";
import Loading  from "./Loading";



const UserForm = (props) => {
  const [profileText, setProfileText] = useState("")
  const [videoID, setVideoID] = useState("")
  const [activeStep, setActiveStep] = useState(1);


  let panel1Class = "introduce-panel inactive-card";
  let badge1Class = "badge-inactive";
  let panel2Class = "source-panel inactive-card";
  let badge2Class = "badge-inactive";


  if (activeStep == 1) {
    panel1Class = "introduce-panel active-card";
    badge1Class = "badge-active";
  }
  if (activeStep == 2) {
    panel2Class = "source-panel active-card";
    badge2Class = "badge-active";
  }



  return (
    <div className="landing-page">
      {/* left panel */}
      <div className="left-panel">
        <div className="logo-podtok"><span>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 10V14M8 7V17M12 4V20M16 7V17M20 10V14" stroke="#08090B" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        </span>PodTok</div>
        <h1>Teach</h1>
        <h2>Your <span>Feed</span></h2>
        <div className="progress-indicator">
          <span className="green-circle">1</span>
         <span className="white-text">Your profile</span> 
         
          <span className="line"></span>
          <span className="grey-circ">2</span>
          <span className="grey-text">Your feed</span>
        </div>
        <p className="suggestion">Share a little context and one source you trust. We'll use both to curate three moments worth your attention.</p>
        
      </div>
    
      <div className="right-panel">
        <div className="header-panel">
          Studio
          <span>
            How does this work?
          </span>
        </div>
        <div className={panel1Class}   onClick={() => setActiveStep(1)}>
          <div className="header-introduce">
            <span className={badge1Class}>01</span>
           <div className="textgroup">
            <h1>Introduce your point of view</h1>
            <p>What makes you curious? A few honest details help us rank ideas for you.</p>
            </div>

          </div>
          <span className="linev2"></span>

          <h2>Aspects of your personality</h2>

          <div className="profile-text">
            <textarea  value={profileText}
              onChange={(e) => setProfileText(e.target.value)}
              placeholder="I'm a pragmatic optimist. I like direct ideas..."
              />

          <p2 className="header01">Tip: mention the subjects you return to, how you make decisions, and what you'd rather skip.</p2>
          </div>



        </div>
        


        <div className={panel2Class} onClick={() => setActiveStep(2)}>
            <div className="header-introduce">
            <span className={badge2Class}>02</span>
            <div className="textgroup">
              <h1>Add a source</h1>
              <p>Paste the ID of a podcast episode or video you want us to scan.</p>
            </div>
          </div>

          <span className="linev3"></span>
          <div className="profile-text">
            <span>Podcast or video ID</span>
            <svg className="link-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A3A7B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            <textarea
              
              className="video-input"
              value={videoID}
              onChange={(p) =>setVideoID(p.target.value)} />

            


             <span className="tip">You can use just YouTube video ID for the moment</span>    
              <button
               className="generate-btn"
              onClick={() =>  props.onFormSubmit(profileText, videoID)}
              >
              Generate Feed
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              </button>
          </div>
          


          <div className="final-tip">
            
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="0" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
            
            Your answers are only used to shape recommendations. You can edit them anytime.</div>

        </div>
      </div>

    </div>
  )

}
export default UserForm