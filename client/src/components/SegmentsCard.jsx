import React from 'react';
import YouTube from 'react-youtube';





const SegmentsCard = (props) => {
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      start: props.segment.start,
      end: props.segment.end,
      origin: window.location.origin,
      autoplay: 0,
      },
  }
  console.log("id that has arrived in card is:  ", props.videoId)
  let format_number;
  if (props.index < 9) {
    format_number = `0${props.index + 1}`;
  }
  else {
    format_number = props.index + 1;
  }

  return (
    <div className='segment-card'>
      <div className='segment-HEADER'>
        <span className='segment-number'>
        {format_number}
         </span>
        <h3>{props.segment.hook_title} </h3> 
      </div>
      <div className='segment-whyrelevant'>
        <h1>Why Relevant:</h1>
        
        <p>{props.segment.why_relevant}</p>
      </div>
    <div className='video-player'>
     <YouTube videoId={props.videoId} opts={opts}  />
      </div>
    </div>
  )
}
export default SegmentsCard