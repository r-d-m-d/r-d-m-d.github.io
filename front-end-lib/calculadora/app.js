class mycomponent extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return React.createElement("el",{},[])
    }
}
const button=(props)=> React.createElement("button",{id:props.id},[props.text])

const domContainer=document.querySelector("body");
ReactDOM.render(React.createElement(MyAppClass,{}),domContainer);

