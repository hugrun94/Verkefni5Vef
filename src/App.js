import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom'

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import NotFound from './components/not-found';
const url = process.env.REACT_APP_SERVICE_URL;

class App extends Component {


  state = { data: null, loading: true, error: false }
  
  async componentDidMount() {
    try {
      const data = await this.fetchData();
      if(data === undefined) {
        return this.setState({ error: true, loading: false });
      }
      this.setState({ data, loading: false });
    } catch (e) {
      this.setState({ error: true, loading: false });
    }
  }
  async fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    if(response.ok === false) {
      return undefined;
    }
    return data;
  }

  render() {

    const { loading, error, data } = this.state;
    if(loading === false && error === false) {
      const schools = data.schools;
    
    return (
      <main className="app">
        <Helmet 
        defaultTitle="Próftöflur" 
        titleTemplate="%s - Próftöflur">
        </Helmet>
        <h1>Próftöflur</h1>
        <Navigation data={schools}/>
        <Switch>
          {
            schools.map((school) =>
              (
              <Route 
              key={school.slug} 
              exact path = {school.link}
              component={School}/>)
            )
          }
          <Route key="home" exact path = "/" component={Home}/>
          <Route component={NotFound}/>
        </Switch>
        <Link to={'/'} className="home"> Heim </Link>
      </main>
    );
    }
    return (
      <main className="app">
      </main>
    )
  }
}

export default App;