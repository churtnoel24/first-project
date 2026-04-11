// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { LogOut } from 'lucide-react';

function Navbar({ user, onClick = null }) {

    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("username");
        navigate('/login');
    }

    const links = [
        { label: 'Home', path: '/' },
        { label: 'Students', path: '/students' },
        { label: 'About', path: '/about' },
    ]


    return (
        <nav style={{
            backgroundColor: "#1F3864",
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            {/* Logo / App Name */}
            <Link to="/" style={{
                color: "#fff", fontWeight: "bold", fontSize: "20px",
                textDecoration: "none"
            }}>
                Student Portal
            </Link>

            {/* Dynamic navigation links */}
            <ul style={{ display: "flex", gap: "20px", listStyle: "none", margin: 0 }}>
                {links.map((link) => (
                    <li key={link.path}>
                        <Link to={link.path} style={{ color: "#AED6F1", textDecoration: "none" }}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* User info */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ color: "#AED6F1", fontSize: "14px" }}>
                    Welcome, {user}!
                </span>
                <Button label="Logout" variant="warning"
                    icon={<LogOut size={15} />}
                    onClick={onClick ? onClick : logout} />
            </div>
        </nav>
    );
}

export default Navbar;
