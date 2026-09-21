import { useState } from "react";




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

          <span className="linev2"></span>
          <h2>Source ID</h2>
          <div className="profile-text">
             {/* Aici vei adauga input-ul pentru cardul 2 */}
             <p style={{color: '#696E78'}}>Aici vine casuta 2...</p>
          </div>





        </div>
      </div>

    </div>
  )

}
export default UserForm