
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';
import TeamList from '../components/TeamList';
import CreateTeam from '../components/CreateTeam';

const TeamsPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            {user && user.isAdmin && (
                <>
                    <AdminDashboard />
                    <CreateTeam />
                </>
            )}
            <TeamList user={user} />
        </div>
    );
};

export default TeamsPage;
