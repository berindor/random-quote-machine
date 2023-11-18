
import './App.css';
import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(25 + Math.random() * 50);
  const quoteBoxColor = `hsl(${hue},${saturation}%,70%)`;
  const backgroundColor = `hsl(${hue},${saturation}%,90%)`;
  return {
    quoteBox: quoteBoxColor,
    background: backgroundColor
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomNumber: 0,
      quote: '',
      author: '',
      color: getRandomColor()
    }
    this.loadNewQuote = this.loadNewQuote.bind(this);
  }

  componentDidMount() {
    this.loadNewQuote();
  };

  async loadNewQuote() {
    const randomColor = getRandomColor();
    const response = await fetch("https://api.quotable.io/quotes/random");
    const [quote] = await response.json();
    return this.setState( {
      quote: quote.content,
      author: quote.author,
      color: randomColor
    } );
  }
  
  render() {
    return (
      <div id="body-div" style={{backgroundColor: this.state.color.background }} >
        <div id="quote-box" style={{backgroundColor: this.state.color.quoteBox }}>
          <div id="text"><span className="quote-mark">“</span>{this.state.quote}<span className="quote-mark">”</span></div>
          <div id="author">- {this.state.author}</div>
          <div id="bottom-div">
            <button id="new-quote" style={{color: this.state.color.quoteBox }} onClick={this.loadNewQuote} >New quote</button>
            <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank" >
              <TwitterIcon id="twitterIcon" style={{color: this.state.color.quoteBox }}/>
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
