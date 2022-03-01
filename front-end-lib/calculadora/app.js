class App extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        let calcButtons=button({text:"=",id:"equals"})
        let calcNumbers=["zero","one","two","three","four","five","six","seven","eight","nine"].map(
        (x,idx)=>button({text:idx,id:x}))
        return React.createElement("div",{id:"calculadora"},["hola",calcButtons,calcNumbers])
    }
}
const button=(props)=> React.createElement("button",{id:props.id},[props.text])

const domContainer=document.querySelector("#app");
ReactDOM.render(React.createElement(App,{}),domContainer);

