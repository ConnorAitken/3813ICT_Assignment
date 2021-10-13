module.exports = function(app,formidable){
    // Route to manage upgrading a user's role
    app.post('/api/upload_img',function(req,res) {
        var form = new formidable.IncomingForm({ uploadDir: './userimages' });
        form.keepExtensions = true;

        form.on('error', function(err) {
            res.send({
                result:"failed",
                data:{},
                numberOfImages:0,
                message:"Cannot upload images. Error is :" + err
            });
        });

        form.on('fileBegin', function(name, file) {
            // rename the incoming file to the file's name
            file.path = form.uploadDir + "/" + file.name;
        });

        form.on('file', function(field, file) {
            res.send({
                result:"OK",
                data:{'filename':file.name,'size':file.size},
                numberOfImages:1,
                message:"upload successful"
            });
        });

        form.parse(req);
    });
}