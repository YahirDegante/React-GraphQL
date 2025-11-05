import PropTypes from 'prop-types';

function ErrorMessage({ error }) {
    return (
        <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error.message}
        </div>
    );
}

ErrorMessage.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string.isRequired
    }).isRequired
};

export default ErrorMessage;