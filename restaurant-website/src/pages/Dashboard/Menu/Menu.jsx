import { useEffect, useState } from "react";
import "./Menu.css";

import DashboardNavbar from "../../DashboardNavbar/DashboardNavbar";

import MenuHeader from "./components/MenuHeader.jsx";
import MenuFilters from "./components/MenuFilters";
import MenuForm from "./components/MenuForm";
import MenuGrid from "./components/MenuGrid";


const categories = [
    "Starters",
    "Mains",
    "Sides",
    "Desserts",
    "Drinks"
];


function Menu() {

    const [menuItems, setMenuItems] = useState([]);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Starters",
        available: true,
        image: null
    });


    /*
        Fetch menu items
    */

    useEffect(() => {

        fetchMenu();

    }, []);


    const fetchMenu = async () => {

        const token = localStorage.getItem("token");


        if (!token) {

            setError("You are not logged in.");
            setLoading(false);

            return;

        }


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/menu/`,
                {
                    headers: {
                        "Authorization": `Token ${token}`
                    }
                }
            );


            if (response.status === 401) {

                setError(
                    "Your login session has expired."
                );

                return;

            }


            if (!response.ok) {

                setError(
                    "Unable to load menu."
                );

                return;

            }


            const data =
                await response.json();


            setMenuItems(data);


        } catch (error) {

            setError(
                "Unable to connect to the server."
            );

        } finally {

            setLoading(false);

        }

    };


    // Filter menu items

    const filteredItems = menuItems.filter(item => {

        const searchValue =
            search.toLowerCase().trim();


        const matchesSearch =
            !searchValue ||
            item.name
                .toLowerCase()
                .includes(searchValue) ||
            item.description
                .toLowerCase()
                .includes(searchValue);


        const matchesCategory =
            categoryFilter === "All" ||
            item.category === categoryFilter;


        return (
            matchesSearch &&
            matchesCategory
        );

    });


    // Reset form

    const resetForm = () => {

        setFormData({
            name: "",
            description: "",
            price: "",
            category: "Starters",
            available: true,
            image: null
        });


        setEditingItem(null);
        setShowForm(false);

    };

    // handles form input

    const handleInputChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
            files
        } = e.target;


        setFormData(previous => ({
            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                        ? files[0]
                        : value

        }));

    };


    // adds item to menu

    const handleAdd = () => {

        setEditingItem(null);


        setFormData({
            name: "",
            description: "",
            price: "",
            category: "Starters",
            available: true,
            image: null
        });


        setShowForm(true);
        setError("");

    };


    // edits menu items

    const handleEdit = (item) => {

        setEditingItem(item);


        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            available: item.available,
            image: null
        });


        setShowForm(true);
        setError("");

    };


    // saves menu items

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);
        setError("");


        const token =
            localStorage.getItem("token");


        try {

            const data = new FormData();


            data.append(
                "name",
                formData.name
            );


            data.append(
                "description",
                formData.description
            );


            data.append(
                "price",
                formData.price
            );


            data.append(
                "category",
                formData.category
            );


            data.append(
                "available",
                formData.available
            );


            if (formData.image) {

                data.append(
                    "image",
                    formData.image
                );

            }


            const url = editingItem
                ? `${import.meta.env.VITE_API_URL}/api/menu/${editingItem.id}/`
                : `${import.meta.env.VITE_API_URL}/api/menu/`;


            const response = await fetch(
                url,
                {
                    method: editingItem
                        ? "PATCH"
                        : "POST",

                    headers: {
                        "Authorization": `Token ${token}`
                    },

                    body: data
                }
            );


            const responseData =
                await response.json();


            if (!response.ok) {

                setError(
                    responseData.error ||
                    "Unable to save menu item."
                );

                return;

            }


            if (editingItem) {

                setMenuItems(previous =>
                    previous.map(item =>
                        item.id === responseData.id
                            ? responseData
                            : item
                    )
                );

            } else {

                setMenuItems(previous => [
                    responseData,
                    ...previous
                ]);

            }


            resetForm();


        } catch (error) {

            setError(
                "Unable to connect to the server."
            );

        } finally {

            setSaving(false);

        }

    };


    // Toggle availiability 

    const handleToggleAvailability = async (item) => {

        const token =
            localStorage.getItem("token");


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/menu/${item.id}/`,
                {
                    method: "PATCH",

                    headers: {
                        "Authorization": `Token ${token}`,
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        available: !item.available
                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                setError(
                    data.error ||
                    "Unable to update availability."
                );

                return;

            }


            setMenuItems(previous =>
                previous.map(menuItem =>
                    menuItem.id === data.id
                        ? data
                        : menuItem
                )
            );


        } catch (error) {

            setError(
                "Unable to connect to the server."
            );

        }

    };


    // deleltes menu items

    const handleDelete = async (item) => {

        const confirmed =
            window.confirm(
                `Delete "${item.name}"?`
            );


        if (!confirmed) {
            return;
        }


        const token =
            localStorage.getItem("token");


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/menu/${item.id}/`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization": `Token ${token}`
                    }
                }
            );


            if (!response.ok) {

                let data = {};

                try {
                    data = await response.json();
                } catch {}


                setError(
                    data.error ||
                    "Unable to delete menu item."
                );

                return;

            }


            setMenuItems(previous =>
                previous.filter(
                    menuItem =>
                        menuItem.id !== item.id
                )
            );


        } catch (error) {

            setError(
                "Unable to connect to the server."
            );

        }

    };


    return (

        <div className="dashboard">

            <DashboardNavbar />


            <main className="menu-main">

                <MenuHeader
                    itemCount={menuItems.length}
                    onAdd={handleAdd}
                />


                <MenuFilters
                    search={search}
                    setSearch={setSearch}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    categories={categories}
                />


                {error && (

                    <div className="menu-error">
                        {error}
                    </div>

                )}


                {showForm && (

                    <MenuForm
                        formData={formData}
                        editingItem={editingItem}
                        saving={saving}
                        categories={categories}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        onCancel={resetForm}
                    />

                )}


                <MenuGrid
                    loading={loading}
                    filteredItems={filteredItems}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleAvailability={
                        handleToggleAvailability
                    }
                />

            </main>

        </div>

    );

}


export default Menu;