const GenderCheckbox = () => {
    return (
        <div >
            <select className="select select-bordered w-full max-w-[640px] mt-2">
                <option disabled selected>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>
        </div>
    )
}

export default GenderCheckbox