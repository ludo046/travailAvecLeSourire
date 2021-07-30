const jwt = require('jsonwebtoken');
require('dotenv').config();

//attribut la clé secrette à la constante 
const JWT_SIGN_SECRET = 'gsyyKSJPA782bxtzgdqk7206FsrgqgTOANWyq82761bwbhqpmqsdbnhvqbvs6789';

module.exports = {
    // fonction de generation de token 
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            //le token expire 24h apres sa creation 
            expiresIn: '2000h'
        })
    },
    parseAuthorization: function(authorization){
        //si authorization est different du null on le remplace par bearer
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    //fonction de recuperation du userId
    getUserId: function(authorization){
        //par sécurité on defini le userId sur -1 
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);
        //on verifie si le token et different de null 
        if (token != null) {
            try{
                //on verrifie le token avec la clé secrette 
                const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                //si la verification est bonne on attribut la valeur a la constante userId 
                if (jwtToken != null)
                    userId = jwtToken.userId;
            } catch (err){}
        }
        //on retourne userId
        return userId
    }
}