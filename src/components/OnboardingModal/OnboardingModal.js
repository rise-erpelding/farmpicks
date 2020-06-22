import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './OnboardingModal.css';

export default function OnboardingModal(props) {
  const { show, handleClose } = props;
  const showHideClassName = show
    ? 'onboarding-modal display-block'
    : 'onboarding-modal display-none';

  return (
    <div className={showHideClassName}>
      <div className="onboarding-modal__main">
        <button
          type="button"
          onClick={handleClose}
          className="onboarding-modal__button"
        >
          <FontAwesomeIcon icon="times" />
        </button>
        <div className="onboarding-modal__text">
          <h1>Find small farms.</h1>
          <p>
            FarmPicks brings information about local small farms to you.
            Use the search bar to find small farms by name, location, or a specific product, or
            use the dropdown menu to find small farms by product or purchase option category.
          </p>
          <h1>Save your favorite farms.</h1>
          <p>Once you find farms you like, save your favorite farms to access them later.</p>
          <h1>Add to the directory.</h1>
          <p>
            Help the community--add a farm if you don&apos;t see it or
            update an existing farm&apos;s information.
          </p>
        </div>
      </div>
    </div>
  );
}

OnboardingModal.defaultProps = {
  show: false,
  handleClose: () => {},
};

OnboardingModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};
