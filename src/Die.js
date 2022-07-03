import './styles.css'

export default function Die (props) {

const styleComponent = {
  backgroundColor : props.isHeld ? "#59E391" : "white"
}


  return (
    <div className="die-face" style={styleComponent} onClick={props.holdDice}>
      <h1>{props.value}</h1>
    </div>
  )

}