import React from 'react';
import { Box, Link } from "@chakra-ui/react";


export const Navbar = () => {
    return (
        <Box width="70%" padding="15px 50px" margin="auto" display="flex" justifyContent="space-between" backgroundColor="#2A0944">
            <Link fontSize="1.5em" color="#FEC260" href="/">Home</Link>
            <Link fontSize="1.5em" color="#FEC260" href="/addcity" >Add City</Link>
            <Link fontSize="1.5em" color="#FEC260" href="/addcountry">Add Country</Link>
        </Box>
    )
}
