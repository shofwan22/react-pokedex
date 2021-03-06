import React, {Component, Fragment} from 'react';

class CardList extends Component{
    
    addDefaultImage = (e) => {
        e.target.src = 'https://via.placeholder.com/140/FFFFFF/000000/?text=No Image'
    }

    render(){
        return(
            <Fragment>
                <div className="col-md-3 card-list">
                    <div className="card text-center border-info" onClick={() => this.props.goDetail(this.props.id)}>
                        <div className="card-header">
                            <img className="card-img-top img-pokemon" alt="" src={this.props.img} onError={this.addDefaultImage}/>
                        </div>

                        <div className="card-body bg-info text-white">
                            <h5 className="card-title">{this.props.name}</h5>
                        </div>
                    </div>
                </div>  
            </Fragment>
        )
    }
}

export default CardList;