const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const utFormate = "utf-8";

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath, utFormate, (err, data) => {
    try {
      const contacts = JSON.parse(data);
      console.table(contacts);
    } catch (err) {
      console.log("listContacts error", err);
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, utFormate, (err, data) => {
    try {
      const contacts = JSON.parse(data);
      const contactById = contacts.find(
        (item) => String(item.id) === String(contactId)
      );

      console.table(contactById);
    } catch (err) {
      console.log("getContactById error", err);
    }
  });
}
function removeContact(contactId) {
  fs.readFile(contactsPath, utFormate, (err, data) => {
    try {
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter(
        (item) => String(item.id) !== String(contactId)
      );
      console.table(newContacts);
      writeNewContacts(contactsPath, newContacts);
    } catch (err) {
      console.log("getContactById error", err);
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, utFormate, (err, data) => {
    try {
      const contacts = JSON.parse(data);
      const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
      };
      const newContacts = [...contacts, newContact];
      console.table(newContacts);
      writeNewContacts(contactsPath, newContacts);
    } catch (err) {
      console.log("getContactById error", err);
    }
  });
}

function writeNewContacts(path, contacts) {
  const newJSONContacts = JSON.stringify(contacts);
  fs.writeFile(path, newJSONContacts, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
// const fs = require("fs");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

// const contactsPath = path.join(__dirname, "db", "contacts.json");

// function listContacts() {
//   fs.readFile(contactsPath, (err, data) => {
//     if (err) {
//       throw new Error(err);
//     }
//     console.table(JSON.parse(data));
//   });
// }

// function getContactById(contactId) {
//   fs.readFile(contactsPath, (err, data) => {
//     if (err) {
//       throw new Error(err);
//     }
//     const contacts = JSON.parse(data);
//     const contact = contacts.find((el) => String(el.id) === String(contactId));
//     console.table(contact);
//   });
// }

// function removeContact(contactId) {
//   fs.readFile(contactsPath, (err, data) => {
//     if (err) {
//       throw new Error(err);
//     }
//     const contacts = JSON.parse(data);
//     const newContacts = contacts.filter((el) => {
//       return String(el.id) !== String(contactId);
//     });
//     changeContacts(contactsPath, newContacts);
//     console.table(newContacts);
//   });
// }

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, (err, data) => {
//     if (err) {
//       throw new Error(err);
//     }
//     const contacts = JSON.parse(data);
//     const newContact = { id: uuidv4(), name, email, phone };
//     const newContacts = [...contacts, newContact];
//     changeContacts(contactsPath, newContacts);
//     console.table(newContacts);
//   });
// }

// function changeContacts(path, newArray) {
//   const contacts = JSON.stringify(newArray);
//   fs.writeFile(path, contacts, (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//   });
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
