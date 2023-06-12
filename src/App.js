import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { fetchUsers } from "./actions/userActions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.data);
  console.log("users from app", users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleChangeGenderFilter = (e) => {
    setGenderFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setGenderFilter("all");
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const filteredUsers = users?.filter((user) => {
    const name = user.name.toLowerCase();
    const username = user.username.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    const gender = user.gender?.toLowerCase();
    return (
      (name.includes(searchTermLower) || username.includes(searchTermLower)) &&
      (genderFilter === "all" || genderFilter === gender)
    );
  });

  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Gender</th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody>
        {currentUsers?.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
            <td>{user.gender}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers?.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <h2 className="page_title">Frontend Coding Assessment</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name or Username"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          className="search-input"
        />
        <select
          value={genderFilter}
          onChange={handleChangeGenderFilter}
          className="search-select"
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button onClick={handleClearFilters} className="clear-button">
          Clear
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="table-container">
          <table>
            {renderTableHeader()}
            {renderTableBody()}
          </table>
        </div>
      )}
      {renderPagination()}
    </div>
  );
}

export default App;
