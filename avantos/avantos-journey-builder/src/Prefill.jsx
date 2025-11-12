import { Box, Text, Button, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { PrefillButton } from "./PrefillButton";

export const Prefill = ({
  openForm,
  setDrawerOpen,
  setTargetNode,
  prefillData,
  setPrefillData,
  setTargetData,
}) => {
  return (
    <Box style={{ marginTop: 10 }}>
      <Text size="lg">Prefill - {openForm.data.name}</Text>
      <Text c="dimmed" size="sm">
        Prefill fields for this form
      </Text>
      {console.log(prefillData)}
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
              item={item}
              name={item.name}
              prefill={item.prefill}
              prefillData={prefillData}
              setPrefillData={setPrefillData}
              setDrawerOpen={setDrawerOpen}
              setTargetData={setTargetData}
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
