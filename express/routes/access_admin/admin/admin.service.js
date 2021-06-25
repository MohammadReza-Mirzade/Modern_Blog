const logout = (req, res) => {
    console.log("logout");
    req.session.destroy();
    req.session = null;
    return res.json({msg: "success"});
};


module.exports = {
    logout,
};
