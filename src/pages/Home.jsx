import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import ContactCard from "../components/CardContact.jsx";
import { useState, useEffect } from "react";

export const Home = () => {
	const [contactList, setContactList] = useState([]);
	const { store, dispatch } = useGlobalReducer();
	const urlApi = "https://playground.4geeks.com";
	const navigate = useNavigate();

	// Obtener lista de contactos
	function getContact() {
		fetch(urlApi + "/contact/agendas/Sebastian/contacts", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => response.json())
			.then((data) => setContactList(data.contacts))
			.catch((error) => console.log(error));
	}

	// Eliminar contacto con confirmación
	function deleteContact(id) {
		if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
			fetch(`${urlApi}/contact/${id}`, {
				method: "DELETE"
			})
				.then((res) => {
					if (res.ok) {
						getContact(); // actualiza lista
					}
				})
				.catch((err) => console.log(err));
		}
	}

	// Ir a editar
	function handleEditContact(id) {
		navigate(`/edit-contact/${id}`);
	}

	useEffect(() => {
		getContact();
	}, []);

	return (
		<div className="container mt-4">
			<div className="d-flex justify-content-end mb-3">
				<NavLink className="btn btn-success" to="/create-contact">
					Add new contact
				</NavLink>
			</div>

			{contactList.map((items) => (
				<ContactCard
					key={items.id}
					name={items.name}
					address={items.address}
					phone={items.phone}
					email={items.email}
					imgUrl={rigoImageUrl}
					onDelete={() => deleteContact(items.id)}
					onEdit={() => handleEditContact(items.id)}
				/>
			))}
		</div>
	);
};
