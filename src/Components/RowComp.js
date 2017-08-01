import React from 'react';
import PropTypes from 'prop-types';


class RowComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 tile">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{this.props.title}</h3>
            </div>
            <div className="panel-body">
              <div className="text-right">
                {/*<a href="charts/line">View Usage</a>*/}
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


RowComp.propTypes={
  title:PropTypes.string,
  children:PropTypes.element
};

export default RowComp;

