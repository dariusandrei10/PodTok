const SegmentsCard = (props) => {
  return (
    <div>
      <h3>{props.segment.hook_title} </h3> 

      <p>Time is:{props.segment.start} : {props.segment.end}</p>

      Why Relevant: {props.segment.why_relevant}
    </div>
  )
}
export default SegmentsCard