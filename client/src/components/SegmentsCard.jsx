import React from 'react';
import YouTube from 'react-youtube';





const SegmentsCard = (props) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      start: props.segment.start,
      end: props.segment.end,
      origin: window.location.origin,
      autoplay: 0,
      },
  }
  console.log("id that has arrived in card is:  ",props.videoId)
  return (
    <div>

      <h3>{props.segment.hook_title} </h3> 

      Why Relevant: {props.segment.why_relevant}

     <YouTube videoId={props.videoId} opts={opts}  />
      
    </div>
  )
}
export default SegmentsCard