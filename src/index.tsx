import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AboutMe from './pages/AboutMe';
import Blog from './pages/Blog';
import Note from './pages/Note';
import Interview from './pages/Interview';
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="about" element={<AboutMe />}></Route>
                    <Route path="blog" element={<Blog />}></Route>
                    <Route path="note" element={<Note />}></Route>
                    <Route path="interview" element={<Interview />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root') as HTMLElement
);
