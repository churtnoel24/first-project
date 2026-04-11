import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, UserPlus, LogOut, X } from 'lucide-react';
import { FaSave, FaUserGraduate } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import Button from '../components/Button';
import Modal from '../components/Modal';
import FormInput from '../components/FormInput';
import { API_BASE } from '../utils/api';
import Navbar from '../components/Navbar';

const COURSES = ["BSIT", "BSCS", "BSCS-EMC DAT", "BSEMC-GD"];
const YEARS = [1, 2, 3, 4];
const BLOCKS = ["A", "B", "C", "D"];

const EMPTY_FORM = {
    student_id: "", name: "", course: "", year: "", block: "", customBlock: "",
}

function StudentForm({
    isAdd,
    form,
    errors,
    handleChange,
    setForm,
    setErrors,
    COURSES,
    YEARS,
    BLOCKS
}) {
    if (!form) return null;
    return (
        <div>

            {isAdd && (
                <FormInput
                    label="Student ID"
                    name="student_id"
                    value={form.student_id}
                    onChange={handleChange}
                    placeholder="e.g. 230001 (6 digits)"
                    error={errors.student_id}
                    required
                />
            )}

            {!isAdd && (
                <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                        Student ID
                    </label>

                    <p style={{
                        padding: "10px 14px",
                        background: "#f4f4f4",
                        borderRadius: "6px",
                        margin: "6px 0 0"
                    }}>
                        {form.student_id}
                    </p>

                    <small style={{ color: "#888" }}>
                        Student ID cannot be changed.
                    </small>
                </div>
            )}

            <FormInput
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Maria Santos"
                error={errors.name}
                required
            />

            {/* Course */}
            <div style={{ marginBottom: "16px" }}>
                <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                    Course <span style={{ color: "#C0392B" }}>*</span>
                </label>

                <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: errors.course
                            ? "2px solid #C0392B"
                            : "1px solid #AED6F1",
                        marginTop: "6px",
                        fontSize: "14px"
                    }}
                >
                    <option value="">-- Select Course --</option>

                    {COURSES.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                {errors.course &&
                    <span style={{ color: "#C0392B", fontSize: "12px" }}>
                        {errors.course}
                    </span>
                }
            </div>

            {/* Year */}
            <div style={{ marginBottom: "16px" }}>
                <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                    Year Level <span style={{ color: "#C0392B" }}>*</span>
                </label>

                <select
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: errors.year
                            ? "2px solid #C0392B"
                            : "1px solid #AED6F1",
                        marginTop: "6px",
                        fontSize: "14px"
                    }}
                >
                    <option value="">-- Select Year --</option>

                    {YEARS.map(y => (
                        <option key={y} value={y}>
                            Year {y}
                        </option>
                    ))}
                </select>

                {errors.year &&
                    <span style={{ color: "#C0392B", fontSize: "12px" }}>
                        {errors.year}
                    </span>
                }
            </div>

            {/* Block */}
            <div style={{ marginBottom: "16px" }}>
                <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                    Block <span style={{ color: "#C0392B" }}>*</span>
                </label>

                <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>

                    <select
                        name="block"
                        value={form.block}
                        onChange={handleChange}
                        style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #AED6F1",
                            fontSize: "14px"
                        }}
                    >
                        <option value="">-- A, B, C, D --</option>

                        {BLOCKS.map(b => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>

                    <input
                        name="customBlock"
                        value={form.customBlock}
                        onChange={(e) => {
                            const val = e.target.value
                                .replace(/[^A-Z]/g, "")
                                .slice(0, 5);

                            setForm(prev => ({
                                ...prev,
                                customBlock: val
                            }));

                            setErrors(prev => ({
                                ...prev,
                                block: ""
                            }));
                        }}
                        placeholder="Custom (A-Z)"
                        maxLength={5}
                        style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "6px",
                            border: errors.block
                                ? "2px solid #C0392B"
                                : "1px solid #AED6F1",
                            fontSize: "14px"
                        }}
                    />

                </div>

                <small style={{ color: "#888" }}>
                    Pick from dropdown OR type a custom block
                </small>

                {errors.block &&
                    <span style={{
                        color: "#C0392B",
                        fontSize: "12px",
                        display: "block"
                    }}>
                        {errors.block}
                    </span>
                }
            </div>

        </div>


    );
}

function HomePage() {
    const navigate = useNavigate();

    //Data
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    //Modals
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    //form
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [selected, setSelected] = useState(null); // student being edited/deleted 

    //feedback
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchStudents();

        const user = localStorage.getItem("username");
        if (!user) navigate("/login");
    }, [navigate]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/students.php`);
            const json = await res.json();
            if (json.success) setStudents(json.data);
        } catch (err) {
            setMessage(`Failed to load students. Is server running? ${err}`);
        } finally {
            setLoading(false);
        }
    }

    //form helpers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    // Resolve final block value: customBlock overrides dropdown
    const resolveBlock = () =>
        form.customBlock.trim() !== "" ? form.customBlock.trim() : form.block;

    const validate = (isAdd = true) => {
        const errs = {};
        if (isAdd && !/^[0-9]{6}$/.test(form.student_id))
            errs.student_id = "Student ID must be exactly 6 digits.";
        if (!/^[a-zA-Z\s]+$/.test(form.name.trim()) || !form.name.trim())
            errs.name = "Name must contain letters only — no numbers.";
        if (!form.course)
            errs.course = "Please select a course.";
        if (!form.year)
            errs.year = "Please select a year.";
        const block = resolveBlock();
        if (!/^[A-Z]{1,5}$/.test(block))
            errs.block = "Block must be capital letters only (max 5 chars).";
        return errs;
    };

    //ADD
    const handleAdd = async () => {
        const errs = validate(true);
        if (Object.keys(errs).length) { setErrors(errs); return; }

        const body = { ...form, block: resolveBlock() };
        delete body.customBlock;

        const res = await fetch(`${API_BASE}/students.php`, {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const json = await res.json();
        if (json.success) {
            setMessage("Student added successfully!");
            setShowAdd(false);
            setForm(EMPTY_FORM);
            fetchStudents();
        } else {
            setErrors({ student_id: json.message });
        }
    };

    // ── EDIT ─────────────────────────────────────────────────────────
    const openEdit = (student) => {
        setSelected(student);
        setForm({
            student_id: student.student_id, // read-only in the form
            name: student.name,
            course: student.course,
            year: student.year,
            block: BLOCKS.includes(student.block) ? student.block : "",
            customBlock: BLOCKS.includes(student.block) ? "" : student.block,
        });
        setErrors({});
        setShowEdit(true);
    };

    const handleEdit = async () => {
        const errs = validate(false);
        if (Object.keys(errs).length) { setErrors(errs); return; }

        const res = await fetch(`${API_BASE}/students.php`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: selected.id, name: form.name, course: form.course,
                year: form.year, block: resolveBlock(),
            }),
        });
        const json = await res.json();
        if (json.success) {
            setMessage("Student updated successfully!");
            setShowEdit(false); fetchStudents();
        } else { setErrors({ name: json.message }); }
    };

    // ── DELETE ───────────────────────────────────────────────────────
    const openDelete = (student) => { setSelected(student); setShowDelete(true); };

    const handleDelete = async () => {
        const res = await fetch(`${API_BASE}/students.php`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: selected.id }),
        });
        const json = await res.json();
        if (json.success) {
            setMessage("Student deleted.");
            setShowDelete(false); fetchStudents();
        }
    };

    // ── LOGOUT ──────────────────────────────────────────────────────
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("user_id");
        navigate("/login");
    };


    const username = localStorage.getItem("username") || "User";

    return (
        <div style={{
            fontFamily: "Arial, sans-serif", minHeight: "100vh",
            backgroundColor: "#F0F4F8"
        }}>

            {/* ── Navbar ── */}
            <Navbar user={username} onClick={() => setShowLogout(true)} />

            {/* ── Main Content ── */}
            <main style={{ padding: "28px" }}>
                {message && (
                    <div style={{
                        backgroundColor: "#D4EFDF", color: "#1A6B3A",
                        padding: "12px 18px", borderRadius: "8px", marginBottom: "16px",
                        display: "flex", justifyContent: "space-between"
                    }}>
                        <span>{message}</span>
                        <button onClick={() => setMessage("")}
                            style={{
                                background: "none", border: "none", cursor: "pointer",
                                fontSize: "16px", color: "#1A6B3A"
                            }}>x</button>
                    </div>
                )}

                <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginBottom: "20px"
                }}>
                    <h1 style={{ margin: 0, color: "#1F3864" }}>Student Records</h1>
                    <Button label="Add Student" variant="success"
                        icon={<UserPlus size={16} />}
                        onClick={() => {
                            setForm(EMPTY_FORM); setErrors({});
                            setShowAdd(true);
                        }} />
                </div>

                {/* ── Students Table ── */}
                {loading ? <p>Loading students...</p> : (
                    <div style={{ overflowX: "auto" }}>
                        <table style={{
                            width: "100%", borderCollapse: "collapse",
                            backgroundColor: "#fff", borderRadius: "10px",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.07)"
                        }}>
                            <thead>
                                <tr style={{ backgroundColor: "#1F3864", color: "#fff" }}>
                                    {["Student ID", "Name", "Course", "Year", "Block", "Actions"]
                                        .map(h => (
                                            <th key={h} style={{
                                                padding: "12px 16px", textAlign: "left",
                                                fontSize: "14px"
                                            }}>{h}</th>
                                        ))}
                                </tr>
                            </thead>
                            <tbody>
                                {students.length === 0 ? (
                                    <tr><td colSpan={6} style={{
                                        padding: "24px",
                                        textAlign: "center", color: "#888"
                                    }}>
                                        No students found. Click "Add Student" to get started.
                                    </td></tr>
                                ) : students.map((s, i) => (
                                    <tr key={s.id}
                                        style={{
                                            backgroundColor: i % 2 === 0 ? "#fff" : "#EBF5FB",
                                            borderBottom: "1px solid #AED6F1"
                                        }}>
                                        <td style={{ padding: "12px 16px", fontSize: "14px" }}>
                                            {s.student_id}</td>
                                        <td style={{ padding: "12px 16px", fontSize: "14px" }}>
                                            {s.name}</td>
                                        <td style={{ padding: "12px 16px", fontSize: "14px" }}>
                                            {s.course}</td>
                                        <td style={{ padding: "12px 16px", fontSize: "14px" }}>
                                            Year {s.year}</td>
                                        <td style={{ padding: "12px 16px", fontSize: "14px" }}>
                                            {s.block}</td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <div style={{ display: "flex", gap: "8px" }}>
                                                <Button label="Edit" variant="primary"
                                                    icon={<Pencil size={13} />}
                                                    onClick={() => openEdit(s)} />
                                                <Button label="Delete" variant="danger"
                                                    icon={<Trash2 size={13} />}
                                                    onClick={() => openDelete(s)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
            {/* ── ADD MODAL ── */}
            <Modal
                isOpen={showAdd}
                title="Add New Student"
                onClose={() => setShowAdd(false)}
                onConfirm={handleAdd}
                confirmLabel="Add Student"
                confirmVariant="success"
                confirmIcon={<FaSave size={14} />}
                cancelIcon={<MdCancel size={16} />}
            >
                <StudentForm
                    isAdd={true}
                    form={form}
                    errors={errors}
                    handleChange={handleChange}
                    setForm={setForm}
                    setErrors={setErrors}
                    COURSES={COURSES}
                    YEARS={YEARS}
                    BLOCKS={BLOCKS}
                />
            </Modal>

            {/* ── EDIT MODAL ── */}
            <Modal
                isOpen={showEdit}
                title={`Edit Student — ${selected?.student_id}`}
                onClose={() => setShowEdit(false)}
                onConfirm={handleEdit}
                confirmLabel="Save Changes"
                confirmVariant="primary"
                confirmIcon={<FaSave size={14} />}
                cancelIcon={<MdCancel size={16} />}
            >
                <StudentForm
                    isAdd={false}
                    form={form}
                    errors={errors}
                    handleChange={handleChange}
                    setForm={setForm}
                    setErrors={setErrors}
                    COURSES={COURSES}
                    YEARS={YEARS}
                    BLOCKS={BLOCKS}
                />
            </Modal>

            {/* ── DELETE MODAL ── */}
            <Modal
                isOpen={showDelete}
                title="Confirm Deletion"
                onClose={() => setShowDelete(false)}
                onConfirm={handleDelete}
                confirmLabel="Yes, Delete"
                confirmVariant="danger"
                confirmIcon={<Trash2 size={14} />}
                cancelIcon={<MdCancel size={16} />}
            >
                <p style={{ fontSize: "15px" }}>
                    Are you sure you want to delete
                    <strong> {selected?.name} </strong>
                    ({selected?.student_id})?
                </p>
                <p style={{ color: "#C0392B", fontSize: "13px" }}>
                    This action cannot be undone.
                </p>
            </Modal>

            {/* ── LOGOUT MODAL ── */}
            <Modal
                isOpen={showLogout}
                title="Confirm Logout"
                onClose={() => setShowLogout(false)}
                onConfirm={handleLogout}
                confirmLabel="Yes, Logout"
                confirmVariant="warning"
                confirmIcon={<LogOut size={14} />}
                cancelIcon={<MdCancel size={16} />}
            >
                <p style={{ fontSize: "15px" }}>
                    Are you sure you want to logout, <strong>{username}</strong>?
                </p>
                <p style={{ color: "#888", fontSize: "13px" }}>
                    Your session will be cleared from this browser.
                </p>
            </Modal>

        </div>  // end root div
    );        // end return
}            // end HomePage

export default HomePage;




