
import React, { useState, useEffect } from 'react';
import { getTeams, approveRequest, denyRequest, addTeamMemberByEmail } from '../services/teamService';

const AdminDashboard = () => {
    const [teams, setTeams] = useState([]);
    const [email, setEmail] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            try {
                const { data } = await getTeams();
                setTeams(data);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    const handleApprove = async (teamId, userId) => {
        setLoading(true);
        try {
            await approveRequest(teamId, userId);
            const { data } = await getTeams();
            setTeams(data);
        } catch (error) {
            console.error("Failed to approve request:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeny = async (teamId, userId) => {
        setLoading(true);
        try {
            await denyRequest(teamId, userId);
            const { data } = await getTeams();
            setTeams(data);
        } catch (error) {
            console.error("Failed to deny request:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addTeamMemberByEmail(selectedTeam, { email });
            setEmail('');
            setSelectedTeam('');
            const { data } = await getTeams();
            setTeams(data);
        } catch (error) {
            console.error("Failed to add member:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }


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
