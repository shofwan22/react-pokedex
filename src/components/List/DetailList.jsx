import React, {Component, Fragment} from 'react';
import axios from 'axios';
import './List.css';

class DetailList extends Component {
    state = {
        name: '',
        images: '',
        height: '',
        weight: '',
        types: [],
        stats: [],
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => {
            this.setState({
                name: res.data.forms[0]['name'],
                images: res.data.sprites['front_default'],
                height: res.data.height,
                weight: res.data.weight,
                types: res.data.types,
                stats: res.data.stats
            })
            console.log(res.data)
            console.log(this.state.stats)
        })
    }

    render() {
        return(
            <Fragment>
                <div className="container body-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card border-info">
                                <div className="card-header bg-success text-white text-center">
                                    <h4 className="card-title detail-title">{this.state.name}</h4>
                                </div>                                
                                <div className="card-body">                                    
                                    <div className="row">
                                        <div className="col-md-6 bg-light text-center">                                            
                                            <img className="card-img-top img-pokemon" alt="" src={this.state.images} />
                                        </div>
                                        <div className="col-md-6">                                            
                                            <div className="list-group">
                                                <div className="list-group-item list-group-item-action flex-column align-items-start">
                                                    <div className="justify-content-between">
                                                        <h5 className="mb-1">Height :</h5>
                                                    </div>
                                                    <p className="mb-1">{this.state.height}</p>
                                                </div>                                                
                                            </div>
                                            <div className="list-group">
                                                <div className="list-group-item list-group-item-action flex-column align-items-start">
                                                    <div className="justify-content-between">
                                                        <h5 className="mb-1">Weight :</h5>
                                                    </div>
                                                    <p className="mb-1">{this.state.weight}</p>
                                                </div>
                                            </div>
                                            <div className="list-group">
                                                <div className="list-group-item list-group-item-action flex-column align-items-start">
                                                    <div className="justify-content-between">
                                                        <h5 className="mb-1">Types :</h5>
                                                    </div>
                                                    {
                                                        this.state.types.map((t, i) => {
                                                            return <p key={i} className="mb-1 body-content"> - {t.type['name']}</p>
                                                        })
                                                    }
                                                    
                                                </div>
                                            </div>   
                                        </div>
                                        <div className="col-md-12 stats">                                            
                                            <div className="list-group">
                                                <div className="list-group-item list-group-item-action flex-column align-items-start">
                                                    <div className="justify-content-between">
                                                        <h5 className="mb-1">Statistic :</h5>
                                                    </div>
                                                    {
                                                        this.state.stats.map((s, i) => {
                                                            var progress = `${s.base_stat}%`;                                                            
                                                            return (
                                                            <Fragment>
                                                            <p key={i} className="mb-1 body-content">{s.stat['name']}</p>
                                                            <div className="progress">
                                                                <div className="progress-bar" role="progressbar" style={{ width: progress }}>{s.base_stat}</div>
                                                            </div>
                                                            </Fragment>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default DetailList;