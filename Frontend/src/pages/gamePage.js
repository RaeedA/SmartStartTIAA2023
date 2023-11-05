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
import { CallAPI } from "../util";

//import TIAA from '../images/TIAA.png';
/**
 * Game Page
 */
export default class GamePage extends React.Component {
    constructor(props) {
        super(props);
      //TIAA advice
      this.adviceArray = [
        'The sooner you begin saving and investing for retirement, the more time your money has to grow.',
        'Spread your investments across different asset classes to reduce risk.',
        'If available, take advantage of employer-sponsored retirement plans like 401(k)s.',
        'Consider opening traditional or Roth IRAs for additional retirement savings.',
        'Explore the option of annuities to secure a steady income stream in retirement.',
        'Create a retirement budget to estimate your expenses and plan accordingly.',
        'Understand your Social Security benefits and when to start claiming them.',
        'Account for healthcare expenses, as they often increase in retirement.',
        'Consider how inflation may erode the purchasing power of your savings.',
        'Consult with financial advisors to make informed decisions tailored to your specific situation.',
        'Plan for a retirement that may last several decades to ensure you don\'t outlive your savings.',
        'Maintain an emergency fund to cover unexpected expenses in retirement.',
        'Develop a plan for the distribution of your assets after you pass away.',
        'Optimize your investments for tax efficiency to minimize tax burdens in retirement.',
        'Balance liquidity needs with potential investment returns based on your retirement stage.',
        'Determine your risk tolerance and align your investments accordingly.',
        'Be prepared to adjust your retirement plan as circumstances change.',
        'Remember that retirement planning is a dynamic process, and it\'s essential to stay informed, reassess your plan periodically, and seek professional guidance when needed.'

      ];

        // character initial traits
        this.state = {
            age: 18,
            balance: (Math.random() * (5000 - 500) + 500),  //random balance between 500 and 5,000 dollars
            name: 'Your Name',
            realEstate: [],
            realEstateIncome: 0,
            stocks: [],
            rothIRA: [],
            job: 'NONE',
            income: 0,
            expenses: 0,
            education: 'TEMPRORARY',
            backgroundInfo: 'The Retirement Investment Game had begun for Emma. At age 18, she was faced with the exciting challenge of building her financial future while pursuing her dreams. The decisions she made now would determine whether she would be able to retire comfortably and continue to follow her passions. Emma was determined to make the right choices and build a life that combined adventure and security.',
            newEventResponse: '',
            newEventInfo: '',
		        showStatMenu: false,
            interactionText: [],
            showActivities: false,
            showNameModal: true,
            showGamble: false, 
            showHousing: false,
    		    showNewEvent: false,
		        showRealEstate: false,
            gambleAmount: '', 
            isBankrupt: false,
            ownsHouse: false,
            ownsAppartment: false,
            currentFrame: 0,
            showAdvice: false,
            adviceText: '',
            eventsHistory: [],
            headlineHistory: []
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
    this.toggleHousing = this.toggleHousing.bind(this);
    this.consoleRef = React.createRef();
    this.toggleTIAAAdvice = this.toggleTIAAAdvice.bind(this);
	  this.handleTIAA = this.handleTIAA.bind(this);
    this.handleNewEvent = this.handleNewEvent.bind(this);
	  this.toggleNewEvent = this.toggleNewEvent.bind(this);
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

  toggleTIAAAdvice() {
    if (!this.state.showAdvice) {
      // If we are about to show the advice, pick a random advice string
      const randomAdvice = this.adviceArray[Math.floor(Math.random() * this.adviceArray.length)];
      this.setState({
        adviceText: '\"' + randomAdvice + '\"'
      });
    }
  
    // Then toggle the visibility of the advice popup
    this.setState(prevState => ({ showAdvice: !prevState.showAdvice }));
  }

    increaseAge() {
        this.setState(prevState => ({ age: prevState.age + 1 }), () => {
            this.updateConsole("Aging Up...")
            this.checkAge();
            const toSend = {
                name: this.state.name,
                age: this.state.age,
                rothIRA: this.state.rothIRA,
                balance: this.state.balance,
                job: this.state.job,
                income: this.state.income,
                stocks: this.state.stocks,
                houseType: this.state.ownsHouse ? "house" : "",
                education: this.state.education,
                expenses: this.state.expenses,
                stocks: this.state.stocks,
                realEstate: this.state.realEstate,
                realEstateIncome: this.state.realEstateIncome,
                eventsHistory: this.state.eventsHistory,
                headlineHistory: this.state.headlineHistory
            }
            CallAPI("newYear", toSend).then((response) => {
                this.setState(() => ({
                    balance: response.balance,
                    stocks: response.stocks,
                    eventsHistory: response.eventsHistory,
                    headlineHistory: response.headlineHistory,
                    newEventInfo: response.eventsHistory[response.eventsHistory.length-1].content
                }), () => {
                    this.removeLastMessage()
                    this.updateConsole(this.state.newEventInfo)
                    this.toggleNewEvent();
                })
            })
        })
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

  toggleHousing() {
    this.setState(prevState => ({ showHousing: !prevState.showHousing }));
  }

	toggleRealEstate() {
		this.setState(prevState => ({ showRealEstate: !prevState.showRealEstate }));
	  }
	  
	toggleNewEvent() {
    this.setState(prevState => ({ showNewEvent: !prevState.showNewEvent }));
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
        event.preventDefault();
        if(event.target.name == 'apartment') {
            this.setState((prevState) => ({
                realEstate: [...prevState.realEstate, "Apartment"],
                realEstateIncome: prevState.realEstateIncome + 5000,
                balance: prevState.balance - 50000
            }), () => {this.updateConsole("You purchased an apartment!")});
        } else {
            this.setState((prevState) => ({
                realEstate: [...prevState.realEstate, "House"],
                realEstateIncome: prevState.realEstateIncome + 25000,
                balance: prevState.balance - 500000
            }), () => {this.updateConsole("You purchased a house!")});
        }
    }
	  
  	handleNewEvent(event) {
        event.preventDefault();
        const userResponse = event.target.EventResponse.value;
        if (userResponse.trim()) {
            CallAPI("finishEvent", {balance: this.state.balance, message: userResponse, history: this.state.eventsHistory}).then((response) => {
                this.updateConsole(userResponse)
                this.setState(() => ({
                    eventHistory: response.history,
                    newEventInfo: response.history[response.history.length-1].content,
                    balance: response.balance
                }), () => {
                    this.updateConsole(this.state.newEventInfo);
                    this.updateConsole("You turned " + (this.state.age) + "!");
                })
            })
        } else {
            alert('Please enter an input.');
        }
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
        fontSize: '16px',
        padding: '10px 20px',
        margin: '10px',
        border: 'none',
        borderRadius: '100px',
        cursor: 'pointer',
        outline: 'none',
        fontWeight: 'bold'
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

      const plusStyle = {
        fontSize: '30px',
        marginRight: '5px'
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
        backgroundColor: '#ADD8E6',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        padding: '20px',
        zIndex: 1,
        borderRadius: '10px'
      };

    const bottomButtonContainerStyle = {
      position: 'fixed',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      zIndex: 0
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
          width: '300px',
          backgroundColor: '#FAB09C',
          boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
          padding: '300px',
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

      const housingMenuStyle = {
        display: this.state.showHousing ? 'block' : 'none',
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
    const tiaaAdviceMenuStyle = {
      display: this.state.showAdvice ? 'block' : 'none',
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
    };
      
		
		const invisibilityPotion = {
			background: 'transparent',
			border: 'none',
		};
    
    return (
      <div>
	  {/* Get Name */}
        {this.state.showNameModal && (
            <div style={nameModalStyle}>
                <form onSubmit={this.handleNameSubmit}>
                    <label>
                        Enter Character Name:
                        <input
                        type="text"
                        name="name" 
                        required
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
        </div>
        )}
        {/* Background image */}
        <div style={backgroundStyle}></div>

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
              <button>Apply for Job</button>
              <button>Stock Market</button>
              <button onClick={this.toggleGamble}>Gamble</button>
              <button>Roth IRA</button>
              <button onClick={this.toggleTIAAAdvice}>Get TIAA Advice</button>
              
              {/* buttons for 22+ */}
              {this.state.age >= 22 && (
              <>
              <button onClick={() => this.purchaseHouse()}>Purchase Apartment (10k, 4k/Year Living Expenses)</button>
			        <button onClick={this.toggleRealEstate}>Buy Real Estate</button>
              </>
              )}
              {/* buttons for 50+ */}
              {this.state.age >=  50 && (
              <>
              <button>Retire!</button>
              </>
              )}
			      <button onClick={this.toggleActivities}>Close</button>
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
				  <button name = "apartment" onClick={this.handleRealEstate}>Apartment for $50k, Earns 5k/Year</button><br />
				  <button name = "house" onClick={this.handleRealEstate}>House for 500k, Earns 25k/Year </button><br />
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
        {this.state.showHousing && (
				<div style={housingMenuStyle}>
					<form onSubmit={this.handleRealEstate}>
					<label>
					Appartment
					<br />
					---
					<br />
					House
					<br />
					---
					<br />
					</label>
					<button type="button" onClick={this.toggleHousing}>Close</button>
					</form>
				</div>
				)}

        {this.state.showAdvice && (
          <div style={tiaaAdviceMenuStyle}>
            <p>{this.state.adviceText}</p>
            <button type="button" onClick={this.toggleTIAAAdvice}>Cool!</button>
          </div>
        )}
        {/* New Event Response*/}
        {this.state.showNewEvent && (
        <div style={newEventStyle}>
          <form onSubmit={this.handleNewEvent}>
            <p>{this.state.newEventInfo}</ p>
            <input type="text" name="EventResponse" required />
          <button type="submit" >Submit</button>
          </form>
        </div>
        )}
          </div>
          {/* bottom of screen */}
        <div style={bottomButtonContainerStyle}>
      
        <img src={heart} style={ageImageStyle} alt='Age image' />
        <h1 style={ageTextAlign}>{this.state.age}</ h1>
        <img src={job} style={jobImageStyle} alt='job image' />
        <h1 style={jobTextAlign}>{this.state.job}</ h1>
        
        <img src={arrowup} style={incomeImageStyle} alt='income image' />
        <h1 style={incomeTextAlign}>+${this.state.income}</ h1>
        <img src={arrowdown} style={expensesImageStyle} alt='expenses image' />
        <h1 style={expensesTextAlign}>-${this.state.expenses}</ h1>
        <h1 style={expensesTextAlign}>{this.state.expenses}</ h1>
            {/* Restart Game Button*/}
                  <button onClick={this.restartGame} style={restartButtonStyle} type="button">
                    Restart Game
                  </button>
            {/* Increment Age Button*/}
            <button onClick={this.increaseAge} style={ageButtonStyle} type="button">
              <span style={plusStyle}>+ </span>Age
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
