import React, { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { TouchAppOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderRadius: "3px",
    margin: "4px",
  },
}));

export default function DiseaseListItem() {
  const [secondary, setSecondary] = useState(false);
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <ListItemAvatar>
        <Avatar>{/* <FolderOutlined /> */}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Disease's name"
        secondary={secondary ? "Secondary text" : null}
      />

      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit">
          <TouchAppOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
