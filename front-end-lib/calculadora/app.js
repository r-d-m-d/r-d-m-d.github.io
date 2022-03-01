class App extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        let calcButtons=button({text:"=",id:"equals"})
        let calcNumbers=["zero","one","two","three","four","five","six","seven","eight","nine"].map(
        (x,idx)=>button({text:idx,id:x}))
        let calcOperations=[{symbol:'+',id:"add"},{symbol:'-',id:"subtract"},{symbol:'*',id:"multiply"},{symbol:'/',id:"divide"},{symbol:".",id:"decimal"}].map((el)=>button({text:el.symbol,id:el.id}));
        let clear=button({text:"clear",id:"clear"})
        let calcDisplay=display({})
        return React.createElement("div",{id:"calculadora"},["hola",calcButtons,calcNumbers,calcOperations,clear,calcDisplay])
    }
}
const button=(props)=> React.createElement("button",{id:props.id},[props.text])
const display=(props)=>React.createElement("input",{readOnly:"readonly",id:"display"})
const domContainer=document.querySelector("#app");
ReactDOM.render(React.createElement(App,{}),domContainer);

