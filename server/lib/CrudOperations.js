const GetDocs = async (model) => {
    try {
        const docs = await model.find();
        if(docs?.length === 0) return [];
        return docs;
    } catch(err) {
        return null;
    }
}

const GetOneDoc = async (model, selector) => {
    try {
        const doc = await model.findOne(selector);
        if(!doc) return null;
        return doc;
    } catch(err) {
        return null;
    }
}

const CreateDoc = async (model, data) => {
    try {
        console.log("Model: ", model)
        const doc = await model.create(data);
        console.log("doc: ", doc)
        if(!doc) return null;
        return doc;
    } catch (err) {
        console.log("Error: ", err)
        return null;
    }
}

const UpdateDoc = async (model, id, data) => {
    try {
        const doc = await model.findByIdAndUpdate(id, data, { new:true });
        if(!doc) return null;
        return doc;
    } catch (err) {
        return null;
    }
}

const DeleteDoc = async (model, id) => {
    try {
        const doc = await model.findByIdAndDelete(id);
        if(!doc) return null;
        return doc;
    } catch (err) {
        return null;
    }
}

const DeleteManyDocs = async (model, IDs) => {
    try {
        const docs = await model.deleteMany(IDs);
        if(!docs) return null;
        return docs;
    } catch(err) {
        return null;
    }
}

module.exports = {
    GetDocs,
    GetOneDoc,
    CreateDoc,
    UpdateDoc,
    DeleteDoc,
    DeleteManyDocs
}