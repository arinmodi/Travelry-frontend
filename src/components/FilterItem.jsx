import React from "react";

const FilterItem = ({ checked, name, setChecked }) => {
    return (
        <div style={{ marginTop : "1rem", marginRight : "1rem", marginBottom:"0.5rem" }}>
            <label>
                <input 
                    type="radio"
                    name="sort"
                    style={{ marginRight : "1rem" }}
                    checked={checked}
                    onChange={setChecked} />
                {name}
            </label>
        </div>
    );
}

export default FilterItem;