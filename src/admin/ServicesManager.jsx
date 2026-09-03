import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../lib/firebase";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
} from "lucide-react";

const categories = [
  "Hair",
  "Facials",
  "Cleanup",
  "Normal Wax",
  "Milk Wax",
  "Rica Wax",
  "Aloe Vera Wax",
  "Brazilian Wax",
  "Body Polishing",
  "Pedicure",
  "Manicure",
];

const emptyForm = {
  name: "",
  price: "",
  category: "Hair",
  description: "",
};

function ServicesManager() {
  const [services, setServices] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // Fetch services
  useEffect(() => {
    const servicesQuery = query(
      collection(db, "services"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      servicesQuery,
      (snapshot) => {
        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setServices(data);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setError("Unable to load services.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const openEditForm = (service) => {
    setEditingId(service.id);

    setForm({
      name: service.name || "",
      price: service.price || "",
      category: service.category || "Hair",
      description: service.description || "",
    });

    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Service name is required.");
      return;
    }

    if (!form.price.trim()) {
      setError("Price is required.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        const serviceRef = doc(
          db,
          "services",
          editingId
        );

        await updateDoc(serviceRef, {
          name: form.name.trim(),
          price: form.price.trim(),
          category: form.category,
          description: form.description.trim(),
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "services"), {
          name: form.name.trim(),
          price: form.price.trim(),
          category: form.category,
          description: form.description.trim(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      closeForm();
    } catch (error) {
      console.error(error);
      setError("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "services", id));
    } catch (error) {
      console.error(error);
      setError("Unable to delete service.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
            Management
          </p>

          <h1 className="font-serif text-4xl">
            Services
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Add, edit and manage salon services.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="
            flex items-center justify-center gap-2
            rounded-xl
            bg-[var(--foreground)]
            px-5 py-3
            text-sm font-medium
            text-[var(--background)]
            transition
            hover:opacity-90
          "
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-60 items-center justify-center">
          <Loader2
            size={28}
            className="animate-spin text-[var(--accent)]"
          />
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-10 text-center">
          <h2 className="font-serif text-2xl">
            No services yet
          </h2>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Add your first salon service.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="
                flex flex-col gap-4
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--surface)]
                p-5
                sm:flex-row sm:items-center
                sm:justify-between
              "
            >
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs text-[var(--accent)]">
                    {service.category}
                  </span>
                </div>

                <h2 className="text-base font-medium">
                  {service.name}
                </h2>

                {service.description && (
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {service.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-5 sm:justify-end">
                <p className="font-medium">
                  {service.price}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(service)}
                    aria-label={`Edit ${service.name}`}
                    className="
                      flex h-10 w-10 items-center
                      justify-center rounded-xl
                      border border-[var(--border)]
                      transition
                      hover:bg-[var(--background)]
                    "
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(service.id)}
                    aria-label={`Delete ${service.name}`}
                    className="
                      flex h-10 w-10 items-center
                      justify-center rounded-xl
                      text-red-500
                      transition
                      hover:bg-red-500/10
                    "
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
          <div
            className="
              max-h-[90vh]
              w-full max-w-lg
              overflow-y-auto
              rounded-3xl
              border border-[var(--border)]
              bg-[var(--surface)]
              p-6
              shadow-2xl
            "
          >
            {/* Modal header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                  {editingId ? "Edit" : "Create"}
                </p>

                <h2 className="mt-1 font-serif text-2xl">
                  {editingId
                    ? "Edit Service"
                    : "Add Service"}
                </h2>
              </div>

              <button
                onClick={closeForm}
                className="rounded-xl p-2 hover:bg-[var(--background)]"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Service Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Haircut"
                  className="
                    w-full rounded-xl
                    border border-[var(--border)]
                    bg-transparent
                    px-4 py-3
                    text-sm outline-none
                    focus:border-[var(--accent)]
                  "
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl
                    border border-[var(--border)]
                    bg-[var(--surface)]
                    px-4 py-3
                    text-sm outline-none
                    focus:border-[var(--accent)]
                  "
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Price
                </label>

                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. ₹299+"
                  className="
                    w-full rounded-xl
                    border border-[var(--border)]
                    bg-transparent
                    px-4 py-3
                    text-sm outline-none
                    focus:border-[var(--accent)]
                  "
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                  <span className="ml-2 text-xs text-[var(--muted)]">
                    Optional
                  </span>
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Short description..."
                  className="
                    w-full resize-none rounded-xl
                    border border-[var(--border)]
                    bg-transparent
                    px-4 py-3
                    text-sm outline-none
                    focus:border-[var(--accent)]
                  "
                />
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="
                  flex w-full items-center
                  justify-center gap-2
                  rounded-xl
                  bg-[var(--foreground)]
                  px-5 py-3.5
                  text-sm font-medium
                  text-[var(--background)]
                  disabled:opacity-60
                "
              >
                {saving ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {editingId
                      ? "Update Service"
                      : "Save Service"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesManager;