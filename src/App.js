
import './App.css';
import React from 'react';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomNumber: 0,
      quote: 'Example quote 1',
      author: 'author 1',
      color: 'rgb(200, 50, 100)'
    }
    this.loadNewQuote = this.loadNewQuote.bind(this);
    }

  async loadNewQuote() {
    const randomColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
    const response = await fetch("https://api.quotable.io/quotes/random");
    const [quote] = await response.json();
    return this.setState( {
      quote: quote.content,
      author: quote.author,
      color: randomColor
    } );
  }
  
  render() {
    const quoteText = this.state.quote;
    const quoteAuthor = this.state.author;
    return (
      <div id="quote-box" style={{backgroundColor: this.state.color }}>
        <div id="text"><span className="quote-mark">"</span>{quoteText}<span className="quote-mark">"</span></div>
        <div id="author">- {quoteAuthor}</div>
        <button id="new-qoute" onClick={this.loadNewQuote} >New quote</button>
        <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank" >twitter icon</a>
      </div>
    );
  }
};

export default App;
