import logo from "./logo.svg";
import "./App.css";
import Weather from "./Weather";
import { useQuery, gql } from "@apollo/client";
import { isTypeSystemDefinitionNode } from "graphql";
const JOB_QUERY = gql`
  query GetJobs {
    jobs {
      title
      id
      company {
        name
      }
      cities {
        name
      }
      remotes {
        id
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(JOB_QUERY); //tu dong re-render khi co data
  // console.log(data.jobs[0].cities[0].name)
  if (error) {
    return <span>Error: {error}</span>;
  }

  if (loading) {
    return <header>Loading...</header>;
  }

  return (
    <div className="App">
      {/* <Weather /> */}
      {data &&
        data.jobs.map((item) => (
          <div className="flex justify-between bg-slate-400 mb-3" key={item.id}>
            <div>
              <h1 className="font-bold">{item.title}</h1>
              <p>{item.company.name}</p>
            </div>
            <div>
              <span>{item.cities[0]?.name}</span>
              {item.remotes[0]?.id ? <span>{item.cities[0]?.name ? ", ": ""}Remote</span> : ""}
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
