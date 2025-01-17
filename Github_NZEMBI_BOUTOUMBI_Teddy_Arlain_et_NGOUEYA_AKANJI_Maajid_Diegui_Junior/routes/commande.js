var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

// Configuration de Sequelize
const sequelize = new Sequelize('dbgest', 'postgres', 'root09', {
    host: 'localhost',
    dialect: 'postgres',
    port: 6679,
    define: {
        freezeTableName: true,
        timestamps: false
    },
    pool: {
        max: 15,
        min: 0,
        idle: 10000
    }
});

// Vérification de la connexion
sequelize
    .authenticate()
    .then(() => console.log('Connexion à la base de données réussie.'))
    .catch(err => console.error('Erreur de connexion :', err));

// Définition du modèle Sequelize
var Commande = sequelize.define('commande', {
    numcom: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    datecom: { type: Sequelize.DATE },
    xxx: { type: Sequelize.STRING },
    nomfour: { type: Sequelize.STRING },
    numfour: { type: Sequelize.NUMBER },
    adressfour: { type: Sequelize.STRING },
    nomprod: { type: Sequelize.STRING },
    quantprod: { type: Sequelize.INTEGER },
    prixunit: { type: Sequelize.BIGINT }
});

// Route pour insérer des données
router.post('/InsertDataOnServer', function (req, res) {
    var { datecom, xxx, nomfour, numfour, adressfour, nomprod, quantprod, prixunit } = req.body;

    sequelize
        .transaction(async t => {
            // Appliquer un verrou sur la table pour éviter les conflits
            await sequelize.query('LOCK TABLE commande IN EXCLUSIVE MODE', { transaction: t });

            // Calculer le nouvel `numcom`
            const maxId = await Commande.max('numcom', { transaction: t });
            const newId = maxId ? maxId + 1 : 1;

            // Insérer la nouvelle commande
            return Commande.create(
                {
                    numcom: newId,
                    datecom: datecom,
                    xxx: xxx,
                    nomfour: nomfour,
                    numfour: numfour,
                    adressfour: adressfour,
                    nomprod: nomprod,
                    quantprod: quantprod,
                    prixunit: prixunit
                },
                { transaction: t }
            );
        })
        .then(data => {
            res.json({ message: 'Insertion effectuée !', data });
        })
        .catch(err => {
            console.error(err);
            res.json({ message: 'Insertion non effectuée !', error: err });
        });
});




// Route pour modifier les données
router.post('/ModifyDataOnServer', function(req, res) {
    // Extraction des données depuis le corps de la requête
    var { numcom, datecom, xxx, nomfour, numfour, adressfour, nomprod, quantprod, prixunit } = req.body;

    if (!numcom) {
        return res.status(400).json({ message: "Le champ 'numcom' est obligatoire." });
    }

    // Démarrer une transaction Sequelize
    sequelize.transaction(async (t) => {
        try {
            // Mise à jour de la commande
            await Commande.update(
                {
                    datecom: datecom,
                    xxx: xxx,
                    nomfour: nomfour,
                    numfour: numfour,
                    adressfour: adressfour,
                    nomprod: nomprod,
                    quantprod: quantprod,
                    prixunit: prixunit
                },
                { where: { numcom: numcom }, transaction: t }
            );

            // Envoi de la réponse en cas de succès
            res.json({ message: "Modification effectuée !" });
        } catch (err) {
            console.error("Erreur lors de la mise à jour : ", err);

            // Envoi de la réponse en cas d'erreur
            res.status(500).json({ message: "Modification non effectuée !" });
        }
    });
});




// Route pour afficher les données
router.get('/GridCommandeServer', function(req, res) {
    
    Commande.findAll({order: sequelize.col('numcom')}).then(function(result) {
        var taille = result.length;
        var data = result;
        var tableau = [];
        var row;

        for (var i = 0; i < taille; i++) {
            row = {
                numcom: data[i].numcom, 
                datecom: data[i].datecom, 
                xxx: data[i].xxx,

                nomfour: data[i].nomfour,
                numfour: data[i].numfour,
                adressfour: data[i].adressfour,

                nomprod: data[i].nomprod, 
                quantprod: data[i].quantprod, 
                prixunit: data[i].prixunit,

                //total: data[i].math + data[i].anglais + data[i].informatique+ data[i].poo,
                //moyenne:  Math.round((data[i].math + data[i].anglais + data[i].informatique+ data[i].poo)/4)
            };
            tableau.push(row);
        }

        var grid = {
            success : true, 
            data: tableau
        };
        res.contentType('json');
        res.json(grid);
    });
});






// Exporter le routeur
//app.use('/',router);
module.exports = router;