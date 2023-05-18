const express = require('express');
const router = express.Router();


router.post('/puttingData', async function (req, res, next) {

    var dep = req.body.departmentName;
    var result = await createDepartmentData.model().find({ depName: dep });
    var id;
    await result.forEach((data) => {
        id = data._id;
    })


    createEmployee = createEmployeeData.model();
    console.log(result);
    let newEmp = new createEmployee({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        depId: id
    });
    newEmp.save();

    let response = await createEmployeeData.model().find();
    res.send(response);
});

router.get('/getAllSkills', async function (req, res) {
    // let resu =await createEmployeeData.model().find();
    // res.send(resu)
    var name = req.query.text;

    createEmployeeData.doAggregation(name).
        then((result) => {
            res.send(result);
        }).catch((e) => {
            res.send(e);
        })

});

router.put('/putData', async (req, res) => {
    let name = req.body.name;
    let ageDiscount =req.body.off
    let dummyAge = req.body.age


    let putDatas =await createEmployeeData.model().updateOne({name : name},
        {
            $set :{
                age :dummyAge - ageDiscount
            }
        })
        res.send(putDatas);
});

module.exports = router;