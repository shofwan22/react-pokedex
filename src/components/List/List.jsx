import React, {Component, Fragment} from 'react';
import './List.css';
import CardList from './CardList';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import FilterList from './FilterList';

class List extends Component{
    state = {
        url: 'https://pokeapi.co/api/v2',
        pokemon: [],
        pokemonFilter: [],
        imageUri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon',
        isSearch: false,
        isSearchName: false,
        isSearchType: false,
        typePokemon: '',
        nameSearch: '',
        urlSearch: '',
        imageSearch: '',
        idSearch: '',
        error: false
    }
    
    getPokemon = () => {
        axios.get(`${this.state.url}/pokemon`)
            .then((result) => {
                this.setState(prevState => {
                    return {
                        pokemon: [...prevState.pokemon, ...result.data.results],
                        url: result.data.next,
                        error: false
                    }                    
                })
            })
    }

    handleDetail = (id) => {
        this.props.history.push(`/detail-pokemon/${id}`)
    }

    getPokemonByType = (value) => {
        axios.get(`https://pokeapi.co/api/v2/type/${value}`)
            .then((res) => {
                this.setState({
                    pokemonFilter: res.data.pokemon,
                    error: false
                })
            })
    }

    getPokemonBySearch = (value) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`)
            .then((res) => {
                this.setState({
                    nameSearch: res.data.species['name'],
                    urlSearch: res.data.species['url'],
                    imageSearch: res.data.sprites['front_default'],
                    idSearch: res.data.id,
                    error: false,
                    isSearchName: true,
                    isSearchType: false,
                })
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    isSearchName: false,
                    isSearchType: false,
                    nameSearch: '',
                    urlSearch: '',
                    imageSearch: '',
                    idSearch: '',
                })
            })
    }

    filterTypeChange = (newValue) => {
        if(newValue !== '0'){
            this.setState({
                typePokemon: newValue,
                isSearch: true,
                isSearchType: true,
                isSearchName: false,
                nameSearch: '',
                urlSearch: '',
                imageSearch: '',
                idSearch: '',
            }, () => {
                this.getPokemonByType(this.state.typePokemon)
            })
        }else{
            this.setState({
                isSearch: false,
                isSearchName: false,
                isSearchType: false,
                nameSearch: '',
                urlSearch: '',
                imageSearch: '',
                idSearch: '',
            }, () => {
                this.getPokemon()
            })
        }
        
    }

    filterSearchChange = (newValue) => {
        var typeValue = newValue.toLowerCase()
        if (typeValue !== '') {
            this.setState({
                typePokemon: typeValue,
                isSearch: true
            }, () => {
                this.getPokemonBySearch(this.state.typePokemon)
            })
        } else {
            this.setState({
                isSearch: false,
                isSearchName: false,
                isSearchType: false,
            }, () => {
                this.getPokemon()
            })
        }
    }

    componentDidMount() {
        
    }

    render(){
        return(
            <Fragment>
                <FilterList onTypeChange={(value) => this.filterTypeChange(value)} onSearchChange={(value) => this.filterSearchChange(value)}/>                
                {!this.state.isSearch ? (
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.getPokemon}
                    hasMore={this.state.url}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                <div className="container body-container">
                    <div className="row">
                    
                        {                            
                            this.state.pokemon.map((pokemon) => {
                                    var url = pokemon.url;
                                    var id = url.split("pokemon/").pop();
                                    id = id.replace(/\//g, '');                                
                                    return <CardList key={id} id={id} img={`${this.state.imageUri}/${id}.png`} name={pokemon.name} url={pokemon.url} goDetail={this.handleDetail}/>
                            })
                        }
                    </div>
                </div>
                </InfiniteScroll> 
                ) : (
                    <div className="container body-container">
                        <div className="row">
                        
                            {
                                this.state.isSearchType &&
                                this.state.pokemonFilter.map((pokemonFilter) => {                                    
                                    var url = pokemonFilter.pokemon['url'];
                                    var id = url.split("pokemon/").pop();
                                    id = id.replace(/\//g, '');
                                        return <CardList key={id} id={id} img={`${this.state.imageUri}/${id}.png`} name={pokemonFilter.pokemon['name']} url={pokemonFilter.pokemon['url']} goDetail={this.handleDetail} />
                                })
                            }
                            {
                                this.state.isSearchName &&
                                <CardList id={this.state.idSearch} img={this.state.imageSearch} name={this.state.nameSearch} url={this.state.urlSearch} goDetail={this.handleDetail} />
                            }
                            {
                                this.state.error &&
                                <div className="col-md-12">
                                        <div class="alert alert-danger">
                                            <h1>Pokemon Not Found !</h1>
                                        </div>
                                </div>
                            }
                        </div>
                    </div>
                )}
                                               
            </Fragment>
        )
    }
}

export default List;