import { Box, CircularProgress, Container, Portal } from "@mui/material";

const FullScreenLoader = () => {
  return (
    <Portal container={() => document.getElementById("root")}>
      <Container
        sx={{
          height: "100vh",
          position: "absolute",
          top: 0,
          left: "auto",
          backgroundColor: "rgb(243, 243, 243, 0.2)",
          zIndex: 1000,
          backdropFilter: "blur(5px)",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      </Container>
    </Portal>
  );
};

export default FullScreenLoader;
