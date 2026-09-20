import SegmentsCard from "./SegmentsCard";

const SegmentList = (props)=>{
  // implement a list of cards in a var.
  const CardList = props.segments.map((item, index) => {
    return <SegmentsCard
      key={index}
      segment={item}
      videoId={props.videoId}
      index={index}  
  />
  })
  
 
  return (
    <div>
      <button className="backtoprofilebutton" onClick={()=>props.onBackClick( )}>
          Back to profile settings
      </button>
      {CardList} 
      <div className="moretext">
        Order recomended by Gemini AI Assistant
      </div>
    </div>
  )
}
export default SegmentList