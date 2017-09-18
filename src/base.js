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
		alert('This button would revert the column back to the original data that was imported as Single Line Text. \n\nThis button was included to replicate the "UNDO" action that Airtable usually provides after a field type is changed. See Constraint 1 in my Dropbox Paper file for more details.')
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
			        <span>Revert this column of data to your original data. The column will get converted to a Single Line Text field.</span>
			      </ReactTooltip>
			      <ReactTooltip id='error-tooltip' type='dark' effect='solid' place='bottom' multiline='true' className='baseTooltip'>
			        <span>3 records in this column were not compatable with this rich field type and were dropped.</span>
			      </ReactTooltip>
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '428px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '608px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '788px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='error-tooltip'style={{marginLeft: '944px'}} src={require('./assets/images/icons/import-error.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '968px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '1146px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '1324px'}} src={require('./assets/images/icons/revert-orange.png')} />
		          <img className="revert" onClick={this.revertColumn} data-tip data-for='revert-tooltip'style={{marginLeft: '1504px'}} src={require('./assets/images/icons/revert-orange.png')} />
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