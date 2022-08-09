import React from 'react';
import { FormControl, FormLabel, Input, Box, Button, CircularProgress, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_LOADING } from '../Redux/actionType';

export const AddCountryDetails = () => {
    const dispatch = useDispatch();
    const [country, setCountry] = React.useState("");
    const isLoading = useSelector(state => state.isLoading);
    const toast = useToast();

    const handleAdd = async () => {
        try {
            dispatch({ type: TOGGLE_LOADING, payload: true });
            let res = await fetch("https://jsonserver-country-cities.herokuapp.com/country", {
                method: "POST",
                body: JSON.stringify({ name: country }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            await res.json();
            dispatch({ type: TOGGLE_LOADING, payload: false });
            toast({
                title: 'Country Added',
                description: "You've added the country details successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box width="40%" margin="100px auto">
            {isLoading ? <CircularProgress isIndeterminate color="green.600" size="300px" thickness="5px" /> :
                <Box><FormControl padding="20px 0px">
                    <FormLabel>Enter Country</FormLabel>
                    <Input value={country} onChange={(e) => { setCountry(e.target.value) }} type="text" name="country" placeholder="Enter country name" />
                </FormControl>
                    <Button colorScheme="green" onClick={handleAdd}>Add</Button></Box>}
        </Box>
    )
}
