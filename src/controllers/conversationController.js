const conversationModel = require("../models/conversationModel");
const { findByIdAndUpdate } = require("../models/userModel");
const jwt = require('jsonwebtoken');
const checkCurrentAndHeader = require("../utils/checkCurrentAndHeader");
const { default: mongoose } = require("mongoose");
const userModel = require("../models/userModel");



//

function filterArray(arr){
let array2 = []
arr.forEach((element)=>{
    console.log(element);
    if (array2.indexOf(element)==-1){
        array2.push(element);	
    }

 
});
console.log("Hello");
return array2
}
var c = filterArray([1,2,1,1]);

//filtering arrays function


module.exports = {
    getConversation:async function(req,res){
        try{
    const CONVERSATIONS = await conversationModel.find(req.params);
    res.status(200).json({
        response:'success',
        data:CONVERSATIONS
    })}
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
    },
    createConversation:async function(req,res){
        if (!req.body.participants){
            req.body.participants=[];
        }

        const token = req.headers.authorization.split(' ')[1];
        var currentUser;
        const decoded = jwt.verify(token,'123',function(err,decoded){
            if (err){
                throw new Error(err);   
    
            }else{
                currentUser = decoded.userName;
                return decoded.userName;
            }
        });

        
        
        const conversationData = {
            
            creator: decoded,
            participants: [currentUser,...req.body.participants],
            title:req.body.title
        }

        var conversation = new  conversationModel(conversationData);
        const resultConversation = conversation.save().then(()=>{
            res.status(200).json({
                response:'success',
                data: resultConversation
            });
            

        })

        // .catch(()=>{
        //     res.json({
        //         error:'error occured'
        //     });
        // })

      
    },

    addParticipantToGroup: async function(req,res){

    try{
        function uniqueArray3( ar ) {
            var j = {};
          
            ar.forEach( function(v) {
              j[v+ '::' + typeof v] = v;
            });
          
            return Object.keys(j).map(function(v){
              return j[v];
            });
          } 
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,'123',function(err,decoded){
            if (err){
                throw new Error(err);   
    
            }else{
                currentUser = decoded.userName;
                return decoded.userName;
            }
        });
        //adding participant 
      
    var targetConversation = await conversationModel.findOne({_id:req.body.conversationId});
        if (targetConversation.creator!=decoded){
            throw new Error("You are not the owner of the group!");
        }
        if (targetConversation==null){
            throw new Error("You are not authorized to add participant");
        }

        var emailArray = req.body.participants;
        let idArray = [];
         emailArray = emailArray.map(async (participantEmail)=>{
            
            var participant = await userModel.findOne({email:participantEmail});
            if (participant){

                return participant._id;
              
               
               
            }else{
                throw new Error("Some emails found do not exist in the database");
            }
            
        } );
        console.log(emailArray);
        var FINALARRAY = await Promise.all(emailArray);
        

       

     
    
      targetConversation.participants = [...targetConversation.participants,...FINALARRAY]
      targetConversation.participants = uniqueArray3(targetConversation.participants);
      console.log(idArray,'Id array participants');
        
     await targetConversation.save();

     res.json({
        response:'success',
        data: targetConversation,
        array: idArray
     })

    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
    },

    removeParticipantFromGroup:async function(req,res){
        try{
            var targetConversation = await conversationModel.findOne({creator:req.body.creator,id:req.body.converationId});
            console.log(targetConversation);

        }catch(err){

            res.json({
                error:err.message
            })
        }
    },
    getConversationsOfUser:async function(req,res){
        try{
        const token = req.headers.authorization.split(' ')[1];
        var currentUser;
        const decoded = jwt.verify(token,'123',function(err,decoded){
            if (err){
                throw new Error(err);
    
            }else{
                currentUser = decoded.userName;
                return decoded.userName;
            }});
        var Conversation = await conversationModel.find({creator:decoded}).populate('creator');

        res.status(200).json({
            data: Conversation,
            resposne:'success'
        });
    }
    catch(err){
        res.status(400).json({
            error:'Token error'
        });
    }
    },

    getConversationWhereParticipants: async function(req,res){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,'123',function(err,decoded){
                if (err){
                    throw new Error(err);
        
                }else{
                    currentUser = decoded.userName;
                    return decoded.userName;
                }});

                var conversations = await conversationModel.find({participants:decoded}).populate('creator');
                console.log(conversations);
                var array = conversations.map((element)=>{
                    console.log(element.creator.id.toString(),'Element creator id');
                 
                    return element;
                  
                });


                var filteredArray = array.filter((element)=>element!=undefined);
                
                console.log(array.filter((element)=>element!=undefined),'Árray')
                res.status(200).json({
                    data:filteredArray,
                    response:'success'
                })
        }catch(err){

            res.status(400).json({
                error:err.message
            })
        }
    },

    getConversationById: async function(req,res){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,'123',function(err,decoded){
                if (err){
                    throw new Error(err);
        
                }else{
                    currentUser = decoded.userName;
                    return decoded.userName;
                }});

                var conversation = await conversationModel.findById(req.params.id).populate('creator').populate('participants');

                res.status(200).json({
                    data:conversation,
                    response:'success'
                })
        }catch(err){

            res.status(400).json({
                error:err.message
            })
        }
    },

    getParticipantsOfConversation:async (req,res)=>{
        try{

        
        const token = req.headers.authorization.split(' ')[1];
       
        const decoded = jwt.verify(token,'123',function(err,decoded){
            if (err){
                throw new Error(err);
    
            }else{
                currentUser = decoded.userName;
                return decoded.userName;
            }});

        const targetConversation = await conversationModel.findOne({_id:new mongoose.Types.ObjectId(req.params.id)}).populate('participants');

        res.status(200).json({
            data: targetConversation.participants,
            response:'success'
        }); 
    }
        catch(err){
            res.status(400).json({
                error:err.message
            })
        }
    }






}