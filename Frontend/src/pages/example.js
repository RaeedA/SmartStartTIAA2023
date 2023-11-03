import React from "react";
import { CallAPI } from "../util";

/**
 * Example page, note how it's a class not a function.
 * This adds two numbers using a call to backend.
 */
export default class Example extends React.Component {
    constructor(props) {
        super(props);
        // Initialize empty state, this is where all page-specific stuff is stored
        this.state = {
            "value1": '',
            "value2": '',
            "answer": ''
        };

        // Bind helper functions to the page
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Whenever a text box is changed, updates the state value to match
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    // When submit is pressed, it calls api/example and saves the response to the state
    handleSubmit(event) {
    event.preventDefault();
    CallAPI("example", this.state).then((message) => {
        this.setState({"answer": [message.body]});
    })
    }
    
    // HTML for the page, includes text boxes, form, and response.
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} name={"value1"}/>
                    +
                    <input type="text" value={this.state.value} onChange={this.handleChange} name={"value2"}/>
                </label>
                <br/>
                <input type="submit" value="Click for Magic" />
                <br/>
                <label>
                    {this.state.answer}
                </label>
            </form>
        );
    };
}