import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

import { db } from "../lib/firebase";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  Upload,
  CheckCircle2,
} from "lucide-react";

// ======================================================
// CATEGORIES
// ======================================================

const categories = [
  "Hair",
  "Facials",
  "Package",
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

// ======================================================
// EMPTY FORM
// ======================================================

const emptyForm = {
  name: "",
  price: "",
  category: "Hair",
  description: "",
};

// ======================================================
// BULK PRICE LIST
// ======================================================

const priceList = [
  // ====================================================
  // 1. MILK WAX
  // ====================================================

  {
    name: "Full Arms",
    price: "₹300",
    category: "Milk Wax",
  },
  {
    name: "Full Legs",
    price: "₹400",
    category: "Milk Wax",
  },
  {
    name: "Half Legs",
    price: "₹300",
    category: "Milk Wax",
  },
  {
    name: "Full Tummy",
    price: "₹650",
    category: "Milk Wax",
  },
  {
    name: "Full Back",
    price: "₹650",
    category: "Milk Wax",
  },
  {
    name: "Half Tummy",
    price: "₹300",
    category: "Milk Wax",
  },
  {
    name: "Half Back",
    price: "₹300",
    category: "Milk Wax",
  },
  {
    name: "Full Body",
    price: "₹2,000",
    category: "Milk Wax",
  },
  {
    name: "V Wax",
    price: "₹1,000",
    category: "Milk Wax",
  },

  // ====================================================
  // 2. RICA WAX
  // ====================================================

  {
    name: "Full Arms",
    price: "₹400",
    category: "Rica Wax",
  },
  {
    name: "Full Legs",
    price: "₹600",
    category: "Rica Wax",
  },
  {
    name: "Half Legs",
    price: "₹400",
    category: "Rica Wax",
  },
  {
    name: "Full Tummy",
    price: "₹700",
    category: "Rica Wax",
  },
  {
    name: "Full Back",
    price: "₹700",
    category: "Rica Wax",
  },
  {
    name: "Half Tummy",
    price: "₹400",
    category: "Rica Wax",
  },
  {
    name: "Half Back",
    price: "₹400",
    category: "Rica Wax",
  },
  {
    name: "Full Body",
    price: "₹2,500",
    category: "Rica Wax",
  },
  {
    name: "V Wax",
    price: "₹1,200",
    category: "Rica Wax",
  },

  // ====================================================
  // 3. BODY POLISHING
  // ====================================================

  {
    name: "Basic",
    price: "₹2,000",
    category: "Body Polishing",
  },
  {
    name: "Ozone",
    price: "₹2,500",
    category: "Body Polishing",
  },
  {
    name: "Aroma",
    price: "₹3,500",
    category: "Body Polishing",
  },
  {
    name: "Advance Polishing",
    price: "₹4,000",
    category: "Body Polishing",
  },

  // ====================================================
  // 4. PEDICURE
  // ====================================================

  {
    name: "Basic",
    price: "₹400",
    category: "Pedicure",
  },
  {
    name: "Deluxe",
    price: "₹700",
    category: "Pedicure",
  },
  {
    name: "Raaga",
    price: "₹1,000",
    category: "Pedicure",
  },
  {
    name: "Pedipie",
    price: "₹1,200",
    category: "Pedicure",
  },
  {
    name: "Ozone",
    price: "₹1,500",
    category: "Pedicure",
  },
  {
    name: "Kiana",
    price: "₹1,500",
    category: "Pedicure",
  },
  {
    name: "Blossom Kochar",
    price: "₹1,500",
    category: "Pedicure",
  },

  // ====================================================
  // 5. MANICURE
  // ====================================================

  {
    name: "Basic",
    price: "₹300",
    category: "Manicure",
  },
  {
    name: "Deluxe",
    price: "₹500",
    category: "Manicure",
  },
  {
    name: "Raaga",
    price: "₹800",
    category: "Manicure",
  },
  {
    name: "Pedipie",
    price: "₹1,000",
    category: "Manicure",
  },
  {
    name: "Ozone",
    price: "₹1,200",
    category: "Manicure",
  },
  {
    name: "Kiana",
    price: "₹1,200",
    category: "Manicure",
  },
  {
    name: "Blossom Kochar",
    price: "₹1,200",
    category: "Manicure",
  },

  // ====================================================
  // 6. BRAZILIAN WAX
  // ====================================================

  {
    name: "Eyebrows",
    price: "₹50",
    category: "Brazilian Wax",
  },
  {
    name: "Upper Lips",
    price: "₹50",
    category: "Brazilian Wax",
  },
  {
    name: "Chin",
    price: "₹50",
    category: "Brazilian Wax",
  },
  {
    name: "Forehead",
    price: "₹50",
    category: "Brazilian Wax",
  },
  {
    name: "Side Locks",
    price: "₹100",
    category: "Brazilian Wax",
  },
  {
    name: "Full Face",
    price: "₹500",
    category: "Brazilian Wax",
  },
  {
    name: "Nose",
    price: "₹50",
    category: "Brazilian Wax",
  },
  {
    name: "V Wax",
    price: "₹1,500",
    category: "Brazilian Wax",
  },

  // ====================================================
  // 7. FACIALS
  // ====================================================

  {
    name: "Fruit Facial",
    price: "₹600",
    category: "Facials",
  },
  {
    name: "VLCC Facial",
    price: "₹1,000",
    category: "Facials",
  },
  {
    name: "Twacha Facial",
    price: "₹1,500",
    category: "Facials",
  },
  {
    name: "Raaga Facial",
    price: "₹1,500",
    category: "Facials",
  },
  {
    name: "Oxy Life Facial",
    price: "₹1,800",
    category: "Facials",
  },
  {
    name: "O3+ Facial",
    price: "₹2,000",
    category: "Facials",
  },
  {
    name: "Nature's Vitamin C",
    price: "₹2,500",
    category: "Facials",
  },
  {
    name: "Hydra Facial",
    price: "₹2,500",
    category: "Facials",
  },
  {
    name: "Casmara Facial",
    price: "₹3,000",
    category: "Facials",
  },

  // ====================================================
  // 8. CLEANUP
  // ====================================================

  {
    name: "Fruit Cleanup",
    price: "₹400",
    category: "Cleanup",
  },
  {
    name: "VLCC Cleanup",
    price: "₹700",
    category: "Cleanup",
  },
  {
    name: "Twacha Cleanup",
    price: "₹1,100",
    category: "Cleanup",
  },
  {
    name: "Raaga Cleanup",
    price: "₹1,100",
    category: "Cleanup",
  },
  {
    name: "Oxy Life Cleanup",
    price: "₹1,500",
    category: "Cleanup",
  },
  {
    name: "O3+ Cleanup",
    price: "₹1,800",
    category: "Cleanup",
  },
  {
    name: "Hydra Cleanup",
    price: "₹2,000",
    category: "Cleanup",
  },

  // ====================================================
  // 9. NORMAL WAX
  // ====================================================

  {
    name: "Full Arms",
    price: "₹200",
    category: "Normal Wax",
  },
  {
    name: "Full Legs",
    price: "₹300",
    category: "Normal Wax",
  },
  {
    name: "Half Legs",
    price: "₹200",
    category: "Normal Wax",
  },
  {
    name: "Full Tummy",
    price: "₹500",
    category: "Normal Wax",
  },
  {
    name: "Full Back",
    price: "₹500",
    category: "Normal Wax",
  },
  {
    name: "Half Tummy",
    price: "₹250",
    category: "Normal Wax",
  },
  {
    name: "Half Back",
    price: "₹250",
    category: "Normal Wax",
  },
  {
    name: "Full Body",
    price: "₹1,500",
    category: "Normal Wax",
  },
  {
    name: "V Wax",
    price: "₹800",
    category: "Normal Wax",
  },

  // ====================================================
  // 10. ALOE VERA WAX
  // ====================================================

  {
    name: "Full Arms",
    price: "₹250",
    category: "Aloe Vera Wax",
  },
  {
    name: "Full Legs",
    price: "₹350",
    category: "Aloe Vera Wax",
  },
  {
    name: "Half Legs",
    price: "₹250",
    category: "Aloe Vera Wax",
  },
  {
    name: "Full Tummy",
    price: "₹600",
    category: "Aloe Vera Wax",
  },
  {
    name: "Full Back",
    price: "₹600",
    category: "Aloe Vera Wax",
  },
  {
    name: "Half Tummy",
    price: "₹300",
    category: "Aloe Vera Wax",
  },
  {
    name: "Half Back",
    price: "₹300",
    category: "Aloe Vera Wax",
  },
  {
    name: "Full Body",
    price: "₹1,800",
    category: "Aloe Vera Wax",
  },
  {
    name: "V Wax",
    price: "₹900",
    category: "Aloe Vera Wax",
  },
  {
    name:"Hair-Extensions (20-36 inches)",
    price:"₹7000-₹20000",
    category:"Package"
  },
  {
    name:"Combo (Facial,Bleach,Hand wax,Half leg Wax, Threading,Forhead,Upperlips",
    price:"₹1499",
    category:"Package"
  },

  {
    name:"Pre Bridal Service",
    price:"₹9999-₹19999",
    category:"Package"
  }

];

// ======================================================
// HELPER
// ======================================================

const normalizeText = (value = "") => {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
};

// ======================================================
// COMPONENT
// ======================================================

function ServicesManager() {
  const [services, setServices] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [importing, setImporting] = useState(false);

  const [importMessage, setImportMessage] = useState("");

  const [error, setError] = useState("");

  // ====================================================
  // FETCH SERVICES
  // ====================================================

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

  // ====================================================
  // HANDLE INPUT
  // ====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ====================================================
  // OPEN ADD FORM
  // ====================================================

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setImportMessage("");
    setShowForm(true);
  };

  // ====================================================
  // OPEN EDIT FORM
  // ====================================================

  const openEditForm = (service) => {
    setEditingId(service.id);

    setForm({
      name: service.name || "",
      price: service.price || "",
      category: service.category || "Hair",
      description: service.description || "",
    });

    setError("");
    setImportMessage("");
    setShowForm(true);
  };

  // ====================================================
  // CLOSE FORM
  // ====================================================

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  // ====================================================
  // ADD / EDIT SERVICE
  // ====================================================

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
        const serviceRef = doc(db, "services", editingId);

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

  // ====================================================
  // DELETE SERVICE
  // ====================================================

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

  // ====================================================
  // BULK IMPORT
  // ====================================================

  const handleBulkImport = async () => {
    if (importing) return;

    const confirmed = window.confirm(
      `This will import ${priceList.length} services from the Kaira Salon price list.\n\n` +
        "Existing services will NOT be duplicated.\n\n" +
        "Do you want to continue?"
    );

    if (!confirmed) return;

    try {
      setImporting(true);
      setError("");
      setImportMessage("");

      // -----------------------------------------------
      // GET EXISTING SERVICES
      // -----------------------------------------------

      const existingSnapshot = await getDocs(
        collection(db, "services")
      );

      const existingKeys = new Set();

      existingSnapshot.forEach((item) => {
        const data = item.data();

        const key = `${normalizeText(data.name)}__${normalizeText(
          data.category
        )}`;

        existingKeys.add(key);
      });

      // -----------------------------------------------
      // FILTER DUPLICATES
      // -----------------------------------------------

      const servicesToImport = priceList.filter((service) => {
        const key = `${normalizeText(service.name)}__${normalizeText(
          service.category
        )}`;

        if (existingKeys.has(key)) {
          return false;
        }

        // Also protect against duplicate entries
        // inside the same import list.
        existingKeys.add(key);

        return true;
      });

      // -----------------------------------------------
      // NOTHING TO IMPORT
      // -----------------------------------------------

      if (servicesToImport.length === 0) {
        setImportMessage(
          "All price-list services are already in Firestore."
        );

        return;
      }

      // -----------------------------------------------
      // FIRESTORE BATCH
      // -----------------------------------------------

      const batch = writeBatch(db);

      servicesToImport.forEach((service) => {
        const serviceRef = doc(collection(db, "services"));

        batch.set(serviceRef, {
          name: service.name,
          price: service.price,
          category: service.category,
          description: "",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      });

      await batch.commit();

      setImportMessage(
        `${servicesToImport.length} services imported successfully.`
      );
    } catch (error) {
      console.error("Bulk import error:", error);

      setError(
        "Unable to import services. Please check your Firebase permissions."
      );
    } finally {
      setImporting(false);
    }
  };

  // ====================================================
  // UI
  // ====================================================

  return (
    <div>
      {/* ==================================================
          HEADER
      ================================================== */}

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

        <div className="flex flex-col gap-2 sm:flex-row">
          {/* BULK IMPORT */}

          <button
            onClick={handleBulkImport}
            disabled={importing}
            className="
              flex items-center justify-center gap-2
              rounded-xl
              border border-[var(--border)]
              bg-[var(--surface)]
              px-5 py-3
              text-sm font-medium
              transition
              hover:bg-[var(--background)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {importing ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Upload size={18} />
            )}

            {importing
              ? "Importing..."
              : "Import Price List"}
          </button>

          {/* ADD SERVICE */}

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
      </div>

      {/* ==================================================
          IMPORT SUCCESS MESSAGE
      ================================================== */}

      {importMessage && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0"
          />

          <p>{importMessage}</p>
        </div>
      )}

      {/* ==================================================
          ERROR
      ================================================== */}

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* ==================================================
          LOADING / EMPTY / LIST
      ================================================== */}

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
            Add your first salon service or import the
            price list.
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
              {/* SERVICE INFO */}

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

              {/* PRICE + ACTIONS */}

              <div className="flex items-center justify-between gap-5 sm:justify-end">
                <p className="font-medium">
                  {service.price}
                </p>

                <div className="flex gap-2">
                  {/* EDIT */}

                  <button
                    onClick={() =>
                      openEditForm(service)
                    }
                    aria-label={`Edit ${service.name}`}
                    className="
                      flex h-10 w-10 items-center
                      justify-center
                      rounded-xl
                      border border-[var(--border)]
                      transition
                      hover:bg-[var(--background)]
                    "
                  >
                    <Pencil size={16} />
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      handleDelete(service.id)
                    }
                    aria-label={`Delete ${service.name}`}
                    className="
                      flex h-10 w-10 items-center
                      justify-center
                      rounded-xl
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

      {/* ==================================================
          ADD / EDIT MODAL
      ================================================== */}

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
            {/* MODAL HEADER */}

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

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* NAME */}

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

              {/* CATEGORY */}

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

              {/* PRICE */}

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

              {/* DESCRIPTION */}

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
                    w-full resize-none
                    rounded-xl
                    border border-[var(--border)]
                    bg-transparent
                    px-4 py-3
                    text-sm outline-none
                    focus:border-[var(--accent)]
                  "
                />
              </div>

              {/* ERROR */}

              {error && (
                <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
                  {error}
                </div>
              )}

              {/* SUBMIT */}

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