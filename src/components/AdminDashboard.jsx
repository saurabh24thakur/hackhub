
import React, { useState, useEffect } from 'react';
import { getTeams, approveRequest, denyRequest, addTeamMemberByEmail } from '../services/teamService';

const AdminDashboard = () => {
    const [teams, setTeams] = useState([]);
    const [email, setEmail] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            const { data } = await getTeams();
            setTeams(data);
        };
        fetchTeams();
    }, []);

    const handleApprove = async (teamId, userId) => {
        await approveRequest(teamId, userId);
        const { data } = await getTeams();
        setTeams(data);
    };

    const handleDeny = async (teamId, userId) => {
        await denyRequest(teamId, userId);
        const { data } = await getTeams();
        setTeams(data);
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        await addTeamMemberByEmail(selectedTeam, { email });
        setEmail('');
        setSelectedTeam('');
        const { data } = await getTeams();
        setTeams(data);
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            
            <form onSubmit={handleAddMember}>
                <h3>Add Team Member</h3>
                <select onChange={(e) => setSelectedTeam(e.target.value)} value={selectedTeam}>
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                        <option key={team._id} value={team._id}>{team.name}</option>
                    ))}
                </select>
                <input 
                    type="email" 
                    placeholder="User Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button type="submit">Add Member</button>
            </form>

            {teams.map((team) => (
                <div key={team._id}>
                    <h3>{team.name}</h3>
                    <h4>Pending Requests</h4>
                    <ul>
                        {team.pendingMembers.map((user) => (
                            <li key={user._id}>
                                {user.name} ({user.email})
                                <button onClick={() => handleApprove(team._id, user._id)}>Approve</button>
                                <button onClick={() => handleDeny(team._id, user._id)}>Deny</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AdminDashboard;
