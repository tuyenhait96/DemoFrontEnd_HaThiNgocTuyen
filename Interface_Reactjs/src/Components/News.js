import React, { Component } from 'react';
import New_Item from './New_Item';
import data from './data.json'
class News extends Component {
    render() {
        // console.log(data);  
        // var number = [1,2,3,4,5,6,7]
        // var number2 = number.map((key, value) => key + value*3)
        // console.log(number2);
        return (
            <div>
                <header className="masthead new">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-lg-12 my-auto">
                                <div className="header-content mx-auto">
                                    <h1 className="text-center">List of News</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row mt-3">
                        {
                            data.map((value, key) => {
                                return (
                                    <New_Item key={key}
                                        newsId={value.id}
                                        linkImg={value.linkImage} 
                                        title={value.title} 
                                        quote= {value.quote} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default News;