import PropTypes from 'prop-types';

function Loading({ message = "Cargando..." }) {
    return (
        <div className="text-center py-4">
            <div className="spinner-border text-primary">
                <output className="visually-hidden">
                    {message}
                </output>
            </div>
            <p className="mt-2 text-muted">{message}</p>
        </div>
    );
}

Loading.propTypes = {
    message: PropTypes.string
};

Loading.defaultProps = {
    message: "Cargando..."
};

export default Loading;