import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
    query {
        getAllLaunches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`;

export class Launches extends Component {
    render() {
        return (
            <>
                <h1 className="display-4 my-3">Launches</h1>
                <MissionKey></MissionKey>
                <Query query={LAUNCHES_QUERY}>
                    {
                        ({ loading, error, data }) => {
                            console.log(data);
                            if (error) console.log(error);
                            if (loading) return <h4>loading...</h4>;
                            else {
                                return <div>
                                    {
                                        data.getAllLaunches &&
                                        data.getAllLaunches.map((each) => (
                                            <LaunchItem key={each.flight_number} launch={each} ></LaunchItem>
                                        ))
                                    }
                                </div>;
                            }
                        }
                    }
                </Query>
            </>
        )
    }
}

export default Launches
