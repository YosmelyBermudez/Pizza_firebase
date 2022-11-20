import firebase from '../Config/firebase';

export async function getAllProductos(){
    const querySnapshot = await firebase.firestore().collection("pizzas")
    .get()
    return querySnapshot.docs
}
export async function getByIdProducto(id){
    const querySnapshot = await firebase.firestore().doc(`pizzas/${id}`).get()
    return querySnapshot
}
export async function update(id,payload){
    return await firebase.firestore().doc(`pizzas/${id}`).set(payload)
}
export async function deleteProducto(id){
    return await firebase.firestore().doc(`pizzas/${id}`).delete()
}