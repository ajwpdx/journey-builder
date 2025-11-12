import "@mantine/core/styles.css";
import { Box, Button, Drawer, MantineProvider, Text } from "@mantine/core";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import axios from "axios";
import { Nodes } from "./Nodes";
import { Prefill } from "./Prefill";
import { Sidebar } from "./Sidebar";

export default function App() {
  const [formNodes, setFormNodes] = useState([]);
  const [openForm, setOpenForm] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [targetNode, setTargetNode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/123/actions/blueprints/123/graph"
      );
      setFormNodes(data.nodes);
    };

    fetchData();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Sidebar open={drawerOpen} setOpen={setDrawerOpen} targetNode={targetNode} formNodes={formNodes} />
      <Box style={{ width: "100%" }}>
        <Nodes setOpenForm={setOpenForm} formNodes={formNodes} />
        {openForm ? (
          <Prefill
            openForm={openForm}
            setTargetNode={setTargetNode}
            setDrawerOpen={setDrawerOpen}
          />
        ) : null}
      </Box>
    </MantineProvider>
  );
}
