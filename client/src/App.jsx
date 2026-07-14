import { useState } from "react"
import UserForm from "./components/UserForm"
import SegmentList from "./components/SegmentList"
import axios  from "axios"
const App = () => {
  //boolean var to ask if we show feed or just the formular
  const [userProfile, setUserProfile]= useState("")
  const [showFeed, setShowFeed] = useState(false)
  const [segments, setSegments] = useState([])// here we are going to have the real array from the backend
  const [loading, setLoading] = useState(false) // here we would have the ai status (if he is still processing or not)
  const FormSent = async (profileText, VideoReceived) => { // we use async because we want to wait until we have a response 
    if (profileText.trim().length === 0) {
      alert("Please write something about yourself in the box !");
      return;
    }
    setLoading(true)
    setUserProfile(profileText)

    try {
      const response = await axios.post("http://localhost:8000/analyze", {
        profile: profileText,
        video_id: VideoReceived
      })
      console.log("received response from Python:", response.data)
      setSegments(response.data.segments)
      setShowFeed(true)
    } catch (error) {
      console.error("Error:", error)
      alert("Error at server!")
    } finally {
      setLoading(false)
    }
  }
  if (loading == true) {
    return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h2>THE AI AGENT IS WORKING TO EXTRACT THE BEST SEGMENTS IN THE PODCAST!</h2> 
         <p> PLEASE WAIT BEFORE MAKING ANY ACTION!</p>
    </div>)
  }
  if (showFeed == false) {
    return (
      <div>
        <UserForm onFormSubmit={FormSent} />

      </div>
    )
  }
  else {
    return (
      <div>
        <SegmentList segments={segments} onBackClick={()=> setShowFeed(false)} />
      </div>
    )
  }
}
export default App