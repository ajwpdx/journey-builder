import { Button, Chip } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import React from "react";

export const PrefillButton = ({
  name,
  item,
  prefill,
  prefillData,
  setPrefillData,
  setDrawerOpen,
  setTargetNode,
  setTargetData,
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
      {item.name}:{item.prefill}.{item.mappedField}
    </Chip>
  ) : (
    <Button
      onClick={() => {
        console.log(item.name);
        setDrawerOpen(true);
        setTargetNode();
        setTargetData(item.name);
      }}
      variant="subtle"
    >
      {name}
    </Button>
  );
};
