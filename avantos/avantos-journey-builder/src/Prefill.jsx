import { Box, Text, Button, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { PrefillButton } from "./PrefillButton";

const initialPrefillData = [
  { name: "dynamic_checkbox_group", prefill: null },
  { name: "dynamic_object", prefill: null },
  { name: "email", prefill: "Form A" },
];

export const Prefill = ({ openForm, setDrawerOpen, setTargetNode }) => {
  useEffect(() => {
    setPrefillData(initialPrefillData);
  }, [openForm]);
  const [prefillData, setPrefillData] = useState(initialPrefillData);
  return (
    <Box style={{ marginTop: 10 }}>
      <Text size="lg">Prefill - {openForm.data.name}</Text>
      <Text c="dimmed" size="sm">
        Prefill fields for this form
      </Text>
      <Stack
        h={300}
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="center"
        gap="md"
      >
        {prefillData.map((item) => {
          return (
            <PrefillButton
              name={item.name}
              prefill={item.prefill}
              prefillData={prefillData}
              setPrefillData={setPrefillData}
              setDrawerOpen={setDrawerOpen}
              setTargetNode={() => {
                setTargetNode(openForm);
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
