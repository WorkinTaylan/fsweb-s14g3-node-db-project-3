const Schemes=require("./scheme-model");
const yup = require("yup");

const stepSChema=yup.object().shape({
  instructions:yup.string("Hatalı step")
  .required("Hatalı step")
  .min(1,"Hatalı step"),
  step_number:yup.number("Hatalı step")
  .min(1,"Hatalı step")
  .required("Hatalı step")
})
/*
  Eğer `scheme_id` veritabanında yoksa:

  durum 404
  {
    "message": "scheme_id <gerçek id> id li şema bulunamadı"
  }
*/
const checkSchemeId = async (req, res, next) => {
    
    const {scheme_id}=req.params
    try{
      const isSchemeExist= await Schemes.findById(req.params.scheme_id)

      if(!isSchemeExist){
      res.status(404).json({message:`scheme_id ${scheme_id} id li şema bulunamadı`})
      }
      else{
        next()
      }
    }
    catch(error){
      next(error)
    }
    
}

/*
  Eğer `scheme_name` yoksa, boş string ya da string değil:

  durum 400
  {
    "message": "Geçersiz scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  
  
  try{
    const {scheme_name}=req.body;
    if(!scheme_name || typeof (scheme_name)!=="string" || scheme_name.length === 0){
      res.status(400).json({message:"Geçersiz scheme_name"})
    }
    else{
      next()
    }
  }
  catch(error){
    next(error)
  }
}

/*
  Eğer `instructions` yoksa, boş string yada string değilse, ya da
  eğer `step_number` sayı değilse ya da birden küçükse:

  durum 400
  {
    "message": "Hatalı step"
  }
*/
const validateStep = async (req, res, next) => {

  

  try{
    
    const checkStep= await stepSChema.validate(req.body)
    if(!checkStep){
      res.status(400)
    }
    next();
  }
  catch(error){
    next(error)
  }

  

}

/*  
validateStep için eklemiştim fakat DRY;

if(!instructions || typeof (instructions)!=="string" || instructions.length === 0){
      res.status(400).json({message:"Geçersiz scheme_name"})
    }
    else if (!step_number || typeof (step_number)!=="number" || step_number<1){
      res.status(400).json({message:"Geçersiz scheme_name"})
    } */

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
