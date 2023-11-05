import React from 'react';
import { Link } from 'react-router-dom'; 
import title from '../images/title.png';

export default class Index extends React.Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  render() {
    const titleStyle = {
      backgroundImage: `url(${title})`,
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'black',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
	  justifyContent: 'center'
    };

    const playButtonStyle = {
      padding: '10px 20px',
      fontSize: '1.5rem',
      color: 'white',
      backgroundColor: '#34eb67',
      border: 'none',
      borderRadius: '5px',
      textDecoration: 'none', 
      cursor: 'pointer',
	  marginTop: '600px'
    };

    return (
      <div style={titleStyle}>
        <Link to="/game" style={playButtonStyle}>PLAY</Link> {/* Play button as a link */}
      </div>
    );
  }
}
