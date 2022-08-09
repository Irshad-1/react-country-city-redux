import React from 'react';
import {
  Table,
  Thead,
  Tbody, Tr,
  Th,
  Td, useToast,
  Button, useDisclosure, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, FormControl, FormLabel, Input, Select, Spinner, CircularProgress
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCities, getAllCountries, getFilterData } from '../Redux/action';
import { TOGGLE_LOADING } from '../Redux/actionType';


export const TableComponent = () => {
  const toast = useToast();
  const [id, setId] = React.useState(0);
  const isLoading = useSelector(state => state.isLoading);
  const [isLoader, setLoader] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const cities = useSelector(state => state.city);

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

  const [filter, setFilter] = React.useState("None");
  const [sort, setSort] = React.useState("None");

  const handleSort = (e) => {
    setSort(e.target.value);
    if (e.target.value != "None") {
      if (e.target.value == "Sort by Increasing Population")
        cities.sort((a, b) => a.population - b.population);
      else
        cities.sort((a, b) => b.population - a.population);
    }
    else {
      dispatch(getAllCities());
    }
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
    if (e.target.value != "None") {
      dispatch(getFilterData(e.target.value));
    }
    else {
      dispatch(getAllCities());
    }
  }

  const countryData = useSelector(state => state.country);
  console.log(countryData);

  const modalChange = (id) => {

    const { country, name: city, population } = cities.filter((el) => el.id === id)[0];
    console.log(country, city, population);
    setData({ country, city, population });
  }
  async function handleEdit() {

    try {
      setLoader(true);
      let res = await fetch(`https://jsonserver-country-cities.herokuapp.com/cities/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ country, population, name: city }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      await res.json();
      setLoader(false);
      dispatch(getAllCities());
      onClose();
      toast({
        title: 'City Details edited',
        description: "You've edited the city details successfully",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDelete(id) {
    try {
      dispatch({ type: TOGGLE_LOADING, payload: true });
      let res = await fetch(`https://jsonserver-country-cities.herokuapp.com/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      await res.json();
      dispatch({ type: TOGGLE_LOADING, payload: false });
      dispatch(getAllCities());
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    dispatch(getAllCities());
    dispatch(getAllCountries());
  }, [])

  return (
    <Box width="70%" margin="auto">
      <Box display="flex" justifyContent="space-between">
        <FormLabel fontSize="20px" fontWeight="bold">Filter By Country</FormLabel>
        <Select value={filter} name="filter" onChange={handleFilter} width="30%">
          <option>None</option>
          {countryData.map((ele, index) => {
            return (
              <option key={index}>{ele.name}</option>
            )
          })}
        </Select>
        <FormLabel fontSize="20px" fontWeight="bold">Sort By Population</FormLabel>
        <Select value={sort} name="sort" onChange={handleSort} width="30%">
          <option>None</option>
          <option>Sort by Increasing Population</option>
          <option>Sort by Decreasing Population</option>
        </Select>
      </Box>
      <Table colorScheme="facebook" variant="striped">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Country</Th>
            <Th>City</Th>
            <Th>Population</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cities.map((ele, index) => {
            return (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{ele.country}</Td>
                <Td>{ele.name}</Td>
                <Td>{ele.population}</Td>
                <Td><Button colorScheme="blue" onClick={() => {
                  setId(ele.id);
                  modalChange(ele.id);
                  onOpen();
                }}>Edit</Button></Td>
                <Td>{id !== ele.id ? <Button colorScheme="red" onClick={() => { setId(ele.id); handleDelete(ele.id) }}>Delete</Button> : isLoading ? <Spinner color="red" /> : <Button colorScheme="red" onClick={() => { handleDelete(ele.id) }}>Delete</Button>}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {isLoader ? <ModalContent> <CircularProgress isIndeterminate color="green.600" size="300px" thickness="5px" /> </ModalContent> : <ModalContent>
          <ModalHeader>Edit Details</ModalHeader>
          <ModalBody>
            <Box width="40%" margin="100px auto">
              <FormControl padding="20px 0px">
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
              <Button colorScheme="green" onClick={handleEdit}>Edit</Button>
            </Box>
          </ModalBody>
        </ModalContent>}
      </Modal>
    </Box>
  )
}
