import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RenderData from './renderTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isLoading : false,
      items: []
    };
  }
  
  getCustomerDetail(){
    this.setState({
        isLoading:true
    });
    fetch("http://localhost/php-js-dev-test/webservices/customer")
      .then(result => result.json())
      .then(result=>{ 
        if(result)
          {
            this.setState({
              isLoading: false,
              items: result 
            });
          }
      })
      .catch((error)=>{
          this.setState({
            isLoaded: true,
            isLoading: false,
            error
          });
        
      });
  }
  render() {
    const { classes } = this.props;
    const { items, isLoading } = this.state; console.log(items);
    return (
      <div className="App">
        <Button disabled={isLoading} onClick={()=>this.getCustomerDetail()} variant="contained" color="primary" className={classes.button}>
         Get Customer Detail
        </Button>
        {isLoading && <CircularProgress className={"loader " + classes.progress} size={50} />}
        <RenderData items={items}/>
      </div>
    );
  }
}
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  progress: {
    margin: theme.spacing.unit *2 ,
  },
});
export default withStyles(styles)(App);
