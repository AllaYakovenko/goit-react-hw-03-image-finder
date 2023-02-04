import PropTypes from 'prop-types';
import css from 'components/Button/Button.module.css';

export function Button({ onClickLoadMore }) { 
    return (
        <button
            type='button'
            onClick={onClickLoadMore}
            className={css.Button}>
            LOAD MORE
        </button>
    );
};

Button.propTypes = {
    onClickLoadMore: PropTypes.func.isRequired,
};

