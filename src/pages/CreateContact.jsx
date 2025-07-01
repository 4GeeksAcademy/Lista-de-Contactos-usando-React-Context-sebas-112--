import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const CreateContact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    agenda_slug: "Sebastian",
    address: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://playground.4geeks.com/contact/agendas/Sebastian/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear contacto");
        return res.json();
      })
      .then((data) => {
        console.log("Contacto creado:", data);
        navigate("/"); // Redirige al home
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add a new contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Phone</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Save
        </button>
      </form>

      <div className="mt-3">
        <NavLink to="/">or get back to contacts</NavLink>
      </div>
    </div>
  );
};

export default CreateContact;
