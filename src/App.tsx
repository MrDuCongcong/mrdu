import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <div className="app">
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default App;
