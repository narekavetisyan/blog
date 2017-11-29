import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Redirect} from "react-router";
import AddCategories from "./AddCategories";
import DeleteCategories from './DeleteCategories';
import EditCategories from './EditCategories';

export default class MyCategories extends Component {
    constructor(props){
        super(props);
        this.state = {
            my_categories: [],
        };
        this.deleteCategory = this.deleteCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
	}
	addCategory(category){
    	let categories = this.state.my_categories;
    	console.log(categories);
        categories.push(category);
        this.setState({ my_categories: categories});
        this.props.addCategory(category);
	}
    deleteCategory(category){
    	let categories = this.state.my_categories;
        categories.map((value,index) => {
            if(value.id == category){
                categories.splice(index,1);
            }
        })
        this.setState({my_categories: categories});
        this.props.deleteCategory(category);
    }
    editCategory(category){
    	let categories = this.state.my_categories;
    	categories.map((val,index) => {
    		if(val.id == category.id){
    			val.title = category.title;
    		}
    	})
    	this.setState({my_categories: categories});
    	this.props.editCategory(category);
    }
	componentWillMount(){
		let url = '/api/me/categories';
		axios.get(url).then((response) => {
            this.setState({
				my_categories: response.data.my_categories
			})
		});
	}
  	render() {
        return (
			<div className="cat_all">
				<h3>My Categories</h3>
				<div className="list-group">
				{	
    				this.state.my_categories.map((value, index) => {
    					return (
                            <div key={index} className='div'>
                                <div className='cat_name'><Link to={'#'}  className="list-group-item" >{value.title}</Link></div>
                                <DeleteCategories  
                                    id={value.id} 
                                    deleteCategory={this.deleteCategory} 
                                />
                                <EditCategories 
                                    oldName={value.title} 
                                    id={value.id} 
                                    editCategory={this.editCategory} 
                                />
                            </div>
                                );
    				    })
				}
				</div>
				<AddCategories
					submitForm={this.submitForm} 
                    addCategory={this.addCategory}
				/>
			</div>
    	)
    }
}
