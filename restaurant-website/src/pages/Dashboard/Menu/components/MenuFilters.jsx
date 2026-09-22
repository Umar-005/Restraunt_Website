function MenuFilters({
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    categories
}) {

    return (

        <section className="menu-filters">

            <input
                type="text"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                placeholder="Search menu items..."
            />


            <select
                value={categoryFilter}
                onChange={(e) =>
                    setCategoryFilter(
                        e.target.value
                    )
                }
            >

                <option value="All">
                    All Categories
                </option>


                {categories.map(category => (

                    <option
                        key={category}
                        value={category}
                    >
                        {category}
                    </option>

                ))}

            </select>

        </section>

    );

}


export default MenuFilters;