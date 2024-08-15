import 'dotenv/config'
import express from "express"
import logger from "./logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";

const app = express()
const port = process.env.PORT

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

app.use(express.json())

let data = [
    {
        "id":1,
    "name":"adwiya",
    "price":"$2"
},
{
    "id":2,
"name":"adwiya",
"price":"$2"
},
{
    "id":3,
"name":"adwiya",
"price":"$2"
}
]
let nextId = 4

app.post('/data' ,(req , res) => {
    const {name , price} = req.body
    const newTea = {id: nextId++ , name , price}
    data.push(newTea)
    res.status(201).send(data)
    
} )

app.get('/data/:id' , (req , res) => {
    const tea = data.find(t => {
        t.id === parseInt(req.params.id)
    })
    if(!tea){
        res.status(404)
    }else{
        res.status(200).send(tea)
    }
})

app.put('/data/:id' , (req , res) => {
    console.log(data)
    let tea = data.find(t =>t.id == req.params.id)
    if(!tea){
        res.status(404).send()
    }else{
        const {name , price} = req.body
        tea.name = name
        tea.price = price
        res.status(200).send(tea)
    }
    console.log(tea)

})

app.delete('/data/:id', (req , res) => {
    const index = data.findIndex(e => e.id == req.params.id)

    if(index == -1){
        res.status(404)
    }
    data.splice(index , 1)
    console.log(data , index)
    res.status(200).send(data)
})

app.post("/" , (req , res) => {
res.send("hemlo")
})

app.listen(port , () => {
    console.log(`Server running at port ${3000}`)
})