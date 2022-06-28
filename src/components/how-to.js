import React from "react";


class HowtoText extends React.Component {
    constructor() {
      super();
      this.state = {
        visible: false
      };
    }
  
    render() {
      return (
        <div>
          <button className="button1" 
          onClick={() => { this.setState(({ visible }) => ({ visible: !visible })); } }
          >How To Play</button>
          {this.state.visible && ( 
            <div className='how-play-msg'>
              <p>
                Chosen from songs that have been on the Top40 from 2017 to now!
                <br></br>
                You have to try guessing the song TITLE. 
                <br></br>
                Don't worry too much about a time limit. Just have FUN!
              </p>
            </div>
            )}
       </div>
      );
    }
  }




  export default HowtoText;