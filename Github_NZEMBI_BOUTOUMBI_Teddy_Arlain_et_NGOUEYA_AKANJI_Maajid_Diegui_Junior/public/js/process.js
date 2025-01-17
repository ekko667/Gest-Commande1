
function AfficherDonnees() {

    
    $.ajax({
        //url: '/etudiant/GridEtudiantServer',
        url: '/commande/GridCommandeServer',
        type: 'GET',
        contentType: 'application/json',
        cache: false,
        success: function (responseText) {
            var data = (JSON.stringify(responseText));
            var res = JSON.parse(data);
            //alert(JSON.stringify(res.data));
            if (res.success) {
                var grid = res.data;
                
                grid.forEach(function (item) {
                    $('tbody').append("<tr><td class='numcom'>" +
                        item.numcom + "</td><td class='datecom'>" +
                        item.datecom + "</td><td class='xxx'>" +
                        item.xxx + "</td><td class='nomfour'>" +
                        item.nomfour + "</td><td class='numfour'>" +
                        item.numfour + "</td><td class='adressfour'>" +
                        item.adressfour + "</td><td class='nomprod'>" +
                        item.nomprod + "</td><td class='quantprod'>" +
                        item.quantprod + "</td><td  class='prixunit'>" +
                        item.prixunit + "</td><td><button class='my-custom-button btn btn-outline-danger'>Modifier</button></td></tr>");

                });


            }
            else { alert("Problème d'affichage des données !"); }

        },
        error: function (responseText) {
            alert(responseText);
        }
    });
}


function ModifierDonnees() {

    $('#table-id tbody').on('click', 'button.my-custom-button', function () {
        var numcom = $(this).closest("tr").find(".numcom").text();
        var datecom = $(this).closest("tr").find(".datecom").text();
        var xxx = $(this).closest("tr").find(".xxx").text();

        var nomfour = $(this).closest("tr").find(".nomfour").text();
        var numfour = $(this).closest("tr").find(".numfour").text();
        var adressfour = $(this).closest("tr").find(".adressfour").text();

        var nomprod = $(this).closest("tr").find(".nomprod").text();
        var quantprod = $(this).closest("tr").find(".quantprod").text();
        var prixunit = $(this).closest("tr").find(".prixunit").text();

        $('#numCId').val(numcom);
        $('#dateCId').val(datecom);
        $('#xxx').val(xxx);

        $('#nomFId').val(nomfour);
        $('#numFId').val(numfour);
        $('#adressId').val(adressfour);

        $('#prodId').val(nomprod);
        $('#quantId').val(quantprod);
        $('#prixId').val(prixunit);
    });
}



$(document).ready(function(){
    AfficherDonnees() ;
    ModifierDonnees() ;

    $(".list1").hide();
    $(".list2").hide();
    $(".list3").hide();
    $(".list4").hide();
    $(".sous-fonct1").hide();
    $(".sous-fonct2").hide();
    $(".sous-fonct3").hide();
    $(".sous-fonct4").hide();
    $(".gest-com").hide();



    $(".fonct1").click(function(){
        $(".list1").show();
        $(".list2").hide();
        $(".list3").hide();
        $(".list4").hide();
        $(".sous-fonct1").show();
        $(".sous-fonct2").hide();
        $(".sous-fonct3").hide();
        $(".sous-fonct4").hide();
    });



    $(".fonct2").click(function(){
        $(".list1").hide();
        $(".list2").show();
        $(".list3").hide();
        $(".list4").hide();
        $(".sous-fonct1").hide();
        $(".sous-fonct2").show();
        $(".sous-fonct3").hide();
        $(".sous-fonct4").hide();
    });



    $(".fonct3").click(function(){
        $(".list1").hide();
        $(".list2").hide();
        $(".list3").show();
        $(".list4").hide();
        $(".sous-fonct1").hide();
        $(".sous-fonct2").hide();
        $(".sous-fonct3").show();
        $(".sous-fonct4").hide();
    });



    $(".fonct4").click(function(){
        $(".list1").hide();
        $(".list2").hide();
        $(".list3").hide();
        $(".list4").show();
        $(".sous-fonct1").hide();
        $(".sous-fonct2").hide();
        $(".sous-fonct3").hide();
        $(".sous-fonct4").show();
    });



    $(".fonct0").click(function(){
        $(".list1").hide();
        $(".list2").hide();
        $(".list3").hide();
        $(".list4").hide();
        $(".gest-com").hide();
        $(".main").show();
        $(".sous-fonct1").hide();
        $(".sous-fonct2").hide();
        $(".sous-fonct3").hide();
        $(".sous-fonct4").hide();
    });



    $(".btn-gest-com").click(function(){
        $(".main").hide();
        $(".gest-com").show();
    });

    //Insertion des données
    $('#ValiderId').click(function () {
        var numcom = $('#numCId').val();
        var datecom = $('#dateCId').val();
        var xxx = $('#xxx').val();

        var nomfour = $('#nomFId').val();
        var numfour = $('#numFId').val();
        var adressfour = $('#adressId').val();

        var nomprod = $('#prodId').val();
        var quantprod = $('#quantId').val();
        var prixunit = $('#prixId').val();

        $("#NCnumCId").append(numcom);
        $("#DCdateCId").append(datecom);
        $("#XXxxx").append(xxx);

        $("#NFnomFId").append(nomfour);
        $("#NFnumFId").append(numfour);
        $("#AFadressId").append(adressfour);

        $("#NPprodId").append(nomprod);
        $("#QPquantId").append(quantprod);
        $("#PUprixId").append(prixunit);

        var data = {
            numcom: numcom,
            datecom: datecom,
            xxx: xxx,
            nomfour: nomfour,
            numfour: numfour,
            adressfour: adressfour,
            nomprod: nomprod,
            quantprod: quantprod,
            prixunit: prixunit,
        };

        $.ajax({
            //url: '/etudiant/InsertDataOnServer',
            url: '/commande/InsertDataOnServer',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            cache: false,
            success: function (responseText) {
                var data = (JSON.stringify(responseText));
                var res = JSON.parse(data);
                alert(res.message);

                $("tbody").find('tr').remove();
                AfficherDonnees();
            },
            error: function (responseText) {
                alert(responseText);
            }
        });
    });


    //AfficherDonnees();
    //ModifierDonnees();

    // Activer l'onglet 1
    $('#tabId1').click(function () {
        $('#bodyId1').show();
        $('#bodyId2').hide();
        $('#bodyId3').hide();
    });

    // Activer l'onglet 2
    $('#tabId2').click(function () {
        $('#bodyId1').hide();
        $('#bodyId2').show();
        $('#bodyId3').hide();
    });

    // Activer l'onglet 3
    $('#tabId3').click(function () {
        $('#bodyId1').hide();
        $('#bodyId2').hide();
        $('#bodyId3').show();
    });

    //Insertion des données
    $('#ValiderId').off('click').on('click', function () {
        var numcom = $('#numCId').val();
        var datecom = $('#dateCId').val();
        var xxx = $('#xxx').val();
        var nomfour = $('#nomFId').val();
        var numfour = $('#numFId').val();
        var adressfour = $('#adressId').val();
        var nomprod = $('#prodId').val();
        var quantprod = $('#quantId').val();
        var prixunit = $('#prixId').val();
    
        var data = {
            numcom: numcom,
            datecom: datecom,
            xxx: xxx,
            nomfour: nomfour,
            numfour: numfour,
            adressfour: adressfour,
            nomprod: nomprod,
            quantprod: quantprod,
            prixunit: prixunit,
        };
    
        $.ajax({
            url: '/commande/InsertDataOnServer',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            cache: false,
            success: function (responseText) {
                var res = JSON.parse(JSON.stringify(responseText));
                alert(res.message);
                $("tbody").find('tr').remove();
                AfficherDonnees();
            },
            error: function (responseText) {
                alert(responseText);
            }
        });
    });
    
    //Modification des données
    $('#ModifierId').click(function () {
        var numcom = $('#numCId').val();
        var datecom = $('#dateCId').val();
        var xxx = $('#xxx').val();

        var nomfour = $('#nomFId').val();
        var numfour = $('#numFId').val();
        var adressfour = $('#adressId').val();

        var nomprod = $('#prodId').val();
        var quantprod = $('#quantId').val();
        var prixunit = $('#prixId').val();

        $("#NCnumCId").append(numcom);
        $("#DCdateCId").append(datecom);
        $("#XXxxx").append(xxx);

        $("#NFnomFId").append(nomfour);
        $("#NFnumFId").append(numfour);
        $("#AFadressId").append(adressfour);

        $("#NPprodId").append(nomprod);
        $("#QPquantId").append(quantprod);
        $("#PUprixId").append(prixunit);

        var data = {
            numcom: numcom,
            datecom: datecom,
            xxx: xxx,
            nomfour: nomfour,
            numfour: numfour,
            adressfour: adressfour,
            nomprod: nomprod,
            quantprod: quantprod,
            prixunit: prixunit,
        };

        $.ajax({
            //url: '/etudiant/ModifyDataOnServer',
            url: '/commande/ModifyDataOnServer',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            cache: false,
            success: function (responseText) {
                var data = (JSON.stringify(responseText));
                var res = JSON.parse(data);
                alert(res.message);

                $("tbody").find('tr').remove();
                AfficherDonnees();
            },
            error: function (responseText) {
                alert(responseText);
            }
        });
    });

    //Effacer les données
    $('#EffacerId').click(function () {
        $("#numCId").val('');
        $("#dateCId").val('');
        $("#xxx").val('');

        $("#nomFId").val('');
        $("#numFId").val('');
        $("#adressId").val('');

        $("#prodId").val('');
        $("#quantId").val('');
        $("#prixId").val('');
    });

    //Afficher les données
    $('#AfficherId').click(function () {
        $("tbody").find('tr').remove();
        AfficherDonnees();
    });


});



