
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeamsPage from './pages/TeamsPage';
import { AuthContext } from './context/AuthContext';

const App = () => {
    // Placeholder user data
    const user = {
        _id: 'user_id_1',
        name: 'Test User',
        email: 'test@example.com',
        isAdmin: true, // Set to false to see the user view
    };

    return (
        <AuthContext.Provider value={{ user }}>
            <Router>
                <Switch>
                    <Route path="/teams" component={TeamsPage} />
                    {/* Add other routes here */}
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
