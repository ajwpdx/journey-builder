import "@mantine/core/styles.css";
import { Box, Button, Drawer, MantineProvider, Text } from "@mantine/core";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import axios from "axios";
import { Nodes } from "./Nodes";
import { Prefill } from "./Prefill";
import { Sidebar } from "./Sidebar";

const initialPrefillData = [
  { name: "dynamic_checkbox_group", prefill: null, mappedField: null },
  { name: "dynamic_object", prefill: null, mappedField: null },
  { name: "email", prefill: "Form A", mappedField: "email" },
];

export default function App() {
  const [formNodes, setFormNodes] = useState([]);
  const [openForm, setOpenForm] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [targetNode, setTargetNode] = useState(null);
  const [prefillData, setPrefillData] = useState(initialPrefillData);
  const [targetData, setTargetData] = useState(null);

  useEffect(() => {
    setPrefillData(initialPrefillData);
  }, [openForm]);

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
      <Sidebar
        targetData={targetData}
        open={drawerOpen}
        setOpen={setDrawerOpen}
        targetNode={targetNode}
        formNodes={formNodes}
        prefillData={prefillData}
        setPrefillData={setPrefillData}
        setFormNodes={setFormNodes}
      />
      <Box style={{ width: "100%" }}>
        <Nodes setOpenForm={setOpenForm} formNodes={formNodes} />
        {openForm ? (
          <Prefill
            prefillData={prefillData}
            setTargetData={setTargetData}
            setPrefillData={setPrefillData}
            openForm={openForm}
            setTargetNode={setTargetNode}
            setDrawerOpen={setDrawerOpen}
            initialPrefillData={initialPrefillData}
          />
        ) : null}
      </Box>
    </MantineProvider>
  );
}
