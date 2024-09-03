const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const ejs = require('ejs');

app.listen(3000);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'Public')));


// Path to your EJS file
const ejsFilePath = path.join(__dirname, 'Views', 'Home', 'index.ejs');

// Path to save the HTML file in the root
const outputHtmlPath = path.join(__dirname, 'index.html');

// Function to render EJS to HTML and save it to a file
function renderEJSToHTML(ejsFilePath, outputHtmlPath) {
    // Read the EJS file
    fs.readFile(ejsFilePath, 'utf-8', (err, template) => {
        if (err) {
            console.error('Error reading the EJS file:', err);
            return;
        }

        // Render the HTML using EJS
        const html = ejs.render(template, {}, {
            filename: ejsFilePath // This option is necessary for include statements
        });

        // Write the rendered HTML to the output path
        fs.writeFile(outputHtmlPath, html, (err) => {
            if (err) {
                console.error('Error writing the HTML file:', err);
            } else {
                console.log('HTML file created successfully at:', outputHtmlPath);
            }
        });
    });
}

// Execute the function
renderEJSToHTML(ejsFilePath, outputHtmlPath);


app.get('/' , (req,res) => {
    res.render('Home/index');
})