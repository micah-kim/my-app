// global style sheet
import '../styles/style.css';
// app specific style sheet
import css from '../styles/App.module.css';
import React from 'react';
import Header from './Header.jsx';
import Home from './Home.jsx';
import Navbar from './Navbar.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "home"
    }
  }
  setPage(page) {
    console.log("this context", this);
    console.log("child called with ", page);
    this.setState({
      page
    });
  }

  renderMain(page) {
    switch(page) {
      case "home": return <Home/>;
      // case "add": return <Add/>;
      default: <Home/>;
    }
  }

  render() {
    return (
    <div className={css.container}>
	    <Header/>
	    <main className={css.content}>
	      <Home/>
      </main>
      <Navbar/>
    </div>
    )}
}