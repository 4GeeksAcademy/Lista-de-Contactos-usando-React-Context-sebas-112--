import React from "react";

function ContactCard({ name, address, phone, email, imgUrl, onDelete, onEdit }) {
	return (
		<div className="card mb-3 shadow-sm">
			<div className="card-body d-flex align-items-center">
				<img
					src={imgUrl}
					alt="Avatar"
					className="rounded-circle me-4"
					style={{ width: "80px", height: "80px", objectFit: "cover" }}
				/>
				<div className="flex-grow-1 text-start">
					<h5 className="card-title mb-1">{name}</h5>
					<p className="mb-1"><i className="fas fa-map-marker-alt me-2"></i>{address}</p>
					<p className="mb-1"><i className="fas fa-phone me-2"></i>{phone}</p>
					<p className="mb-0"><i className="fas fa-envelope me-2"></i>{email}</p>
				</div>
				<div className="ms-3 d-flex gap-2">
					<button className="btn btn-outline-secondary" onClick={onEdit}>
						<i className="fas fa-pencil-alt"></i>
					</button>
					<button className="btn btn-outline-danger" onClick={onDelete}>
						<i className="fas fa-trash-alt"></i>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ContactCard;

