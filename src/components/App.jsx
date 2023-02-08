import React, { Component } from "react";
import  api  from 'services/api';
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import css from './App.module.css';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    totalHits: 0,
  };

  componentDidUpdate(_, prevState) { 
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

      api(query, page).then(resp => {
        this.setState(({ images }) => ({
          images: page === 1 ? [...resp.hits] : [...images, ...resp.hits],
          totalHits: resp.totalHits,
        }));
      })
        .catch(error => {
          console.log(error);
          return toast.error("Маємо помилку, спробуйте повторно");
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1}));
  };  
  
  handleFormSubmit = query => {
        this.setState({ query: query, page: 1, images: [] });
  };

  render() {

    const { images, isLoading, totalHits } = this.state;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={this.handleFormSubmit} />
      <ImageGallery images={images} />
            {isLoading && <Loader />}
            {!isLoading && images.length !== 0 &&
              images.length < totalHits && (
                <Button onClickLoadMore={this.handleLoadMore} />
            )}
          <ToastContainer autoClose={2000} />
    </div>
    );
  };
};

export default App;

