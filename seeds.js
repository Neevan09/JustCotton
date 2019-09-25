// const mongoose = require("mongoose");
// const Collections = require("./models/collections");
// const Comment = require('./models/comments');
//
// const data = [{name:"Mens",
//                image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfsUpt04arbKwAzePJ9ICjc0BAfugkY35NBtIb1uVQQa-QQRhl",
//                description:"This is Men's Collections"},
//          {name:"Womens",
//         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfsUpt04arbKwAzePJ9ICjc0BAfugkY35NBtIb1uVQQa-QQRhl",
//         description:"This is Women's Collections"},
//     {name:"Kids",
//         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfsUpt04arbKwAzePJ9ICjc0BAfugkY35NBtIb1uVQQa-QQRhl",
//         description:"This is Kids's Collections"},
//     {name:"Home Furnishings",
//         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfsUpt04arbKwAzePJ9ICjc0BAfugkY35NBtIb1uVQQa-QQRhl",
//         description:"This is Kids's Collections"}];
//
// function seedDB()
// {
//     Collections.remove({},(err) => {
//         if(err){
//         console.log("Error: "+err);
//         }
//
//         //console.log("remove collections");
//         //Added new collections
//         data.forEach(seed => {
//             Collections.create(seed, (err,collection) => {
//                 if(err){
//                     console.log(err);
//                 }  else{
//                     //console.log("Added new collections");
//                     //Adding Comments
//                     Comment.create({text:"The product was good fit!!",author:"Naveen"}, (err, comment) => {
//                         if(err){
//                             console.log(err);
//                         } else{
//                             collection.comments.push(comment);
//                             collection.save();
//                         }
//                     });
//                 }
//             });
//         });
//     });
// }
//
// module.exports = seedDB;
