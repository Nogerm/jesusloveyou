import React, { Component}  from 'react';
import { Icon, Table, Divider, Header, Segment } from 'semantic-ui-react'
import RoutineModal from './RoutineModal';
import { routineGetAll } from '../Api';

export default class RoutineRule extends Component {

    state = {
		routineRules: []
  }
  
  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
    routineGetAll()
    .then(response => {
      console.log("[routineGetAll] OK " + JSON.stringify(response.data));
      this.setState({
        routineRules: [...response.data]
      });
    })
    .catch(err => {
      console.log("[routineGetAll] NG " + JSON.stringify(err));
    });
  }

  render() {
    const rules = this.state.routineRules;
    const queryData = this.queryData;

    return(
      <Segment raised>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='user' />
              分享提醒列表
          </Header>
        </Divider>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>規則</Table.HeaderCell>
              <Table.HeaderCell>週一</Table.HeaderCell>
              <Table.HeaderCell>週二</Table.HeaderCell>
              <Table.HeaderCell>週三</Table.HeaderCell>
              <Table.HeaderCell>週四</Table.HeaderCell>
              <Table.HeaderCell>週五</Table.HeaderCell>
              <Table.HeaderCell>週六</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '250px' }}>操作</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rules.map(function(rule){
              return (
                <Table.Row key={rule._id} >
                  <Table.Cell>{rule.month === 'odd' ? "單數月" : rule.month === 'even' ? "雙數月" : "全部"}</Table.Cell>
                  <Table.Cell>{rule.routines[0].name}</Table.Cell>
                  <Table.Cell>{rule.routines[1].name}</Table.Cell>
                  <Table.Cell>{rule.routines[2].name}</Table.Cell>
                  <Table.Cell>{rule.routines[3].name}</Table.Cell>
                  <Table.Cell>{rule.routines[4].name}</Table.Cell>
                  <Table.Cell>{rule.routines[5].name}</Table.Cell>
                  <Table.Cell>
                    <RoutineModal type='REMOVE' rule={rule} callback={queryData}/>
                    <RoutineModal type='UPDATE' rule={rule} callback={queryData}/>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='8'>
                <RoutineModal type='ADD' callback={queryData}/>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
    )
  }
}