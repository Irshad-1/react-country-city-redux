import React from 'react';
import { FormControl, FormLabel, Input, Box, Select, Button, useToast, CircularProgress } from '@chakra-ui/react';
import { getAllCountries } from '../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_LOADING } from '../Redux/actionType';

export const AddCityDetails = () => {
    const dispatch = useDispatch();
    const countryData = useSelector(state => state.country);
    const toast = useToast();
    const isLoading = useSelector(state => state.isLoading);

    const [data, setData] = React.useState({
        country: "",
        city: "",
        population: 0
    });

    const { country, city, population } = data;

    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    async function handleAdd() {

        try {
            dispatch({ type: TOGGLE_LOADING, payload: true });
            let res = await fetch("https://jsonserver-country-cities.herokuapp.com/cities", {
                method: "POST",
                body: JSON.stringify({ country, population, name: city }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            await res.json();
            dispatch({ type: TOGGLE_LOADING, payload: false });
            toast({
                title: 'City Details Added',
                description: "You've added the city details successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        dispatch(getAllCountries());
    }, [])
    return (
        <Box width="40%" margin="100px auto">
            {isLoading ? <CircularProgress isIndeterminate color="green.600" size="300px" thickness="5px" /> : <Box><FormControl padding="20px 0px">

                <FormLabel>Enter City</FormLabel>
                <Input value={city} onChange={handleChange} type="text" name="city" placeholder="Enter city name" />
            </FormControl>
                <FormControl padding="20px 0px">
                    <FormLabel>Enter Population</FormLabel>
                    <Input value={population} onChange={handleChange} name="population" type="number" placeholder="Enter population" />
                </FormControl>
                <FormControl padding="20px 0px">
                    <FormLabel>Country</FormLabel>
                    <Select value={country} name="country" onChange={handleChange} placeholder="Select Country">
                        {countryData.map((ele, index) => {
                            return (
                                <option key={index}>{ele.name}</option>
                            )
                        })}
                    </Select>
                </FormControl>
                <Button colorScheme="green" onClick={handleAdd}>Add</Button>
            </Box>
            }

        </Box>
    )
}
