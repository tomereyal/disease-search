import React from "react";
import MarkSearcher from "./Section/MarkSearcher/MarkSearcher";
import MarksList from "./Section/MarksList/MarksList";
import DiseasesList from "./Section/DiseasesList/DiseasesList";
import { Container, Grid } from "@material-ui/core";
export default function HomePage() {
  return (
    <div
      style={{
        height: "90vh",
        backgroundColor: "#F3F3F3",
        display: "flex",
      }}
    >
      <Grid
        container
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <MarkSearcher />
        <div style={{ width: "400px" }}>
          <MarksList />
        </div>
      </Grid>

      <Grid
        container
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <div style={{ width: "400px" }}>
          <DiseasesList />
        </div>
      </Grid>
    </div>
  );
}
