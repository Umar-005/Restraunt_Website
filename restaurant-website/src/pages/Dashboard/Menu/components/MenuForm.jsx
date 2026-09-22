function MenuForm({
    formData,
    editingItem,
    saving,
    categories,
    onChange,
    onSubmit,
    onCancel
}) {

    return (

        <section className="menu-form-card">

            <div className="menu-form-header">

                <div>

                    <p className="menu-eyebrow">

                        {editingItem
                            ? "EDIT ITEM"
                            : "NEW ITEM"}

                    </p>


                    <h3>

                        {editingItem
                            ? "Edit Menu Item"
                            : "Add Menu Item"}

                    </h3>

                </div>


                <button
                    className="close-menu-form"
                    onClick={onCancel}
                    type="button"
                >
                    ×
                </button>

            </div>


            <form
                className="menu-form"
                onSubmit={onSubmit}
            >

                <div className="menu-form-grid">

                    <label>

                        Name

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            placeholder="Menu item name"
                            required
                        />

                    </label>


                    <label>

                        Price

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={onChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                        />

                    </label>


                    <label>

                        Category

                        <select
                            name="category"
                            value={formData.category}
                            onChange={onChange}
                            required
                        >

                            {categories.map(category => (

                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>

                            ))}

                        </select>

                    </label>


                    <label className="menu-image-field">

                        Image

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={onChange}
                        />

                    </label>


                    <label className="menu-description-field">

                        Description

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                            placeholder="Describe the menu item..."
                            required
                        />

                    </label>


                    <label className="availability-checkbox">

                        <input
                            type="checkbox"
                            name="available"
                            checked={formData.available}
                            onChange={onChange}
                        />

                        Available

                    </label>

                </div>


                <div className="menu-form-actions">

                    <button
                        type="button"
                        className="cancel-menu-button"
                        onClick={onCancel}
                    >
                        CANCEL
                    </button>


                    <button
                        type="submit"
                        className="save-menu-button"
                        disabled={saving}
                    >

                        {saving
                            ? "SAVING..."
                            : editingItem
                                ? "SAVE CHANGES"
                                : "ADD ITEM"}

                    </button>

                </div>

            </form>

        </section>

    );

}


export default MenuForm;