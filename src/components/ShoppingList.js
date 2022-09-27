import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items))
  }, [])

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    })
    setItems(updatedItems);  // setting state
  }

  function handleAddItem(newItem) {
    // console.log("In ShoppingList:", newItem)
    // setState for new array
    setItems([...items, newItem])
  }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });
  console.log(itemsToDisplay)

  const displayItem = itemsToDisplay.map((item) => (
    <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} />
  ))

  return (
    <div className="ShoppingList">
      {/*add the onAddItem prop*/}
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/*pass it as a prop to item */}
        {displayItem}
      </ul>
    </div>
  );
}

export default ShoppingList;