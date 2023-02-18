import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

export type BottomNavProps = {
  pageIndex: number;
  showOlderButton: boolean;
  showNewerButton: boolean;
  handlePostsNavigation: (toIndex: number) => void;
};

export const BottomNav = ({
  pageIndex,
  showNewerButton,
  showOlderButton,
  handlePostsNavigation,
}: BottomNavProps) => {
  if (!showNewerButton && !showOlderButton) return <></>;

  return (
    <Paper style={{ marginTop: 20 }} elevation={2}>
      <BottomNavigation
        showLabels
        value={pageIndex}
        onChange={(_event, value) => handlePostsNavigation(value)}
      >
        {showNewerButton && (
          <BottomNavigationAction
            label="Newer posts"
            value={pageIndex - 1}
            icon={<ArrowLeft />}
          />
        )}
        {showOlderButton && (
          <BottomNavigationAction
            label="Older posts"
            value={pageIndex + 1}
            icon={<ArrowRight />}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};
