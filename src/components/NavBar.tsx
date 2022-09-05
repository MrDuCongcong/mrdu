import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar: React.FC = function () {
    return (
        <div className="nav-bar">
            <span className="nav-bar__title">
                <Link to="/about">MrDu</Link>
            </span>
            <div className="nav-bar__tabs">
                <Link to="/blog">博客</Link>
                <Link to="/note">笔记</Link>
                <Link to="/interview">面试</Link>
            </div>
        </div>
    );
};

export default NavBar;
