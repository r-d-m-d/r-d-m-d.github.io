marked.setOptions({breaks:true})
const defaultText=`# Hello world!
## Markdown Preview
[example link](www.example.com)
\`dontWorry && beHappy\`
\`\`\`
fn xd(pass,args){
    console.log(pass,args);
}
\`\`\`
1. doStuff
2. doMoreStuff
> A Block quote
![image](image.jpg)
**BOLD**`


class MyComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:defaultText,
        }
        this.onChange=this.onChange.bind(this)
    }
    onChange(evt){
        this.setState({
            text:evt.target.value,
        })
    }
    render(){
        return React.createElement('div',{},[editor({onChange:this.onChange,text:this.state.text}),preview({text:this.state.text})]);
    }
}

const editor=(props)=>React.createElement('textarea',{id:'editor',onChange:props.onChange,value:props.text})


const preview=(props)=>React.createElement('div',{id:"preview",
    dangerouslySetInnerHTML:{__html:markupToHtml(props.text)}})
const markupToHtml=(markupText)=>{
    return DOMPurify.sanitize(marked.parse(markupText));
}
const domContainer=document.querySelector('#app');
ReactDOM.render(React.createElement(MyComponent,{m:"hello"}),domContainer);

