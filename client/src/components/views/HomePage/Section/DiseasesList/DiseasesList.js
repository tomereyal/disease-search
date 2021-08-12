import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import DiseaseListItem from "./Sections/DiseaseListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  //   demo: {
  //     backgroundColor: theme.palette.background.paper,
  //   },
  title: {
    margin: theme.spacing(4, 0, 2),
    display: "flex",
    justifyContent: "center",
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function DiseasesList() {
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Diseases Found
      </Typography>
      <div className={classes.demo}>
        <List dense={dense}>{generate(<DiseaseListItem />)}</List>
      </div>
    </div>
  );
}
