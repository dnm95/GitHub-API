import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import GitHubUser from './GithubUser.js';
import GitHubRepo from './GithubRepos.js';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

class Main extends Component{
    constructor(props) {
        super(props);
    
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true
        };
      }

    toggleNavbar() {
       this.setState({
        collapsed: !this.state.collapsed
       });
    }

    render(){
        return(
            <HashRouter>
                <div>
                    <Navbar color="dark" dark>
                        <NavbarBrand href="/" className="mr-auto">GitHub Searcher</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse isOpen={!this.state.collapsed} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="align-middle" to="/">Search User</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="align-middle" to="/repos">Search Repositories</NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                    <div className="vertical-space-30"></div>
                    <div className="content">
                        <Route exact path="/" component={GitHubUser}/>
                        <Route  path="/repos" component={GitHubRepo}/>
                    </div>
                    <div className="footer">
                        <div className="container">
                            <span className="text-footer">Developed by : </span>
                            <a href="https://github.com/dnm95">DNM</a>
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;