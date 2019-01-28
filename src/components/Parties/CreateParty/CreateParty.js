import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Input, DatePicker, TimePicker, Button, Select } from 'antd';
import './CreateParty.css';
import MapContainer from './MapContainer';

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(
    <Option key={i.toString(36) + i}>
        {i.toString(36) + i}
    </Option>);
}

class CreateParty extends Component {
    state = {
        emails: [],
    }

    addEmails = (e) => {
        console.log(e);
        this.setState({emails: e});
    }

    sendEmails = () => {
        axios.post('/email/send', {
            emails: this.state.emails
        })
    }


    render () {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <form >
                        <Input 
                            className="input"
                            placeholder="Party Name"
                            ///onChange={this.addName} 
                        />
                        <div style={{marginBottom: "5px"}}>
                            <DatePicker id="date"
                                style={{width: "270px"}}
                                //onChange={(event) => this.addDate(event)}
                            />
                            <TimePicker id="time"
                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                //onChange={this.addTime} 
                            />
                        </div>
                        <MapContainer />
                        <div style={{
                                position: "absolute",
                                bottom: "10px"
                            }}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '400px', marginBottom: "5px" }}
                                placeholder="Add Wishlist"
                            >
                                {children}
                            </Select>
                            <Select
                                mode="tags"
                                style={{ width: '400px', marginBottom: "5px"}}
                                placeholder="Invitees"
                                onChange={this.addEmails}
                            >
                                {this.props.children}
                            </Select>
                            <Button 
                                style={{width: "400px"}}
                                type="primary" 
                                icon="save" 
                                onClick={() => {
                                    this.sendEmails();
                                    this.props.closePopup()}
                                }
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )                                           
    }
}

export default CreateParty;
 