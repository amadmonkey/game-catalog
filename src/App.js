import React, { useEffect } from 'react';
import './reset.css';
import './App.scss';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NotFound from './utilities/404/404';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import _ROUTES from "./utilities/Routes";

import { ReactComponent as Controller } from './img/bg-controller.svg';
import { ReactComponent as Triangle } from './img/bg-triangle.svg';
import { ReactComponent as Square } from './img/bg-square.svg';
import { ReactComponent as Mouse } from './img/bg-mouse.svg';
import { ReactComponent as Keyboard } from './img/bg-keyboard.svg';
import { ReactComponent as Circle } from './img/bg-circle.svg';
import { ReactComponent as Dpad } from './img/bg-dpad.svg';


const App = () => {

	useEffect(()=> {
		window.addEventListener('scroll', () => {
			if(window.pageYOffset !== 0){
				document.querySelector('.main-header').classList.add('active');
			} else {
				document.querySelector('.main-header').classList.remove('active');
			}
		})
	}, [])

	return (
		<div className="app">
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Header />
				<div id="CONTENT" className="content">
					<Switch>
						{Object.keys(_ROUTES).map((key, i) => {
							return <Route key={i} path={_ROUTES[key].path} component={_ROUTES[key].component} exact={_ROUTES[key].exact} />
						})}
						<Route component={NotFound} />
					</Switch>
				</div>
				<Footer />
			</BrowserRouter>
			<Controller className="bg-item bg-controller-1" />
			<Triangle className="bg-item bg-triangle-1" />
			<Square className="bg-item bg-square" />
			<Mouse className="bg-item bg-mouse" />
			<Keyboard className="bg-item bg-keyboard" />
			<Circle className="bg-item bg-circle" />
			<Triangle className="bg-item bg-triangle-2" />
			<Controller className="bg-item bg-controller-2" />
			<Dpad className="bg-item bg-dpad" />
		</div>
	);
}

export default App;
