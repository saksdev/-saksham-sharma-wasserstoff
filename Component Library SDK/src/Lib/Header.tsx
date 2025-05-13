import React from 'react';
import logo from '../assets/ticket.png';
import './Header.css';

const Header: React.FC = () => {
	return (
		<header>
			<div className="logo-container">
				<img src={logo} alt="Coding Conf Logo" className="logo" />
				<h3>Coding Conf</h3>
			</div>
		</header>
	);
};

export default Header;
