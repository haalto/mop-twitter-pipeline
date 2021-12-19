import { useUsers } from "../hooks/useUsers";
import { SigmaContainer } from "react-sigma-v2";
import "react-sigma-v2/lib/react-sigma-v2.css";
import { DataGraph } from "../components/Graph";
import { useTweets } from "../hooks/useTweets";

export const Dashboard = () => {
  //const { loading, data, error } = useUsers();
  const { loading, data, error } = useTweets();

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div>
      <SigmaContainer style={{ height: "100vh", width: "100vw" }}>
        <DataGraph data={data} />
      </SigmaContainer>
    </div>
  );
};
