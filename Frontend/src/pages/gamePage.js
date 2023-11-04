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
            balance: 1000.00,
            name: 'First Last', // Added a name to the state
            interactionText: '' // Holds the user's input text
        };

        // Bindings
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.increaseAge = this.increaseAge.bind(this);
    }

    // Handlers
    handleChange(event) {
        this.setState({ interactionText: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    // Age increment
    increaseAge() {
        this.setState(prevState => ({ age: prevState.age + 1 }));
    }

    //Styling
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

        return (
            <div>
                {/* Header section */}
                <div style={headerStyle}>
                    {/* Title on the left */}
                    <div style={titleStyle}>SmartStart</div>
                    
                    {/* Name in the middle */}
                    <div style={nameStyle}>{this.state.name}</div>
                    
                    {/* Traits on right */}
                    <div style={balanceStyle}>
                        Age: {this.state.age} | Balance: ${this.state.balance.toFixed(2)}
                    </div>
                </div>

                {/* Main screen*/}
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            style={inputStyle}
                            type="text"
                            value={this.state.interactionText}
                            onChange={this.handleChange}
                            placeholder="What's your next move?"
                        />
                        {/* Age Button*/}
                        <button onClick={this.increaseAge} style={ageButtonStyle} type="button">
                            <span style={plusStyle}>+</span> Age
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
