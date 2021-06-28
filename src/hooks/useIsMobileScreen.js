import { useTheme, useMediaQuery } from '@material-ui/core';

export function useIsMobileScreen() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(800));
}
