import React from 'react';

import unsplash from "../api/unsplash";

import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

class App_1 extends React.Component{

    state = {images: []}

    // onSearchSubmit = (term) =>{
    //     console.log("on search submit", term);
    //     axios.get('https://api.unsplash.com/search/photos', {
    //         params: {query: term},
    //         headers: {
    //             Authorization: 'Client-ID  iWZu3o0dNNCPklwhHISndbQJXuPH81ynNgDxAJs6GVE'
    //         }
    //     })
    //         .then(response => {
    //             console.log("result: ", response.data.results)
    //         });
    // }
    onSearchSubmit = async (term) =>{
        console.log("on search submit", term);
        const response = await unsplash.get('/search/photos', {
            params: {query: term},
        });
        console.log("result: ..", response.data.results);
        this.setState({images: response.data.results})
    }

    render() {
        return (
            <div className="ui container" style={{marginTop: "10px"}}>
                <SearchBar onSubmit={this.onSearchSubmit}/>
                <ImageList images={this.state.images}/>
            </div>
        )
    }
}

export default App_1;