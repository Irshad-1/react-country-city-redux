import React from 'react';
import {
  ChakraProvider,
  theme
} from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { TableComponent } from "./Components/TableComponent";
import { AddCityDetails } from './Components/AddCityDetails';
import { AddCountryDetails } from './Components/AddCountryDetails';
import { Navbar } from "./Components/Navbar";

function App() {
  return (
    <ChakraProvider theme={theme}>

      <Navbar />
      <Routes>
        <Route path="/" element={<TableComponent />} />
        <Route path="/addcity" element={<AddCityDetails />} />
        <Route path="/addcountry" element={<AddCountryDetails />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
