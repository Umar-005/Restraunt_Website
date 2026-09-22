import MenuCard from "./MenuCard";


function MenuGrid({
    loading,
    filteredItems,
    onEdit,
    onDelete,
    onToggleAvailability
}) {

    if (loading) {

        return (

            <div className="menu-message">
                Loading menu...
            </div>

        );

    }


    if (filteredItems.length === 0) {

        return (

            <div className="menu-message">
                No menu items found.
            </div>

        );

    }


    return (

        <section className="menu-grid">

            {filteredItems.map(item => (

                <MenuCard
                    key={item.id}
                    item={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleAvailability={
                        onToggleAvailability
                    }
                />

            ))}

        </section>

    );

}


export default MenuGrid;