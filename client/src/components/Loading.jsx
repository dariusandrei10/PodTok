import React from "react";
import "./Loading.css"

const Loading = () => {
  return (
    <div className="LoadingPage">
     <h1 className="pulsing-text">
        We're analyzing your data to<br />
        find the most relevant<br />
        audience segments.
      </h1>
      <p className="loading-subtext">
        This takes a short moment while we match the right people to your content.
      </p>
    </div>
  )
}

export default Loading