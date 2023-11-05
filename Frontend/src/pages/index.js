import React from 'react';
import title from '../images/title.png';


/**
 * Pages index, responsible for the home page
 */
export default class Index extends React.Component {
	render () {
	const Home = () => {
		return (
			<div>
				<h1>It's a page! Hit GamePage for the game!</h1>
			</div>
		);
	};

	const titleStyle = {
		backgroundImage: `url(${title})`,
		backgroundPosition: 'center',
		backgroundAttachment: 'fixed',
		backgroundRepeat: 'no-repeat',
		backgroundColor: 'black',
		width: '100vw',
		height: '100vw',
		
		};
		return (
			<div>
				<div style={titleStyle}></div>
			</div>
			);
	}
}



