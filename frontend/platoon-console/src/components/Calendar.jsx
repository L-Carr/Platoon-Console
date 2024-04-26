import React, { useEffect } from 'react';
import axios from 'axios';

const GoogleApiInitializer = () => {
    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const response = await axios.get('https://localhost:8000/calendar/google-credentials/');
                if (response.status === 200) {
                    const { apiKey, clientId } = response.data;
                    initializeGoogleApi(apiKey, clientId);
                } else {
                    console.error('Failed to fetch credentials:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching Google credentials:', error);
            }
        };

        fetchCredentials();
    }, []);

    const initializeGoogleApi = (apiKey, clientId) => {
        console.log('Initializing Google API...');
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
            window.gapi.load('client:auth2', async () => {
                try {
                    await window.gapi.client.init({
                        apiKey: apiKey,
                        clientId: clientId,
                        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                        scope: 'https://www.googleapis.com/auth/calendar'
                    });

                    console.log('Google API initialized successfully');
                    // Here, you might update state or context to indicate API is ready
                } catch (error) {
                    console.error('Error initializing the Google API:', error);
                }
            });
        };
        document.body.appendChild(script);
    };

    return (
        <div>
            <h1>Google Calendar Integration</h1>
            <p>Check the console for Google API initialization status.</p>
        </div>
    );
};

export default GoogleApiInitializer;