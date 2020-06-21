import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RegistrationPage.css';
import DemoLoginInfo from '../../components/DemoLoginInfo/DemoLoginInfo';

class RegistrationPage extends Component {
  handleClickCancel = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div className="registration-page">
        <h3>Registration coming soon!</h3>
        <button
          onClick={this.handleClickCancel}
          type="button"
        >
          <FontAwesomeIcon
            className="farm-page__chevron-left"
            icon="chevron-left"
          />
          {' '}
          Back
        </button>
        <DemoLoginInfo />
      </div>
    );
  }
}

export default RegistrationPage;

RegistrationPage.defaultProps = {
  history: {},
};

RegistrationPage.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
};
