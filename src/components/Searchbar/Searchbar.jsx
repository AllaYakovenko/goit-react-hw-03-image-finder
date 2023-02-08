import React, { Component } from "react";
import PropTypes from 'prop-types';
import css from 'components/Searchbar/Searchbar.module.css';
import { toast } from "react-toastify";
import { FaSearch } from 'react-icons/fa';

class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }
    
    state = {
        searchQuery: '',
    };
  

    handleNameChange = e => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
    };

    handleSubmit = e => {
        e.preventDefault();

        // trim зліва і справа прибирає пробіли у рядків
        if(this.state.searchQuery.trim() === ''){
           return toast.info('Введіть назву зображення');
        }

        this.props.onSubmit(this.state.searchQuery);
        this.reset();
    };

    reset = () => { 
        this.setState({ searchQuery: '' });
    }

    render() { 
        const { searchQuery } = this.state;

    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                <button type="submit" className={css.SearchFormButton}>
                    <FaSearch size={24}/>
                </button>

                <input
                    className={css.SearchFormInput}
                    value={searchQuery}
                    name="searchQuery"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handleNameChange}
                />
        </form>
    </header> 
    );
};
};

export default Searchbar;

