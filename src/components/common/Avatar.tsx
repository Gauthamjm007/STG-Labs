import MUIAvatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

export function Avatar({ src }: { src: string }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
    >
      <MUIAvatar src={src} sx={{ width: 36, height: 36 }} />
    </Box>
  );
}
