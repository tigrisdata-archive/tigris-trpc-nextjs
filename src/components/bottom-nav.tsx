import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

export type BottomNavProps = {
  pageIndex: number;
  handlePostsNavigation: (toIndex: number) => void;
};

export const BottomNav = ({
  pageIndex,
  handlePostsNavigation,
}: BottomNavProps) => {
  return (
    <Paper style={{ marginTop: 10 }} elevation={2}>
      <BottomNavigation
        showLabels
        sx={{ width: 500 }}
        value={pageIndex}
        onChange={(_event, value) => handlePostsNavigation(value)}
      >
        {pageIndex > 0 && (
          <BottomNavigationAction
            label="Newer posts"
            value={pageIndex - 1}
            icon={<ArrowLeft />}
          />
        )}
        <BottomNavigationAction
          label="Older posts"
          value={pageIndex + 1}
          icon={<ArrowRight />}
        />
      </BottomNavigation>
    </Paper>
  );
};
