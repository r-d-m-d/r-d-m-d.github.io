function newQuote(){
    let textElement=document.getElementById("text")
    let authorElement=document.getElementById("author")
    let url='https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    fetch(url).then(resp=>resp.json()).then(
        data=>{
            let quoteIndex=Math.floor(data.quotes.length*Math.random());
            let {quote,author}=data.quotes[quoteIndex]; 
            textElement.innerText=quote;
            authorElement.innerText=author;
        }
    )
}
newQuote();
