import { Box } from '@mantine/core';
import { Dashboard } from '../components/Dashboard/Dashboard';

export function HomePage() {
  return (
    <Box w="100%" miw={0} maw="100vw" style={{ overflow: 'hidden' }}>
      <Dashboard />
    </Box>
  );
}
