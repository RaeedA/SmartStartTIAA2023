import React from "react";

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
        name: 'First Last',
        interactionText: '',
        showActivities: false,
        showGamble: false, 
        gambleAmount: '', 
        isBankrupt: false
      };

    // Bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.increaseAge = this.increaseAge.bind(this);
    this.toggleActivities = this.toggleActivities.bind(this);
    this.toggleGamble = this.toggleGamble.bind(this);
    this.handleGambleChange = this.handleGambleChange.bind(this);
    this.handleGambleSubmit = this.handleGambleSubmit.bind(this);
    this.checkBankruptcy = this.checkBankruptcy.bind(this);
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
  }

  toggleActivities() {
    this.setState(prevState => ({ showActivities: !prevState.showActivities }));
  }

  toggleGamble() {
    this.setState(prevState => ({ showGamble: !prevState.showGamble }));
  }

  handleGambleChange(event) {
    this.setState({ gambleAmount: event.target.value });
  }

  handleGambleSubmit(event) {
    {/*For now it just subtracts amount gambled from character's balance */}
    event.preventDefault();
    const amount = parseFloat(this.state.gambleAmount);
    if (!isNaN(amount) && amount > 0 && amount <= (this.state.balance + .01)) {
      this.setState(prevState => ({
        balance: prevState.balance - amount,
        gambleAmount: '', //resets gamble amount
        showGamble: false
      }), this.checkBankruptcy); // checks for bankruptcy after gambling
    } else {
      alert('You cannot gamble that amount.');  //if they try to gamble more than they have
    }
  }

  checkBankruptcy() {
    if (this.state.balance <= 0.01) {
      this.setState({ isBankrupt: true });
    }
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
      width: '100%',
      padding: '10px',
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


    return (
      <div>
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
          <form onSubmit={this.handleSubmit}>
            {/* input box*/}
            <input
              style={inputStyle}
              type="text"
              value={this.state.interactionText}
              onChange={this.handleChange}
              placeholder={`What's your next move at age ${this.state.age}?`}
            />
            
            {/* Activities Menu */}
            <div style={activitiesMenuStyle}>
              {/* buttons to change / implement */}
              <button>Apply for Job</button>
              <button>Stock Market</button>
              <button>Roth IRA</button>
              <button>Buy Real Estate</button>
              <button onClick={this.toggleGamble}>Gamble</button>
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
          </form>
        </div>

        {/* bottom of screen */}
        <div style={bottomButtonContainerStyle}>
          {/* Increment Age Button*/}
          <button onClick={this.increaseAge} style={ageButtonStyle} type="button">
            <span style={plusStyle}>+</span> Age
          </button>

          {/* Activities Button */}
          <button
            onClick={this.toggleActivities}
            style={activitiesButtonStyle}
            type="button"
          >
            Activities
          </button>
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
