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
        pokemonByType: [],
        imageUri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon',
        isSearch: false,
        typePokemon: ''
    }
    
    getPokemon = () => {
        axios.get(`${this.state.url}/pokemon`)
            .then((result) => {
                console.log(result);
                this.setState(prevState => {
                    return {
                        pokemon: [...prevState.pokemon, ...result.data.results],
                        url: result.data.next
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
                console.log(res)
                this.setState({
                    pokemonByType: res.data.pokemon
                })
            })
    }

    filterTypeChange = (newValue) => {
        if(newValue !== '0'){
            this.setState({
                typePokemon: newValue,
                isSearch: true
            }, () => {
                this.getPokemonByType(this.state.typePokemon)
            })
        }else{
            this.setState({
                isSearch: false
            }, () => {
                this.getPokemon()
            })
        }
        
    }

    componentDidMount() {
        console.log(this.state.typePokemon)
    }

    render(){
        return(
            <Fragment>
                <FilterList onTypeChange={(value) => this.filterTypeChange(value)} />                
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
                                this.state.pokemonByType.map((pokemonByType) => {
                                    // console.log(pokemonByType.pokemon['name'])
                                    var url = pokemonByType.pokemon['url'];
                                    var id = url.split("pokemon/").pop();
                                    id = id.replace(/\//g, '');
                                        return <CardList key={id} id={id} img={`${this.state.imageUri}/${id}.png`} name={pokemonByType.pokemon['name']} url={pokemonByType.pokemon['url']} goDetail={this.handleDetail} />
                                })
                            }
                        </div>
                    </div>
                )}
                                               
            </Fragment>
        )
    }
}

export default List;