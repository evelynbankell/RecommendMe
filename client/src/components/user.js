import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';



class Users extends React.Component {
  constructor(props) {
      super(props);
  }


  render() {


    return (
      <React.Fragment>
        <div className= "groupTextLeftSideBar">
          <ul>
            BRA
          </ul>
        </div>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users );
