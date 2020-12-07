import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import {fetchStream, deleteStream} from "../../actions";
import Modal from "../../Modals";
import history from "../../history";

class StreamDelete extends React.Component{
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions () {
        return (
            <React.Fragment>
                <button
                    className="ui button negative"
                    onClick={() => this.props.deleteStream(this.props.match.params.id)}
                >Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if(!this.props.stream){
            return "Are you sure you want to delete?"
        }
        return `Are you sure you want to delete this title: ${this.props.stream.title}`

    }

    render() {
        console.log("entered delete stream");
        return (
            <div>
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={()=> history.push("/")}
                />
            </div>
        )
    }

}
const mapStateToProps = (state, ownProps) =>{
    return {stream: state.streams[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);