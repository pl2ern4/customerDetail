import React, { Component } from 'react';
import './App.css';
import {config} from './config';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RenderData from './renderTable';
import CircularProgress from '@material-ui/core/CircularProgress';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isLoading : false,
      items: [],
      page:0 ,
    };
    this.getCustomerDetail = this.getCustomerDetail.bind(this);
  }
  componentWillMount(){
    this.setState({
      isLoading:true
    });
    fetch(config.API+'/initData')
    .then(res=>res.json())
    .then(res=>{
      if(res){
        this.setState({
          isLoading: false
        });
      }
    })
    .catch(error=>{
      alert("Some Server Error found, Please reload the Page");
      return false;
    })
  }
  getCustomerDetail(param){
    
    const {page} = param;
    
    fetch(config.API+'/getCustomer?page='+(page+1)+'&limit=20')
      .then(result => result.json())
      .then(result=>{ 
        if(result)
          {
            this.setState({
              isLoading: false,
              items: result,
              page
            });
          }
      })
      .catch((error)=>{
          this.setState({
            isLoaded: true,
            isLoading: false,
            error
          },()=>{
            alert("Some Server Error found, Please reload the Page");
            return false;
          });
        
      });
  }
  handleChangePage(e, page){
    this.getCustomerDetail({page});
    return false;
  }
 
  render() {
    const { classes } = this.props;
    const { items, isLoading,page } = this.state; 
    return (
      <div className="App">
        {items.length===0 && <Button disabled={isLoading} onClick={()=>this.getCustomerDetail({page})} variant="contained" color="primary" className={classes.button}>
         Get Customer Detail
        </Button>}
        {isLoading && <CircularProgress className={"loader " + classes.progress} size={50} />}
        <RenderData items={items.data} count={items.count/1} page={page} pages={items.pages} handleChangePage={(e,page)=>this.handleChangePage(e,page)} />
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
