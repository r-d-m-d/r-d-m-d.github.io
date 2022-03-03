const defaultState={

    breakLength:5,
    sessionLength:25,
}
//React
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            breakLength:5*60,
            sessionLength:25*60,
            interval:NaN,
            start_stop:"start",
            secondsLeft:0
        }
        this.reset=this.reset.bind(this);
        this.breakDecrement=this.breakDecrement.bind(this)
        this.breakIncrement=this.breakIncrement.bind(this)
        this.sessionDecrement=this.sessionDecrement.bind(this);
        this.sessionIncrement=this.sessionIncrement.bind(this);
        this.startStop=this.startStop.bind(this)
    }
    startStop(){
        if(this.state.start_stop==="start"){
            let interval=setInterval(()=>{
                this.setState((oldState)=>{
                    let {secondsLeft}=oldState;
                    console.log(secondsLeft)
                    secondsLeft--;
                    return {secondsLeft}
                })
            } ,1000)
            this.setState((oldState)=>({
                start_stop:oldState.start_stop==="start"?"stop":"start",
                interval ,
            }))
        }else{
         if(!isNaN(this.state.interval)){
            clearInterval(this.state.interval)
        }    
        this.setState((oldState)=>({
                interval:NaN,
                start_stop:oldState.start_stop==="start"?"stop":"start",
            }))
        }

    }
    reset(){
        if(!isNaN(this.state.interval)){
            clearInterval(this.state.interval)
        }
    }
    breakDecrement(){
        if(this.state.breakLength>1)
            this.setState((oldState)=>({
                breakLength:oldState.breakLength-1,
                interval:oldState.interval,
            }))
    }
    breakIncrement(){
        if(this.state.breakLength<60)
            this.setState((oldState)=>({
                breakLength:oldState.breakLength+1,
            }))
    }
   sessionDecrement(){
       if(this.state.sessionLength>1)
           this.setState((oldState)=>({
            sessionLength:oldState.sessionLength-1,
           }))
   }
    sessionIncrement(){
        if(this.state.sessionLength<60)
            this.setState((oldState)=>({
                sessionLength:oldState.sessionLength+1,
            }))
    }
    render(){
        let breakLabel=lengthComponent({id:"break-label",text:"break"})
        let breakLength=React.createElement("h2",{id:"break-length"},[this.state.breakLength])
        let breakDec=clickeables({id:"break-decrement",text:"break dec time",click:this.breakDecrement})
        let breakInc=clickeables({id:"break-increment",text:"break increment",click:this.breakIncrement})
        let breakPanel=panel({className:"breakPanel",id:"break-panel"},[breakLabel,breakLength,breakDec,breakInc]) 

        let sessionLabel=lengthComponent({id:"session-label",text:"session"})
        let sessionLength=React.createElement("h2",{ id:"session-length"},this.state.sessionLength)
        let sessionInc=clickeables({id:"session-increment",text:"session increment",click:this.sessionIncrement});
        let sessionDec=clickeables({id:"session-decrement",text:"session dec time",click:this.sessionDecrement})
        let sessionPanel=panel({className:"sessionPanel",id:"session-panel"},[sessionLabel,sessionLength,sessionInc,sessionDec]);

        let timer=React.createElement("div",{ id:"timer-label",},["session"])
        let timeLeft=React.createElement("div",{id:"time-left"},[`${this.state.minutesLeft}:${this.state.secondsLeft}`]);
        let start=clickeables({id:"start_stop",text:this.state.start_stop,click:this.startStop})
        let reset=clickeables({id:"reset",click:this.reset,text:"Reset"}) 

        return React.createElement("div",{id:"timer-root"},[breakPanel,sessionPanel,timer,timeLeft,start,reset])
    }
}
const lengthComponent=(props)=> React.createElement("div",{id:props.id},[props.text])
const clickeables=(props)=>React.createElement("button",{id:props.id,onClick:props.click},[props.text])
const panel=(props,childs)=>React.createElement("span",{className:props.className,id:props.id},childs)
const domContainer=document.querySelector("#app");
ReactDOM.render(React.createElement(App,{}),domContainer);

