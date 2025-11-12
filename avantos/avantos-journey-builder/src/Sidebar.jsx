import { Drawer, Stack, Text, Box } from "@mantine/core";

export const Sidebar = ({ open, setOpen, targetNode, formNodes }) => {
  // Get parent nodes based on prerequisites
  const getParentNodes = () => {
    if (!targetNode || !targetNode.data?.prerequisites || !formNodes) {
      return [];
    }
    
    const prerequisiteIds = targetNode.data.prerequisites;
    return formNodes.filter(node => prerequisiteIds.includes(node.id));
  };

  const parentNodes = getParentNodes();

  return (
    <Drawer
      opened={open}
      onClose={() => {
        setOpen(false);
      }}
      title={targetNode ? `Prerequisites for ${targetNode.data.name}` : "Prerequisites"}
    >
      {parentNodes.length > 0 ? (
        <Stack gap="md">
          {parentNodes.map((node) => (
            <Box key={node.id} p="md" style={{ border: "1px solid #e0e0e0", borderRadius: "4px" }}>
              <Text fw={500}>{node.data.name}</Text>
              {node.data.description && (
                <Text size="sm" c="dimmed" mt="xs">
                  {node.data.description}
                </Text>
              )}
            </Box>
          ))}
        </Stack>
      ) : (
        <Text c="dimmed">
          {targetNode ? "No prerequisites for this node" : "Select a node to view prerequisites"}
        </Text>
      )}
    </Drawer>
  );
};
