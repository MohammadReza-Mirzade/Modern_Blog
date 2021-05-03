const createArticle = async (req, res) => {
    console.log(req.fields);
    if (!req.fields.title || !req.fields.model || !req.files.avatar) return res.json({msg : "Bad Request."});
    for (let i = 0; i < Object.entries(req.files).length; i++){
        let [key, value] = Object.entries(req.files)[i];
        let imageFile = Date.now() + "-" + value.name;
        let tempPath = value.path ;
        let targetPath = path.join(__dirname, "../../../../file/article/" + imageFile);
        let err = await mv(tempPath, targetPath, {mkdirp: true});
        if (err) return res.json({msg: "Internal Server Error."});
    }
};
const updateArticle = (req, res) => {};

module.exports = {
    createArticle,
    updateArticle,
};
