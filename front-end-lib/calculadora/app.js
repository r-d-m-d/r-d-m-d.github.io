const checkZeros=/^[^0.]*[1-9]+\d*\.?\d*$/
const startsWithZeroes=/^[0]+.*$/
const checkOperation=/^[+\-*/]{1}-?$/
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            formula:'',
            lastNumber:'0',
            lastOperation:'',
        }
        this.inputNumber=this.inputNumber.bind(this)
        this.inputOperation=this.inputOperation.bind(this)
        this.clear=this.clear.bind(this)
        this.equals=this.equals.bind(this)
    }
    inputNumber(event){
        this.setState((oldState)=>{
            let lastNumber=startsWithZeroes.test(oldState.lastNumber)?
                event.target.innerText:oldState.lastNumber+event.target.value;
            lastNumber=checkZeros.test(lastNumber)?lastNumber:oldState.lastNumber;
            return{
                formula:oldState.formula+oldState.lastOperation,
                lastNumber,
                lastOperation:'',
            }
        })
    }
    inputOperation(event){
        this.setState((oldState)=>{
            let lastOperation=event.target.innerText!=='-'?
                event.target.innerText:oldState.lastOperation+event.target.innerText;
            lastOperation=checkOperation.test(lastOperation)?
                lastOperation:oldState.lastOperation;
            return{
                formula: oldState.formula+oldState.lastNumber,
                lastNumber:'',
                lastOperation,
            }
        })
    }
    clear(){
        console.log(this.state)
        this.setState({formula:'',
            lastOperation:'',
            lastNumber:'0',
        })
    }
    equals(){
    let formula=this.state.formula==='0'?this.state.lastOperation+this.state.lastNumber:this.state.formula+this.state.lastOperation+this.state.lastNumber;

    this.setState({
        formula:`${eval(formula)}`,
        lastOperation:'',
        lastNumber:'',
    })
    }
    render(){
        let equalsButon=button({text:"=",id:"equals",click:this.equals})
        
        let calcNumbers=["zero","one","two","three","four","five","six","seven","eight","nine"].map(
        (x,idx)=>button({text:idx,id:x,click:this.inputNumber}))

        calcNumbers.push(button({text:".",id:"decimal",click:this.inputNumber}))

        let calcOperations=[{symbol:'+',id:"add"},{symbol:'-',id:"subtract"},{symbol:'*',id:"multiply"},{symbol:'/',id:"divide"},].map((el)=>button({text:el.symbol,id:el.id,click:this.inputOperation}));

        let clear=button({text:"clear",id:"clear",clear:this.clear,click:this.clear})
        let buttonsGrid=React.createElement("div",{id:"grid"},[ calcNumbers,equalsButon,calcOperations,clear])
        let calcDisplay=display({value:this.state.formula+this.state.lastNumber+this.state.lastOperation})

        return React.createElement("div",{id:"calculadora"},[calcDisplay,buttonsGrid])
    }
}
const button=(props)=> React.createElement("button",{id:props.id,value:props.text,onClick:props.click},[props.text])
const display=(props)=>React.createElement("input",{readOnly:"readonly",id:"display",value:props.value})
const domContainer=document.querySelector("#app");
ReactDOM.render(React.createElement(App,{}),domContainer);

