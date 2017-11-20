import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import './style.css'

const moment = extendMoment(Moment)

class Calendar extends Component {

    static propTypes = {
        monthlyWorkouts: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            year: String(moment().year()),
            month: String(moment().month() + 1)
        }
    }

    componentDidMount() {
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const currentMonthWorkouts = this.props.monthlyWorkouts.find((workout) => (
            workout.year === this.state.year && workout.month === this.state.month
        ))

        moment.updateLocale('en', {
            week : {
                dow : 1
            }
        })

        const now = moment().set({'year': this.state.year, 'month': this.state.month - 1});

        const startOfMonth = now.clone().startOf('month')
        const endOfMonth = now.clone().endOf('month')

        const monthRange = now.clone().range(startOfMonth, endOfMonth)

        const days = Array.from(monthRange.by('day'));
        const formatedDays = days.map((m) => ({
            weekDay: m.weekday(),
            displayDay: m.format('D'),
            m,
            workouts: currentMonthWorkouts && currentMonthWorkouts.data.filter((workout) => (
                moment(workout.day).format('D') === m.format('D')
            ))
        }))

        // console.log(this.state, this.props.monthlyWorkouts, formatedDays, currentMonthWorkouts)

        return (
            <div className="calendar-wrapper">
                <div className="row row--calendar">
                    <div className="col">
                        <div className="calendar-selector">
                            <select name="month" value={this.state.month} onChange={this.handleChange}>
                                {moment.months().map((month, i) => (
                                    <option key={i} value={i + 1}>{month}</option>
                                ))}
                            </select>
                            <select name="year" value={this.state.year} onChange={this.handleChange}>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                            </select>
                        </div>
                    </div>
                    <div className="col col--1of7">
                        <div className="calendar-week-names">M</div>
                    </div>
                    <div className="col col--1of7">
                        <div className="calendar-week-names">T</div>
                    </div>
                    <div className="col col--1of7">
                        <div className="calendar-week-names">W</div>
                    </div>
                    <div className="col col--1of7">
                        <div className="calendar-week-names">T</div>
                    </div>
                    <div className="col col--1of7">
                        <div className="calendar-week-names">F</div>
                    </div>
                    <div className="col col--1of7">
                        <div className="calendar-week-names">S</div>
                    </div>
                    <div className="col col--1of7">
                        <div className="calendar-week-names">S</div>
                    </div>
                </div>
                <div className="row row--calendar">
                    {formatedDays.map((day, i) => (
                        <div className={classNames('col col--calendar col--1of7', { [`col--offset${day.weekDay}of7`]: i === 0})} key={i}>
                            <div className="calendar-day">
                                <div className="calendar-number">{day.displayDay}</div>
                                {day.workouts && day.workouts.map((workout, i) => (
                                    <Link key={i} to={`/workouts/${workout.id}`} className="calendar-workout">{workout.name}</Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)