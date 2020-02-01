import React, {Component, Fragment} from 'react';
import './List.css';
import CardList from './CardList';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

class List extends Component{
    state = {
        url: 'https://pokeapi.co/api/v2/pokemon?limit=20',
        pokemon: [],
        imageUri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'
    }
    
    getPokemon = () => {
        axios.get(this.state.url)
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

    render(){
        return(
            <Fragment>
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
            </Fragment>
        )
    }
}

export default List;