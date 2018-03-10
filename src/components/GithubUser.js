import React, { Component } from 'react';
import './styles.css';

const API = 'https://api.github.com/search/users?q=';

class GithubUser extends Component{
    constructor(props){
        super(props)
        this.searchUser = this.searchUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { items: [], error: null, value: '' }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    searchUser(event) {
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
                        <h2>Github User Search:</h2>
                        <form onSubmit={this.searchUser} className="user-form">
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder='Username' required />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row text-center">
                    {items.map(item =>
                    <div key={item.id} className="col-xs-4 col-md-4 col-sm-4 user-list">
                        <h3>{item.login}</h3>
                        <div className="img-user">
                            <a href={item.html_url} target="_blank"><img className="img-thumbnail" src={item.avatar_url} alt={item.login} /></a>
                        </div>
                        <h5>{'Score: '+item.score}</h5>
                    </div>
                    )}
                </div>
            </div>
        )
    }
}

export default GithubUser;