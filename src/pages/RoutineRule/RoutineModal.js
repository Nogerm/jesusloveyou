import React, { Component } from 'react';
import { Button, Icon, Modal, Form, Input } from 'semantic-ui-react'
import { getRoutineRule, addRoutineRule, updateRoutineRule, removeRoutineRule } from '../MongoDB';
const uuidv4 = require('uuid/v4');

export default class RoutineModal extends Component {

  state = {
    type: this.props.type,
    rule: this.props.rule || '',
    modalRuleAddShow: false,
    modalRuleRemoveShow: false,
    modalRuleUpdateShow: false,
    inputRuleType: '',
    inputWeekday1: '',
    inputWeekday2: '',
    inputWeekday3: '',
    inputWeekday4: '',
    inputWeekday5: '',
    inputWeekday6: ''
  }
  
  modalRuleAddOpen = () => {
    this.setState({ modalRuleAddShow: true });
  }

  modalRuleAddClose = () => {
    this.setState({ modalRuleAddShow: false }, this.props.callback );
  }

  modalRuleAddSubmit = () => {
    const newData = {
      id: uuidv4(),
      month: this.state.inputRuleType,
      routines: [{
        week_day: 1,
        name: this.state.inputWeekday1.toString()
      },{
        week_day: 2,
        name: this.state.inputWeekday2.toString()
      },{
        week_day: 3,
        name: this.state.inputWeekday3.toString()
      },{
        week_day: 4,
        name: this.state.inputWeekday4.toString()
      },{
        week_day: 5,
        name: this.state.inputWeekday5.toString()
      },{
        week_day: 6,
        name: this.state.inputWeekday6.toString()
      }]
    }
    addRoutineRule(newData);
    this.modalRuleAddClose();
  }

  modalRuleRemoveOpen = () => {
    this.setState({ modalRuleRemoveShow: true });
  }

  modalRuleRemoveClose = () => {
    this.setState({ modalRuleRemoveShow: false }, this.props.callback );
  }

  modalRuleRemoveSubmit = () => {
    removeRoutineRule(this.state.rule._id);
    this.modalRuleRemoveClose();
  }

  modalRuleUpdateOpen = () => {
    this.setState({ 
      modalRuleUpdateShow: true
    }, () => {
      getRoutineRule().then(data => {
        const ruleGroup = data.find(rule => rule._id === this.state.rule._id);
        this.setState({
          rule: [...ruleGroup]
        });
      });
    });
  }

  modalRuleUpdateClose = () => {
    this.setState({ modalRuleUpdateShow: false }, this.props.callback );
  }

  modalRuleUpdateSubmit = () => {
    const newData = {
      id: this.state.rule._id,
      month: this.state.rule.month,
      routines: [{
        week_day: 1,
        name: (this.state.inputWeekday1.toString() === '') ? this.state.rule.routines[0].name : this.state.inputWeekday1.toString()
      },{
        week_day: 2,
        name: (this.state.inputWeekday2.toString() === '') ? this.state.rule.routines[1].name : this.state.inputWeekday2.toString()
      },{
        week_day: 3,
        name: (this.state.inputWeekday3.toString() === '') ? this.state.rule.routines[2].name : this.state.inputWeekday3.toString()
      },{
        week_day: 4,
        name: (this.state.inputWeekday4.toString() === '') ? this.state.rule.routines[3].name : this.state.inputWeekday4.toString()
      },{
        week_day: 5,
        name: (this.state.inputWeekday5.toString() === '') ? this.state.rule.routines[4].name : this.state.inputWeekday5.toString()
      },{
        week_day: 6,
        name: (this.state.inputWeekday6.toString() === '') ? this.state.rule.routines[5].name : this.state.inputWeekday6.toString()
      }]
    }
    
    updateRoutineRule(newData)
    this.modalRuleUpdateClose();
  }

  radioChange = (e, { value }) => {
    this.setState({ inputRuleType: value })
  }

  render() {
    const modalType = this.state.type;
    const ruleInfo = this.state.rule;
    const radioChange = this.radioChange;

    if(modalType === 'ADD') {
      return(
        <Modal open={this.state.modalRuleAddShow} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalRuleAddOpen}>
            <Icon name='plus' /> 新增分享提醒
          </Button>
          }>
          <Modal.Header>新增分享提醒</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Group inline>
                  <label>規則</label>
                  <Form.Radio
                    label='單數月'
                    value='odd'
                    checked={this.state.inputRuleType === 'odd'}
                    onChange={radioChange}
                  />
                  <Form.Radio
                    label='雙數月'
                    value='even'
                    checked={this.state.inputRuleType === 'even'}
                    onChange={radioChange}
                  />
                  <Form.Radio
                    label='全部月份'
                    value='all'
                    checked={this.state.inputRuleType === 'all'}
                    onChange={radioChange}
                  />
                </Form.Group>
                <Form.Field>
                  <label>週一</label>
                  <Input label={{ icon: 'asterisk' }} labelPosition='left corner' placeholder='週一分享者' onChange={e => {this.setState({inputWeekday1: e.target.value});}} />
                </Form.Field>
                <Form.Field>
                  <label>週二</label>
                  <Input label={{ icon: 'asterisk' }} labelPosition='left corner' placeholder='週二分享者' onChange={e => {this.setState({inputWeekday2: e.target.value});}} />
                </Form.Field>
                <Form.Field>
                  <label>週三</label>
                  <Input label={{ icon: 'asterisk' }} labelPosition='left corner' placeholder='週三分享者' onChange={e => {this.setState({inputWeekday3: e.target.value});}} />
                </Form.Field>
                <Form.Field>
                  <label>週四</label>
                  <Input label={{ icon: 'asterisk' }} labelPosition='left corner' placeholder='週四分享者' onChange={e => {this.setState({inputWeekday4: e.target.value});}}/>
                </Form.Field>
                <Form.Field>
                  <label>週五</label>
                  <Input label={{ icon: 'asterisk' }} labelPosition='left corner' placeholder='週五分享者' onChange={e => {this.setState({inputWeekday5: e.target.value});}}/>
                </Form.Field>
                <Form.Field>
                  <label>週六</label>
                  <Input label={{ icon: 'asterisk' }} labelPosition='left corner' placeholder='週六分享者' onChange={e => {this.setState({inputWeekday6: e.target.value});}}/>
                </Form.Field>
              </Form>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalRuleAddSubmit} disabled={this.state.inputRuleType === '' || this.state.inputWeekday1 === '' || this.state.inputWeekday2 === '' || this.state.inputWeekday3 === '' || this.state.inputWeekday4 === '' || this.state.inputWeekday5 === '' || this.state.inputWeekday6 === ''}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalRuleAddClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'UPDATE') {
      return(
        <Modal open={this.state.modalRuleUpdateShow} trigger={
          <Button floated='right' icon labelPosition='left' color='vk' size='small' onClick={this.modalRuleUpdateOpen}>
            <Icon name='pencil alternate' /> 編輯
          </Button>
          }>
          <Modal.Header>編輯分享提醒</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Group inline>
                  <label>規則</label>
                  <Form.Radio
                    label='單數月'
                    value='odd'
                    checked={ruleInfo.month === 'odd'}
                    disabled={ruleInfo.month !== 'odd'}
                  />
                  <Form.Radio
                    label='雙數月'
                    value='even'
                    checked={ruleInfo.month === 'even'}
                    disabled={ruleInfo.month !== 'even'}
                  />
                  <Form.Radio
                    label='全部月份'
                    value='all'
                    checked={ruleInfo.month === 'all'}
                    disabled={ruleInfo.month !== 'all'}
                  />
                </Form.Group>
                <Form.Field>
                  <label>週一</label>
                  <Input placeholder={ruleInfo.routines[0].name} onChange={e => {this.setState({inputWeekday1: e.target.value});}} />
                </Form.Field>
                <Form.Field>
                  <label>週二</label>
                  <Input placeholder={ruleInfo.routines[1].name} onChange={e => {this.setState({inputWeekday2: e.target.value});}} />
                </Form.Field>
                <Form.Field>
                  <label>週三</label>
                  <Input placeholder={ruleInfo.routines[2].name} onChange={e => {this.setState({inputWeekday3: e.target.value});}} />
                </Form.Field>
                <Form.Field>
                  <label>週四</label>
                  <Input placeholder={ruleInfo.routines[3].name} onChange={e => {this.setState({inputWeekday4: e.target.value});}}/>
                </Form.Field>
                <Form.Field>
                  <label>週五</label>
                  <Input placeholder={ruleInfo.routines[4].name} onChange={e => {this.setState({inputWeekday5: e.target.value});}}/>
                </Form.Field>
                <Form.Field>
                  <label>週六</label>
                  <Input placeholder={ruleInfo.routines[5].name} onChange={e => {this.setState({inputWeekday6: e.target.value});}}/>
                </Form.Field>
              </Form>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalRuleUpdateSubmit}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalRuleUpdateClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )
    } else if(modalType === 'REMOVE') {
      return(
        <Modal open={this.state.modalRuleRemoveShow} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalRuleRemoveOpen}>
            <Icon name='trash alternate' /> 移除
          </Button>
          }>
          <Modal.Header>移除分享提醒</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除這個提醒?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalRuleRemoveSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalRuleRemoveClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else {}
  }
}