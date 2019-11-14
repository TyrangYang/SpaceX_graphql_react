import React from 'react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export default function LaunchItem(props) {
    let { launch: { flight_number, mission_name, launch_date_local, launch_success } } = props;
    return (
        <div className="card card-body mb-3" style={{ width: 1000, margin: 'auto' }}>
            <div className="row">
                <div className="col-md-9">
                    <h4>Mission:{' '}
                        <span className={launch_success ? "text-success" : "text-danger"}>
                            {mission_name}
                        </span>
                    </h4>
                    <p>Date: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment> </p>
                </div>
                <div className="col-md-3">
                    <Link className="btn btn-secondary" to={`/launch/${flight_number}`}>Launch Detail</Link>
                </div>
            </div>
        </div>
    )
}
