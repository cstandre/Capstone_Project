import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
			<div>
				<NavLink exact to="/"><img className='nav-logo' src='https://res.cloudinary.com/djclmc80y/image/upload/v1684893514/amazon_logo_dark_blue_w4vfje.jpg' /></NavLink>
			</div>
			{isLoaded && (
					<ProfileButton user={sessionUser} />
			)}
		</>
	);
}

export default Navigation;
