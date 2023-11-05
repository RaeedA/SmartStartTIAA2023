import React from "react";
import background1 from '../images/background1.png';
import background2 from '../images/2ndBackground.png';
import gamemusic from '../music/gamemusic.mp3';
import liveFrame1 from '../images/TeenMCSprites/18MC1.png';
import liveFrame2 from '../images/TeenMCSprites/18MC2.png';
import liveFrame3 from '../images/TeenMCSprites/18MC3.png';
import frame1 from '../images/TeenMCSprites/18MC1.png';
import frame2 from '../images/TeenMCSprites/18MC2.png';
import frame3 from '../images/TeenMCSprites/18MC3.png';
import frame4 from '../images/TeenMCSprites/22MC1.png';
import frame5 from '../images/TeenMCSprites/22MC2.png';
import frame6 from '../images/TeenMCSprites/22MC3.png';
import frame7 from '../images/TeenMCSprites/35MC1.png';
import frame8 from '../images/TeenMCSprites/35MC2.png';
import frame9 from '../images/TeenMCSprites/35MC3.png';
import frame10 from '../images/TeenMCSprites/55MC1.png';
import frame11 from '../images/TeenMCSprites/55MC2.png';
import frame12 from '../images/TeenMCSprites/55MC3.png';
import heart from '../images/heart.png';
import job from '../images/job.png';
import arrowdown from '../images/arrowdown.png';
import arrowup from '../images/arrowup.png';
import coin from '../images/coin.png';
import TIAA from '../images/TIAA.png';
import stat from '../images/stats.png';

//import TIAA from '../images/TIAA.png';
/**
 * Game Page
 */
export default class GamePage extends React.Component {
    constructor(props) {
      super(props);
      // character initial traits
      this.state = {
        age: 18,
        balance: (Math.random() * (5000 - 500) + 500),  //random balance between 500 and 5,000 dollars
        name: 'Your Name',
		    realEstate: [[]],
		    stocks: [],
		    rothIRA: [],
		    job: 'NONE',
	  		income: 0,
  			expenses: 0,
        education: 'TEMPRORARY',
        backgroundInfo: 'The Retirement Investment Game had begun for Emma. At age 18, she was faced with the exciting challenge of building her financial future while pursuing her dreams. The decisions she made now would determine whether she would be able to retire comfortably and continue to follow her passions. Emma was determined to make the right choices and build a life that combined adventure and security.',
        newEventResponse: '',
		showStatMenu: false,
        interactionText: [],
        showActivities: false,
        showNameModal: true,
        showGamble: false, 
		showNewEvent: false,
		showRealEstate: false,
		showInfo:false,
        gambleAmount: '', 
        isBankrupt: false,
        ownsHouse: false,
        currentFrame: 0
      };

      
      

    // Bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.increaseAge = this.increaseAge.bind(this);
    this.toggleActivities = this.toggleActivities.bind(this);
    this.toggleGamble = this.toggleGamble.bind(this);
	  this.toggleRealEstate = this.toggleRealEstate.bind(this);
    this.handleGambleChange = this.handleGambleChange.bind(this);
    this.handleGambleSubmit = this.handleGambleSubmit.bind(this);
	  this.handleRealEstate = this.handleRealEstate.bind(this);
    this.checkBankruptcy = this.checkBankruptcy.bind(this);
    this.purchaseHouse = this.purchaseHouse.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.toggleStatMenu = this.toggleStatMenu.bind(this);
    this.consoleRef = React.createRef();
	this.handleTIAA = this.handleTIAA.bind(this);
    this.handleNewEvent = this.handleNewEvent.bind(this);
	this.toggleNewEvent = this.toggleNewEvent.bind(this);
	this.toggleInfo = this.toggleInfo.bind(this);
    //music
    this.audio = new Audio(gamemusic);
  }

  componentDidMount() {
    this.checkAge()
    this.audio.play(); // Play the music when the component mounts
    this.frameInterval = setInterval(() => {
        this.setState(prevState => ({
          currentFrame: (prevState.currentFrame + 1) % 3, // cycle through 0, 1, 2
        }));
      }, 1000 / 3); // update the frame every third of a second
    }
  

  componentWillUnmount() {
    this.audio.pause(); // Pause the music when the component unmounts
    clearInterval(this.frameInterval);
  }

  // Handlers
  handleChange(event) {
    this.setState({ interactionText: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  increaseAge() {
    this.setState(prevState => ({ age: prevState.age + 1 }));
    this.updateConsole("You turned " + (this.state.age + 1) + "!");
    this.checkAge();
	this.toggleNewEvent();
  }

  restartGame() {
    window.location.reload()
  }

  restartGame() {
    window.location.reload()
  }

  toggleStatMenu() {
	this.setState(prevState => ({ showStatMenu: !prevState.showStatMenu })); 
  }

  toggleActivities() {
    this.setState(prevState => ({ showActivities: !prevState.showActivities }));
  }

  toggleGamble() {
    this.setState(prevState => ({ showGamble: !prevState.showGamble }));
  }

	toggleRealEstate() {
		this.setState(prevState => ({ showRealEstate: !prevState.showRealEstate }));
	  }
	  
	toggleNewEvent() {
    this.setState(prevState => ({ showNewEvent: !prevState.showNewEvent }));
  }
  
  toggleInfo() {
    this.setState(prevState => ({ showInfo: !prevState.showInfo }));
  }
	  
  handleGambleChange(event) {
    this.setState({ gambleAmount: event.target.value });
  }

  handleGambleSubmit(event) {
    {/*For now it just subtracts amount gambled from character's balance */}
    event.preventDefault();
    const amount = parseFloat(this.state.gambleAmount);
    const gains = (Math.random() * (amount * 1.25));
    if (!isNaN(amount) && amount > 0 && amount <= (this.state.balance + .01)) {
      this.setState(prevState => ({
        balance: prevState.balance - amount + gains,
        gambleAmount: '', //resets gamble amount
        showGamble: false,
      }), this.checkBankruptcy); // checks for bankruptcy after gambling
      this.updateConsole("Your gamble of $" + amount + " adjusted your balance by " + (-amount + gains).toFixed(2) + "!");
    } else {
      alert('You cannot gamble that amount.');  //if they try to gamble more than they have
    }
  }
  
   handleRealEstate(event) {
		{/*For now it just subtracts amount gambled from character's balance */}
		event.preventDefault();
		this.setState((prevState) => ({
			realEstate: [...prevState.realEstate, ["Mansion",100]],
			showRealEstate: false,
			balance: prevState.balance - 100,
		  }));
		this.updateConsole("You purchased a "+ this.state.realEstate[0][0]);
	  }
	  
	 handleNewEvent(event) {
		event.preventDefault();
		const response = event.target.EventResponse.value;
		if (response.trim()) {
        this.setState({ EventResponse: response, showNewEvent: false});
		this.setState({showInfo: true});
      } else {
        alert('Please enter a valid name.');
      }
	  this.updateConsole(this.state.showInfo);                                                               //remove later
    }

  checkBankruptcy() {
    if (this.state.balance <= 0.01) {
      this.setState({ isBankrupt: true });
    }
  }

  checkAge() {
    if (this.state.age < 22) {
      liveFrame1 = frame1;
      liveFrame2 = frame2;
      liveFrame3 = frame3;
      
    }
    else if (this.state.age >= 22 && this.state.age < 35) {
      liveFrame1 = frame4;
      liveFrame2 = frame5;
      liveFrame3 = frame6;
      
    }
    else if (this.state.age >= 35 && this.state.age < 50) {
      liveFrame1 = frame7;
      liveFrame2 = frame8;
      liveFrame3 = frame9;
      
    }
    else if (this.state.age >= 65) {
      liveFrame1 = frame10;
      liveFrame2 = frame11;
      liveFrame3 = frame12;
      
    }

  }

  purchaseHouse() {
    this.setState({
      ownsHouse: true,
      balance: this.state.balance - 1000,
    }, () => {
      if (this.state.balance < 0) {
        this.checkBankruptcy();
      }
    });
  }

  updateConsole(newMessage) {
    this.setState(prevState => ({
      interactionText: [...prevState.interactionText, newMessage]
  }), () => {
    const consoleElement = this.consoleRef.current;
        consoleElement.scrollTop = consoleElement.scrollHeight;
    });
  }

  clearConsole() {
    this.setState({ interactionText: [] });
  }
  
  removeLastMessage() {
    this.setState(prevState => ({
      interactionText: prevState.interactionText.slice(0, -1)
    }));
  }

  handleNameSubmit(event) {
    event.preventDefault();
    const newName = event.target.name.value;
    if (newName.trim()) {
        this.setState({ name: newName, showNameModal: false, showStatMenu: true });
      } else {
        alert('Please enter a valid name.');
      }
    }

	handleTIAA(event) {
		this.updateConsole("-Who are you?- Yu.- No, not me. You.- Yes, I am Yu.Just answer the damn questions.- Who are you?- I have told you.- Are you deaf?- No, Yu is blind.I'm not blind, you blind.- That is what I just said. You just said what?- I did not say what, I said Yu.- That's what I'm asking you.- And Yu is answering.- Shut up!");
	}

  //styling elements
  render() {
    const headerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      background: '#f5f5f5',
      borderBottom: '1px solid #ddd'
    };

    const titleStyle = {
      fontWeight: 'bold',
      fontSize: '24px'
    };

    const nameStyle = {
      flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '24px'
    };

    const balanceStyle = {
      textAlign: 'right',
      fontSize: '14px',
      paddingRight: '10px'
    };

    const inputStyle = {
      width: '70%',
      padding: '40px',
      fontSize: '16px',
      margin: '20px 0'
    };

    const ageButtonStyle = {
      backgroundColor: 'green',
      color: 'white',
      fontSize: '20px',
      padding: '10px 20px',
      margin: '10px',
      border: 'none',
      borderRadius: '100px',
      cursor: 'pointer',
      outline: 'none',
      fontWeight: 'bold',
    };

    const restartButtonStyle = {
      backgroundColor: 'red',
      color: 'white',
      fontSize: '16px',
      padding: '10px 20px',
      margin: '10px',
      border: 'none',
      borderRadius: '100px',
      cursor: 'pointer',
      outline: 'none',
      fontWeight: 'bold'
    };

    const activitiesButtonStyle = {
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      padding: '10px 20px',
      margin: '10px',
      border: 'none',
      borderRadius: '100px',
      cursor: 'pointer',
      outline: 'none',
      fontWeight: 'bold'
    };

    const activitiesMenuStyle = {
      display: this.state.showActivities ? 'flex' : 'none',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      maxHeight: '80%',
      overflowY: 'auto',
      backgroundColor: '#FAB09C',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        padding: '100px',
        zIndex: 3,
        borderRadius: '10px'
    };

    const bottomButtonContainerStyle = {
      backgroundColor: 'rgba(255,255,255,0.5)',
	  position: 'fixed',
     bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      zIndex: 0,
    };

    const gambleMenuStyle = {
        display: this.state.showGamble ? 'block' : 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        padding: '20px',
        zIndex: 2,
        borderRadius: '10px'
      };
	  
	const realEstateMenuStyle = {
		display: this.state.showRealEstate ? 'block' : 'none',
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '300px',
		backgroundColor: '#ffffff',
		boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
		padding: '20px',
		zIndex: 2,
		borderRadius: '10px'
	  };
	  
	const newEventStyle = {
		display: this.state.showNewEvent ? 'block' : 'none',
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '300px',
		backgroundColor: '#ffffff',
		boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
		padding: '20px',
		zIndex: 2,
		borderRadius: '10px'
	}
	  
    const bankruptModalStyle = {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10,
    };

    const bankruptContentStyle = {
        padding: '20px',
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        borderRadius: '10px',
      };
  
    const bankruptButtonStyle = {
		padding: '10px 20px',
		fontSize: '16px',
		color: 'white',
		backgroundColor: 'black',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
    };

    const backgroundStyle = {
        backgroundImage: `url(${this.state.ownsHouse ? background2 : background1})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '-1'
      };

      const nameModalStyle = {
        display: this.state.showNameModal ? 'block' : 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
		height: '600px',
        backgroundColor: '#FAB09C',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        padding: '150px',
        zIndex: 3,
        borderRadius: '10px'
      };

      const statMenuStyle = {
        display: this.state.showStatMenu ? 'block' : 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        padding: '20px',
        zIndex: 2,
        borderRadius: '10px',
        //align: 'right'
      };
      
      const animationContainerStyle = {
        paddingTop: '0px',
        textAlign: 'center',
      };
	
		const ageImageStyle = {
			objectFit: 'cover',
			width: '50px',
			height: '50px',	
			position: 'fixed',
			bottom: 10,
			left: 20,
			
		};
		
		const jobImageStyle = {
			objectFit: 'cover',
			width: '50px',
			height: '50px',	
			position: 'fixed',
			bottom: 10,
			left: 140,
			
		};
		
		
		const BalanceImageStyle = {
			objectFit: 'cover',
			width: '50px',
			height: '50px',	
			position: 'fixed',
			bottom: 10,
			left: 300,
			
		};
		
		const incomeImageStyle = {
			objectFit: 'cover',
			width: '50px',
			height: '50px',	
			position: 'fixed',
			bottom: 10,
			right: 20,
			
		};
		
		const expensesImageStyle = {
			objectFit: 'cover',
			width: '50px',
			height: '50px',	
			position: 'fixed',
			bottom: 10,
			right: 140,
			
		};
		
		const TIAAImageStyle = {
			objectFit: 'cover',
			width: '50px',
			height: '50px',	
			position: 'fixed',
			bottom: 11,
			marginLeft: 20,
		};
		
		const statImageStyle = {
			objectFit: 'cover',
			width: '50px',
			height: '50px',	
			position: 'fixed',
			bottom: 15,
			marginLeft: 70,

		};
		
		const ageTextAlign = {
			position: 'absolute',
			bottom: 0,
			left: 80,
			textAlign: 'left',
		};
		
		const jobTextAlign = {
			position: 'absolute',
			bottom: 0,
			left: 200,
			textAlign: 'left',
		};
		
		const balanceTextAlign = {
			position: 'absolute',
			bottom: 0,
			left: 350,
			textAlign: 'left',
		};
		
		const incomeTextAlign = {
			position: 'absolute',
			bottom: 0,
			right: 80,
			textAlign: 'left',
		};
		
		const expensesTextAlign = {
			position: 'absolute',
			bottom: 0,
			right: 200,
			textAlign: 'left',
		};
		
		const invisibilityPotion = {
			background: 'transparent',
			border: 'none',
		};
		
		const bigFontStyle = {
			fontSize:'60px',
		}
		
		const InputTextStyle = {
			fontSize: '22px',
			width: '100%',
			padding: '12px 20px',
			margin: '8px 0',
			display: 'inline-block',
			border: '1px solid #ccc',
			borderRadius: '4px',
			boxSizing: 'border-box',
		}
		
		const buttonSubmitStyle = {
			marginLeft:'25%',
			marginTop:'5%',
			width: '270px',
			height: '80px',
			border: 'none',
			outline: 'none',
			background: '#2f2f2f',
			color: '#fff',
			fontSize: '22px',
			borderRadius: '40px',
			textAlign: 'center',
			boxShadow: '0 6px 20px -5px rgba(0,0,0,0.4)',
			position: 'relative',
			overflow: 'hidden',
			cursor: 'pointer',
		}
		
		const optionsStyle = {
			width: '200px',
			height: '50px',
			border: 'none',
			outline: 'none',
			background: '#2f2f2f',
			color: '#fff',
			fontSize: '22px',
			borderRadius: '40px',
			textAlign: 'center',
			boxShadow: '0 6px 20px -5px rgba(0,0,0,0.4)',
			position: 'relative',
			overflow: 'hidden',
			cursor: 'pointer',
			margin: '0.4%', 
		}
		
		const navOptionsStyle = {
			width: '200px',
			height: '50px',
			border: 'none',
			outline: 'none',
			background: '#2f2f2f',
			color: '#fff',
			fontSize: '22px',
			borderRadius: '40px',
			textAlign: 'center',
			boxShadow: '0 6px 20px -5px rgba(0,0,0,0.4)',
			position: 'relative',
			overflow: 'hidden',
			cursor: 'pointer',
		}
		
		const infoStyle = {
			display: this.state.showInfo? 'block' : 'none',
			position: 'fixed',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: '300px',
			backgroundColor: '#FAB09C',
			boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
			padding: '10px',
			zIndex: 3,
			borderRadius: '10px'
			
		}
	
    return (
      <div>
	  {/* Get Name */}
        {this.state.showNameModal && (
            <div style={nameModalStyle}>
                <form onSubmit={this.handleNameSubmit}>
                    <label style={bigFontStyle}>
						<br /><br />
                        Enter Character Name:
                        <input
                        type="text"
                        name="name" style={InputTextStyle}
                        required
                        />
                    </label>
                    <button type="submit" style={buttonSubmitStyle}>Submit</button>
                </form>
        </div>
        )}

        {/* Header section */}
        <div style={headerStyle}>
          {/* "SmartStart" on top left */}
          <div style={titleStyle}>SmartStart</div>

          {/* Character's name on top middle */}
          <div style={nameStyle}>{this.state.name}</div>

          {/* age & balance on top right */}
          <div style={balanceStyle}>
            Age: {this.state.age} | Balance: ${this.state.balance.toFixed(2)}
          </div>
        </div>

        {/* Middle of screen*/}
        <div style={{ paddingTop: '60px', paddingBottom: '80px', textAlign: 'center' }}>
		
		
        {/* Background image */}
        <div style={backgroundStyle}></div>
		
            {/* Console */}
            <textarea
            readOnly
            ref={this.consoleRef}
            style={inputStyle}
            value={this.state.interactionText.join('\n')}
            placeholder={"Your adult life begins..."}
            />
            
            {/* Activities Menu */}
            <div style={activitiesMenuStyle}>
              {/* buttons for 18+*/}
              <button style={optionsStyle}>Apply for Job</button>
              <button style={optionsStyle}>Stock Market</button>
              <button onClick={this.toggleGamble} style={optionsStyle}>Gamble</button>
              <button style={optionsStyle}>Roth IRA</button>
              
              {/* buttons for 22+ */}
              {this.state.age >= 22 && (
              <>
              <button onClick={this.purchaseHouse}>Purchase House</button>
			  <button onClick={this.toggleRealEstate}>Buy Real Estate</button>
              <button onClick={this.toggleGamble}>Gamble</button>	
              </>
              )}
              {/* buttons for 50+ */}
              {this.state.age >=  50 && (
              <button>Retire!</button>
              )}  
			  <br />
			  <button onClick={this.toggleActivities} style={navOptionsStyle}>Close</button>	
            
			</div>
            {/* Gamble Menu */}
            {this.state.showGamble && (
            <div style={gambleMenuStyle}>
                <form onSubmit={this.handleGambleSubmit}>
                <label>
                    Enter gamble amount:
                    <input
                    type="number"
                    value={this.state.gambleAmount}
                    onChange={this.handleGambleChange}
                    min="0.01"
                    step="0.01"
                    max={this.state.balance.toFixed(2)}
                    />
                </label>
                <button type="submit" onClick={this.handleGambleSubmit}>Gamble!</button>
                <button type="button" onClick={this.toggleGamble}>Cancel</button>
                </form>
            </div>
            )}
			{/* Real Estate Menu*/}
			{this.state.showRealEstate && (
				<div style={realEstateMenuStyle}>
					<form onSubmit={this.handleRealEstate}>
				  <button onClick={this.handleRealEstate}>Mansion for $100</button><br />
				  <button onClick={this.handleRealEstate}>Crappy apartment for $500</button><br />
				  <button onClick={this.handleRealEstate}>5 square meters of land for $200</button><br />
					<button type="button" onClick={this.toggleRealEstate}>Cancel</button>
					</form>
				</div>
				)}
				{/* Stat Menu */}
            {this.state.showStatMenu && (
			<div style={statMenuStyle}>
				<label>
					Age: {this.state.age}
					<br />
					Balance: ${this.state.balance.toFixed(2)}
					<br />
					Education: {this.state.education}
					<br />
					Background: {this.state.backgroundInfo}
					<br />
				</label>
				<button type="button" onClick={this.toggleStatMenu}>Close</button>
			</div>
			)}
			{/* New Event Response*/}
			{this.state.showNewEvent && (
			<div style={newEventStyle}>
				<form onSubmit={this.handleNewEvent}>
					<p>Lorem ipsum</ p>
					<input type="text" name="EventResponse" required />
				<button type="submit" >Submit</button>
				</form>
			</div>
			)}
			{/* Info Window */}
			{this.state.showInfo && (
			<div style={infoStyle}>
			<form>
				<p>Info Lorem Ipsum</p>
				<button type=""  onClick={this.toggleInfo}>Close</button>
				</ form>
			</div>
			)}
        </div>
        {/* bottom of screen */}
        <div style={bottomButtonContainerStyle}>
		
			<img src={heart} style={ageImageStyle} alt='Age image' />
			<h1 style={ageTextAlign}>{this.state.age}</ h1>
			<img src={job} style={jobImageStyle} alt='job image' />
			<h1 style={jobTextAlign}>{this.state.job}</ h1>
			<img src={coin} style={BalanceImageStyle} alt='balance image' />
			<h1 style={balanceTextAlign}>{this.state.balance.toFixed(2)}</ h1>
			
			<img src={arrowup} style={incomeImageStyle} alt='income image' />
			<h1 style={incomeTextAlign}>+${this.state.income}</ h1>
			<img src={arrowdown} style={expensesImageStyle} alt='expenses image' />
			<h1 style={expensesTextAlign}>-${this.state.expenses}</ h1>
		  
		  {/* Restart Game Button*/}
                <button onClick={this.restartGame} style={restartButtonStyle} type="button">
                  Restart Game
                </button>
          {/* Increment Age Button*/}
          <button onClick={this.increaseAge} style={ageButtonStyle} type="button">
            +Age
          </button>

          

          {/* Activities Button */}
          <button
            onClick={this.toggleActivities}
            style={activitiesButtonStyle}
            type="button"
          >
            Activities
          </button>
		  
		  {/* this could be improved. The button and image are not overlapping*/}
		  <button style={invisibilityPotion} onClick={this.handleTIAA}>
			<img src={TIAA}  style={TIAAImageStyle} alt='TIAA advisor'/>
		  </button>
		  
		  {/* this could be improved. The button and image are not overlapping*/}
		  <button style={invisibilityPotion} onClick={this.toggleStatMenu}>
			<img src={stat} style={statImageStyle} alt='stat image' />
		  </button>
        </div>
        {/* Animation Frames */}
    <div style={animationContainerStyle}>
    <img src={
        this.state.currentFrame === 0 ? liveFrame1 :
        this.state.currentFrame === 1 ? liveFrame2 :
        liveFrame3
    }  alt="Character Animation" />
</div>

    {/* out of money (bankruptcy) */}
    {this.state.isBankrupt && (
      <div style={bankruptModalStyle}>
        <div style={bankruptContentStyle}>
          <h2>You ran out of money!</h2>
          <button
            style={bankruptButtonStyle}
            onClick={() => window.location.reload()}
          >
            Restart
          </button>
        </div>
      </div>
    )}
      </div>
    );
  }
}
