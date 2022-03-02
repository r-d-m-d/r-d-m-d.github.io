class App extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        let breakLabel=lengthComponent({id:"break-label",text:"break"})
        let sessionLabel=lengthComponent({id:"session-label",text:"session"})
        let breakDec=clickeables({id:"break-decrement",text:"break dec time"})
        let sessionDec=clickeables({id:"session-decrement",text:"session dec time"})
        let breakInc=clickeables({id:"break-increment",text:"break increment"})
        let sessionInc=clickeables({id:"session-increment",text:"session increment"});

        return React.createElement("div",{},[breakLabel,sessionLabel,breakDec,sessionDec,breakInc,sessionInc])
    }
}
const lengthComponent=(props)=> React.createElement("div",{id:props.id},[props.text])
const clickeables=(props)=>React.createElement("button",{id:props.id},[props.text])
const domContainer=document.querySelector("#app");
ReactDOM.render(React.createElement(App,{}),domContainer);

