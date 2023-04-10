import mySchema from './schema.js';
async function create(data) {
    await mySchema.create(data);
  }
  
  async function deleteData(data) {
    await mySchema.findOneAndDelete(data);
  }
  
  async function read(data) {
    const notesData = await mySchema.find(data).then((myData) => {
      return myData;
    });
    return JSON.stringify(notesData);
  }
  async function update(oldData, newData) {
    await mySchema.findOneAndUpdate(oldData, newData);
  }

  export {create ,deleteData ,read ,update}

