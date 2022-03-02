const defaultState={
    breakLength:5,
    sessionLength:25,
}
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={...defaultState}
        this.reset=this.reset.bind(this);
    }
    reset(){

    }
    render(){
        let breakLabel=lengthComponent({id:"break-label",text:"break"})
        let breakLength=React.createElement("h2",{id:"break-length"},this.state.breakLength)
        let breakDec=clickeables({id:"break-decrement",text:"break dec time"})
        let breakInc=clickeables({id:"break-increment",text:"break increment"})
        let breakPanel=panel({className:"breakPanel",id:"break-panel"},[breakLabel,breakLength,breakDec,breakInc]) 

        let sessionInc=clickeables({id:"session-increment",text:"session increment"});
        let sessionLength=React.createElement("h2",{ id:"session-length"},this.state.sessionLength)
        let sessionLabel=lengthComponent({id:"session-label",text:"session"})
        let sessionDec=clickeables({id:"session-decrement",text:"session dec time"})
        let sessionPanel=panel({className:"sessionPanel",id:"session-panel"},[sessionLabel,sessionLength,sessionInc,sessionDec]);

        let timer=React.createElement("div",{ id:"timer-label",},["session"])
        let timeLeft=React.createElement("div",{id:"time-left"},["25:00"]);
        let start=clickeables({id:"start_stop"})
        let reset=clickeables({id:"reset"}) 

        return React.createElement("div",{id:"timer-root"},[breakPanel,sessionPanel,timer,timeLeft,start,reset])
    }
}
const lengthComponent=(props)=> React.createElement("div",{id:props.id},[props.text])
const clickeables=(props)=>React.createElement("button",{id:props.id},[props.text])
const panel=(props,childs)=>React.createElement("span",{className:props.className,id:props.id},childs)
const domContainer=document.querySelector("#app");
ReactDOM.render(React.createElement(App,{}),domContainer);

