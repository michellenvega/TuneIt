import React from "react";
import HowtoText from './how-to';
import { songData } from "../top10s.js";


class GameMain extends React.Component {
    constructor() {
      super();
      this.state = {
        hasStarted: false,
        lyric: "",
        title: "none",
        artist: "",
        lyricPart:"",
        songFetched: false,
        guess: "",
        correct: false,
        submitted: false,
        correctText: "Wrong!"
      };
    }



    LyricParse = (lyrics) => {
      const lines = lyrics.split(/\r?\n/);
      const line = 
          lines[1] +'\n'+'\n' + lines[2] + '\n' +'\n'+lines[3] +'\n'+'\n' +
          lines[4] +'\n'+'\n' + lines[5] + '\n' +'\n'+lines[6] ;
      console.log(line);
      this.setState({lyricPart: line});

    }

    fetchSong = (artist, title) => {
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'b8e0cf793bmsh732d51b2a973c12p18c940jsn51772efd1743',
          'X-RapidAPI-Host': 'lyrics-search.p.rapidapi.com'
        },
        body: '{"searchTerm": "' + title +'"}'
      };

      fetch('https://lyrics-search.p.rapidapi.com/search/lyrics', options)
      .then(response =>  response.json())
      .then(response => {
          this.setState({ lyric: response.lyrics });
          this.setState({ songFetched: true });
          this.LyricParse(response.lyrics);
      })
      .catch(e => console.log(e));  }




    songRandom = () => {
      const num = Math.floor(Math.random() * 603) + 1;
      console.log(num);
      const song = songData[num];

      var urtitle = song.title;
      urtitle = urtitle.split('(')[0];
      this.setState({title: urtitle});
      const urartist = song.artist;
 
      this.setState({artist: urartist});

      this.fetchSong(urartist, urtitle);
      if(this.state.lyric === null && this.state.title !== "none")
        this.songRandom();
    }
  
    checkGuess =() =>{
      var guess = this.state.guess.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
      var answer = this.state.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");

      console.log(guess);
      console.log(answer);
      if(guess === answer){
        this.setState({correct: true,
        correctText: "Correct!"});
      }
        else
          this.setState({correct: false});
        }

    handleChange(event) {
      this.setState({ guess: event.target.value });
        }
    handleSubmit(event) {
        this.checkGuess();
          event.preventDefault();
        }

    render() {
      
      return (
        <div>
{!this.state.hasStarted && (<div>
    <button className="button1"
           onClick={() => { this.setState(({ hasStarted }) => ({ hasStarted: !hasStarted })); 
           this.songRandom();
          } }
           >Start</button>
    <HowtoText />
          </div>
  )}

{this.state.hasStarted && (<div>
    <div className="lyricsbox">
      <p className="lyrics">
        {this.state.songFetched && this.state.lyricPart}
        {!this.state.songFetched && (<div><p>loading...</p></div>)}
      </p>
    </div>
                
  {
    !this.state.submitted &&
    (<form onSubmit={this.handleSubmit.bind(this)}>
      <input type="text" name="guess" className="guesstext" placeholder="title only!" 
        value={this.state.guess}
        onChange={this.handleChange.bind(this)} />
      
      <input type="submit" className="button1"
        onClick={() => {    this.setState({submitted: true});
        this.checkGuess();
            } } />

    </form>
)
  }

{this.state.submitted && (
<div className="correctText">

    <p>{this.state.correctText}</p>
    <p>The song was: "{this.state.title}" by {this.state.artist}!</p>

</div>
)}


        <button className="button1"
           onClick={() => {  
           this.setState({
           lyric: "",
           title: "none",
           artist: "",
           lyricPart:"",
           songFetched: false,
           guess: "",
           correct: null,
          submitted:false,
          correctText: "Wrong!"});
           this.songRandom();
          } }  >Another One</button>



            </div>
            )}

       </div>
      );
    }
  }

  export default GameMain;