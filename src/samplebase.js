import React, { Component } from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom'
import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip'
import './App.css';

export default class Base extends Component {
	constructor() {
		super()
		this.state = {
			importCompleted: false
		}
	}

	revertColumn() {
		alert('This would revert the column back to the original data that was imported (not part of this demo). \n\nWhy is this button included: This particularly included for the case where the algorithm lost user data while inferring rich field type; for example: inferring something as a number but with only 2 digits of precision. From what I understand, given the current airtable data flow, if they were to expand the digits of precision to 3, they would not get that additional data. So instead, they can revert and then choose the right one.')
	}
  render() {
    return (
      <div id="baseContainer">
        <div id="basePrimaryHeader" className="baseHeaderContainer">
          <img className="basePrimaryHeaderImage" src={require('./assets/images/sample-base-view/header-left.png')}/>
          <img className="basePrimaryHeaderImage" src={require('./assets/images/sample-base-view/header-right.png')}/>
        </div>
        <div id="baseSecondaryHeader" className="baseHeaderContainer">
          <img className="baseSecondaryHeaderImage" src={require('./assets/images/sample-base-view/subheader-left.png')}/>
          <img className="baseSecondaryHeaderImage" src={require('./assets/images/sample-base-view/subheader-right.png')}/>
        </div>
        {this.state.importCompleted ? <div id="tableContainer"><img id="table" src={require('./assets/images/sample-base-view/table.png')}/></div> :
	        <div id="tableContainer">
	        	<ReactTooltip id='revert-tooltip' type='dark' effect='solid' place='bottom' multiline='true' className='baseTooltip'>
			        <span>Press this to revert this column of data to your original data. It will get converted to plain text as a Single Line Text field.</span>
			      </ReactTooltip>
			      <ReactTooltip id='error-tooltip' type='dark' effect='solid' place='bottom' multiline='true' className='baseTooltip'>
			        <span>3 fields in this column were not compatable with this rich field type and were dropped.</span>
			      </ReactTooltip>
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '428px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '608px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '788px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='error-tooltip'style={{marginLeft: '944px'}} src={require('./assets/images/icons/import-error.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '968px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '1146px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '1326px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '1506px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img id="table" src={require('./assets/images/sample-base-view/table.png')}/>
	        </div>
	      }

	      {this.state.importCompleted ? '' :
	        <div className="prompt">
	        	<div className="promptTitle">Imported with rich fields.</div>
	        	<div className="promptBody">To revert a column back to its original data as plain text, click </div>
	        	<img className="promptImage" src={require('./assets/images/icons/revert-white.png')} /><br />
	        	<div className="promptBody">To change the rich field type, click ▾ then select Customize Field Type </div>
	        	<div className="promptDismiss" onClick={() => this.setState({importCompleted: true})}>Complete Import</div>
	        </div>
	      }


      </div>
    )
  }
}