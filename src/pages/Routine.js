import React, { Component}  from 'react';
import { Container } from 'semantic-ui-react'
import RoutineRule from './RoutineRule/RoutineRule';
import RoutineReminder from './RoutineReminder/RoutineReminder';
import 'semantic-ui-css/semantic.min.css';

export default class Routine extends Component {

	render() {
		
    return (
			<Container style={{ padding: '3em' }}>
				<RoutineRule/>
				<RoutineReminder/>
			</Container>
    );
  }
	
}