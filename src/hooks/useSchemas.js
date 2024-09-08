// useSchemas.js
import { useState } from 'react';

const useSchemas = (allSchemas) => {
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState(allSchemas);

  // Add a new schema dropdown dynamically
  const addNewSchemaDropdown = (selectedSchema) => {
    if (selectedSchema) {
      const schemaToAdd = availableSchemas.find((schema) => schema.value === selectedSchema);
      setSelectedSchemas([...selectedSchemas, schemaToAdd]);

      // Remove selected schema from available schemas
      setAvailableSchemas(availableSchemas.filter((schema) => schema.value !== selectedSchema));
    }
  };

  // Handle dynamic dropdown change for each selected schema
  const handleSelectedSchemaChange = (index, value) => {
    const updatedSchemas = [...selectedSchemas];
    const previousValue = updatedSchemas[index].value;

    // Update the specific dropdown with the new value
    updatedSchemas[index] = allSchemas.find((schema) => schema.value === value);
    setSelectedSchemas(updatedSchemas);

    // Update available schemas
    const newAvailableSchemas = [...availableSchemas, allSchemas.find((schema) => schema.value === previousValue)]
      .filter((schema) => !updatedSchemas.some(
            (selected) => selected.value === schema.value
        ));

    setAvailableSchemas(newAvailableSchemas);
  };

  return {
    selectedSchemas,
    availableSchemas,
    setSelectedSchemas,
    addNewSchemaDropdown,
    handleSelectedSchemaChange,
  };
};

export default useSchemas;
