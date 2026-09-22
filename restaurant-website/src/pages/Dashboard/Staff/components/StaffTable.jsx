import StaffRow from "./StaffRow";


function StaffTable({
    staff,
    search,
    setSearch,
    loading,
    deleting,
    editing,
    transferring,
    isAdmin,
    currentUsername,
    onDelete,
    onEdit,
    onTransferAdmin
}) {


    const filteredStaff = staff.filter(
        (member) => {

            const searchValue =
                search.toLowerCase().trim();


            if (!searchValue) {

                return true;

            }


            return (
                member.username
                    ?.toLowerCase()
                    .includes(searchValue) ||

                member.email
                    ?.toLowerCase()
                    .includes(searchValue) ||

                member.role
                    ?.toLowerCase()
                    .includes(searchValue)
            );

        }
    );


    return (
        <section className="staff-table-card">

            <div className="staff-table-header">

                <h2>
                    Current Staff
                </h2>


                <div className="staff-search">

                    <span className="search-icon">
                        ⌕
                    </span>


                    <input
                        type="text"
                        placeholder="Search staff..."
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                </div>

            </div>


            {loading ? (

                <div className="staff-table-message">

                    Loading staff...

                </div>

            ) : filteredStaff.length === 0 ? (

                <div className="staff-table-message">

                    {search
                        ? "No staff members match your search."
                        : "No staff members found."
                    }

                </div>

            ) : (

                <div className="staff-table-wrapper">

                    <table className="staff-table">

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    USERNAME
                                </th>

                                <th>
                                    EMAIL
                                </th>

                                <th>
                                    ROLE
                                </th>

                                <th>
                                    STATUS
                                </th>

                                <th>
                                    DATE JOINED
                                </th>

                                <th>
                                    ACTIONS
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredStaff.map(
                                (member) => (

                                    <StaffRow
                                        key={member.id}
                                        staffMember={member}
                                        isAdmin={isAdmin}
                                        currentUsername={currentUsername}
                                        deleting={deleting}
                                        editing={editing}
                                        transferring={transferring}
                                        onDelete={onDelete}
                                        onEdit={onEdit}
                                        onTransferAdmin={
                                            onTransferAdmin
                                        }
                                    />

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}


            {!loading &&
                staff.length > 0 && (

                <div className="staff-table-footer">

                    Showing{" "}
                    {filteredStaff.length}
                    {" "}of{" "}
                    {staff.length}
                    {" "}staff members

                </div>

            )}

        </section>
    );
}


export default StaffTable;