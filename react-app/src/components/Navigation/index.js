import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import { loadItems } from '../../store/cart';
import { search } from '../../store/search';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
// import { loadProducts } from '../../store/products';

import './Navigation.css';


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state?.session?.user);
	const cartItems = useSelector(state=>state?.cartItems);
	const results = useSelector(state=>state?.searched);
	const products = results.products
	// const products = useSelector(state=>state?.products)
	const history = useHistory();
	const dispatch = useDispatch();

	// console.log(results, 'results')
	// console.log(products, 'products')
	const [input, setInput] = useState('');

	const quantityArr = Object?.values(cartItems)?.map(item => item?.quantity)
	const quantityNum = quantityArr?.reduce((acc, num) => acc + num, 0) || 0;
	// console.log(quantityNum)

	useEffect(() => {
		if (sessionUser) {
		  dispatch(loadItems());
		}
	}, [dispatch, sessionUser]);

	useEffect(() => {
		if (input.trim().length > 0) {
			dispatch(search(input));
		} else {
			dispatch(search(''));
		};
	}, [dispatch, input]);

	const handleClick = (e) => {
		e.preventDefault();
		if (sessionUser) {
			history.push('/cart');
		} else {
			// setShowLoginModal(true)
		};
	};

	const handleHome = async (e) => {
		e.preventDefault();
		history.push('/');
	};

	const show = () => {
		document.querySelector('.search-results').classList.remove('hidden');
	};

	const reset = (id) => {
		document.querySelector('.search-results').classList.add('hidden');
		history.push(`/products/${id}`);
		setInput('');
	};

	const searchAll = () => {
		history.push('/products/search/all')
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
							<div className='line-1'>Deliver to {sessionUser?.first_name} </div>
							<div className='line-2'>{sessionUser?.city}, {sessionUser?.zip}</div>
						</div>
					</div>
				): (
					<OpenModalButton
						buttonText={
							<span className='section section2'>
								<div className='sign-in-btn'>
									<div className='line-1'>Hello,</div>
									<div className='line-2'>Sign in to get started</div>
								</div>
							</span>
						}
						modalComponent={<LoginFormModal />}
					/>
				)}
				<div className='section section3'>
					<span className='search-container'>
						<button className='all-btn'>All</button>
						<input
							className='search'
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onFocus={() => show()}
							type='search'
							placeholder='Search Amazon'
						/>
						<span className='magnifying-container'><i className="fa-solid fa-magnifying-glass"></i></span>
					</span>
					<div className='search-results hidden'>
						{products && (products?.length > 0 && input?.length > 0 ? (
								products?.map((product) => (
									<div key={product?.id} className='search-card' onClick={() => reset(product?.id)}>
										<div>{product?.product_name}</div>
									</div>
								))
							) : (input?.length > 0 ? (
								<div className='search-result'>
									Sorry, there are no products that match your search
								</div>
							) :
								<div className='search-result hidden'>
									Sorry, there are no products that match your search
								</div>
								)
							)
						}
					</div>
				</div>
				<div className='section section4'>
					<div>Hello, {sessionUser?.first_name}</div>
					<span>Manage Account</span>
					{isLoaded && (
						<ProfileButton user={sessionUser} />
					)}
				</div>
				<div className='section section5' onClick={handleClick}>
					<div className='cart-icon-container'>
    					<img className='cart-icon' alt='' src='https://caitlyn.s3.us-west-2.amazonaws.com/cart-icon.jpg'></img>
    					{sessionUser ? (
    					  <div className='cart-num'>{quantityNum}</div>
    					) : (
    					  <div className='cart-num'>0</div>
    					)}
  					</div>
					<span>Cart</span>
				</div>
			</div>
			<div className='category-bar'>
				<p className='category-txt' onClick={searchAll}>Shop All Items</p>
			</div>
		</div>
	);
}

export default Navigation;
