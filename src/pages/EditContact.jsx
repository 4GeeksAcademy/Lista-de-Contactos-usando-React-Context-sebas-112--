import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditContact = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		email: "",
		address: "",
		phone: ""
	});

	useEffect(() => {
		fetch(`https://playground.4geeks.com/contact/agendas/Sebastian/contacts/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setForm({
					name: data.full_name || "",
					email: data.email || "",
					address: data.address || "",
					phone: data.phone || ""
				});
			})
			.catch((error) => console.error("Error fetching contact:", error));
	}, [id]);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch(`https://playground.4geeks.com/contact/agendas/Sebastian/contacts/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				full_name: form.name,
				email: form.email,
				agenda_slug: "Sebastian",
				address: form.address,
				phone: form.phone
			})
		})
			.then((res) => {
				if (res.ok) {
					alert("Contacto actualizado correctamente");
					navigate("/");
				} else {
					alert("Error al actualizar el contacto");
				}
			})
			.catch((error) => console.error("Error en PUT:", error));
	};

	return (
		<div className="container mt-5">
			<h2>Editar Contacto</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Nombre</label>
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
					<label className="form-label">Email</label>
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
					<label className="form-label">Teléfono</label>
					<input
						type="text"
						className="form-control"
						name="phone"
						value={form.phone}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Dirección</label>
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