import React, { Component } from 'react';
import {
    Redirect
} from "react-router-dom";

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // true: 1, mac dinh de false
            isRedirect: false,
            fDate: 'sunday'
            // fName: '',
            // fEmail: '',
            // fFone: '',
            // fMess: ''
        }
    }

    isChange = (e) => {
        // target doi tuong dang duoc chon
        const fullName = e.target.name
        const vaLue = e.target.value
        this.setState({
            // [name]: value
            [fullName]: vaLue
        })
    }

    getValue = () => {
        let conTent = ''
        conTent += 'Ten nhan duoc la: ' + this.state.fName
        conTent += ' - Email nhan duoc la: ' + this.state.fEmail
        conTent += ' - Fone nhan duoc la: ' + this.state.fFone
        conTent += ' - Message nhan duoc la: ' + this.state.fMess
        conTent += ' - Date nhan duoc la: ' + this.state.fDate
        conTent += ' - Image nhan duoc la: ' + this.state.fImage
        return conTent
    }
    submitForm = (e) => {
        // ham cho phep k cho chuyen trang
        e.preventDefault();
        // sau do setsta cho no true
        this.setState({
            isRedirect: true
        });
    }

    isFileChange = (e) =>{ 
        // const fImage1 = e.target.files
        // const fImage2 = e.target.files[0]
        const fImage = e.target.files[0].name
        this.setState({
            fImage: fImage
        });
        // console.log(fImage1)
        // console.log(fImage2)
        // console.log(fImage3)
    }

    render() {
        //luc nay khi click submit, render isRedirect no lay setState dag trung nen render
        // truoc khi chuyen huong ta lay du lieu.
        // xu lieu duoc click vao form ra 1 cai ham
        if (this.state.isRedirect) {
            console.log(this.getValue())
            return <Redirect to="/" />
        }
        return (
            <div>
                <header className="masthead new">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-lg-12 my-auto">
                                <div className="header-content mx-auto">
                                    <h1 className="text-center">Contact</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* begin contact */}
                <section id="contact">
                    <div className="container">
                        <h2 className="text-center text-uppercase text-secondary mb-0">Contact Me</h2>
                        <hr className="star-dark mb-5" />
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                {/* To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19. */}
                                {/* The form should work on most web servers, but if the form is not working you may need to configure your web server differently. */}
                                <form name="sentMessage" id="contactForm" noValidate="novalidate">
                                    <div className="control-group">
                                        <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                            <label>Name</label>
                                            <input onChange={(event) => this.isChange(event)} name="fName" className="form-control" id="name" type="text" placeholder="Name" required="required" data-validation-required-message="Please enter your name." />
                                            <p className="help-block text-danger" />
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                            <label>Email Address</label>
                                            <input onChange={(event) => this.isChange(event)} name="fEmail" className="form-control" id="email" type="email" placeholder="Email Address" required="required" data-validation-required-message="Please enter your email address." />
                                            <p className="help-block text-danger" />
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                            <label>Phone Number</label>
                                            <input onChange={(event) => this.isChange(event)} name="fFone" className="form-control" id="phone" type="tel" placeholder="Phone Number" required="required" data-validation-required-message="Please enter your phone number." />
                                            <p className="help-block text-danger" />
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                            <label>Message</label>
                                            <textarea onChange={(event) => this.isChange(event)} name="fMess" className="form-control" id="message" rows={5} placeholder="Message" required="required" data-validation-required-message="Please enter a message." defaultValue={""} />
                                            <p className="help-block text-danger" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="control-group">
                                        <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                            <label>Select date</label>
                                            <select value={this.state.fDate} className="form-control" name="fDate" onChange={(event) => this.isChange(event)}>
                                                <option value="tuesday">Ngày thứ 3</option>
                                                <option value="thursday">Ngày thứ 5</option>
                                                <option value="saturday">Ngày thứ 7</option>
                                                <option value="sunday">Ngày chủ nhật</option>
                                            </select>
                                            <p className="help-block text-danger" />
                                        </div>
                                    </div>
                                    <br />

                                    <div className="control-group">
                                        <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                            <label>Select date</label>
                                            <input type="file" className="form-control-file" name="fImage" onChange={(event) => this.isFileChange(event)} />
                                        </div>
                                    </div>
                                    <br />

                                    <div id="success" />
                                    <div className="form-group">
                                        <button type="submit" onClick={(e) => this.submitForm(e)} className="btn btn-primary btn-xl" id="sendMessageButton">Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Contact;