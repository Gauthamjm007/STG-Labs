import Box from "@mui/material/Box";

export default function BoxLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      width={"100%"}
      height={600}
      justifyContent={"center"}
      border={"1px solid rgba(224, 224, 224, 1)"}
      borderRadius={"5px"}
    >
      {children}
    </Box>
  );
}
