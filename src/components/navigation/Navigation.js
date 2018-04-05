import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'


import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {

		state = { data: null, loading: true, error: false }
  async componentDidMount() {
    try {
      const data = await this.fetchData('https://vefforritun2-2018-v4-synilausn.herokuapp.com/');
      this.setState({ data, loading: false });
    } catch (e) {
      console.error('Error fetching navigation', e);
      this.setState({ error: true, loading: false });
    }
  }

  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
   
  render() {
  	const { data, loading, error} = this.state;

    if (loading) {
      return (<div>Sæki gögn...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gögn</div>);
    }

    const shit = data.schools.map((school) => 	
      
        <li key={school.slug}>
          <NavLink to={`${school.slug}`}>{school.name}</NavLink>
        </li>
      
    );
    return (<ul className='navigation'>{shit}</ul>);
  }
}

