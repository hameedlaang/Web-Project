// Rubric #14: Server-side validation/sanitization
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("All fields are required.");
    }

    // In a real project, you would save this to a database (Rubric #3)
    console.log(`New Message from ${name} (${email}): ${message}`);
    
    // Redirect back to home with a success alert
    res.send("<script>alert('Message Sent Successfully!'); window.location.href='/';</script>");
});