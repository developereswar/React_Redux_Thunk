import React from 'react';
import { Dashboard } from './dashboardPages/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header'
class Layout extends React.Component {
	render() {
		return (
			<Router>
        <Header/>
				<Route path="*" component={Dashboard} />
			</Router>
		);
	}
}

export default Layout;
