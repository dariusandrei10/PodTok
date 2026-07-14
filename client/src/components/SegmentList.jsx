import SegmentsCard from "./SegmentsCard";

const SegmentList = (props)=>{
  // implement a list of cards in a var.
  const CardList = props.segments.map((item, index) => {
    return <SegmentsCard key={index} segment={item} /> ///?
  })
  
 
  return (
    <div>
      {CardList} 
      <button onClick={()=>props.onBackClick( )}>
          Back to profile settings
      </button>
    </div>
  )
}
export default SegmentList