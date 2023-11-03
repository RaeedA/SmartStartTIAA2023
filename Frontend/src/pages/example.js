import React from "react";
import { CallAPI } from "../util";

export default class Example extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
              "value1": '',
              "value2": '',
              "answer": ''
          };

          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
          this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit(event) {
          event.preventDefault();
          CallAPI("example", this.state).then((message) => {
              this.setState({"answer": [message.body]});
          })
      }
    
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