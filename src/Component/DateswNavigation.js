import React, {Component} from 'react'
import dateFns from "date-fns";
import { connect } from 'react-redux';
import {Link,NavLink} from "react-router-dom";
import addigEvent from './addingEvent'
import { addEvent } from '../Redux/action'

class DateswNavigation extends Component {

    state = {
        currentDate: new Date(),
        selectedDate: new Date(),
        dateForEdit:new Date()
    };

    componentDidMount() {
        console.log(this.props)
        let i=this.props.match.params.month
        let j=this.props.match.params.year

        let addyear=dateFns.format(this.state.currentDate,"YYYY")-j
        let addMonth=dateFns.format(this.state.currentDate,"MM")-i

        let semifinal=dateFns.addMonths(this.state.currentDate,addMonth)
        let  final=dateFns.addYears(semifinal,addyear)
        console.log(final);
        // this.setState({
        //     currentDate:dateFns.addYears(final,addyear)
        // })
        /*let month=this.props.match.prams.month
        let year=this.props.match.prams.year
        console.log(dateFns.format(month,"M"))*/

    }

    navigator(){
        const dateformat=dateFns.format(this.state.currentDate,"MMM YYYY")
        return(
            <div style={{display:'flex', justifyContent:'space-between'}}   >
                <button onClick={this.subtractMonth}>Previous</button>
                <div ><h1>{dateformat}</h1></div>
                <button onClick={this.addMonth}>next</button>
            </div>
        )
    }
    renderDate() {
        const currentdate = this.state.currentDate
        const monthstart = dateFns.startOfMonth(currentdate);
        const monthend = dateFns.endOfMonth(monthstart);
        const weekstart = dateFns.startOfWeek(monthstart);
        const weekend = dateFns.endOfWeek(monthend);
        let rows = [];
        const dateformat = "DD";
        let days = [];
        let day = weekstart;
        let formatteddate = "";


        while (day <= weekend) {

            for (let i = 0; i < 7; i++) {
                formatteddate = dateFns.format(day, dateformat)
                const cloneday = day;
                if(dateFns.format(day,"MMM YYY")===dateFns.format(this.state.currentDate,"MMM YYY")){

                    days.push(<div className={day} style={{textAlign:'center',border:'1px solid #f5f5f5', flex:'1'}}
                                   onClick={()=>{this.setCurrentDate(cloneday)}}>{formatteddate}</div>);
                }
                else{
                    days.push(<div className={day} style={{textAlign:'center',border:'1px solid #f5f5f5', flex:'1',opacity:'0.2'}}
                                   onClick={()=>{this.setCurrentDate(cloneday)}}>{formatteddate} </div>);
                }
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div style={{display:'flex', justifyContent:'space-between'}}>{days}</div>)
            days=[]

        }
        return (
            <div><div style={{display:'flex',flexDirection:'column'}}>{rows}</div></div>
        )

    }
    weekdays(){
        const weekday=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        const weeks = weekday.map((week)=>{
            return <text style={{textAlign:'center',border:'2px solid #f5f5f5', flex:'1'}}>
                {week}
            </text>
        })
        return(
            <div  style={{border:'1px solid #f5f5f5',display:'flex',justifyContent:'space-around'}}>{weeks}</div>
        )
    }

    subtractMonth = () =>{
        this.setState({
            currentDate:dateFns.subMonths(this.state.currentDate,1),
            selectedDate: dateFns.subMonths(this.state.selectedDate, 1)


        })

    }


    addMonth = () => {
        this.setState({
            currentDate: dateFns.addMonths(this.state.currentDate, 1),
            selectedDate: dateFns.addMonths(this.state.selectedDate, 1)
        })
    }


    setCurrentDate = cloneday =>{


        this.setState({
            selectedDate:cloneday,
            dateForEdit:cloneday
        })

    }






    render() {
        let month=dateFns.format(dateFns.addMonths(this.state.currentDate,1),"MM")
        let year=dateFns.format(dateFns.addYears(this.state.currentDate,0),"YYYY")
        return (
            <Link to={'/'+year+'/'+month}>
                <div>
                    {this.navigator()}

                    {this.weekdays()}

                    {this.renderDate()}
                </div>
            </Link>

        )
    }
}

const mapStateToProps = state => ({
    event:state.event,
    id:state.id,
})
//
// const mapDispatchToProps = (dispatch) => ({
//     settingDate:(loginId,password) => {
//         dispatch(verifyUser([{
//                 loginId,
//                 password
//             }]
//         ));
//     }
// })


export default connect(mapStateToProps)(DateswNavigation)