import { Drawer, Stack, Text, Box, Accordion } from "@mantine/core";

const fieldOptions = [
  "button",
  "dynamic_checkbox_group",
  "dynamic_object",
  "email",
  "name",
  "completed_at",
];

export const Sidebar = ({
  open,
  setOpen,
  targetNode,
  formNodes,
  setPrefillData,
  prefillData,
  targetData,
}) => {
  const getParentNodes = () => {
    if (!targetNode || !targetNode.data?.prerequisites || !formNodes) {
      return [];
    }

    const prerequisiteIds = targetNode.data.prerequisites;
    return formNodes.filter((node) => prerequisiteIds.includes(node.id));
  };

  const parentNodes = getParentNodes();

  const updateForm = (sourceFormId, mappedField) => {
    const newPrefillData = prefillData.map((item) => {
      if (item.name === targetData) {
        return {
          name: item.name,
          prefill: sourceFormId,
          mappedField,
        };
      } else {
        return item;
      }
    });

    setPrefillData(newPrefillData);
    setOpen(false);
  };

  return (
    <Drawer
      opened={open}
      onClose={() => {
        setOpen(false);
      }}
      title={`${targetNode?.data?.name}: ${targetData}`}
    >
      <Stack gap="md">
        <Accordion>
          <Accordion.Item value="global-data">
            <Accordion.Control>
              <Text fw={500}>Global Data</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="xs">
                {fieldOptions.map((option) => (
                  <Text
                    key={option}
                    size="sm"
                    p="xs"
                    style={{ cursor: "pointer" }}
                    onClick={() => updateForm("global", option)}
                  >
                    {option}
                  </Text>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          {parentNodes.map((node) => (
            <Accordion.Item key={node.id} value={node.id}>
              <Accordion.Control>
                <Box>
                  <Text fw={500}>{node.data.name}</Text>
                  {node.data.description && (
                    <Text size="sm" c="dimmed" mt="xs">
                      {node.data.description}
                    </Text>
                  )}
                </Box>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap="xs">
                  {fieldOptions.map((option) => (
                    <Text
                      key={option}
                      size="sm"
                      p="xs"
                      style={{ cursor: "pointer" }}
                      onClick={() => updateForm(node.data.name, option)}
                    >
                      {option}
                    </Text>
                  ))}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Stack>
    </Drawer>
  );
};
