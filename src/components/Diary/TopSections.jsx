import { Box, Typography } from '@mui/material';
import React from 'react';

const TopSection = ({ height="10rem", marginRight="0rem", title, fontSize="1.3rem", color, image }) => {
    return (
        <Box
            sx={{
                height:height,
                backgroundColor:image ? "none" : color,
                marginRight:marginRight,
            }}
        >
            {image ? (
                <Box
                    sx={{
                        display:"flex",
                        height:"100%",
                        width:"100%",
                        backgroundColor:"black",
                        alignItems:"center",
                        justifyContent:"center",
                        opacity:"70%"
                    }}
                >
                    <img
                        src={image}
                        style={{
                            width:"100%",
                            height:"100%",
                            objectFit:"cover",
                        }}
                        alt='cover'
                    />
                    
                    <Typography
                        sx={{
                            fontWeight:"bold",
                            color:"white",
                            fontSize:fontSize,
                            position:"absolute"
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
            ):(
                <Box
                    sx={{
                        display:"flex",
                        height:"100%",
                        width:"100%",
                        alignItems:"center",
                        justifyContent:"center",
                    }}
                >
                    
                    <Typography
                        sx={{
                            fontWeight:"bold",
                            color:"white",
                            fontSize:fontSize,
                            position:"absolute"
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default TopSection;