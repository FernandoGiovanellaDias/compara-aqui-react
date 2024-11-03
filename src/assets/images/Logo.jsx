import PropTypes from 'prop-types';

export const Logo = ({ style = {}}) => (
    <svg
        style={{aspectRatio: 1.76, height: "46px", ...style }}
        viewBox="0 0 81 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.8471 40.48H81V46H28.8471V40.48Z" fill="#F5E3A2" />
        <path d="M24.7726 24.3446H81V29.8646H24.7726V24.3446Z" fill="#DB917A" />
        <path d="M19.5573 8.20923H81V13.7292H19.5573V8.20923Z" fill="#DE7B7B" />
        <path d="M28.767 45.8486L12.3775 1.72908L18.2635 0.0375346L33.2475 40.48L28.767 45.8486Z" fill="#3A3F6F" />
        <path d="M0 0H18.2535L13.7716 5.52H0V0Z" fill="#61D0B6" />
    </svg>
);

Logo.propTypes = {
    style: PropTypes.object,
};

Logo.defaultProps = {
    style: {},
};