function Admin() {
  return (
    <div className="admin-page">
      <h1>Kaira Admin Panel</h1>

      <p>
        Manage your salon website from one place.
      </p>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>Gallery</h2>
          <p>Add or remove salon photos and videos.</p>
        </div>

        <div className="admin-card">
          <h2>Services</h2>
          <p>Update services, categories and prices.</p>
        </div>

        <div className="admin-card">
          <h2>Reviews</h2>
          <p>Approve or decline customer reviews.</p>
        </div>
      </div>
    </div>
  );
}

export default Admin;