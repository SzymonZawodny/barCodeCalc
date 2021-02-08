import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import styles from './App.css';

class App extends React.Component {

  state = {
    productName: '',
    barCode: '',
    arrayNames: [],
    array: [],
    saved: [],
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value, })
  }

  clearBarCodeInput = () => {
    this.setState({ barCode: ''})
  }

  handleBarCode = name => (event) => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleBarCodeOnKey = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        array: [...this.state.array, parseInt((this.state.barCode).substring(7,12))],
      }, () => {
        this.clearBarCodeInput();
      })
    }
  }

  resetData = () => {
    this.setState({
      productName: '',
      barCode: '',
      array: [],
    })
  }

  saveRow = () => {
    this.setState({
      productName: '',
      barCode: '',
      array: [],
      saved: [...this.state.saved, (this.state.array.reduce(function(acc, val) { return acc + val; }, 0))/1000],
      arrayNames: [...this.state.arrayNames, this.state.productName]
    })
  }

  render() {
    return (
      <div>
        <div className="Wrapper">
          <div className="Inserts">
            <TextField value={this.state.productName} onChange={this.handleChange('productName')}  label="nazwa produktu" variant="outlined" />
          </div>
          <div className="Inserts">
            <TextField value={this.state.barCode} onChange={this.handleBarCode('barCode')} onKeyDown={this.handleBarCodeOnKey}  label="kod kreskowy" variant="outlined" />
          </div>
          <div className="ListContainer">
            {this.state.array.map((i, index) => (<ListItem className="ListItem" key={index}><span className="ListCounter">{index + 1}</span><ListItemText className="ListItemText">{i/1000}kg</ListItemText></ListItem>))}
          </div>
          <div className="Inserts">
          <TextField disabled value={(this.state.array.reduce(function(acc, val) { return acc + val; }, 0))/1000} label="suma kg" variant="outlined" />
          </div>
          <div>
            <div className="Button">
              <Button variant="contained" color="primary" onClick={this.saveRow}>Zapisz</Button>
            </div>
              <Button variant="contained" color="default" onClick={this.resetData}>Resetuj</Button>
          </div>
        </div>
        <div className="Results">
          {
            this.state.arrayNames.map((i, index) =>
            (
              <ListItem key={index}>
                <ListItemText>{i}</ListItemText>
              </ListItem>
          ))}
          </div>
          <div className="Results">
            {
              this.state.saved.map((i, index) =>
              (
                <ListItem key={index}>
                  <ListItemText>{i}</ListItemText>
                  <ListItemText>kg</ListItemText>
                </ListItem>
            ))}
            </div>
      </div>
    )
  }}

export default (withStyles(styles)(App))
