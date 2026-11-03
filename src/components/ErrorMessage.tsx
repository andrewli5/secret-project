import { Box, Text } from '@mantine/core';
import type { ComponentType } from 'react';
import { useThemed } from '@/hooks/useUiTheme';
import type { UiTheme } from '@/uiTheme';

type Props = { children: React.ReactNode };

const MESSAGES: Record<UiTheme, ComponentType<Props>> = {
  neumorphic: ({ children }) => (
    <Text c="red" role="alert">
      {children}
    </Text>
  ),
  retro: ({ children }) => (
    <Box className="retro-well" px={10} py={6}>
      <Text c="red" role="alert">
        {children}
      </Text>
    </Box>
  ),
};

export function ErrorMessage(props: Props) {
  const Message = useThemed(MESSAGES);
  return <Message {...props} />;
}
