import React, { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Chip,
} from "@material-ui/core";
import {
  DeleteOutline,
  FolderOutlined,
  FaceOutlined,
  DoneOutline,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderRadius: "3px",
    margin: "4px",
  },
}));

export default function MarkListItem() {
  const [secondary, setSecondary] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  return (
    <ListItem className={classes.root}>
      <ListItemAvatar>
        <Chip
          avatar={<Avatar>M</Avatar>}
          label="Location"
          onClick={handleClick}
          variant="outlined"
        />
      </ListItemAvatar>
      <ListItemText
        primary="mark's name"
        secondary={secondary ? "Secondary text" : null}
      />
      <ListItemText>
        <Avatar>
          <FolderOutlined />
        </Avatar>
      </ListItemText>

      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteOutline />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
