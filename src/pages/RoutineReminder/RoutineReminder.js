import React, { Component}  from 'react';
import { Container, Icon, Table, Divider, Header, Segment, Checkbox } from 'semantic-ui-react'
import ReminderModal from './ReminderModal';
import { remindGetAll, remindEnable } from '../Api';

export default class RoutineReminder extends Component {

  state = {
		routineReminders: []
  }
  
  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
    remindGetAll()
    .then(response => {
      console.log("remindGetAll success" + response.data);
      this.setState({
          routineReminders: response.data
      });
    }) 
    .catch(err => {
      console.log("remindGetAll error" + err);
    })
  }

  toggleCheckBox = (event, data) => {
    const queryData = this.queryData.bind(this);
    remindEnable(data.id, data.checked)
    .then(response => {
      console.log("remindEnable OK " + JSON.stringify(response.data));
      queryData();
    })
    .catch(err => {
      console.log("remindEnable NG " + JSON.stringify(err));
    });
  }

  render() {
    const reminders = this.state.routineReminders;
    const queryData = this.queryData;
    const toggleCheckBox = this.toggleCheckBox;

    return(
      <Segment raised>
				<Divider horizontal>
					<Header as='h4'>
						<Icon name='file text' />
						  分享提醒訊息(隨機發送一組)
					</Header>
				</Divider>
				{reminders.map(function(reminder, index){
					return (
						<Table celled key={reminder._id}>
							<Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='6'>
                    訊息群組#{index+1}
                    <Checkbox toggle id={reminder._id} label="啟用群組" checked={reminder.enable} onChange={toggleCheckBox}/>
                    <ReminderModal type='REMOVE_GROUP' reminderId={reminder._id} reminderMsgs={reminder.msgs} callback={queryData}/>
									</Table.HeaderCell>
                </Table.Row>
								<Table.Row>
                  <Table.HeaderCell>順序</Table.HeaderCell>
									<Table.HeaderCell>類別</Table.HeaderCell>
									<Table.HeaderCell style={{ width: '250px' }}>文字訊息</Table.HeaderCell>
									<Table.HeaderCell>STKID</Table.HeaderCell>
									<Table.HeaderCell>STKPKGID</Table.HeaderCell>
									<Table.HeaderCell style={{ width: '250px' }}>操作</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{reminder.msgs.map(function(msg, idx){
									return (
										<Table.Row key={msg.id} >
                      <Table.Cell>{idx+1}</Table.Cell>
											<Table.Cell>{msg.type === "text" ? "文字" : "貼圖"}</Table.Cell>
											{msg.type === "text" ? <Table.Cell>{msg.text}</Table.Cell> : <Table.Cell/>}
											{msg.type === "text" ? <Table.Cell/> : <Table.Cell>{msg.stkrId}</Table.Cell>}
											{msg.type === "text" ? <Table.Cell/> : <Table.Cell>{msg.pkgId}</Table.Cell>}
											<Table.Cell>
                        <ReminderModal type='REMOVE_MSG' reminderId={reminder._id} reminderMsg={msg} callback={queryData}/>
                        <ReminderModal type='UPDATE' reminderId={reminder._id} reminderMsg={msg} callback={queryData}/>
											</Table.Cell>
										</Table.Row>
									)
								})}
							</Table.Body>

							<Table.Footer fullWidth>
								<Table.Row>
									<Table.HeaderCell colSpan='6'>
                    <ReminderModal type='ADD_MSG' reminderId={reminder._id} reminderMsgs={reminder.msgs} callback={queryData}/>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
						</Table>
					)
        })}
        <Container style={{ height: '30px' }}>
          <ReminderModal type='ADD_GROUP' callback={queryData}/>
        </Container>
			</Segment>
    )
  }
}