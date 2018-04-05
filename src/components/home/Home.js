import React, { Component } from 'react';


import './Home.css';

/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */

export default class Home extends Component {
	state = { data: null, loading: true, error: false }



  async componentDidMount() {
    try {
      const data = await this.fetchData("https://vefforritun2-2018-v4-synilausn.herokuapp.com/stats");
      this.setState({ data, loading: false });
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false });
    }
  }

  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return (<div>Sæki gögn...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gögn</div>);
    }
    //ASDF KANNSKI LAGA RÖÐ HÉR
    return (
      <div className="home">

      <table>
      <tbody>
      	<tr>
      		<th>Meðalfjöldi nemenda í prófum</th>
      		<th>{data.stats.averageStudents}</th>
      	</tr>
      	<tr>
      		<th>Mesti fjöldi nemenda í prófi</th>
      		<th>{data.stats.max}</th>
      	</tr>
      	<tr>
      		<th>Minnsti fjöldi nemenda í prófi</th>
      		<th>{data.stats.min}</th>
      	</tr>
      	<tr>
      		<th>Fjöldi nemenda í öllum prófum</th>
      		<th>{data.stats.numStudents}</th>
      	</tr>
      	<tr>
      		<th>Fjöldi prófa</th>
      		<th>{data.stats.numTests}</th>
      	</tr>
      	</tbody>
      </table>
      </div>
    );
  }
}
