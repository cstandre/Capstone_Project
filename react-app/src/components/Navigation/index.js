import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import { loadItems } from '../../store/cart';
import { loadProducts } from '../../store/products';

import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state?.session?.user);
	const cartItems = useSelector(state=>state?.cartItems);
	const history = useHistory();
	const dispatch = useDispatch();

	const quantityArr = Object.values(cartItems).map(item => item.quantity)
	const quantityNum = quantityArr.reduce((acc, num) => acc + num, 0)

	useEffect(() => {
		dispatch(loadItems())
	}, [dispatch])

	const signIn = (e) => {
		e.preventDefault();
		history.push('/login');
	};

	const handleClick = (e) => {
		e.preventDefault();
		if (sessionUser) {
			history.push('/cart');
		} else {
			history.push('/login')
		};
	};

	const handleHome = async (e) => {
		e.preventDefault();
		await dispatch(loadProducts());
		history.push('/');
	};

	return (
		<div>
			<div className='nav-bar'>
				<div className='section section1'>
					<div onClick={handleHome}><img className='nav-logo' alt='' src='https://res.cloudinary.com/djclmc80y/image/upload/v1684893514/amazon_logo_dark_blue_w4vfje.jpg' /></div>
				</div>
				{sessionUser ? (
					<div className='section section2'>
						<div>
							<img className='geo-loc-icon' alt='' src='https://res.cloudinary.com/djclmc80y/image/upload/v1684983616/geo-location-icon_qj4cuw.png'/>
						</div>
						<div>
							<div className='line-1'>Deliver to {sessionUser?.first_name && sessionUser.first_name.charAt(0).toUpperCase() + sessionUser.first_name.slice(1)} </div>
							<div className='line-2'>{sessionUser?.city && sessionUser.city.charAt(0).toUpperCase() + sessionUser.city.slice(1)}, {sessionUser.zip}</div>
						</div>
					</div>
				): (
					<span className='section section2' onClick={signIn}>
						<span>
							<div className='line-1'>Hello</div>
							<div className='line-2'>Sign in to get started</div>
						</span>
					</span>
				)}
				<div className='section secion3'>
					<span className='search-container'>
						<button>All</button>
						<span>
						<input className='search' type='search' placeholder='Search Amazon'></input>
						</span>
						<span className='magnifying-container'><i className="fa-solid fa-magnifying-glass"></i></span>
					</span>
				</div>
				<div className='section section4'>
					<div>Hello, {sessionUser?.first_name && sessionUser.first_name.charAt(0).toUpperCase() + sessionUser.first_name.slice(1)}</div>
					<span>Manage Account</span>
					{isLoaded && (
						<ProfileButton user={sessionUser} />
					)}
				</div>
				<div className='section section5' onClick={handleClick}>
					<img className='cart-icon' alt='' src='https://caitlyn.s3.us-west-2.amazonaws.com/cart-icon.jpg'></img>
					{sessionUser ? (
						<div className='cart-num'>{quantityNum}</div>
					): (
						<div className='cart-num'>0</div>
					)}
					<span>Cart</span>
				</div>
			</div>
			<div className='category-bar'>
			</div>
		</div>
	);
}

export default Navigation;
