import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const LAUNCH_DETAIL = gql`
    query ($flight_number: Int){
        getLaunchById(flight_number: $flight_number){
            flight_number
            mission_name
            launch_year
            launch_date_local
            launch_success
            rocket{
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;

export class LaunchDetail extends Component {
    render() {
        let { flight_number } = this.props.match.params;
        flight_number = parseInt(flight_number);
        return (
            <>
                <Query query={LAUNCH_DETAIL} variables={{ flight_number }}>
                    {
                        ({ loading, error, data }) => {
                            if (error) console.log(error);
                            if (loading) return <h4>loading...</h4>;
                            else {
                                let { flight_number,
                                    mission_name,
                                    launch_year,
                                    launch_date_local,
                                    launch_success,
                                    rocket: { rocket_id, rocket_name, rocket_type }
                                } = data.getLaunchById;
                                return <div>
                                    <h1 className="display-4 my-3" > <span className="text-dark">Mission: </span>{mission_name}</h1>
                                    <h4 className="mb-3">Launch Detail:</h4>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            Flight number: {flight_number}
                                        </li>
                                        <li className="list-group-item">
                                            Launch year: {launch_year}
                                        </li>
                                        <li className="list-group-item">
                                            Launch date: {launch_date_local}
                                        </li>
                                        <li className="list-group-item">
                                            Success?: <span className={launch_success ? "text-success" : "text-danger"}>{launch_success ? "Yes" : "No"}</span>
                                        </li>

                                    </ul>
                                    <h4 className="my-3">Rocket Detail:</h4>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            Rocket id: {rocket_id}
                                        </li>
                                        <li className="list-group-item">
                                            Rocket name: {rocket_name}
                                        </li>
                                        <li className="list-group-item">
                                            Rocket type: {rocket_type}
                                        </li>
                                    </ul>
                                </div>
                            }
                        }
                    }
                </Query>
                <hr />
                <Link className="btn btn-secondary" to="/">BACK</Link>
            </>
        )
    }
}

export default LaunchDetail
