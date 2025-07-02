import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    fetch(`https://playground.4geeks.com/contact/agendas/Sebastian/contacts`)
      .then((res) => res.json())
      .then((data) => {
        const contact = data.contacts.find((c) => c.id === parseInt(id));
        if (!contact) throw new Error("Contacto no encontrado");

        setForm({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address
        });
      })
      .catch((error) => {
        console.error("Error al obtener contacto:", error);
        alert("Error al cargar el contacto.");
        navigate("/");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://playground.4geeks.com/contact/agendas/Sebastian/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar el contacto");
        return res.json();
      })
      .then((data) => {
        alert("Contacto actualizado correctamente");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error en PUT:", error);
        alert("Error al actualizar el contacto");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Editar Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Dirección</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditContact;
