import React, { Component } from "react";
import PropTypes from 'prop-types';
import api from '../../services/api';
import css from 'components/ImageGallery/ImageGallery.module.css';
import { toast } from "react-toastify";
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';


class ImageGallery extends Component {
    static propTypes  = {
        queryImages: PropTypes.string.isRequired,
    }
        
    state = {
        images: [],
        page: 1,
        isLoading: false,
        isError: false,
    }    

    async componentDidUpdate(prevProps, prevState) { 
        const prevImages = prevProps.queryImages;
        const nextImages = this.props.queryImages;

        const prevPage = prevState.page;
        const nextPage = this.state.page;

        if (prevImages !== nextImages) {
            this.setState({ isLoading: true, images: [], page: 1 });

            try {
                if (this.state.page === 1) {
                    let images = await api.fetchImages(nextImages, nextPage);
                    images = images.map(image => {
                        return image = {
                            id: image.id,
                            largeImageURL: image.largeImageURL,
                            webformatURL: image.webformatURL,
                            tags: image.tags
                        }
                    });
                    this.setState({ images });
                }
            } catch (error) {
                console.log(error);
                this.setState({ isError: true });
            } finally {
                this.setState({ isLoading: false });
            }
        };

        if (prevPage !== nextPage) {
            this.setState({ isLoading: true });

            try {
                let images = await api.fetchImages(nextImages, nextPage);
                images = images.map(image => {
                    return image = {
                        id: image.id,
                        largeImageURL: image.largeImageURL,
                        webformatURL: image.webformatURL,
                        tags: image.tags
                    }
                });
                this.setState(prevState => ({
                    images: [...prevState.images, ...images],
                }));
            } catch (error) {
                console.log(error);
                this.setState({ isError: true });
            } finally {
                this.setState({ isLoading: false });
            }
        };
    };
    
    handleLoadMore = () => { 
        this.setState(prevState => ({ page: prevState.page + 1 }));
    }    
        
    render(){   
        const { images, isLoading, isError } = this.state;

        return (
            <>
            {images.length !==0 &&
            <ul className={css.ImageGallery}>
                {images.map((image) => (
                    <ImageGalleryItem
                        key={image.id}
                        image={image}
                    />
                ))}
            </ul>}  
                {isLoading && <Loader />}
                {!isLoading && images.length!== 0 && <Button onClickLoadMore={this.handleLoadMore} />}
                {isError && toast.error("Error!!!")}
            </>
        );
    };
};


ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }).isRequired
}

export default ImageGallery;
