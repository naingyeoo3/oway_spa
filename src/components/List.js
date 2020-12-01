import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl';
import history from '../utils/history'

import { setOptionMenu } from '../actions/applicationBarActions';

import { DEV_URL } from '../constants/credentials';

class LinkList extends React.Component{
    constructor(props){
      super(props);
    }
    changeProduct(url, index){      
      // this.props.setOptionMenu(url)
      // history.push(url)
      if(index == 5){        
        window.open(url, '_blank')  
      }else{
        window.open(`${DEV_URL}/${url}`, '_self')
      }      
    }
    render(){
      const listname = this.props.listname;    
      const listItems = listname.map((number,i) =>(      
        <li key={i}>      
          <a href={number.url}><FormattedMessage id={number.list} /></a>
        </li>
      ));        

      const productItems = listname.map((name, index)=> (
        this.props.isSEO ?
        <li key={index}>
          <FormattedMessage id={name.list} />
        </li>
        // :
        // this.props.productsList && name.id == 6 ?
        // <li key={index}>
        //   <a href={name.url} title={name.title} target="_blank"><FormattedMessage id={name.list} /></a>
        // </li>
        :
        <li key={index}>
          <a href={name.url} title={name.title} target={name.url == 'https://blog.oway.com.mm/' ? "_blank" : "_self"}><FormattedMessage id={name.list} /></a>
        </li>
      ))
      return(
        <div>
          <h2>{this.props.name}</h2>
          {
            this.props.productsList ?
            <ul>
              {productItems}
            </ul>
            :
            <ul>
              {productItems}
            </ul>
          }          
        </div>
      )
    }    
}

const mapDispatchToProps = dispatch => {
  return{      
      setOptionMenu       : (menu) => dispatch(setOptionMenu(menu))
  }
}
export default connect(null, mapDispatchToProps)(LinkList);