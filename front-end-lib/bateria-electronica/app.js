const reducer=()=>5;

class DrumMachine extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
        }
        this.setText=this.setText.bind(this)
        this.playSound=this.playSound.bind(this)
        this.handleKeyPress=this.handleKeyPress.bind(this)
    }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
    handleKeyPress(evt){
   const key=evt.key.toUpperCase(); 
        this.setText(key);
        this.playSound(key)
    }
   setText(sound){
        this.setState({
            text:sound,
        })
   } 
    playSound(soundId){
        const sound = document.getElementById(soundId);
        sound.currentTime = 0;
        sound.play();
    }
    render(){
        let drumDisplay=display({text:this.state.text})
        let drumPads=["Q","W","E","A","S","D","Z","X","C"].map((letter,idx)=>
            pad({id:letter+idx,
                text:letter,
                setText:this.setText,
                playSound:this.playSound,
            }));
        let padGroup=React.createElement("div",{id:"pad-group"},[drumPads])
        return React.createElement("div",{id:"drum-machine"},[drumDisplay,padGroup])
    }
}
const display=(props) => React.createElement("div",{id:"display"},[props.text])
const pad=(props)=>{
    let text=props.text;
    return React.createElement("div",{id:props.id,className:"drum-pad",
    onClick:()=>{props.setText(text);props.playSound(text);}
},[props.text,audio({id:props.text})])
}

const audio=(props)=>React.createElement("audio",{id:props.id,className:"clip",src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"})
   

const fcomponent=(props)=> React.createElement("el",{},[])

const domContainer=document.querySelector("#app");
ReactDOM.render(React.createElement(DrumMachine,{}),domContainer);
