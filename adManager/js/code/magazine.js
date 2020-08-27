// Numero del magazine da cui partire a caricare i dati
var currentPosition = 0;

// Dichiarazione variabili dei vari DataSource
var magNumbDS = "";
var clientListDS = "";
var posListDS = "";

// Data da cui partire a caricare dati
function getDataInizio(nAnno) {
    if(!nAnno) {
        nAnno = (new Date()).getFullYear();
    }

    return nAnno.toString() + "0101";
}

// Data da cui smettere di caricare dati
function getDataFine(nAnno) {
    if(!nAnno) {
        nAnno = (new Date()).getFullYear();
    }

    return nAnno.toString() + "1231";
}

//Valore da passare al template della cella ADV/Cliente
function getClient(cd_cf) {
    let result = cd_cf;
    let clientData = clientListDS.data();
    for (let index = 0; index < clientData.length; index++) {
        const element = clientData[index];
        if(element.cd_cf == cd_cf) {
            result = element.descrizione;
            break;
        }
    }
    return result;
}

//Valore da passare al template della cella ADV/Posizione
function getPosition(id_pos) {
    let result = id_pos;
    let posData = posListDS.data();
    for (let index = 0; index < posData.length; index++) {
        const element = posData[index];
        if(element.id_posizione == id_pos) {
            result = element.nome;
            break;
        }
    }
    return result;
}

//Filtro per la griglia ADV (sinistra)
function magAdvFilter() {
    return [
        {
            field: "tipovoce",
            operator: "eq",
            value: "P"
        },
        {
            field: "anno",
            operator: "eq",
            value: (magNumbDS.data() [currentPosition]).anno
        },
        {
            field: "numero",
            operator: "eq",
            value: (magNumbDS.data() [currentPosition]).progressivo
        }
    ]
}

//Filtro per la griglia END (destra)
function magEndFilter() {
    return [
        {
            field: "tipovoce",
            operator: "eq",
            value: "C"
        },
        {
            field: "anno",
            operator: "eq",
            value: (magNumbDS.data() [currentPosition]).anno
        },
        {
            field: "numero",
            operator: "eq",
            value: (magNumbDS.data() [currentPosition]).progressivo
        }
    ]
}

//Disabilita prev/next all'avvio e al click qualora fosse il primo o l'ultimo numero
//Popola la barra del titolo con numero e data di uscita/anno
//BISOGNA AGGIUNGERE ANCHE IL TITOLO NEL TOOLTIP
function magTitleBarInit() {
    var buttprev = $("#magTitlePrev").data("kendoButton");
    var buttnext = $("#magTitleNext").data("kendoButton");
    if(currentPosition == 0) {
        buttprev.enable(false);
    } else {
        buttprev.enable(true);
    }
    if (magNumbDS.data().length - 1 == currentPosition) {
        buttnext.enable(false);
    } else {
        buttnext.enable(true);
    }

    $("#magTitleMonth").text((magNumbDS.data() [currentPosition]).data_uscita.toLocaleString("default" , {day: "numeric", month: "long" }).toUpperCase());
    $("#magTitleYear").text((magNumbDS.data() [currentPosition]).data_uscita.getFullYear());
    $("#magTitleNumber").text((magNumbDS.data() [currentPosition]).progressivo);
}

//Funzionamento Bottoni Prev/Next e Barra del titolo
function issuePrev() {

    if(currentPosition > 0) {
        currentPosition--;
    }
    
    $("#advGrid").data("kendoGrid").dataSource.filter(magAdvFilter());
    $("#endGrid").data("kendoGrid").dataSource.filter(magEndFilter());
    magTitleBarInit();
}
function issueNext() {

    if(currentPosition < magNumbDS.data().length - 1) {
        currentPosition++;
    }
    $("#advGrid").data("kendoGrid").dataSource.filter(magAdvFilter());
    $("#endGrid").data("kendoGrid").dataSource.filter(magEndFilter());
    magTitleBarInit();    
}