import React, { ReactNode, useEffect, useState } from "react";
import Graph from "graphology";
import forceAtlas2 from "graphology-layout-forceatlas2";
import chroma from "chroma-js";
import { random } from "graphology-layout";
import {
  useSigma,
  useRegisterEvents,
  useLoadGraph,
  useSetSettings,
} from "react-sigma-v2";
import { TweetWithUser } from "../types";

interface GraphProps {
  data: TweetWithUser[];
  children?: ReactNode;
}

export const DataGraph: React.FC<GraphProps> = ({ data, children }) => {
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const loadGraph = useLoadGraph();
  const setSettings = useSetSettings();
  const [hoveredNode, setHoveredNode] = useState<any>(null);

  useEffect(() => {
    const graph = new Graph();

    //Get uniqueue users
    const users = [
      ...new Map(
        data.map((tweets) => tweets.user).map((user) => [user["id"], user])
      ).values(),
    ];

    users.forEach((user) => {
      graph.addNode(user.id, {
        label: user.name,
        size: 5,
        color: chroma.random().hex(),
      });
    });

    data.forEach((tweet) => {
      graph.addNode(tweet.id, {
        label: tweet.text,

        size: 2,
        color: "#1DA1F2",
      });
      graph.addEdgeWithKey(
        `${tweet.author_id}->${tweet.id}`,
        tweet.id,
        tweet.author_id,
        { type: "arrow", label: "eats" }
      );
    });
    random.assign(graph);
    forceAtlas2.assign(graph, { iterations: 10 });
    loadGraph(graph);

    registerEvents({
      enterNode: (event) => setHoveredNode(event.node),
      leaveNode: () => setHoveredNode(null),
    });
  }, []);

  useEffect(() => {
    setSettings({
      nodeReducer: (node, data) => {
        const graph = sigma.getGraph();
        const newData = {
          ...data,
          highlighted: data.highlighted || false,
        } as any;

        if (hoveredNode) {
          if (
            node === hoveredNode ||
            graph.neighbors(hoveredNode).includes(node)
          ) {
            newData.highlighted = true;
          } else {
            newData.color = "#E2E2E2";
            newData.highlighted = false;
          }
        }
        return newData;
      },
      edgeReducer: (edge, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, hidden: false };

        if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
          newData.hidden = true;
        }
        return newData;
      },
    });
  }, [hoveredNode]);

  return <>{children}</>;
};
