import { Button, Chip } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import React from "react";

export const PrefillButton = ({
  name,
  prefill,
  prefillData,
  setPrefillData,
  setDrawerOpen,
  setTargetNode,
}) => {
  return prefill ? (
    <Chip
      checked={true}
      onClick={() => {
        const newData = prefillData.map((pd) => {
          if (pd.name === name) {
            return {
              name,
              prefill: null,
            };
          } else {
            return pd;
          }
        });
        setPrefillData(newData);
      }}
      variant="filled"
      icon={<IconX size={16} />}
    >
      {" "}
      {name}:{prefill}
    </Chip>
  ) : (
    <Button
      onClick={() => {
        setDrawerOpen(true);
        setTargetNode();
      }}
      variant="subtle"
    >
      {name}
    </Button>
  );
};
