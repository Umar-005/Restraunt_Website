function MenuHeader({
    itemCount,
    onAdd
}) {

    return (

        <header className="menu-header">

            <div>

                <p className="menu-eyebrow">
                    MANAGEMENT
                </p>

                <h2>
                    Menu
                </h2>

                <p>
                    Add, edit and manage restaurant menu items.
                </p>

            </div>


            <div className="menu-header-actions">

                <div className="menu-count">

                    <strong>
                        {itemCount}
                    </strong>

                    <span>
                        Menu Items
                    </span>

                </div>


                <button
                    className="add-menu-button"
                    onClick={onAdd}
                >
                    + ADD ITEM
                </button>

            </div>

        </header>

    );

}


export default MenuHeader;