var mongoose = require('mongoose');
const crypto = require('crypto');


var Schema = mongoose.Schema;
var generateToken = crypto.randomBytes(16).toString('hex');


var projectSchema = new Schema({
    nameProject:{
        type: String,
        unique :true ,
        required :true
    },
    addressProject: {
        type: String,
        unique :true ,
        required :true
    },
    activeProject:{
        type :Boolean ,
        default :true
    },
    timeCreate: {
         type: Date,
         default: Date.now 
    },
    tokenProject :{ 
        type : String ,
        required : true
    }
})

var Project = module.exports= mongoose.model("Project", projectSchema)

module.exports.createProject = async (newProject ,cb)=>{
    const  tokenProject = generateToken;
    newProject.tokenProject =tokenProject;
    newProject.save(cb);
};

module.exports.getProjectById = async (id, cb) => {
    await Project.findById(id, cb)
};


module.exports.getByTokenProject = async (tokenID ,cb) =>{
    await Project.findOne({tokenProject : tokenID},cb);
}

module.exports.getAllProject =async( cb ) =>{
    await Project.find(cb);
}
module.exports.deleteProject = async(id,cb)=>{
    await Project.deleteOne({_id : id},cb);
}