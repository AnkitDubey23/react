import React, {useState, useEffect} from "react";

const Dropdown = () => {
    const [name, setName] = useState([])

    useEffect(() => {
        fetchData()
    })

    const fetchData = async () => {
        const response = await fetch("https://swapi.dev/api/people/");
        const data = await response.json();

        if(data && data.results && data.results.length >0) {
            const characterName = data.results.map(character => character.name);
            setName(characterName)
        }
    }

    return (
        <div>
            <h1>Choose character name:</h1>
            <select>
                {name && name.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown;