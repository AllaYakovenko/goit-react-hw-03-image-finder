import React, { Component } from "react";
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import css from './App.module.css';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = queryImages  => {
    this.setState({searchQuery: queryImages});
  };

  render() {
  return (
    <div className={css.App}>
      <Searchbar onSubmit={this.handleFormSubmit}/>
      <ImageGallery queryImages={this.state.searchQuery} />
      <ToastContainer autoClose={2000} />
    </div>
    );
  };
};

export default App;

