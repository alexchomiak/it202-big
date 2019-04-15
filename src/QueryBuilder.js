import React, { Component } from 'react'
import { Button } from '@rmwc/button';
import { TextField} from '@rmwc/textfield'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Chip,ChipSet} from '@rmwc/chip'
import {Checkbox} from '@rmwc/checkbox'
import FlipMove from 'react-flip-move';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import {Theme} from '@rmwc/theme'
const Range = Slider.Range;


export default class QueryBuilder extends Component {

  state = {
    keywords: [],
    popMin: 0,
    popMax: 100,
    includeLibary: true,
    includeExplicit: true,
    errorLabel: ""
  }

  removeKeyword = (keyword) => {
    this.setState(() => ({keywords: this.state.keywords.filter((word) => (word != keyword) ? word : null)}))
  }

  addKeyword = (e) => {
    e.preventDefault();
    var keyword = e.target.searchfield.value
    if(keyword === "") return;
    if(!this.state.keywords.includes(keyword)) {
      this.setState(() => ({keywords: [...this.state.keywords,keyword]}))
    }
    e.target.searchfield.value = ""
    console.log(this.state.keywords)
  }

  toggleIncludeLibary = () => {
    this.setState(() => ({includeLibary: !this.state.includeLibary}))
  }

  toggleExplicit = () => {
    this.setState(() => ({includeExplicit: !this.state.includeExplicit}))
  }

  onPopChange = (e) => {
    this.setState(() => ({
      popMin: e[0],
      popMax: e[1]
    }))
  }

  handleQuery = () => {
    if(this.state.keywords.length === 0) {
      this.setState(() => ({errorLabel: "There must be more than one keyword for a playlist to be made."}))
      return;
    }

    this.setState(() =>({errorLabel:""}))

    var query = {
      keywords: this.state.keywords,
      popMin: this.state.popMin,
      popMax: this.state.popMax,
      includeLibary: this.state.includeLibary,
      includeExplicit: this.state.includeExplicit
    }

    if(this.props.handleQuery != null) {
      this.props.handleQuery(query)

    }
  }

  render() {
    const now = 60;

    return (

      <div className="container">

     
      <div className="queryBuilder">

<div className="queryHeader">
<h3 >
      Create a playlist with criteria:
    </h3>

    <p className="queryError">{this.state.errorLabel}</p>
  
</div>
    
  <form className="queryForm" onSubmit={this.addKeyword}>
  <p>Enter keywords for the playlist to contain...</p>
  <TextField autoComplete={"off"}  className="queryTextfield" width={100000} name="searchfield" icon="search"  placeHolder="Enter keywords..."/>
  <Button className="queryButton" label="Add Keyword"  />

  
  
  </form>
  <div className="chipsetcontainer"> 

  <ChipSet filter>
      {this.state.keywords.map((keyword) => {

        return (
         
             <Chip key={keyword} label={keyword} icon="search" trailingIcon="close"
          onTrailingIconInteraction={() => {
            this.removeKeyword(keyword)
          }}
          >
          </Chip>
         
        )

      })}
  </ChipSet>

  </div>

  <div className="popularitySlider"> 
  <p>Include tracks within popularity range: {this.state.popMin} to {this.state.popMax} </p>
  <Range trackStyle={[{backgroundColor:'#2ad354'},{backgroundColor:'red'}]} onChange={this.onPopChange} step={1} defaultValue={[0,100]}></Range>
  </div>

  <div className="checkBoxes">
  <Theme use="textColor">
  <Checkbox className="queryCheckbox" onChange={this.toggleIncludeLibary} checked={this.state.includeLibary}>Include tracks in your library</Checkbox>
  <Checkbox className="queryCheckbox" onChange={this.toggleExplicit} checked={this.state.includeExplicit}>Include Explicit Tracks</Checkbox>
  </Theme>
     
  </div>


  

  <Button onClick={this.handleQuery} className="queryButton" label="Create Playlist" raised />

        {/*(
        <ProgressBar variant={'success'} now={60} label={`${now}%`}/>
        )*/
        }
  </div>
  </div>
    )
  }
}
