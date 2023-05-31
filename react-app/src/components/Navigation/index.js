import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();

	const signIn = (e) => {
		e.preventDefault();
		history.push('/login');
	};

	return (
		<div>
			<div className='nav-bar'>
				<div className='section section1'>
					<NavLink exact to="/"><img className='nav-logo' alt='' src='https://res.cloudinary.com/djclmc80y/image/upload/v1684893514/amazon_logo_dark_blue_w4vfje.jpg' /></NavLink>
				</div>
				<span className='section section2'>
					<span>
						<img className='geo-loc-icon' alt='' src='https://res.cloudinary.com/djclmc80y/image/upload/v1684983616/geo-location-icon_qj4cuw.png'/>
					</span>
				</span>
				{sessionUser ? (
					<span className='section section3'>
						<span>
							<div className='line-1'>Deliver to {sessionUser.first_name} </div>
							<div className='line-2'>{sessionUser.city}, {sessionUser.zip}</div>
						</span>
					</span>
				): (
					<span className='section section3' onClick={signIn}>
						<span>
							<div className='line-1'>Hello</div>
							<div className='line-2'>Sign in to get started</div>
						</span>
					</span>
				)}
				<div className='section secion4'>
					<span>
						<input type='search' placeholder='Search Amazon'></input>
					</span>
					<span className='search-icon'>
						<img alt='' scr='https://res.cloudinary.com/djclmc80y/image/upload/v1684986674/seach_icon_m377xc.jpg'></img>
					</span>
				</div>
				<div className='section section5'>
					<div>Hello, {sessionUser?.first_name}</div>
					<span>Manage Account</span>
					{isLoaded && (
						<ProfileButton user={sessionUser} />
					)}
				</div>
				<div className='section section6'>
					<img className='cart-icon' alt='' src='https://caitlyn.s3.us-west-2.amazonaws.com/cart-icon.jpg'></img>
					<span>Cart</span>
				</div>
			</div>
			<div className='category-bar'>
			</div>
		</div>
	);
}

export default Navigation;
