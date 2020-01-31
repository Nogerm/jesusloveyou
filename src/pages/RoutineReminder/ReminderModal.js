import React, { Component } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import { remindCreateNewGroup, remindDeleteGroup, remindCreateNewMsg, remindUpdateMsg, remindDeleteMsg } from '../Api';
const uuidv4 = require('uuid/v4');

export default class ReminderModal extends Component {

  state = {
    type: this.props.type,
    reminderId: this.props.reminderId || '',
    reminderMsgs: [],
    reminderMsg: this.props.reminderMsg || [],
    msgId: this.props.msgId || '',
    modalReminderAddGroupShow: false,
    modalReminderAddMsgShow: false,
    modalReminderRemoveGroupShow: false,
    modalReminderRemoveMsgShow: false,
    modalReminderUpdateShow: false,
    inputMsgType: '',
    inputMsgContent: '',
    inputPkgId: '',
    inputStkrId: '',
  }
  
  modalReminderAddGroupOpen = () => {
    this.setState({ modalReminderAddGroupShow: true });
  }

  modalReminderAddGroupClose = () => {
    this.setState({ modalReminderAddGroupShow: false }, this.props.callback );
  }

  modalReminderAddGroupSubmit = () => {
    remindCreateNewGroup()
    .then(response => {
      console.log("remindCreateNewGroup OK :" + JSON.stringify(response.data));
      this.modalReminderAddGroupClose();
    })
    .catch(err => {
      console.log("remindCreateNewGroup NG :" + JSON.stringify(err));
      this.modalReminderAddGroupClose();
    });
  }

  modalReminderAddMsgOpen = () => {
    this.setState({ modalReminderAddMsgShow: true });
  }

  modalReminderAddMsgClose = () => {
    this.setState({ modalReminderAddMsgShow: false }, this.props.callback );
  }

  modalReminderAddMsgSubmit = () => {
    let newMsg = {};
    if(this.state.inputMsgType === 'text') {
      newMsg = {
        id: uuidv4(),
        type: "text",
        text: this.state.inputMsgContent
      }
    } else {
      newMsg = {
        id: uuidv4(),
        type: "sticker",
        pkgId: this.state.inputPkgId,
        stkrId: this.state.inputStkrId
      }
    }

    remindCreateNewMsg(this.state.reminderId, newMsg)
    .then(response => {
      console.log("remindCreateNewMsg OK :" + JSON.stringify(response.data));
      this.modalReminderAddMsgClose();
    })
    .catch(err => {
      console.log("remindCreateNewMsg NG :" + JSON.stringify(err));
      this.modalReminderAddMsgClose();
    });
  }

  modalReminderRemoveGroupOpen = () => {
    this.setState({ modalReminderRemoveGroupShow: true });
  }

  modalReminderRemoveGroupClose = () => {
    this.setState({ modalReminderRemoveGroupShow: false }, this.props.callback );
  }

  modalReminderRemoveGroupSubmit = () => {
    remindDeleteGroup(this.state.reminderId)
    .then(response => {
      console.log("remindDeleteGroup OK " + JSON.stringify(response.data));
      this.modalReminderRemoveGroupClose();
    })
    .catch(err => {
      console.log("remindDeleteGroup NG " + JSON.stringify(err));
      this.modalReminderRemoveGroupClose();
    });
  }

  modalReminderRemoveMsgOpen = () => {
    this.setState({ modalReminderRemoveMsgShow: true });
  }

  modalReminderRemoveMsgClose = () => {
    this.setState({ modalReminderRemoveMsgShow: false }, this.props.callback );
  }

  modalReminderRemoveMsgSubmit = () => {
    remindDeleteMsg(this.state.reminderId, this.state.reminderMsg.id)
    .then(response => {
      console.log("remindDeleteMsg OK " + JSON.stringify(response.data));
      this.modalReminderRemoveMsgClose();
    })
    .catch(err => {
      console.log("remindDeleteMsg NG " + JSON.stringify(err));
      this.modalReminderRemoveMsgClose();
    });
  }

  modalReminderUpdateOpen = () => {
    this.setState({ modalReminderUpdateShow: true });
  }

  modalReminderUpdateClose = () => {
    this.setState({ modalReminderUpdateShow: false }, this.props.callback );
  }

  modalReminderUpdateSubmit = () => {
    let newMsg = {};
    if(this.state.inputMsgType === 'text') {
      newMsg = {
        id: this.state.reminderMsg.id,
        type: "text",
        text: this.state.inputMsgContent
      }
    } else {
      newMsg = {
        id: this.state.reminderMsg.id,
        type: "sticker",
        pkgId: this.state.inputPkgId,
        stkrId: this.state.inputStkrId
      }
    }

    remindUpdateMsg(this.state.reminderId, newMsg)
    .then(response => {
      console.log("remindUpdateMsg OK :" + JSON.stringify(response.data));
      this.modalReminderUpdateClose();
    })
    .catch(err => {
      console.log("remindUpdateMsg NG :" + JSON.stringify(err));
      this.modalReminderUpdateClose();
    });
  }

  radioChange = (e, { value }) => {
    this.setState({ inputMsgType: value })
  }

  render() {
    const modalType = this.state.type;
    const reminderMsg = this.state.reminderMsg;
    const radioChange = this.radioChange;

    if(modalType === 'ADD_GROUP') {
      return(
        <Modal open={this.state.modalReminderAddGroupShow} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalReminderAddGroupOpen}>
            <Icon name='plus' /> 新增訊息群組
          </Button>
          }>
          <Modal.Header>新增訊息群組</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalReminderAddGroupSubmit} disabled={this.state.inputFirstname === '' || this.state.inputBirthMonth === '' || this.state.inputBirthDay === ''}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalReminderAddGroupClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'ADD_MSG') {
      return(
        <Modal open={this.state.modalReminderAddMsgShow} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalReminderAddMsgOpen}>
            <Icon name='plus' /> 新增訊息
          </Button>
          }>
          <Modal.Header>新增訊息</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <a href="https://devdocs.line.me/files/sticker_list.pdf" target="_blank" rel="noopener noreferrer">可以使用的貼圖清單</a>
              <Form>
                <Form.Group inline>
                  <label>訊息類型</label>
                  <Form.Radio
                    label='文字'
                    value='text'
                    checked={this.state.inputMsgType === 'text'}
                    onChange={radioChange}
                  />
                  <Form.Radio
                    label='貼圖'
                    value='sticker'
                    checked={this.state.inputMsgType === 'sticker'}
                    onChange={radioChange}
                  />
                </Form.Group>
                <Form.TextArea label='文字訊息' placeholder='訊息內容' disabled={this.state.inputMsgType === '' ||　this.state.inputMsgType === 'sticker'} onChange={e => {this.setState({inputMsgContent: e.target.value});}}/>
                <Form.Group widths='equal'>
                  <Form.Input fluid label='STKID' placeholder='STKID' disabled={this.state.inputMsgType === '' ||　this.state.inputMsgType === 'text'} onChange={e => {this.setState({inputStkrId: e.target.value});}}/>
                  <Form.Input fluid label='STKPKGID' placeholder='STKPKGID' disabled={this.state.inputMsgType === '' ||　this.state.inputMsgType === 'text'} onChange={e => {this.setState({inputPkgId: e.target.value});}}/>
                </Form.Group>
              </Form>              
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalReminderAddMsgSubmit} disabled={this.state.inputMsgType === '' || (this.state.inputMsgType === 'text' && this.state.inputMsgContent === '') || (this.state.inputMsgType === 'sticker' && (this.state.inputPkgId === '' || this.state.inputStkrId === ''))}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalReminderAddMsgClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'UPDATE') {
      return(
        <Modal open={this.state.modalReminderUpdateShow} trigger={
          <Button floated='right' icon labelPosition='left' color='vk' size='small' onClick={this.modalReminderUpdateOpen}>
            <Icon name='pencil alternate' /> 編輯
          </Button>
          }>
          <Modal.Header>編輯訊息</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <a href="https://devdocs.line.me/files/sticker_list.pdf" target="_blank" rel="noopener noreferrer">可以使用的貼圖清單</a>
              <Form>
                <Form.Group inline>
                  <label>訊息類型</label>
                  <Form.Radio
                    label='文字'
                    value='text'
                    checked={reminderMsg.type === "text"}
                    disabled={reminderMsg.type !== "text"}
                  />
                  <Form.Radio
                    label='貼圖'
                    value='sticker'
                    checked={reminderMsg.type !== "text"}
                    disabled={reminderMsg.type === "text"}
                  />
                </Form.Group>
                <Form.TextArea label='文字訊息' placeholder={reminderMsg.text} disabled={reminderMsg.type !== "text"} onChange={e => {this.setState({inputMsgType: 'text', inputMsgContent: e.target.value});}}/>
                <Form.Group widths='equal'>
                  <Form.Input fluid label='STKID' placeholder={reminderMsg.stkrId} disabled={reminderMsg.type === "text"} onChange={e => {this.setState({inputMsgType: 'sticker', inputStkrId: e.target.value});}}/>
                  <Form.Input fluid label='STKPKGID' placeholder={reminderMsg.pkgId} disabled={reminderMsg.type === "text"} onChange={e => {this.setState({inputMsgType: 'sticker', inputPkgId: e.target.value});}}/>
                </Form.Group>
              </Form>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalReminderUpdateSubmit}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalReminderUpdateClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )
    } else if(modalType === 'REMOVE_GROUP') {
      return(
        <Modal open={this.state.modalReminderRemoveGroupShow} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalReminderRemoveGroupOpen}>
            <Icon name='trash alternate' /> 移除群組
          </Button>
          }>
          <Modal.Header>移除群組</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除這個群組?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalReminderRemoveGroupSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalReminderRemoveGroupClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'REMOVE_MSG') {
      return(
        <Modal open={this.state.modalReminderRemoveMsgShow} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalReminderRemoveMsgOpen}>
            <Icon name='trash alternate' /> 移除
          </Button>
          }>
          <Modal.Header>移除訊息</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除這則訊息?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalReminderRemoveMsgSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalReminderRemoveMsgClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else {}
  }
}