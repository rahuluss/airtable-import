import React, { Component } from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom'
import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip'
import './App.css';

export default class Home extends Component {
  constructor () {
    super();
    this.state = {
      showModal: true,
      importModalStage: 0
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.updateStage = this.updateStage.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
    document.getElementById("homeBodyContainer").className += " noscroll"
  }
  
  handleCloseModal () {
    this.setState({ showModal: false, importModalStage: 0});
  }

  updateStage () {
    var updatedStage = this.state.importModalStage + 1
    this.setState({ importModalStage: updatedStage})
  }

  render() {
    return (
      <div id="homeContainer">
        <div id="homeHeaderContainer">
          <img className="homeHeaderImage" src={require('./assets/images/bases-view/header-left.png')}/>
          <img className="homeHeaderImage" src={require('./assets/images/bases-view/header-right.png')}/>
        </div>
        <div id="homeBodyContainer">
        	<img id="homeBodyImage" src={require('./assets/images/bases-view/body.png')}/>
        	<div id="newBaseButton" onClick={this.handleOpenModal}></div>
        </div>
        
        {this.state.importModalStage == 0 ? <CSVUploadModal handleOpenModal = {this.handleOpenModal} handleCloseModal={this.handleCloseModal} updateStage={this.updateStage} state={this.state} /> : 
          <EnableRichFieldModal handleOpenModal = {this.handleOpenModal} handleCloseModal={this.handleCloseModal} updateStage={this.updateStage} state={this.state} />}
        
      </div>
    )
  }
}

class CSVUploadModal extends Component {
  constructor() {
    super()
    this.uploadFile = this.uploadFile.bind(this)
  }

  uploadFile() {
    alert('The file upload UI has been skipped in this demo. It would stay the same. The modal you are about to see next is what would happen after they are done picking a file and the file is done uploading.')
    this.props.updateStage()
  }

  render() {
    return (
        <ReactModal isOpen={this.props.state.showModal} contentLabel="onRequestClose Example" onRequestClose={this.props.handleCloseModal} className="modal"overlayClassName="overlay">
          <div className="modalHeader">
            <div className="modalHeaderText">Import a Spreadsheet</div>
            <div className="modalCloseButton" onClick={this.props.handleCloseModal}></div>
          </div>
          <div className="modalSubheader">Import a CSV</div>
          <div className="modalBody">You can import a table into Airtable by uploading a .CSV file with tabular data. Most spreadsheet applications will allow you to export your spreadsheet as a a .CSV file.</div>
          <div className="modalButton" style={{backgroundColor: '#257BFD'}} onClick={this.uploadFile}>Choose a .CSV File</div>
          <div className="modalBreak"></div>
          <div className="modalSubheader">Or, paste table data here</div>
          <div className="modalBody">You can also copy a table from a spreadsheet program (such as Excel or Google Sheets) and paste it below.</div>
          <textarea className="modalTextInput" value={sampleCSV}></textarea>
          <div className="modalCheckboxContainer">
            <input className="modalCheckbox" name="test" type="checkbox" checked={true} />
            <div className="modalCheckboxText">First row is a header</div>
          </div>
          <div className="headerPreviewTitle">22 Columns Detected. 32 Rows Detected. </div>
          <HeaderPreviewer richFields={false}/>
          <div className="modalButton" onClick={this.props.updateStage} style={{backgroundColor: '#8B46FF'}}>Import pasted data</div>
        </ReactModal>
      )
  }
}

class EnableRichFieldModal extends Component {
  constructor () {
    super();
    this.state = {
      richFieldsEnabled: true,
      richFieldsExplanationShown: false
    };
    this.handleRichFieldsChange = this.handleRichFieldsChange.bind(this)
    this.toggleRichFieldsExplanation = this.toggleRichFieldsExplanation.bind(this)
  }

  handleRichFieldsChange() {
    this.setState({richFieldsEnabled: !this.state.richFieldsEnabled})
  }

  toggleRichFieldsExplanation() {
    this.setState({richFieldsExplanationShown: !this.state.richFieldsExplanationShown})
  }

  render() {  
    return (
        <ReactModal isOpen={this.props.state.showModal} contentLabel="onRequestClose Example" onRequestClose={this.props.handleCloseModal} className="modal"overlayClassName="overlay">
          <div className="modalHeader">
            <div className="modalHeaderText">Import a Spreadsheet</div>
            <div className="modalCloseButton" onClick={this.props.handleCloseModal}></div>
          </div>
          <div className="modalSubheader">Rich Data Fields Detected</div>
          <div className="modalBody">We noticed that some of your fields would be more useful if they were imported as rich fields. Don’t worry - you will be able to revert these fields types before completing import, and will always be able to change them.</div>
          <div className="modalBody modalExpandText" onClick={this.toggleRichFieldsExplanation}>{this.state.richFieldsExplanationShown ? 'Show Less ▴' : 'What are Rich Fields? ▾'}</div>
          {this.state.richFieldsExplanationShown ? 
            <div className="modalBody expanded">
              <div>Unlike a spreadsheet, Airtable fields (columns) have specific “types” that allow you to store rich content in each record. For example, a table can contain records (rows) with attachments, long text notes, checkboxes, and links to other records. <a className="modalLink" href="https://support.airtable.com/hc/en-us/articles/203229705#single-select" target="_blank">Click here to learn more.</a></div>
            </div> : ''}
          <div className="headerPreviewTitle">Rich fields detected for 21 out of 22 columns</div>
          <HeaderPreviewer richFields={this.state.richFieldsEnabled}/>
          <div className="modalCheckboxContainer">
            <input className="modalCheckbox" name="test" checked={this.state.richFieldsEnabled} onChange={this.handleRichFieldsChange} type="checkbox" />
            <div className="modalCheckboxText">Convert data to rich fields</div>
          </div>
          <Link to='/samplebase' className="modalButton" style={{backgroundColor: '#8B46FF'}}>{this.state.richFieldsEnabled ? 'Import with rich fields' : 'Import without rich fields'}</Link>
        </ReactModal>
      )
  }
}

class HeaderPreviewer extends Component {
  constructor () {
    super();
    this.state = {
      columns: [['Order ID', 'SingleLineText'], ['Order Date', 'Date'], ['Order Priority', 'SingleSelect'], ['Order Quantity', 'Number'], ['Sales', 'Currency'], ['Discount', 'SingleLineText'], ['Ship Mode', 'SingleSelect'], ['Profit', 'Currency'], ['Unit Price', 'Currency'], ['Shipping Cost', 'Currency'], ['Customer Name', 'SingleLineText']],
      imageMapping: {'Number': require('./assets/images/icons/number.png'), 'Date': require('./assets/images/icons/date.png'), 'SingleLineText': require('./assets/images/icons/single-line-text.png'), 'SingleSelect': require('./assets/images/icons/single-select.png'), 'Currency': require('./assets/images/icons/currency.png')}
    };
  }
  render() {
    return(
      <div className="headerPreviewContainer">
        {this.props.richFields ? 
          this.state.columns.map((column, index) => {
            console.log(column[1])
            return(
              <div className="headerItem richHeader">
                <HeaderPreviewTooltips richFieldType={column[1]}/>
                <img data-tip data-for={column[1]} className="headerItemImage" src={this.state.imageMapping[column[1]]}/>
                {column[0]}
              </div>
            )
          }) :
          this.state.columns.map(function(column, index){
            return(
              <div className="headerItem">
              	{column[0]}
              </div>
            )
          })
        }
      </div>
    )
  }
}

class HeaderPreviewTooltips extends Component {
  getDescription(richFieldType) {
    var mapping = {
      'Number': 'A number field will only accept a number value, and provide formatting options for the number.',
      'Date' : 'A date field allows you to easily enter a date and optionally a time into a cell. When editing a date time, you will be presented with a calendar widget that makes it easy to select a specific date.',
      'SingleLineText' : 'A single line text field accepts a single line of text for each cell. You can put any text value you want into each cell.',
      'Currency' : 'A currency field is a specific type of number column that formats the number as a currency amount. You can specify a currency symbol (the default is "$"), the number of significant digits, and whether or not to allow negative currency amounts.',
      'SingleSelect' : 'A single select field is ideal when you want to be able to select a single option from a preset list of options. When you edit a cell in a single select field, you will be presented with an autocomplete menu.'
    }
    return(mapping[richFieldType])
  }
  render() {
    return(
      <ReactTooltip id={this.props.richFieldType} type='dark' effect='solid' place='bottom' multiline='true' className='modalTooltip'>
        <span>{this.getDescription(this.props.richFieldType)}</span>
      </ReactTooltip>
    )
  }
}

var sampleCSV = "Row ID    Order Date    Order Priority    Order Quantity    Sales    Discount    Ship Mode    Profit    Unit Price    Shipping Cost    Customer Name    Province    Region    Customer Segment    Product Category    Product Sub-Category    Product Name    Product Container    Product Base Margin    Ship Date    1    10/13/10    Low    6    $261.50     0.04    Regular Air    ($213.25)    $38.90     $35.00     Muhammed MacIntyre    Nunavut    Nunavut    Small Business    Office Supplies    Storage & Organization    Eldon Base for stackable storage shelf, platinum    Large Box    0.8    10/20/10    49    10/1/12    High    49    $10,123.00     0.07    Delivery Truck    $457.81     $208.20     $68.02     Barry French    Nunavut    Nunavut    Consumer    Office Supplies    Appliances    1.7 Cubic Foot Compact Office Refrigerators    Jumbo Drum    0.58    10/2/12    50    10/1/12    High    27    $244.60     0.01    Regular Air    $46.71     $8.70     $2.99     Barry French    Nunavut    Nunavut    Consumer    Office Supplies    Binders and Binder Accessories    Cardinal Slant-D Ring Binder, Heavy Gauge Vinyl    Small Box    0.39    10/3/12";