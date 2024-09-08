import React, { useState } from "react";
import useSchemas from "../hooks/useSchemas";
import SelectDropdown from "./SelectDropdown";
import { getFilteredOptions, getDropdownOptions } from "../utils/optionUtils";
import '../styles/segmentForm.css';

const SegmentForm = ({ allSchemas, onSave }) => {
    const [selectedSchema, setSelectedSchema] = useState(""); // For the main dropdown
    const [isModalOpen, setIsModalOpen] = useState();
    const [segmentName, setSegmentName] = useState("");
    const {
        selectedSchemas,
        setSelectedSchemas,
        addNewSchemaDropdown,
        handleSelectedSchemaChange
    } = useSchemas(allSchemas);

    // Handle main dropdown change
    const handleSchemaChange = (e) => {
        setSelectedSchema(e.target.value);
    };

    const prepareSegmentData = () => {
        if (segmentName && selectedSchemas.length > 0) {
            const formatedSchema = selectedSchemas.map((schema) => {
                return {
                    [schema.value]: schema.label
                }
            });

            return {
                segment_name: segmentName,
                schema: formatedSchema
            }
        } else {
            console.log('Please provide segment name and select atleast one schema from the dropdown');
            return;
        }
    }

    const handleSaveClick = () => {
        const segmentData = prepareSegmentData();
        onSave(segmentData);

        // Clear the input fields
        setSegmentName("");
        setSelectedSchema("");
        setSelectedSchemas([]);

        // Close the modal
        setIsModalOpen(false);
    }

    return (
        <div className="main-container">
            <button
                className="btn btn-outline btn-white"
                onClick={() => setIsModalOpen(true)}
                disabled={isModalOpen}
                style={{ cursor: isModalOpen && 'not-allowed' }}
                aria-label="Open the segment"
            >Save segment</button>

            <div className={`modalContainer ${isModalOpen && 'active'}`}>
                <div className="modal-header">
                    <span onClick={() => setIsModalOpen(false)}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                        </svg>
                    </span>
                    <h3>Saving Segment</h3>
                </div>
                <div className="modal-body">
                    <div className="inputBx">
                        <label htmlFor="segment-name">Enter the Name of the Segment</label>
                        <input
                            type="text"
                            id="segment-name"
                            placeholder="Name of the segment"
                            value={segmentName}
                            onChange={(e) => setSegmentName(e.target.value)}
                            aria-label="Segment Name"
                            aria-required="true"
                        />
                    </div>

                    <div className="contentBx">
                        <p>To save your segment, you need to add the schemas to build the query</p>
                    </div>

                    <div className="dynamicDropdownBx">
                        {/* Render the dynamically added dropdowns */}
                        <div className="selected-schemas">
                            {selectedSchemas.length > 0 && selectedSchemas.map((schema, index) => (
                                <div key={index} className="schema-box">
                                    <SelectDropdown
                                        value={schema?.value}
                                        onChange={(e) =>
                                            handleSelectedSchemaChange(index, e.target.value)
                                        }
                                        options={getFilteredOptions(allSchemas, selectedSchemas, index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <br />

                    <div className="mainDropdownBx">
                        {/* Main dropdown for selecting a new schema */}
                        <SelectDropdown
                            value={selectedSchema}
                            onChange={handleSchemaChange}
                            dropDownType='main'
                            options={getDropdownOptions(allSchemas, selectedSchemas)}
                        />
                    </div>

                    <a
                        className="link"
                        onClick={() => addNewSchemaDropdown(selectedSchema)}
                        aria-label="Add a new segment to schema"
                    >
                        + Add new schema
                    </a>
                </div>

                <div className="modal-footer">
                    <button
                        className="btn btn-primary"
                        onClick={handleSaveClick}
                        aria-label="Save Segment"
                    >
                        Save the Segment
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => setIsModalOpen(false)}
                        aria-label="Close the modal"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SegmentForm;
