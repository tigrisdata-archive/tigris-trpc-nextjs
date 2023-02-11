import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DateTime } from "luxon";
import Post from "~/db/models/post";
import { getAvatarCharacter } from "~/utils/text-utils";

export default function PostCard({ post }: { post: Post }) {
  const avatarChar = getAvatarCharacter(post.name);

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
            {avatarChar}
          </Avatar>
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
        title={post.name}
        subheader={
          post.createdAt
            ? DateTime.fromISO(post.createdAt.toString()).toLocaleString(
                DateTime.DATETIME_MED
              )
            : ""
        }
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.text}
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
