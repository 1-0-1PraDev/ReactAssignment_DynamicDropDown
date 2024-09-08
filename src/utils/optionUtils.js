    // Filter options for each dynamically created dropdown
export const getFilteredOptions = (allSchemas, selectedSchemas, index) => {
    const currentlySelected = selectedSchemas.map((schema) => schema?.value);
    return allSchemas.filter(
        (schema) =>
            !currentlySelected.includes(schema.value) ||
            schema.value === selectedSchemas[index]?.value
    );
}

    // Filter options for the main dropdown so that only unselected ones are shown
export const getDropdownOptions = (allSchemas, selectedSchemas) => {
    console.log('selected schema ', selectedSchemas)
    const selectedValues = new Set(
        selectedSchemas.map((schema) => schema.value)
    );

    return allSchemas.filter((schema) => !selectedValues.has(schema.value));
};
