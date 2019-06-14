import React, {Component} from 'react'
import { connect } from 'react-redux';
import { addEvent } from '../Redux/action'


class addingEvent extends Component {

    state = {
        id:"null",
        event :" "
    }

    submitHandler = () => {
        console.log(this.props);
        this.props.addEvent(this.state.event)

    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div>
                <input type="text" name="event"onChange={this.changeHandler}/>
                <button onClick={this.submitHandler}>Submit</button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    event:state.event,
    id:state.id,
})
const mapDispatchToProps = (dispatch) => ({
    addEvent:(event)=>{
        dispatch(addEvent([{
            event
        }]))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(addingEvent)