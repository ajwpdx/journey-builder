import { Box, Button } from "@mantine/core";
import React from "react";

export const Nodes = ({ formNodes, setOpenForm }) => {
  return (
    <Box style={{ width: "100%", height: "100%" }}>
      {formNodes.map((node) => {
        return (
          <Button
            onClick={() => {
              setOpenForm(node);
            }}
            style={{ margin: 3 }}
          >
            {node.data.name}
          </Button>
        );
      })}
    </Box>
  );
};
