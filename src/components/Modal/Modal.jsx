import React, { Component } from "react";
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from 'components/Modal/Modal.module.css';

const modalRoot  = document.querySelector('#modal-root');

class Modal extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        children: PropTypes.element,
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
        const {children} = this.props;

        return createPortal (
            <div className={css.Overlay} onClick={this.handleCloseByOverlay}>
                <div className={css.Modal}>
                    {children}
                </div>
            </div>,
            modalRoot  
        );
    };
};

export default Modal;


