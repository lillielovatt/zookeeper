const router = require("express").Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
})

router.get('/animals', (req,res)=>{
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers',(req,res)=>{
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

//can't have 2 gets with the same ROUTE
router.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;