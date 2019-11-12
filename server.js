const { ApolloServer, gql } = require("apollo-server");
const axios = require('axios');

const typeDefs = gql`
    type Launch {
        flight_number: Int
        mission_name: String
        launch_year: String
        launch_date_local: String
        launch_success: Boolean
        rocket: Rocket
    }

    type Rocket {
        rocket_id: String
        rocket_name: String
        rocket_type: String
    }

    # type Rocket {
    #     id: String
    #     name: String
    #     type: String
    # }

    type Query {
        getAllLaunches: [Launch]
        getAllRockets: [Rocket]
        getLaunchById(flight_number: Int): Launch
        getRocketById(rocket_id: String): Rocket
    }
`;


const resolvers = {
    Query: {
        getAllLaunches: async () => {
            let { data } = await axios.get("https://api.spacexdata.com/v3/launches");
            return data;
        },
        getLaunchById: async (_, arg) => {
            let { data } = await axios.get(`https://api.spacexdata.com/v3/launches/${arg.flight_number}`);
            return data;
        },

        getAllRockets: async () => {
            let { data } = await axios.get("https://api.spacexdata.com/v3/rockets");
            return data;
        },
        getRocketById: async (_, arg) => {
            let { data } = await axios.get(`https://api.spacexdata.com/v3/rockets/${arg.rocket_id}`);
            return data;
        }
    },

    Launch: {
        launch_date_local: () => { return "***********"; }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url} 🚀`);
});