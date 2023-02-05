import React, { Component } from "react";
import PropTypes from 'prop-types';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import Modal from "components/Modal/Modal";


export class ImageGalleryItem extends Component {
    static propTypes = {
        image: PropTypes.shape({
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        }).isRequired
    }

    state = {
        showModal: false,
    }

    togleModal = () => {
        this.setState(prevState => ({ showModal: !prevState.showModal }));
    };

    render() {
        const { image: { webformatURL, largeImageURL, tags } } = this.props;
        const { showModal } = this.state;

        return (
            <>
                <li
                    onClick={this.togleModal}
                    className={css.ImageGalleryItem}
                    >
                        <img
                            className={css.ImageGalleryItemImage}
                            src={webformatURL}
                            alt={tags}
                        />
                </li>
                {showModal && (<Modal
                    onClose={this.togleModal}>
                    <img src={largeImageURL} alt={tags}/>
                </Modal>)}
            </>
        );
    };
};

