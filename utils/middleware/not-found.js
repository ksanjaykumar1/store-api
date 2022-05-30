const notFount =(req,res) => res.status(404).json({msg:"Route doesn't exit"})

module.exports = notFount