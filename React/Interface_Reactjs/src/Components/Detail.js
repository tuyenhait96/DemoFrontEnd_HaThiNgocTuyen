import React, { Component } from 'react';
import data from './data.json'
import NewRelates from './NewRelates.js';
class Detail extends Component {
    render() {
        // console.log(this.props.match.params.id)
        // console.log(typeof (this.props.match.params.id))
        let dem = 1
        return (
            <div>
                <header className="masthead new">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-lg-12 my-auto">
                                <div className="header-content mx-auto">
                                    <h1 className="text-center">Detail of New</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* begin new */}

                {
                    data.map((value, key) => {
                        console.log(value.id) // value la du lieu trong data
                        console.log(typeof (this.props.match.params.id)) // id tren URL: string

                        if (value.id === parseInt(this.props.match.params.id)) {
                            return (
                                <div className="jumbotron jumbotron-fluid" key={key}>
                                    <div className="container">
                                        <img src={value.linkImage} className="img-fluid" alt="" />
                                        <h3 className="lead"><b>{value.title}</b></h3>
                                        {value.content}
                                    </div>
                                </div>
                            )
                        } return true
                    })
                }
                <div className="container">
                    <h4 className="card-title text-center">Tin lien quan</h4>
                    <div className="row">
                        <div className="col-12">
                            <div className="card-deck">
                            {/* Minh moi truyen du lieu chua phun data, qua newrelates phun  */}
                            {/* key nay la key trong json nen se bi trung voi detaild, en tap 1 bien dem , de luon luon thay doi khong trung id */}
                                {                                       
                                    data.map((value, key) => {
                                        console.log(key)
                                        if (value.id !== parseInt(this.props.match.params.id)) {
                                            console.log('a',value.id)
                                            console.log('b',this.props.match.params.id)

                                            if (dem <= 4) {
                                                dem++
                                                return (
                                                    <NewRelates
                                                        key={key}
                                                        newsId={value.id}
                                                        linkImg={value.linkImage}
                                                        title={value.title}
                                                        quote={value.quote}
                                                    />

                                                )
                                            }
                                        }return true
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;