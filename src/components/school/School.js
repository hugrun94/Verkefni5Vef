import React, { Component } from 'react';

import './School.css';
import Department from '../department';

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {

		state = { data: null, loading: true, error: false, visible: null}

  onHeaderClick = (heading) => {
    return (e) => {
      const visible = this.state.visible === heading ? null : heading;
      this.setState({ visible });
    }
  }

  async componentDidMount() {
    try {
      const slug = this.props.location.pathname;
 
  	  const data = await this.fetchData(`https://vefforritun2-2018-v4-synilausn.herokuapp.com${slug}`);
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

    return (
      <section className="school">
      <h1>{data.school.heading}</h1>
      {data.school.departments.map((department) => {
      	return (
      		<Department
      		 heading={department.heading}
      		 courses={department.tests}
      		 visible={this.state.visible === department.heading}
      		 onHeaderClick={this.onHeaderClick(department.heading)}/>
            )
      	 })}
      </section>
    );
  }
}
