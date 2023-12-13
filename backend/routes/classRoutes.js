import express  from "express";


const router = express.Router();

router.get( '/person', (req, res) => {
    let person = {
        firstName: 'James',
        lastName: 'Brian'
    }
    let people =[
        {
            firstName: 'Jane',
            lastName: 'Doe'
        },
        {
            firstName: 'John',
            lastName: 'Doe'
        },
        {
            firstName: 'Getty',
            lastName: 'Doe'
        },
        {
            firstName: 'Kris',
            lastName: 'Doe'
        }
    ];
    res.send({
        count: '4',
        people:people
    })
})

router.get( '/total-price', (req, res) => {
    let prices = [100, 200, 50, 730]
    const sum = prices.reduce((a, b) => a + b )
    console.log(sum)

    res.send(`the total price is: ${sum}`)
})

router.get('/children', (req, res) => {
    let children = [
        {
            firstName: 'Rayan',
            lastName: 'Mo',
            grade: 'B+',
            age: 16
        },
        {
            firstName: 'Ray',
            lastName: 'Mo',
            grade: 'A+',
            age: 12
        },
        {
            firstName: 'Ryne',
            lastName: 'Mo',
            grade: 'C-',
            age: 21
        },
        {
            firstName: 'Roy',
            lastName: 'Mo',
            grade: 'B-',
            age: 18
        },
        {
            firstName: 'Ramsey',
            lastName: 'Mo',
            grade: 'D-',
            age: 20
        }
    ];

    let totalage = children.reduce((a, b) => a + b.age, 0)
    console.log(totalage)

    res.send ({
        count: '5',
        children: children,
        age: totalage
    })
})

export default router;