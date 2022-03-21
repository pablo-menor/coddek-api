const express = require('express');
const app = express();
const PORT = 3008;


// Middlewares
const cors = require('cors');
app.use(cors({origin: '*'}));
app.use(express.json());  

app.listen(PORT, ()=> console.log(`Server ready on port:  ${PORT}`));