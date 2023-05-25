import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div>
			<div className='nav-bar'>
				<div className='section section1'>
					<NavLink exact to="/"><img className='nav-logo' src='https://res.cloudinary.com/djclmc80y/image/upload/v1684893514/amazon_logo_dark_blue_w4vfje.jpg' /></NavLink>
				</div>
				<div className='section section2'>
					<span className='icon'>
						<img className='geo-loc-icon' src='https://res.cloudinary.com/djclmc80y/image/upload/v1684983616/geo-location-icon_qj4cuw.png'/>
					</span>
					<span className='line-1'>Home</span>
					<div className='line-2'>Sign in to get started</div>
				</div>
				<div className='section secion3'>
					<span>
						<input type='search' placeholder='Search Amazon'></input>
					</span>
					<span className='search-icon'>
						<img scr='https://res.cloudinary.com/djclmc80y/image/upload/v1684986674/seach_icon_m377xc.jpg'></img>
					</span>
				</div>
				<div className='section section4'>
					account info
				</div>
				<div className='section section5'>
					cart
				</div>
			</div>
			<div className='category-bar'>
			</div>
		</div>
	);
}

export default Navigation;

{/* {isLoaded && (
	<ProfileButton user={sessionUser} />
)} */}
