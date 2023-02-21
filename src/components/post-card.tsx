import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DateTime } from "luxon";
import { getAvatarCharacter } from "~/utils/text-utils";
import { MuiNextLink } from "./mui-next-link";

export interface PostCardProps {
  username: string;
  text: string;
  createdAt: Date;
}

export default function PostCard({
  username,
  text,
  createdAt,
}: PostCardProps): JSX.Element {
  const avatarChar = getAvatarCharacter(username);

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <MuiNextLink style={{ textDecoration: "none" }} href={`/${username}`}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
              {avatarChar}
            </Avatar>
          </MuiNextLink>
        }
        action={
          <IconButton aria-label="additional actions">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{
          variant: "body1",
          fontWeight: 800,
          component: "h3",
        }}
        title={
          <MuiNextLink
            style={{ textDecoration: "none", color: "black" }}
            href={`/${username}`}
          >
            {username}
          </MuiNextLink>
        }
        subheader={DateTime.fromISO(createdAt.toString()).toLocaleString(
          DateTime.DATETIME_MED
        )}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
