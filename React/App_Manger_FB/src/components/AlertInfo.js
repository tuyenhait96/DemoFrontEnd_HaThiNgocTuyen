import React, { Component } from 'react';
import { Alert, AlertContainer } from "react-bs-notifier";
import { connect } from 'react-redux'
class AlertInfo extends Component {
    handleDimiss = () => {
        this.props.alertOff()
    }
    render() {
        if(this.props.AlertShow === false) {
            return null
        }
        return (
            <AlertContainer>
                {/* onDismiss: an vao tat */}
                <Alert type={this.props.AlertStatus} onDismiss = { () => this.handleDimiss()} timeout = {1000} > {this.props.AlertContent}</Alert>
            </AlertContainer>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        AlertShow: state.alertShow,
        AlertContent: state.alertContent,
        AlertStatus: state.alertStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        alertOff: () => {
            dispatch({
                type: 'ALERT_OFF',
            })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AlertInfo)