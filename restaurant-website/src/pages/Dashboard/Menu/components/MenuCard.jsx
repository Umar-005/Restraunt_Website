function MenuCard({
    item,
    onEdit,
    onDelete,
    onToggleAvailability
}) {

    return (

        <article className="menu-card">

            <div className="menu-card-image">

                {item.image ? (

                    <img
                        src={item.image}
                        alt={item.name}
                    />

                ) : (

                    <span>
                        NO IMAGE
                    </span>

                )}

            </div>


            <div className="menu-card-content">

                <div className="menu-card-top">

                    <div>

                        <span className="menu-category">
                            {item.category}
                        </span>


                        <h3>
                            {item.name}
                        </h3>

                    </div>


                    <strong className="menu-price">
                        £
                        {Number(
                            item.price
                        ).toFixed(2)}
                    </strong>

                </div>


                <p>
                    {item.description}
                </p>


                <div className="menu-card-footer">

                    <button
                        className={
                            `availability-button ${
                                item.available
                                    ? "available"
                                    : "unavailable"
                            }`
                        }
                        onClick={() =>
                            onToggleAvailability(item)
                        }
                    >

                        <span>
                            ●
                        </span>

                        {item.available
                            ? "Available"
                            : "Unavailable"}

                    </button>


                    <div className="menu-card-actions">

                        <button
                            onClick={() =>
                                onEdit(item)
                            }
                        >
                            EDIT
                        </button>


                        <button
                            className="delete-button"
                            onClick={() =>
                                onDelete(item)
                            }
                        >
                            DELETE
                        </button>

                    </div>

                </div>

            </div>

        </article>

    );

}


export default MenuCard;