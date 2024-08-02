const express = require('express');
const app = express();
const port = 3000;
let user_id=null,email=null,roll_number=null;
let login=false;
app.use(express.json());
app.post('/signup',(req,res)=>{
  const data=req.body;
  user_id=data.user_id;
  email=data.email;
  roll_number=data.roll_number;
  res.status(200).json({"signup":"sucessful"})
})
app.post("/signin",(req,res)=>{
  const data=req.body;
  if(user_id==data.user_id && email==data.email && roll_number==data.roll_number){
    login=true;
    res.status(200).json({"login":"sucessful"});
  }
  res.status(401).json({"message":"incorrect credentials"})
})

app.post('/bfhl', (req, res) => {
  if(!login){
    res.status(401).json({"message":"invalid Authentication"})
  }
  const { data } = req.body;

  if (!Array.isArray(data)) {
       res.status(400).json({ error: 'Invalid input format' });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
  
  const highestAlphabet = alphabets.length > 0 
      ? alphabets.reduce((highest, current) => 
          current.toUpperCase() > highest.toUpperCase() ? current : highest
      ) 
      : null;
  
  res.status(200).json({
      is_success: true,
      user_id: user_id,
      email: email,
      roll_number: roll_number,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highestAlphabet ? [highestAlphabet] : []
  });
});


app.get('/bfhl', (req, res) => {
  if(!login){
    res.status(401).json({"message":"invalid Authentication"})
  }
    res.status(200).json({ operation_code:1 });
});

app.listen(port, () => {
    console.log("Server is running on http://localhost:${port}");
});