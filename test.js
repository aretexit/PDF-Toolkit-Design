const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://grmblnc:zWIS4BSBo53OTjHu@mongodb.isywpds.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB";

const user_input = document.getElementById('user_input');

// Check if API key exists in localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = localStorage.getItem('api_key');
    if (apiKey) {
        // Use the API key as needed (e.g., pre-fill input field)
        user_input.value = apiKey;
    }
});

document.getElementById('btnsub').addEventListener('click', async () => {
    console.log(user_input.value);
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const db = client.db("pdfToolkitDB");
        const coll1 = db.collection("DB_secretkey");
        const coll2 = db.collection("user_secretkey");

        const result = await coll1.findOne({ db_secretkey: user_input.value });

        if (result) {
            console.log("Secret key found: " + result.db_secretkey);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "API key is valid.",
                showConfirmButton: false,
                timer: 1500
            });

            // Check if the API key already exists in user_secretkey collection
            const existingKey = await coll2.findOne({ user_secretkey: result.db_secretkey });
            if (!existingKey) {
                const validSecret = ({ user_secretkey: result.db_secretkey });
                const result2 = await coll2.insertOne(validSecret);
                console.log("API key inserted into user_secretkey collection:", result2.insertedId);

                // Store the API key in localStorage
                localStorage.setItem('api_key', result.db_secretkey);
            } else {
                console.log("API key already exists in user_secretkey collection.");
            }
        } else {    
            console.log("Secret key not found.");
            Swal.fire({
                position: "center",
                icon: "error",
                title: "API key is NOT valid.",
                showConfirmButton: false,
                timer: 1500
            });
        }

    } finally {
        await client.close();
    }
});
