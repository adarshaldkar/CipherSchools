import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          Cipher<span>SQL</span>Studio
        </Link>
        <nav className="header__nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `header__link${isActive ? ' header__link--active' : ''}`
            }
            end
          >
            Assignments
          </NavLink>
          {user ? (
            <div className="header__user">
              <span className="header__user-name">{user.name}</span>
              <button
                className="header__link header__link--logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                `header__link header__link--auth${isActive ? ' header__link--active' : ''}`
              }
            >
              Sign In
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
