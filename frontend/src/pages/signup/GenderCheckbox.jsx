const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
    return (
        <div>
            <select
                className="select select-bordered w-full max-w-[640px] mt-2"
                value={selectedGender} // Control the selected value with React
                onChange={(e) => onCheckboxChange(e.target.value)} // Update the parent state on change
            >
                <option disabled value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>
    );
}

export default GenderCheckbox