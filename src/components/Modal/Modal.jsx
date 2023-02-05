import React, { Component } from "react";
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from 'components/Modal/Modal.module.css';

const modalRoot  = document.querySelector('#modal-root');

export class Modal extends Component {
    static propTypes = {
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
    }

    componentDidMount(){
        window.addEventListener('keydown', this.handleCloseByEsc);
    };

    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleCloseByEsc);
    };

    handleCloseByOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.props.onClose();
        }
    };

    handleCloseByEsc = evt => {
        if (evt.code === 'Escape') {
            this.props.onClose();
        }
    };


    render() {
        const { largeImageURL, tags } = this.props;

        return createPortal (
            <div className={css.Overlay} onClick={this.handleCloseByOverlay}>
                <div className={css.Modal}>
                    <img src={largeImageURL} alt={tags} />
                </div>
            </div>,
            modalRoot  
        );
    };
};


