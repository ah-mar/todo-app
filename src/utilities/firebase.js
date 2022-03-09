import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

//Create a reference to the firebase app
const firebaseApp = initializeApp(firebaseConfig);

//Create a reference to the firestore database.
const db = getFirestore(firebaseApp);

async function addOneDoc(taskId, taskData) {
  const docRef = doc(db, "tasks", taskId);
  const data = taskData;
  try {
    const ref = await setDoc(docRef, data);
    console.log("document written with", ref);
  } catch (error) {
    console.log(error.message);
  }
}

// Get all docs from collection- Create a reference to collection. Get document collection(query snapshot) with getDocs function. Loop over each document snapashot and convert into JSON with .data() method.
async function readAllDocs() {
  let taskArray = [];
  //Create a coolection refernce
  const collectionRef = collection(db, "tasks");
  //return a snapshot which is an iterable of document snapshot
  const querySnapshot = await getDocs(collectionRef);
  //Loop over and log data for each snapshot by using .data() method
  querySnapshot.forEach((doc) => {
    taskArray.push(doc.data());
    console.log(doc.id, "=>", doc.data());
  });
  return taskArray;
}

async function getSomeDocs(category) {
  let taskArray = [];
  //create a collection reference
  const collectionRef = collection(db, "tasks");
  // Create a query by query function by passing collection reference and where function
  const q = query(collectionRef, where("category", "==", category));
  // use getDocs function to get list of document for this query
  const querySnapshot = await getDocs(q);
  //Lopp over list and log data for each snapshot by using .data() method
  querySnapshot.forEach((doc) => console.log("next", "=>", doc.data().task));
}

async function modifyOneDoc(docId, changedData) {
  const docRef = doc(db, "tasks", docId);
  //   await setDoc(docRef, changedData);
  await setDoc(docRef, changedData, { merge: true });
}

// Deleta a doc - create a doc reference. Use deleteDoc function to delete the document.

function deleteOneDoc(docId) {
  const docRef = doc(db, "tasks", docId);
  deleteDoc(docRef);
}

export { addOneDoc, readAllDocs, getSomeDocs, modifyOneDoc, deleteOneDoc };
