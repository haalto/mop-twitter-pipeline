import { useUsers } from "../hooks/useUsers";
import { Graph } from "react-d3-graph";

export const Dashboard = () => {
  const { loading, data, error } = useUsers();

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const testData = {
    nodes: data,
    links: [],
  };

  console.log(data);
  return (
    <div>
      <h1>Moro</h1>
      <Graph
        id="foo"
        data={testData}
        config={{
          nodeHighlightBehavior: true,
          node: {
            color: "lightgreen",
            size: 400,
            highlightStrokeColor: "blue",
          },
          link: {
            highlightColor: "lightblue",
          },
          width: 2000,
          height: 2000,
        }}
      />
    </div>
  );
};
