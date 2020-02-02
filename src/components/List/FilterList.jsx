import React, { Component, Fragment } from 'react';
import axios from 'axios';

class FilterList extends Component {
    state = {
        type: [],
        typeChange: '',
        name_pokemon: ''
    }
    getTypePokemon = () => {
        axios.get('https://pokeapi.co/api/v2/type')
            .then((res) => {
                this.setState({
                    type: res.data.results
                })
            })
    }

    handleTypeChange = (newValue) => {
        this.props.onTypeChange(newValue)
    }

    handleChange = (e) => {
        this.setState({
            typeChange: e.target.value
        }, () => {
            this.handleTypeChange(this.state.typeChange)
        })
    }

    handleChangeSearch = (e) => {
        this.setState({
            name_pokemon: e.target.value
        })
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.onSearchChange(this.state.name_pokemon)       
    }

    componentDidMount() {
        this.getTypePokemon()
    }

    render() {
        return (
            <Fragment>
                <div className="container filter-container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group has-search">
                                <form onSubmit={this.handleSearch}>
                                    <span className="fa fa-search form-control-feedback"></span>
                                    <input name="name_pokemon" type="text" className="form-control" placeholder="Search Pokemon . . ." onChange={this.handleChangeSearch}/>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <select name="filter" id="filter" className="form-control select-option" onChange={this.handleChange}>
                                    <option value="0">Filter By Type</option>
                                    {
                                        this.state.type.map((types, i) => {
                                            return <option className="type-option" key={i} value={types.name}>{types.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default FilterList;