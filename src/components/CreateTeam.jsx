
import React, { useState } from 'react';
import { createTeam } from '../services/teamService';

const CreateTeam = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTeam({ name });
        setName('');
        // Refresh teams list or redirect
    };

    return (
        <form onSubmit={handleSubmit} className=' dark:bg-dark-card'>
            <h3>Create New Team</h3>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Team Name"
            />
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateTeam;
