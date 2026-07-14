import { useState } from "react"





const UserForm = (props) => {
  const [profileText, setProfileText] = useState("")
  const [videoID, setVideoID] = useState("")
  return (
    <div>
      <h1>
        PLEASE INTRODUCE SOME ASPECTS OF YOUR PERSONALITY:</h1>     
      <textarea
        rows={10}
      placeholder="Write something about yourself"
      value={profileText}
      onChange={(event) => setProfileText(event.target.value)}
      />


      {/*this is for the user so he can introduce the id of the Video */}
      <h3>Please introduce the video-id of your podcast</h3>
      <textarea
        rows={1}
        placeholder="-you can find it after the = sign in the link of your youtube podcast-"
        value={videoID}
        onChange={(event) => setVideoID(event.target.value)}
      />
      <button onClick={() => props.onFormSubmit(profileText,videoID)}>
      Generate feed →
      </button>
    </div>
  )
}
export default UserForm