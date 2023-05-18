const express =require('express');
const router = express.Router();

/**
 * @swagger
 * /swagger/puttingData:
 *   post:
 *     summary: Register a new athlete
 *     tags:
 *       - Users
 *     description: Register a new Employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Details
 *         description: Athlete details
 *         in: body
 *         default : '{"name":"Hary Barnes","age":14,"gender":"Male","departmentName":"CSE"}'
 *         schema:
 *           $ref: '#/definitions/Athlete'
 *     responses:
 *       200:
 *         description: Successfully created
 */

/**
 * @swagger
 * definitions:
 *   Athlete:
 *     properties:
 *       name:
 *         type: string
 *       age:
 *         type: integer
 *       gender:
 *         type: string
 *       departmentName:
 *         type: string
 */


router.post('/puttingData', async (req, res) => {
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

/**
 * @swagger
 * /swagger/getAllSkill:
 *   get:
 *     summary: Get all skills
 *     tags:
 *       - Skills
 *     description:  Get all skills
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         type: string
 *         required: false
 *       - name: text
 *         description: search text
 *         in: query
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully received all the skill.
 */

router.get('/getAllSkill', async (req, res) => {
    var name = req.query.text;

    createEmployeeData.doAggregation(name).
        then((result) => {
            res.send(result);
        }).catch((e) => {
            res.send(e);
        })
});

/**
 * @swagger
 * /swagger/putData:
 *   put:
 *     summary: Update the Employee Data
 *     tags:
 *       - Skills
 *     description:  Update the current round interview status
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: x-access-token
 *         in: header
 *         type: string
 *         required: false
 *       - name: body
 *         description: interview schedule id
 *         in: body
 *         default : '{"name": "shivani", "age":22}'
 *         schema:
 *           $ref: '#/definitions/interviewSchedule'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

/**
 * @swagger
 * definitions:
 *   interviewSchedule:
 *     properties:
 *       name:
 *         type: string
 *       age:
 *         type: integer 
 */

router.put('/putData',async(req, res) => {
    let name = req.body.name;
    
    let putDatas =await createEmployeeData.model().updateOne({name : name},
        {
            $set :{
                age :req.body.age
            }
        })
        res.send(putDatas);
});

module.exports = router;