import cara from '../assets/cara.png'
import senai from "../assets/senai_logo02.jpg"
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';


const LayoutImagens = ({children}) =>
{
return(
    <Container component="main" maxWidth="xl" style={{ display: 'flex', flexDirection:"row", padding: "0", margin: "0" }} >
    <img
    src={senai}
    style={{
      height: "100vh",
      width: "33%",
      padding: "0", 
      margin: "0"
    }}
  />

    <Box
        sx={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          flexDirection:"column",
          width:"33%"
        }}
    >
      {children}
    </Box>
    <img
    src={cara}
    style={{
      height: "100vh",
      width: "33%",
      padding: "0",
      margin: "0"
    }}
  />
  </Container>
)
}

export default LayoutImagens;