
import './App.css';
import React from 'react';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomNumber: 0,
      quote: 'Default quote',
      author: 'Default Author',
      color: 'rgb(200, 50, 100)',
      quoteIsRandom: false
    }
    this.loadNewQuote = this.loadNewQuote.bind(this);
    }

  async loadNewQuote() {
    const randomColor = 'hsl(' + Math.floor(Math.random() * 360) + ',' + Math.floor(25 + Math.random() * 50) + '%,70%)';
    const response = await fetch("https://api.quotable.io/quotes/random");
    const [quote] = await response.json();
    return this.setState( {
      quote: quote.content,
      author: quote.author,
      color: randomColor,
      quoteIsRandom: true
    } );
  }
  
  render() {
    if (this.state.quoteIsRandom === false) {
      this.loadNewQuote();
    } // something is wrong, loads twice. What is the right way to load a random quote first? componentDidMount didn't work (the way I tried)
    const quoteText = this.state.quote;
    const quoteAuthor = this.state.author;
    const randomBackgroundArr = this.state.color.split(',').slice(0,-1);
    randomBackgroundArr.push('90%)');
    const randomBackground = randomBackgroundArr.join();
    return (
      <div id="body-div" style={{backgroundColor: randomBackground }} >
        <div id="quote-box" style={{backgroundColor: this.state.color }}>
          <div id="text"><span className="quote-mark">“</span>{quoteText}<span className="quote-mark">”</span></div>
          <div id="author">- {quoteAuthor}</div>
          <div id="bottom-div">
            <button id="new-quote" style={{color: this.state.color }} onClick={this.loadNewQuote} >New quote</button>
            <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank" >twitter icon</a>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
