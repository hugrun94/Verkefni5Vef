import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Department.css';

/**
 * Þessi component ætti að vera einfaldur í birtingu en taka fall frá foreldri
 * sem keyrir þegar smellt er á fyrirsögn.
 */

export default class Exams extends Component {
	static propTypes = {
		heading: PropTypes.String,
		courses: PropTypes.String,
	    visible: PropTypes.bool,
	    onHeaderClick: PropTypes.func,
	 }

	  static defaultProps = {
	    visible: true,
	    onHeaderClick: () => {},
	  }


render(){
const {heading, courses, visible, onHeaderClick } = this.props;
const plus = visible ? '-':'+';

return (
      <li className="department">
        <h3 onClick={onHeaderClick} className="school"><a>{plus}</a>{heading}</h3>
        {visible && (
          <div>
          <table>
          <tbody>
          <tr>
          <th>Auðkenni</th>
          <th>Námskeið</th>
          <th>Fjöldi</th>
          <th>Dagsetning</th>
          </tr>
          {(courses).map((test) => (
          	<tr key ={test.course}>
          	<td>{test.course}</td>
          	<td>{test.name}</td>
          	<td>{test.students}</td>
          	<td>{test.date}</td>
          	</tr>
          	))}
          </tbody>
          </table>
          </div>
        )}
      </li>
  );
}

}

