import React, { useState } from "react";
// destructure the onAddItem prop
function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e) {
    e.preventDefault();
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    }
    console.log(itemData);
    fetch("http://localhost:4000/items", {
      method: "POST", //HTTP Verb
      header: {
        "Content-Type": "application/json", //specifying that we are sending a JSON string in the request)
      },
      body: JSON.stringify(itemData), //(the stringified object we are sending)
    })
      .then((r) => r.json())
      //call the onAddItem prop with the newItem
      .then((newItem) => onAddItem(newItem))
    // console.log('name:', name)
    // console.log("category:", category)
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;