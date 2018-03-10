import React, { Component } from 'react';

const API = 'https://api.github.com/search/repositories?q=';

class GithubRepo extends Component{
    constructor(props){
        super(props)
        this.searchRepo = this.searchRepo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { items: [], error: null, value: '' }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    searchRepo(event) {
        fetch(API + this.state.value)
            .then(d => d.json())
            .then(data => this.setState({ items: data.items }))
            .catch(error => this.setState({error, isLoading:false}));
        event.preventDefault();
      }

    render(){
        const { items } = this.state;

        return(
            <div>
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <h2>Github Repository Search:</h2>
                        <form onSubmit={this.searchRepo} className="repo-form">
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder='Repository' required />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row repository-container">
                    {items.map(item =>
                    <div key={item.id} className="col-xs-4 col-md-4 col-sm-4 repository-item">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{item.name}</h4>
                                <h6 className="card-subtitle mb-2 text-muted">{'Owner: '+item.owner.login}</h6>
                                <p className="card-text text-truncate">{'Description: '+item.description}</p>
                                <p>{'Language: '+item.language}</p>
                                <p>{'Last Update: '+item.updated_at}</p>
                                <p>{'Score: '+item.score}</p>
                                <a className="card-link" target="_blank" href={item.html_url}>View Repository</a>
                                <a className="card-link" target="_blank" href={item.owner.html_url}>View Owner Profile</a>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        )   
    }
}

export default GithubRepo;